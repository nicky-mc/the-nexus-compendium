"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GlobalDiceRoller from "./components/GlobalDiceRoller";

export default function Home() {
  const [showCompendium, setShowCompendium] = useState(false);
  const [filter, setFilter] = useState("");

  const userGroups = [
    { name: "Games for Kids", description: "Family-friendly adventures." },
    { name: "Over 18s", description: "Mature content and themes." },
    { name: "DMs Seeking New Players", description: "Welcoming new adventurers." },
    { name: "DMs Seeking Experienced Players", description: "For veterans of the game." },
    { name: "Short Campaigns", description: "Quick, focused adventures." },
    { name: "Long Campaigns", description: "Epic, ongoing quests." },
    { name: "Thematic Horror Games", description: "Spooky, spine-chilling campaigns." },
    { name: "High Fantasy Epics", description: "Classic, grand fantasy." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[url('/parchment-texture.jpeg')] bg-cover bg-center text-[#F4ECE4]">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-[#5A352A] shadow-lg">
        <div className="flex items-center gap-4">
          <Image
            src="/d20.jpeg"
            alt="Dungeons & Dragons Logo"
            width={80}
            height={80}
            priority
          />
          <h1 className="text-3xl font-bold text-[#FFD700]">D&D Nexus</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-[#B22222] text-center">
            Community Groups
          </h2>
          <input
            type="text"
            placeholder="Filter groups..."
            className="input input-bordered w-full mb-6 bg-[#5A352A] text-white placeholder-yellow-200 border-yellow-500 focus:border-red-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {userGroups
              .filter((group) =>
                group.name.toLowerCase().includes(filter.toLowerCase())
              )
              .map((group, index) => (
                <li key={index} className="text-center">
                  <div className="p-6 rounded-lg shadow-lg bg-[#5A352A] hover:bg-[#7A4A3B] text-[#F4ECE4] transition">
                    <h3 className="font-bold text-lg">{group.name}</h3>
                    <p className="text-sm">{group.description}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </main>

      {/* Show Compendium Button */}
      <button
        className="fixed bottom-4 right-20 z-50 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        onClick={() => setShowCompendium(!showCompendium)}
      >
        {showCompendium ? "Hide Compendium" : "Show Compendium"}
      </button>

      {showCompendium && (
        <nav className="fixed bottom-16 right-20 z-50 bg-[#5A352A] rounded-lg shadow-lg p-4">
          <ul>
            <li>
              <Link href="/compendium" legacyBehavior>
                <a className="block px-4 py-2 hover:bg-[#7A4A3B] text-[#FFD700] transition">
                  Compendium →
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {/* Compendium Link Button */}
      <div className="fixed bottom-4 left-4">
        <Link href="/compendium" legacyBehavior>
          <a className="p-2 bg-yellow-600 text-white rounded-full shadow-lg hover:bg-yellow-700">
            Go to Compendium
          </a>
        </Link>
      </div>

      {/* Footer */}
      <footer className="w-full flex gap-6 flex-wrap items-center justify-center p-6 bg-[#5A352A]">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-[#F59E0B]"
          href="https://dnd.wizards.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Official D&D Site
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-[#F59E0B]"
          href="https://dndbeyond.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="D&D Beyond"
            width={16}
            height={16}
          />
          D&D Beyond
        </a>
      </footer>

      <GlobalDiceRoller />
    </div>
  );
}