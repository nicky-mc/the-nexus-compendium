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
        console.log(data); // Log the response data
        setGroup(data.group);
        setMembers(data.members);
        setIsMember(data.members.some((member) => member.username === user?.username));
      } catch (err) {
        console.error(err); // Log the error to the console
        setError(err.message);
      }
    };

    fetchGroupDetails();
  }, [id, user]);

  const handleJoin = async () => {
    try {
      const res = await fetch(`/api/groups/${id}/join`, { method: 'POST' });
      if (!res.ok) {
        throw new Error('Failed to join group');
      }
      setIsMember(true);
    } catch (err) {
      console.error(err); // Log the error to the console
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
      console.error(err); // Log the error to the console
      setError(err.message);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return group ? (
    <div>
      <h1>{group.group_name}</h1>
      <p>{group.description}</p>
      <h2>Members</h2>
      <ul>
        {members.map((member) => (
          <li key={member.username}>{member.username}</li>
        ))}
      </ul>
      {!isMember ? (
        <button onClick={handleJoin}>Join Group</button>
      ) : (
        <button onClick={handleLeave}>Leave Group</button>
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
}
