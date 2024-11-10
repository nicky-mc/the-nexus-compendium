"use client";

export default function MonsterViewer({ monsterData }) {
  const renderAbility = (ability) => (
    <div key={ability.name} className="mb-4">
      <h3 className="text-xl font-bold">{ability.name}</h3>
      <p>{ability.desc}</p>
    </div>
  );

  const renderAction = (action) => (
    <div key={action.name} className="mb-4">
      <h3 className="text-lg font-semibold">{action.name}</h3>
      <p>{action.desc}</p>
      {action.damage && (
        <p>
          <strong>Damage:</strong>{" "}
          {action.damage.map((dmg, idx) => (
            <span key={idx}>
              {dmg.damage_dice} {dmg.damage_type.name}
              {idx < action.damage.length - 1 && ", "}
            </span>
          ))}
        </p>
      )}
    </div>
  );

  const renderLegendaryAction = (legendaryAction) => (
    <div key={legendaryAction.name} className="mb-4">
      <h3 className="text-lg font-semibold">{legendaryAction.name}</h3>
      <p>{legendaryAction.desc}</p>
    </div>
  );

  const renderProficiencies = () =>
    monsterData.proficiencies?.map((prof, idx) => (
      <span key={idx}>
        {prof.proficiency.name}: +{prof.value}
        {idx < monsterData.proficiencies.length - 1 && ", "}
      </span>
    ));

  const getImageUrl = () => {
    // Dynamically resolve the image URL based on the API structure
    return `https://www.dnd5eapi.co${monsterData.image}`;
  };

  return (
    <div className="p-6 bg-[url('/parchment-texture.jpeg')] bg-cover bg-center text-black rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{monsterData.name}</h1>

      {monsterData.image && (
        <img
          src={getImageUrl()}
          alt={`${monsterData.name} illustration`}
          className="w-full h-auto rounded mb-6"
        />
      )}

      <p>
        <strong>Type:</strong> {monsterData.type} ({monsterData.alignment})
      </p>
      <p>
        <strong>Armor Class:</strong>{" "}
        {monsterData.armor_class.map((ac, idx) => (
          <span key={idx}>
            {ac.value} {ac.type}
            {idx < monsterData.armor_class.length - 1 && ", "}
          </span>
        ))}
      </p>
      <p>
        <strong>Hit Points:</strong> {monsterData.hit_points} (
        {monsterData.hit_dice})
      </p>
      <p>
        <strong>Speed:</strong>{" "}
        {Object.entries(monsterData.speed)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ")}
      </p>
      <p>
        <strong>Proficiencies:</strong> {renderProficiencies()}
      </p>
      <p>
        <strong>Senses:</strong>{" "}
        {Object.entries(monsterData.senses)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ")}
      </p>
      <p>
        <strong>Languages:</strong> {monsterData.languages || "None"}
      </p>
      <p>
        <strong>Challenge Rating:</strong> {monsterData.challenge_rating} (
        XP: {monsterData.xp})
      </p>

      {/* Special Abilities */}
      {monsterData.special_abilities?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Special Abilities</h2>
          {monsterData.special_abilities.map(renderAbility)}
        </div>
      )}

      {/* Actions */}
      {monsterData.actions?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Actions</h2>
          {monsterData.actions.map(renderAction)}
        </div>
      )}

      {/* Legendary Actions */}
      {monsterData.legendary_actions?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Legendary Actions</h2>
          {monsterData.legendary_actions.map(renderLegendaryAction)}
        </div>
      )}
    </div>
  );
}
