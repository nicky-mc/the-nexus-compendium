import Link from 'next/link';

async function fetchClasses() {
  const res = await fetch('https://www.dnd5eapi.co/api/classes');
  if (!res.ok) {
    throw new Error('Failed to fetch classes');
  }
  return res.json();
}

export default async function ClassesPage() {
  const data = await fetchClasses();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Classes</h1>
      <ul className="list-disc pl-5">
        {data.results.map((cls) => (
          <li key={cls.index} className="mb-2">
            <Link href={`/players-guide/classes/${cls.index}`} className="text-blue-500 hover:underline">
              {cls.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
