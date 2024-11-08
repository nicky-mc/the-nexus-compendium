import Link from 'next/link';

async function fetchBackgrounds() {
  const res = await fetch('https://www.dnd5eapi.co/api/backgrounds');
  if (!res.ok) {
    throw new Error('Failed to fetch backgrounds');
  }
  return res.json();
}

export default async function BackgroundsPage() {
  const data = await fetchBackgrounds();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Backgrounds</h1>
      <ul className="list-disc pl-5">
        {data.results.map((background) => (
          <li key={background.index} className="mb-2">
            <Link href={`/players-guide/backgrounds/${background.index}`} className="text-blue-500 hover:underline">
              {background.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
