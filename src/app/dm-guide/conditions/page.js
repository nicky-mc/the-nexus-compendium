import Link from 'next/link';

async function fetchConditions() {
  const res = await fetch('https://www.dnd5eapi.co/api/conditions');
  if (!res.ok) {
    throw new Error('Failed to fetch conditions');
  }
  return res.json();
}

export default async function ConditionsPage() {
  const conditions = await fetchConditions();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Conditions</h1>
      <ul className="list-disc pl-5">
        {conditions.results.map((condition) => (
          <li key={condition.index} className="mb-2">
            <Link href={`/dm-guide/conditions/${condition.index}`} className="text-blue-500 hover:underline">
              {condition.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}