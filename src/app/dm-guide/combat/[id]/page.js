import { notFound } from 'next/navigation';

async function fetchSubsection(id) {
  const res = await fetch(`https://www.dnd5eapi.co/api/rule-sections/${id}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function SubsectionPage({ params }) {
  const subsection = await fetchSubsection(params.id);

  if (!subsection) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{subsection.name}</h1>

      {/* Handle both string and array descriptions */}
      {Array.isArray(subsection.desc) ? (
        subsection.desc.map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))
      ) : (
        <p>{subsection.desc || 'No description available for this subsection.'}</p>
      )}
    </div>
  );
}