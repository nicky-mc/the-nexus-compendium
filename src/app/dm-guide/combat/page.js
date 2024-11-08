import Link from 'next/link';

async function fetchCombatRules() {
  const res = await fetch('https://www.dnd5eapi.co/api/rules/combat');
  if (!res.ok) {
    throw new Error('Failed to fetch combat rules');
  }
  return res.json();
}

export default async function CombatRulesPage() {
  const combat = await fetchCombatRules();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{combat.name}</h1>

      {/* Render description */}
      <p className="mb-4">{combat.desc || 'No description available for combat rules.'}</p>

      {/* Render subsections */}
      {combat.subsections?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-3">Subsections</h2>
          <ul className="list-disc pl-5">
            {combat.subsections.map((subsection) => (
              <li key={subsection.index} className="mb-2">
                <Link href={`/dm-guide/combat/${subsection.index}`} className="text-blue-500 hover:underline">
                  {subsection.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}