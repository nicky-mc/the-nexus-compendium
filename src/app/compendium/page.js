import Link from 'next/link';

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

export default function CompendiumPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">D&D 5e Compendium</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(API_SECTIONS).map((key) => (
          <Link href={`/compendium/${key}`} key={key} legacyBehavior>
            <a className="block p-4 bg-yellow-100 border-4 border-yellow-600 rounded-lg shadow-lg hover:bg-yellow-200">
              <h2 className="text-xl font-bold text-yellow-800 capitalize">{key.replace(/-/g, ' ')}</h2>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}