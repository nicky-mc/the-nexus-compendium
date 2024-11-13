// components/CreateCharacter.js
"use client";

import { useTransition } from "react";

export default function CreateCharacterForm({ saveCharacter, userName }) {
  const [isPending, startTransition] = useTransition();

  // List of skills
  const skillsList = [
    "acrobatics",
    "animal_handling",
    "arcana",
    "athletics",
    "deception",
    "history",
    "insight",
    "intimidation",
    "investigation",
    "medicine",
    "nature",
    "perception",
    "performance",
    "persuasion",
    "religion",
    "sleight_of_hand",
    "stealth",
    "survival",
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        startTransition(() => {
          saveCharacter(formData);
        });
      }}
      className="space-y-8 p-8 bg-gray-800 text-white rounded-lg shadow-lg"
    >
      <h2 className="text-3xl font-bold">Create a New Character</h2>

      {/* Player Name (Read-only) */}
      <div className="form-control">
        <label htmlFor="player_name" className="label">
          <span className="label-text text-lg">Player Name:</span>
        </label>
        <input
          type="text"
          name="player_name"
          id="player_name"
          className="input input-bordered w-full"
          value={userName}
          readOnly
        />
      </div>

      {/* Character Name */}
      <div className="form-control">
        <label htmlFor="char_name" className="label">
          <span className="label-text text-lg">Character Name:</span>
        </label>
        <input
          type="text"
          name="char_name"
          id="char_name"
          className="input input-bordered w-full"
          required
        />
      </div>

      {/* Race and Class */}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-control">
          <label htmlFor="race" className="label">
            <span className="label-text text-lg">Race:</span>
          </label>
          <input
            type="text"
            name="race"
            id="race"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="class" className="label">
            <span className="label-text text-lg">Class:</span>
          </label>
          <input
            type="text"
            name="class"
            id="class"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* Background and Alignment */}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-control">
          <label htmlFor="background" className="label">
            <span className="label-text text-lg">Background:</span>
          </label>
          <input
            type="text"
            name="background"
            id="background"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="morality" className="label">
            <span className="label-text text-lg">Morality:</span>
          </label>
          <select
            name="morality"
            id="morality"
            className="select select-bordered w-full"
          >
            <option value="Good">Good</option>
            <option value="Neutral">Neutral</option>
            <option value="Evil">Evil</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="lawful" className="label">
            <span className="label-text text-lg">Lawfulness:</span>
          </label>
          <select
            name="lawful"
            id="lawful"
            className="select select-bordered w-full"
          >
            <option value="Lawful">Lawful</option>
            <option value="Neutral">Neutral</option>
            <option value="Chaotic">Chaotic</option>
          </select>
        </div>
      </div>

      {/* Level and XP */}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-control">
          <label htmlFor="level" className="label">
            <span className="label-text text-lg">Level:</span>
          </label>
          <input
            type="number"
            name="level"
            id="level"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="xp" className="label">
            <span className="label-text text-lg">XP:</span>
          </label>
          <input
            type="number"
            name="xp"
            id="xp"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* Misc Info */}
      <div className="grid grid-cols-3 gap-4">
        <div className="form-control">
          <label htmlFor="sex" className="label">
            <span className="label-text text-lg">Sex:</span>
          </label>
          <input
            type="text"
            name="sex"
            id="sex"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="size" className="label">
            <span className="label-text text-lg">Size:</span>
          </label>
          <input
            type="text"
            name="size"
            id="size"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="height" className="label">
            <span className="label-text text-lg">Height:</span>
          </label>
          <input
            type="text"
            name="height"
            id="height"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="form-control">
          <label htmlFor="weight" className="label">
            <span className="label-text text-lg">Weight:</span>
          </label>
          <input
            type="number"
            name="weight"
            id="weight"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="speed" className="label">
            <span className="label-text text-lg">Speed:</span>
          </label>
          <input
            type="number"
            name="speed"
            id="speed"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="initiative" className="label">
            <span className="label-text text-lg">Initiative:</span>
          </label>
          <input
            type="number"
            name="initiative"
            id="initiative"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* Armor Class and Proficiency Bonus */}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-control">
          <label htmlFor="ac" className="label">
            <span className="label-text text-lg">Armor Class (AC):</span>
          </label>
          <input
            type="number"
            name="ac"
            id="ac"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="proficiency_bonus" className="label">
            <span className="label-text text-lg">Proficiency Bonus:</span>
          </label>
          <input
            type="number"
            name="proficiency_bonus"
            id="proficiency_bonus"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"].map(
          (stat) => (
            <div key={stat} className="form-control">
              <label htmlFor={stat} className="label">
                <span className="label-text text-lg capitalize">{stat}:</span>
              </label>
              <input
                type="number"
                name={stat}
                id={stat}
                className="input input-bordered w-full"
                required
              />
            </div>
          )
        )}
      </div>

      {/* Proficiencies */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Proficiencies:</span>
        </label>
        <div className="grid grid-cols-6 gap-4">
          {["str", "dex", "con", "int", "wis", "cha"].map((attr) => (
            <label key={attr} className="flex items-center space-x-2">
              <input type="checkbox" name={`prof_${attr}`} />
              <span className="capitalize">{attr}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Skills:</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          {skillsList.map((skill) => (
            <div key={skill} className="flex items-center space-x-2">
              <label className="flex items-center space-x-2 w-full">
                <input type="checkbox" name={`${skill}_proficiency`} />
                <span className="capitalize">{skill.replace("_", " ")}</span>
                <input
                  type="number"
                  name={`${skill}_modifier`}
                  placeholder="Modifier"
                  className="input input-bordered w-20"
                />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Hit Points */}
      <div className="grid grid-cols-3 gap-4">
        <div className="form-control">
          <label htmlFor="max_hp" className="label">
            <span className="label-text text-lg">Maximum HP:</span>
          </label>
          <input
            type="number"
            name="max_hp"
            id="max_hp"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="current_hp" className="label">
            <span className="label-text text-lg">Current HP:</span>
          </label>
          <input
            type="number"
            name="current_hp"
            id="current_hp"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="temp_hp" className="label">
            <span className="label-text text-lg">Temporary HP:</span>
          </label>
          <input
            type="number"
            name="temp_hp"
            id="temp_hp"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* Inventory */}
      <div className="form-control">
        <label htmlFor="inventory" className="label">
          <span className="label-text text-lg">Inventory (comma-separated):</span>
        </label>
        <textarea
          name="inventory"
          id="inventory"
          className="textarea textarea-bordered w-full"
        />
      </div>

      {/* Languages */}
      <div className="form-control">
        <label htmlFor="languages" className="label">
          <span className="label-text text-lg">Languages (comma-separated):</span>
        </label>
        <textarea
          name="languages"
          id="languages"
          className="textarea textarea-bordered w-full"
        />
      </div>

      {/* Features */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Features:</span>
        </label>
        {/* You can adjust these fields based on your specific needs */}
        {[
          "race_and_subrace",
          "race_as_increase",
          "race_profiencies",
          "race_traits",
          "race_languages",
          "background_profiencies",
          "background_languages",
          "background_equipment",
          "traits",
          "ideals",
          "bonds",
          "flaws",
        ].map((feature) => (
          <div key={feature} className="form-control">
            <label htmlFor={feature} className="label">
              <span className="label-text text-lg capitalize">
                {feature.replace("_", " ")}:
              </span>
            </label>
            <textarea
              name={feature}
              id={feature}
              className="textarea textarea-bordered w-full"
            />
          </div>
        ))}
      </div>

      {/* Spell Slots */}
      <div className="grid grid-cols-4 gap-4">
        <div className="form-control">
          <label htmlFor="max_spell_level" className="label">
            <span className="label-text text-lg">Max Spell Level:</span>
          </label>
          <input
            type="number"
            name="max_spell_level"
            id="max_spell_level"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="max_slots" className="label">
            <span className="label-text text-lg">Max Slots:</span>
          </label>
          <input
            type="number"
            name="max_slots"
            id="max_slots"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="used_slots" className="label">
            <span className="label-text text-lg">Used Slots:</span>
          </label>
          <input
            type="number"
            name="used_slots"
            id="used_slots"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control flex items-center space-x-2">
          <label htmlFor="can_use_magic" className="label">
            <span className="label-text text-lg">Can Use Magic:</span>
          </label>
          <input
            type="checkbox"
            name="can_use_magic"
            id="can_use_magic"
            className="checkbox"
          />
        </div>
      </div>

      {/* Spells */}
      <div className="form-control">
        <label htmlFor="spells" className="label">
          <span className="label-text text-lg">Spells (comma-separated):</span>
        </label>
        <textarea
          name="spells"
          id="spells"
          className="textarea textarea-bordered w-full"
        />
      </div>

      {/* Notes */}
      <div className="form-control">
        <label htmlFor="notes" className="label">
          <span className="label-text text-lg">Notes:</span>
        </label>
        <textarea
          name="notes"
          id="notes"
          className="textarea textarea-bordered w-full"
        />
      </div>

      {/* Submit Button */}
      <div className="form-control mt-4">
        <button
          className="btn btn-success w-full"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Character"}
        </button>
      </div>
    </form>
  );
}
