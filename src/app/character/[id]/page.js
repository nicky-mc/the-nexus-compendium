// app/character/[id]/page.js
import { notFound } from "next/navigation";
import { db } from "@/app/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
// This component will be rendered server-side
export default async function CharacterSheet({ params }) {
  const id = (await params).id;
  const user = await currentUser();
  const username = user.username;
  let query;
  try {
    query = await db.query(`SELECT player_name FROM character WHERE ID = $1`, [id]);
  } catch {
    //
  }
  const characterOwner = query?.rows[0].player_name;
  if (!characterOwner) {
    return notFound(); // Renders a 404 page if character not found
  }
  if (characterOwner != username) {
    console.log("Bad");
    // todo Write logic to stop user from accessing stuff they aren't supposed to. If in this if statement then the username of user signed in and the username of the character's owner is not the same
  }
  const char_info = await db.query(
    `SELECT player_name, (info).char_name, (info).race, (info).class, (info).background, ((info).alignment).lawful, ((info).alignment).morality, (info).xp, (info).level FROM character WHERE id = $1`,
    [id]
  );
  const character = char_info.rows[0];
  console.log(`Info:`);
  console.log(character);
  const misc_info = await db.query(
    `SELECT (misc_info).sex, (misc_info).size, (misc_info).height, (misc_info).weight, (misc_info).speed, (misc_info).initiative, notes FROM character WHERE id = $1`,
    [id]
  );
  const parsedMisc = misc_info.rows[0];
  console.log(`Misc:`);
  console.log(parsedMisc);
  const stats = await db.query(
    `SELECT ac, profiecency_bonus, (stats).strength, (stats).dexterity, (stats).constitution, (stats).intelligence, (stats).wisdom, (stats).charisma FROM character WHERE id = $1`,
    [id]
  );
  const profs = await db.query(
    `SELECT (proficiencies).str, (proficiencies).dex, (proficiencies).con, (proficiencies).int, (proficiencies).wis, (proficiencies).cha FROM character WHERE id = $1`,
    [id]
  );
  const proficiencies = profs.rows[0];
  console.log("proficiencies:");
  console.log(proficiencies);
  const parsedStats = stats.rows[0];
  console.log(`Stats:`);
  console.log(parsedStats);
  const skills = await db.query(
    `SELECT 
((skills).acrobatics).modifier AS acrobatics_modifier, ((skills).acrobatics).proficiency AS acrobatics_prof,
((skills).animal_handling).modifier AS animal_handling_modifier, ((skills).animal_handling).proficiency AS animal_handling_prof,
((skills).arcana).modifier AS arcana_modifier, ((skills).arcana).proficiency AS arcana_prof,
((skills).athletics).modifier AS athletics_modifier, ((skills).athletics).proficiency AS athletics_prof,
((skills).deception).modifier AS deception_modifier, ((skills).deception).proficiency AS deception_prof,
((skills).history).modifier AS history_modifier, ((skills).history).proficiency AS history_prof,
((skills).insight).modifier AS insight_modifier, ((skills).insight).proficiency AS insight_prof,
((skills).intimidation).modifier AS intimidation_modifier, ((skills).intimidation).proficiency AS intimidation_prof,
((skills).investigation).modifier AS investigation_modifier, ((skills).investigation).proficiency AS investigation_prof,
((skills).medicine).modifier AS medicine_modifier, ((skills).medicine).proficiency AS medicine_prof,
((skills).nature).modifier AS nature_modifier, ((skills).nature).proficiency AS nature_prof,
((skills).perception).modifier AS perception_modifier, ((skills).perception).proficiency AS perception_prof,
((skills).performance).modifier AS performance_modifier, ((skills).performance).proficiency AS performance_prof,
((skills).persuasion).modifier AS persuasion_modifier, ((skills).persuasion).proficiency AS persuasion_prof,
((skills).religion).modifier AS religion_modifier, ((skills).religion).proficiency AS religion_prof,
((skills).slight_of_hand).modifier AS slight_of_hand_modifier, ((skills).slight_of_hand).proficiency AS slight_of_hand_prof,
((skills).stealth).modifier AS stealth_modifier, ((skills).stealth).proficiency AS stealth_prof,
((skills).survival).modifier AS survival_modifier, ((skills).survival).proficiency AS survival_prof
FROM character WHERE id = $1`,
    [id]
  );
  const parsedSkills = skills.rows[0];
  console.log(`Skills:`);
  console.log(parsedSkills);
  const inventory = await db.query(`SELECT inventory FROM character WHERE id = $1`, [id]);
  const parsedInventory = inventory.rows[0].inventory;
  console.log(`Inventory:`);
  console.log(parsedInventory);
  const hp = await db.query(`SELECT (hp).max_hp, (hp).current_hp, (hp).temp_hp  FROM character WHERE id = $1`, [id]);
  const parsedHp = hp.rows[0];
  console.log(`HP:`);
  console.log(parsedHp);
  const spells = await db.query(
    `SELECT (spell_slots).max_spell_level, (spell_slots).max_slots, (spell_slots).used_slots, (spell_slots).can_use_magic, spells FROM character WHERE id = $1`,
    [id]
  );
  const parsedSpells = spells.rows[0];
  console.log(`Spells:`);
  console.log(parsedSpells);
  const featuresQeury = await db.query(
    `SELECT languages, (features).race_and_subrace, (features).race_as_increase, (features).race_profiencies, (features).race_traits, (features).race_languages, (features).background_profiencies, (features).background_languages, (features).background_equipment, (features).traits, (features).ideals, (features).bonds, (features).flaws FROM character WHERE id = $1`,
    [id]
  );
  const features = featuresQeury.rows[0];
  console.log(`Features:`);
  console.log(features);

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md p-6">
        <header className="flex justify-between items-center border-b-2 border-gray-700 pb-4">
          <h1 className="text-4xl font-bold">{character.char_name}</h1>
          <form action={`/api/character/${id}/delete`} method="POST">
            <button type="submit" className="btn btn-error">
              Delete Character
            </button>
          </form>
        </header>

        <section className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-semibold">Player Info</h2>
              <p>
                <span className="font-bold">Player Name:</span> {character.player_name}
              </p>
              <p>
                <span className="font-bold">Class:</span> {character.class}
              </p>
              <p>
                <span className="font-bold">Race:</span> {character.race}
              </p>
              <p>
                <span className="font-bold">Background:</span> {character.background}
              </p>
              <p>
                <span className="font-bold">Alignment:</span> {character.lawful} {character.morality}
              </p>
              <p>
                <span className="font-bold">Level:</span> {character.level}
              </p>
              <p>
                <span className="font-bold">XP:</span> {character.xp}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Character Stats</h2>
              {Object.entries(parsedStats).map(([stat, value]) => (
                <p key={stat}>
                  <span className="font-bold capitalize">{stat}:</span> {value}
                </p>
              ))}
              <p>
                <span className="font-bold capitalize">Max HP:</span> {parsedHp.max_hp}
              </p>
              <p>
                <span className="font-bold capitalize">Current HP:</span> {parsedHp.current_hp}
              </p>
              <p>
                <span className="font-bold capitalize">Temp HP:</span> {parsedHp.temp_hp}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Abilities & Features</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold">Proficiencies:</h3>
              {/* Formatting needs touching up */}
              <ul className="list-disc list-inside">
                {Object.entries(proficiencies).map((prof, index) => (
                  <li key={index}>{prof.toString()}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold">Features:</h3>
              {/* Formatting needs touching up */}
              <ul className="list-disc list-inside">
                {Object.entries(features).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Inventory</h2>
          <ul className="list-disc list-inside">
            {parsedInventory.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {/* <section className="mt-6">
        conditional rendor to say "can not use magic" if they cant use magic, otherwise display info about the spells.
        manually render the spells (only use maps on spell.spells)
          <h2 className="text-xl font-semibold">Spells</h2>
          <ul className="list-disc list-inside">
            {Object.entries(spells).map((spell, index) => (
              <li key={index}>{spell}</li>
            ))}
          </ul>
        </section>
         */}
        {/* <section className="mt-6">
          <h2 className="text-xl font-semibold">Notes</h2>
          <p className="p-4 bg-gray-700 rounded-lg">{character.notes}</p>
          notes are found in misc_info.
        </section> */}
      </div>
    </div>
  );
}
