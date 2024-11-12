"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Modal from '../../components/Modal';
import localData from '../../data/backgrounds_and_proficiencies.json';

const API_SECTIONS = {
  "ability-scores": "/api/ability-scores",
  "alignments": "/api/alignments",
  "backgrounds": "/api/backgrounds",
  "classes": "/api/classes",
  "conditions": "/api/conditions",
  "damage-types": "/api/damage-types",
  "equipment": "/api/equipment",
  "equipment-categories": "/api/equipment-categories",
  "feats": "/api/feats",
  "features": "/api/features",
  "languages": "/api/languages",
  "magic-items": "/api/magic-items",
  "magic-schools": "/api/magic-schools",
  "monsters": "/api/monsters",
  "proficiencies": "/api/proficiencies",
  "races": "/api/races",
  "rule-sections": "/api/rule-sections",
  "rules": "/api/rules",
  "skills": "/api/skills",
  "spells": "/api/spells",
  "subclasses": "/api/subclasses",
  "subraces": "/api/subraces",
  "traits": "/api/traits",
  "weapon-properties": "/api/weapon-properties",
};

export default function SectionPage() {
  const { section } = useParams();
  const [data, setData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [additionalModalData, setAdditionalModalData] = useState(null);
  const [isAdditionalModalOpen, setIsAdditionalModalOpen] = useState(false);

  useEffect(() => {
    if (section) {
      if (section === "backgrounds") {
        setData({ results: localData.backgrounds });
      } else {
        fetch(`https://www.dnd5eapi.co${API_SECTIONS[section]}`)
          .then((res) => res.json())
          .then((data) => setData(data));
      }
    }
  }, [section]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (section === "backgrounds") {
      setSelectedItemData(item);
      setIsModalOpen(true);
    } else {
      fetch(`https://www.dnd5eapi.co${item.url}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedItemData(data);
          setIsModalOpen(true);
        });
    }
  };

  const handleAdditionalItemClick = (url) => {
    fetch(`https://www.dnd5eapi.co${url}`)
      .then((res) => res.json())
      .then((data) => {
        setAdditionalModalData(data);
        setIsAdditionalModalOpen(true);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setSelectedItemData(null);
  };

  const closeAdditionalModal = () => {
    setIsAdditionalModalOpen(false);
    setAdditionalModalData(null);
  };

  const renderData = (key, value) => {
    if (key === 'url' || !value || (Array.isArray(value) && value.length === 0)) return null;

    if (Array.isArray(value)) {
      return (
        <div key={key} className="mb-4">
          <h3 className="text-lg font-semibold text-black capitalize">{key.replace(/_/g, ' ')}</h3>
          <ul className="list-disc list-inside text-black">
            {value.map((item, index) => (
              <li key={index}>
                {typeof item === 'object' ? renderData('', item) : item}
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (typeof value === 'object' && value !== null) {
      return (
        <div key={key} className="mb-4">
          <h3 className="text-lg font-semibold text-black capitalize">{key.replace(/_/g, ' ')}</h3>
          <div className="ml-4 text-black">
            {Object.entries(value).map(([subKey, subValue]) => renderData(subKey, subValue))}
          </div>
        </div>
      );
    } else {
      return (
        <div key={key} className="mb-2 text-black">
          <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span> {value}
        </div>
      );
    }
  };

  const renderAdditionalData = (key, value) => {
    if (key === 'url' || !value || (Array.isArray(value) && value.length === 0)) return null;

    if (Array.isArray(value)) {
      return (
        <div key={key} className="mb-4">
          <h3 className="text-lg font-semibold text-black capitalize">{key.replace(/_/g, ' ')}</h3>
          <ul className="list-disc list-inside text-black">
            {value.map((item, index) => (
              <li key={index}>
                {typeof item === 'object' ? (
                  item.url ? (
                    <button
                      onClick={() => handleAdditionalItemClick(item.url)}
                      className="text-blue-500 hover:underline"
                    >
                      {item.name}
                    </button>
                  ) : (
                    renderData('', item)
                  )
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (typeof value === 'object' && value !== null) {
      return (
        <div key={key} className="mb-4">
          <h3 className="text-lg font-semibold text-black capitalize">{key.replace(/_/g, ' ')}</h3>
          <div className="ml-4 text-black">
            {Object.entries(value).map(([subKey, subValue]) => renderAdditionalData(subKey, subValue))}
          </div>
        </div>
      );
    } else {
      return (
        <div key={key} className="mb-2 text-black">
          <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span> {value}
        </div>
      );
    }
  };

  useEffect(() => {
    if (selectedItemData) {
      if (selectedItemData.traits) {
        selectedItemData.traits.forEach((trait) => renderAdditionalData(trait.url));
      }
      if (selectedItemData.subraces) {
        selectedItemData.subraces.forEach((subrace) => renderAdditionalData(subrace.url));
      }
    }
  }, [selectedItemData]);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold capitalize">{section.replace(/-/g, ' ')}</h1>
        <div>
          <Link href="/" className="text-blue-500 hover:underline mr-4">Home</Link>
          <Link href="/compendium" className="text-blue-500 hover:underline">Compendium</Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.results.map((item) => (
          <div
            key={item.index || item.name}
            className="p-4 bg-yellow-100 border-4 border-yellow-600 rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            <h2 className="text-xl font-bold text-black">{item.name}</h2>
            {item.desc && <p className="mt-2 text-black">{item.desc}</p>}
          </div>
        ))}
      </div>
      {isModalOpen && selectedItemData && (
        <Modal onClose={closeModal}>
          <div className="p-4 bg-yellow-200 border-4 border-yellow-600 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-black">{selectedItemData.name}</h2>
            {selectedItemData.image && (
              <div className="mt-4">
                <img src={`https://www.dnd5eapi.co${selectedItemData.image}`} alt={selectedItemData.name} className="w-full h-auto rounded-lg shadow-md" />
              </div>
            )}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(selectedItemData).map(([key, value]) => (
                <div key={key} className="bg-white p-4 rounded-lg shadow-md">
                  {renderAdditionalData(key, value)}
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
      {isAdditionalModalOpen && additionalModalData && (
        <Modal onClose={closeAdditionalModal}>
          <div className="p-4 bg-yellow-200 border-4 border-yellow-600 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-black">{additionalModalData.name}</h2>
            {additionalModalData.image && (
              <div className="mt-4">
                <img src={`https://www.dnd5eapi.co${additionalModalData.image}`} alt={additionalModalData.name} className="w-full h-auto rounded-lg shadow-md" />
              </div>
            )}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(additionalModalData).map(([key, value]) => (
                <div key={key} className="bg-white p-4 rounded-lg shadow-md">
                  {renderAdditionalData(key, value)}
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}