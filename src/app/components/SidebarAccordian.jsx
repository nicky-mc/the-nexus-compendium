"use client";

import { useState, useEffect } from "react";
import { useCompendium } from "../context/CompendiumContext";
import localData from "../data/backgrounds_and_proficiencies.json"; // Import JSON

const API_SECTIONS = {
  races: "Races",
  subraces: "Subraces",
  classes: "Classes",
  subclasses: "Subclasses",
  spells: "Spells",
  monsters: "Monsters",
  equipment: "Equipment",
  backgrounds: "Backgrounds",
  features: "Features",
  traits: "Traits",
  conditions: "Conditions",
  "magic-items": "Magic Items",
  rules: "Rules",
  languages: "Languages",
  proficiencies: "Proficiencies" // New section
};

export default function FullSidebarAccordion() {
  const { showCompendium, setShowCompendium } = useCompendium();
  const [sections, setSections] = useState({});
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllSections = async () => {
      const results = {};
      for (const key of Object.keys(API_SECTIONS)) {
        if (key === "backgrounds") {
          results[key] = localData.backgrounds;
        } else {
          try {
            const res = await fetch(`https://www.dnd5eapi.co/api/${key}`);
            const data = await res.json();
            results[key] = data.results || [];
          } catch (error) {
            console.error(`Failed to fetch ${key}:`, error);
          }
        }
      }

      setSections(results);
    };

    fetchAllSections();
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const fetchItemDetails = async (section, index) => {
    if (section === "backgrounds") {
      const item = localData.backgrounds.find((bg) => bg.name.toLowerCase() === index.toLowerCase());
      setSelectedItem(item);
      setActiveAccordion(null);
      setShowModal(true);
    } else {
      try {
        const res = await fetch(`https://www.dnd5eapi.co/api/${section}/${index}`);
        const data = await res.json();

        if (data.subsections) {
          const subsectionData = await Promise.all(
            data.subsections.map(async (sub) => {
              const subRes = await fetch(`https://www.dnd5eapi.co${sub.url}`);
              return await subRes.json();
            })
          );
          data.subsections = subsectionData;
        }

        setSelectedItem(data);
        setActiveAccordion(null);
        setShowModal(true);
      } catch (error) {
        console.error(`Failed to fetch details for ${index}:`, error);
      }
    }
  };

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const filteredSections = (key) => {
    if (!sections[key]) return [];
    return sections[key].filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
  };

  const renderDetails = (item) => {
    if (!item) return <p>No additional details available.</p>;

    const detailSections = Object.entries(item).map(([key, value]) => {
      if (key === "url") return null; // Skip rendering the URL

      if (Array.isArray(value)) {
        return (
          <div key={key} className="mb-4">
            <strong className="capitalize">{key.replace(/_/g, " ")}:</strong>
            <ul className="list-disc pl-5">
              {value.map((subValue, idx) => (
                <li key={`${key}-${idx}`}>
                  {typeof subValue === "object" ? renderObject(subValue) : subValue}
                </li>
              ))}
            </ul>
          </div>
        );
      } else if (typeof value === "object" && value !== null) {
        return (
          <div key={key} className="mb-4">
            <strong className="capitalize">{key.replace(/_/g, " ")}:</strong>
            {renderObject(value)}
          </div>
        );
      } else {
        return (
          <p key={key} className="mb-2">
            <strong className="capitalize">{key.replace(/_/g, " ")}:</strong> {value.toString()}
          </p>
        );
      }
    });

    return <>{detailSections}</>;
  };

  const renderObject = (obj) => {
    return (
      <ul className="list-disc pl-5">
        {Object.entries(obj).map(([key, value], idx) => {
          if (key === "url") return null; // Skip rendering the URL

          return (
            <li key={`${key}-${idx}`}>
              <strong>{key.replace(/_/g, " ")}:</strong>{" "}
              {typeof value === "object" && value !== null ? renderObject(value) : value.toString()}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <button
        onClick={() => {
          setShowCompendium(!showCompendium);
        }}
        className={`fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 ${
          showCompendium ? "hidden" : ""
        }`}
      >
        Open Companion
      </button>

      <aside
        className={`fixed right-0 top-16 h-full bg-gray-800 text-white p-4 overflow-y-auto w-80 transition-transform ${
          showCompendium ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Nexus Compendium Companion</h2>
          <button
            onClick={() => setShowCompendium(false)}
            className="text-white bg-gray-600 hover:bg-gray-500 rounded-full p-2"
          >
            ✕
          </button>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-black p-2 rounded mb-4"
        />
        <ul className="space-y-2">
          {Object.entries(API_SECTIONS).map(([key, label]) => (
            <li key={key}>
              <button
                onClick={() => toggleSection(key)}
                className="w-full text-left text-blue-400 hover:underline font-semibold"
              >
                {label}
              </button>
              {expandedSection === key && (
                <ul className="ml-4 mt-2 space-y-1">
                  {filteredSections(key)?.map((item) => (
                    <li key={item.index || item.name}>
                      <button
                        onClick={() => fetchItemDetails(key, item.index || item.name)}
                        className="text-blue-300 hover:underline"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-[url('/parchment-texture.jpeg')] text-black rounded-lg p-6 w-[80%] max-w-3xl max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-black bg-gray-200 hover:bg-gray-400 rounded-full p-2"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold mb-4">{selectedItem.name}</h2>
            {selectedItem.image && (
              <div className="mb-4">
                <img
                  src={`https://www.dnd5eapi.co${selectedItem.image}`}
                  alt={selectedItem.name}
                  className="rounded shadow"
                />
              </div>
            )}
            {selectedItem.subsections && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Subsections:</h3>
                <ul>
                  {selectedItem.subsections.map((sub, idx) => (
                    <li key={idx}>
                      <button
                        className="w-full text-left font-semibold text-blue-400 hover:underline mb-2"
                        onClick={() => toggleAccordion(sub.name)}
                      >
                        {sub.name}
                      </button>
                      {activeAccordion === sub.name && (
                        <div className="ml-4 p-2 bg-gray-100 rounded shadow">
                          <p>{sub.desc || "No description available."}</p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="prose">
              {renderDetails(selectedItem)}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}