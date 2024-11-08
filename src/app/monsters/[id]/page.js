import { notFound } from 'next/navigation';

async function fetchMonster(id) {
  const res = await fetch(`https://www.dnd5eapi.co/api/monsters/${id}`);
  if (!res.ok) {
    return null; // Return null if the monster is not found
  }
  return res.json();
}

export default async function MonsterDetailsPage({ params }) {
  const monster = await fetchMonster(params.id);

  if (!monster) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{monster.name}</h1>
      <p><strong>Type:</strong> {monster.type}</p>
      <p><strong>Hit Points:</strong> {monster.hit_points}</p>
      <p><strong>Challenge Rating:</strong> {monster.challenge_rating}</p>
      {/* Add more stats as needed */}
    </div>
  );
}
