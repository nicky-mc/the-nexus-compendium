import { notFound } from 'next/navigation';

async function fetchSpell(id) {
  const res = await fetch(`https://www.dnd5eapi.co/api/spells/${id}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function SpellDetailsPage({ params }) {
  const spell = await fetchSpell(params.id);

  if (!spell) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{spell.name}</h1>
      <p><strong>Level:</strong> {spell.level}</p>
      <p><strong>School:</strong> {spell.school.name}</p>
      <p><strong>Description:</strong></p>
      {spell.desc.map((line, index) => (
        <p key={index} className="mb-4">{line}</p>
      ))}
    </div>
  );
}
