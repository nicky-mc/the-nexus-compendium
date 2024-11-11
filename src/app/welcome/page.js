import { currentUser } from "@clerk/nextjs/server";
import { db } from "../utils/dbconnection";
import Link from "next/link";
import Image from "next/image";

export default async function LandingPage() {
  const user = await currentUser();
  const username = user.username;
  const userID = user.id;
  const query = await db.query(`SELECT clerk_id FROM users WHERE clerk_id = $1`, [userID]);
  const queryResult = query.rows[0]?.clerk_id;
  if (!queryResult) {
    await db.query(`INSERT INTO users(clerk_id, username) VALUES($1, $2)`, [userID, username]);
  }

  return (
    <div className="min-h-screen bg-[url('/parchment-texture.jpeg')] bg-cover text-black flex flex-col items-center justify-center p-4">
      <header className="flex flex-col items-center mb-8">
        <Image src="/d20.jpeg" alt="D&D Logo" width={100} height={100} priority />
        <h1 className="text-4xl font-bold text-yellow-500 mt-4">Welcome to The Nexus</h1>
      </header>
      <main className="text-center">
        <p className="text-xl mb-4">Your ultimate D&D companion app.</p>
        <p className="text-lg mb-4">Hi, {username}!</p>
        <Link href={`/userProfile/${username}`}>
          <span className="text-blue-500 hover:text-blue-700 underline">Go edit your profile</span>
        </Link>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <p className="mb-4">
            Create your character and store all their details in our comprehensive compendium. 
            You can easily recall any stored characters and their information at any time.
          </p>
          <p className="mb-4">
            The compendium includes everything you need to manage your D&D adventures, from character stats to spell lists and equipment.
          </p>
          <p className="mb-4">
            Start by creating a new character or exploring the compendium to see what it has to offer.
          </p>
        </div>
      </main>
    </div>
  );
}