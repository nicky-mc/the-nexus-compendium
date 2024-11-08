import Link from 'next/link'; // Import Link from next/link
import { notFound } from 'next/navigation'; // For 404 handling

async function fetchRule(id) {
  const res = await fetch(`https://www.dnd5eapi.co/api/rules/${id}`);
  if (!res.ok) {
    return null; // Return null if rule not found
  }
  return res.json();
}

export default async function RuleDetailsPage({ params }) {
  // Destructure params to get rule ID
  const rule = await fetchRule(params.id);

  if (!rule) {
    notFound(); // Show 404 page if rule doesn't exist
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{rule.name}</h1>
      {Array.isArray(rule.desc) ? (
        rule.desc.map((section, index) => (
          <p key={index} className="mb-4">{section}</p>
        ))
      ) : (
        <p>{rule.desc || "No description available for this rule."}</p>
      )}

      {rule.subsections?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-3">Subsections</h2>
          <ul className="list-disc pl-5">
            {rule.subsections.map((subsection) => (
              <li key={subsection.index}>
                <Link href={`/rules/sections/${subsection.index}`} className="text-blue-500 hover:underline">
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
