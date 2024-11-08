// app/rules/page.js
import Link from 'next/link';

async function fetchRules() {
  const res = await fetch('https://www.dnd5eapi.co/api/rules');
  if (!res.ok) {
    throw new Error('Failed to fetch rules');
  }
  return res.json();
}

export default async function RulesPage() {
  const data = await fetchRules();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">D&D 5e Rules Guide</h1>
      <ul className="list-disc pl-5">
        {data.results.map((rule) => (
          <li key={rule.index} className="mb-2">
            <Link href={`/rules/${rule.index}`} className="text-blue-500 hover:underline">
              {rule.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
