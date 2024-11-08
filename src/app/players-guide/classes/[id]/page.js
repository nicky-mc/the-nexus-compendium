import { notFound } from 'next/navigation';

async function fetchClass(id) {
  const res = await fetch(`https://www.dnd5eapi.co/api/classes/${id}`);
  if (!res.ok) {
    return null; // Return null if the class is not found
  }
  return res.json();
}

export default async function ClassDetailsPage({ params }) {
  const cls = await fetchClass(params.id);

  if (!cls) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{cls.name}</h1>
      <p><strong>Hit Die:</strong> {cls.hit_die}</p>
      <p><strong>Primary Abilities:</strong> {cls.saving_throws.map((st) => st.name).join(', ')}</p>
      <p><strong>Proficiencies:</strong></p>
      <ul className="list-disc pl-5">
        {cls.proficiencies.map((prof) => (
          <li key={prof.index}>{prof.name}</li>
        ))}
      </ul>
    </div>
  );
}
