import CreateCharacterForm from "@/app/components/CreateCharacterSandbox";

export default async function NewCharacterPage() {
  const user =
    await db.query`INSERT INTO test_one (player_name, info, misc_info, ac, profiecency_bonus, stats, proficiencies, skills, inventory, languages, features, hp, spell_slots, spells, notes) `;
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);
  console.log(user);
  return (
    <div className="p-8">
      <CreateCharacterForm />
    </div>
  );
}
// INSERT INTO character(player_name, info, misc_info, ac, profiecency_bonus, stats, proficiencies, skills, inventory, languages, features, hp, spell_slots, spells, notes)
// VALUES(
// 'test',
// ('Benedict','Human','Cleric','Acolyte','(Lawful,Good)'::ALIGNMENT_CHART,0,1) :: CHARACTER_INFO,
