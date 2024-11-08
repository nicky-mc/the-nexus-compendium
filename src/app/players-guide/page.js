import Link from 'next/link';

export default function PlayersGuidePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Player's Guide</h1>
      <p>Learn about classes, races, and backgrounds.</p>
      <ul className="list-disc pl-5">
        <li>
          <Link href="/players-guide/classes" className="text-blue-500 hover:underline">
            Classes
          </Link>
        </li>
        <li>
          <Link href="/players-guide/races" className="text-blue-500 hover:underline">
            Races
          </Link>
        </li>
        <li>
          <Link href="/players-guide/backgrounds" className="text-blue-500 hover:underline">
            Backgrounds
          </Link>
        </li>
      </ul>
    </div>
  );
}
