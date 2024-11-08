import { notFound } from 'next/navigation';

async function fetchCondition(id) {
  const res = await fetch(`https://www.dnd5eapi.co/api/conditions/${id}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function ConditionDetailPage({ params }) {
  const condition = await fetchCondition(params.id);

  if (!condition) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{condition.name}</h1>

      {/* Handle both string and array descriptions */}
      {Array.isArray(condition.desc) ? (
        condition.desc.map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))
      ) : (
        <p>{condition.desc || 'No description available for this condition.'}</p>
      )}
    </div>
  );
}