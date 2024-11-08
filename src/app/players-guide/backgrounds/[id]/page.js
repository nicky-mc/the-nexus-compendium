import { notFound } from 'next/navigation';

async function fetchBackground(id) {
  const res = await fetch(`https://www.dnd5eapi.co/api/backgrounds/${id}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function BackgroundDetailsPage({ params }) {
  const background = await fetchBackground(params.id);

  if (!background) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{background.name}</h1>
      <p><strong>Starting Proficiencies:</strong></p>
      <ul className="list-disc pl-5">
        {background.starting_proficiencies.map((prof) => (
          <li key={prof.index}>{prof.name}</li>
        ))}
      </ul>
      <p><strong>Equipment:</strong> {background.starting_equipment.map((item) => item.equipment.name).join(', ')}</p>
    </div>
  );
}
