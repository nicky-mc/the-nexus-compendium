'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [dm, setDm] = useState('');

  useEffect(() => {
    fetch('/api/groups')
      .then((res) => res.json())
      .then((data) => setGroups(data));
  }, []);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    await fetch('/api/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ group_name: groupName, description, dm })
    });
    setGroupName('');
    setDescription('');
    setDm('');
    fetch('/api/groups')
      .then((res) => res.json())
      .then((data) => setGroups(data)); // Refresh list
  };

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-4xl font-bold mb-6">Groups</h1>
        <form onSubmit={handleCreateGroup} className="mb-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="DM"
              value={dm}
              onChange={(e) => setDm(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">Create Group</button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group) => (
            <div key={group.group_id} className="card bg-gray-700 p-4 rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">{group.group_name}</h2>
              <p className="mb-2"><strong>Description:</strong> {group.description}</p>
              <p className="mb-2"><strong>DM:</strong> {group.dm}</p>
              <Link href={`/groups/${group.group_id}`} className="btn btn-secondary">View Group</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}