import CreateCharacterForm from "@/app/components/CreateCharacter";

export default async function NewCharacterPage() {
  
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
