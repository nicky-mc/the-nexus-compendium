import Link from 'next/link';

async function fetchMonsters() {
  const res = await fetch('https://www.dnd5eapi.co/api/monsters');
  if (!res.ok) {
    throw new Error('Failed to fetch monsters');
  }
  return res.json();
}

export default async function MonstersPage() {
  const data = await fetchMonsters();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Monster Manual</h1>
      <ul className="list-disc pl-5">
        {data.results.map((monster) => (
          <li key={monster.index} className="mb-2">
            <Link href={`/monsters/${monster.index}`} className="text-blue-500 hover:underline">
              {monster.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
