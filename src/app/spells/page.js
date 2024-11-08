import Link from 'next/link';

async function fetchSpells() {
  const res = await fetch('https://www.dnd5eapi.co/api/spells');
  if (!res.ok) {
    throw new Error('Failed to fetch spells');
  }
  return res.json();
}

export default async function SpellsPage() {
  const data = await fetchSpells();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Spell List</h1>
      <ul className="list-disc pl-5">
        {data.results.map((spell) => (
          <li key={spell.index} className="mb-2">
            <Link href={`/spells/${spell.index}`} className="text-blue-500 hover:underline">
              {spell.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
