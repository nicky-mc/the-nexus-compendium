import Link from 'next/link';

async function fetchRaces() {
  const res = await fetch('https://www.dnd5eapi.co/api/races');
  if (!res.ok) {
    throw new Error('Failed to fetch races');
  }
  return res.json();
}

export default async function RacesPage() {
  const data = await fetchRaces();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Races</h1>
      <ul className="list-disc pl-5">
        {data.results.map((race) => (
          <li key={race.index} className="mb-2">
            <Link href={`/players-guide/races/${race.index}`} className="text-blue-500 hover:underline">
              {race.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
