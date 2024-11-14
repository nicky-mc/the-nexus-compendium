'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function GroupDetails() {
  const { id } = useParams();
  const { user } = useUser();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [isMember, setIsMember] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const res = await fetch(`/api/groups/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch group details');
        }
        const data = await res.json();
        console.log('Response data:', data); // Log the response data
        setGroup(data.group);
        setMembers(data.members);
        setIsMember(data.members.some((member) => member.username === user?.username));
      } catch (err) {
        console.error('Error fetching group details:', err); // Log the error to the console
        setError(err.message);
      }
    };

    fetchGroupDetails();
  }, [id, user]);

  console.log('Group:', group); // Log the group state
  console.log('Members:', members); // Log the members state
  console.log('Is Member:', isMember); // Log the isMember state

  const handleJoin = async () => {
    try {
      const res = await fetch(`/api/groups/${id}/join`, { method: 'POST' });
      if (!res.ok) {
        throw new Error('Failed to join group');
      }
      setIsMember(true);
    } catch (err) {
      console.error('Error joining group:', err); // Log the error to the console
      setError(err.message);
    }
  };

  const handleLeave = async () => {
    try {
      const res = await fetch(`/api/groups/${id}/leave`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to leave group');
      }
      setIsMember(false);
    } catch (err) {
      console.error('Error leaving group:', err); // Log the error to the console
      setError(err.message);
    }
  };

  if (error) {
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  return group ? (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{group.group_name}</h2>
        <p>{group.description}</p>
        <h2 className="card-title">Members</h2>
        <ul>
          {members.map((member) => (
            <li key={member.username}>
              <span className="badge badge-lg">{member.username}</span>
            </li>
          ))}
        </ul>
        {!isMember ? (
          <button className="btn btn-primary" onClick={handleJoin}>
            Join Group
          </button>
        ) : (
          <button className="btn btn-error" onClick={handleLeave}>
            Leave Group
          </button>
        )}
      </div>
    </div>
  ) : (
    <div className="alert alert-info shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        <span>Loading...</span>
      </div>
    </div>
  );
}