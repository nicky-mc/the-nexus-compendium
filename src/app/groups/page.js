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
    <div>
      <h1>Groups</h1>
      <form onSubmit={handleCreateGroup}>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="DM"
          value={dm}
          onChange={(e) => setDm(e.target.value)}
        />
        <button type="submit">Create Group</button>
      </form>

      <ul>
        {groups.map((group) => (
          <li key={group.group_id}>
            <Link href={`/groups/${group.group_id}`}>{group.group_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
