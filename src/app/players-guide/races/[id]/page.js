import { notFound } from 'next/navigation';

async function fetchRace(id) {
  const res = await fetch(`https://www.dnd5eapi.co/api/races/${id}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function RaceDetailsPage({ params }) {
  const race = await fetchRace(params.id);

  if (!race) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">{race.name}</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">General Information</h2>
        <p className="mb-2">
          <strong>Speed:</strong> {race.speed} ft.
        </p>
        <p className="mb-2">
          <strong>Size:</strong> {race.size}
        </p>
        <p>
          <strong>Alignment:</strong> {race.alignment}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ability Bonuses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {race.ability_bonuses.map((bonus) => (
            <div
              key={bonus.ability_score.index}
              className="p-4 border rounded shadow-sm bg-black text-white"
            >
              <strong>{bonus.ability_score.name}</strong>: +{bonus.bonus}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Languages</h2>
        <p className="mb-2">
          <strong>Languages Known:</strong>{" "}
          {race.languages.map((lang) => lang.name).join(", ")}
        </p>
        <p>
          <strong>Description:</strong> {race.language_desc}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Age and Size Description</h2>
        <p className="mb-4">
          <strong>Age:</strong> {race.age}
        </p>
        <p>
          <strong>Size Description:</strong> {race.size_description}
        </p>
      </section>
    </div>
  );
}
