// page.js
import CreateCharacterForm from "@/app/components/CreateCharacter";
import { redirect } from "next/navigation";
import { db } from "@/app/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server"; // Correct import

export default async function NewCharacterPage() {
  // Fetch the current user
  const user = await currentUser();

  // If no user is found, redirect to the sign-in page
  if (!user) {
    redirect("/sign-in");
  }

  // Use clerk_id as the player_name
  const clerkId = user.id;
  const userName = user.username || clerkId;

  // Define the server action for saving the character
  async function saveCharacter(formData) {
    "use server";
    const user = await currentUser();
    const username = user.username;
    const characterData = {
      player_name: username, // Use clerk_id as the player_name
      info: {
        char_name: formData.get("char_name"), // Adjusted field name
        race: formData.get("race"),
        class: formData.get("class"),
        background: formData.get("background"),
        alignment: {
          lawful: formData.get("lawful"),
          morality: formData.get("morality"),
        },
        level: parseInt(formData.get("level"), 10) || 1,
        xp: parseInt(formData.get("xp"), 10) || 0,
      },
      misc_info: {
        sex: formData.get("sex") || "",
        size: formData.get("size") || "",
        height: formData.get("height") || "",
        weight: parseInt(formData.get("weight"), 10) || 0,
        speed: parseInt(formData.get("speed"), 10) || 0,
        initiative: parseInt(formData.get("initiative"), 10) || 0,
      },
      ac: parseInt(formData.get("ac"), 10) || 0, // Moved to top-level
      profiecency_bonus: parseInt(formData.get("proficiency_bonus"), 10) || 0, // Corrected spelling
      stats: {
        strength: parseInt(formData.get("strength"), 10) || 0,
        dexterity: parseInt(formData.get("dexterity"), 10) || 0,
        constitution: parseInt(formData.get("constitution"), 10) || 0,
        intelligence: parseInt(formData.get("intelligence"), 10) || 0,
        wisdom: parseInt(formData.get("wisdom"), 10) || 0,
        charisma: parseInt(formData.get("charisma"), 10) || 0,
      },
      proficiencies: {
        str: formData.get("prof_str") === "on",
        dex: formData.get("prof_dex") === "on",
        con: formData.get("prof_con") === "on",
        int: formData.get("prof_int") === "on",
        wis: formData.get("prof_wis") === "on",
        cha: formData.get("prof_cha") === "on",
      },
      skills: getSkillsFromFormData(formData), // Function to extract inventory
      inventory: formData.get("inventory")
        ? formData
            .get("inventory")
            .split(",")
            .map((item) => item.trim())
        : [],
      languages: formData.get("languages")
        ? formData
            .get("languages")
            .split(",")
            .map((lang) => lang.trim())
        : [],
      features: getFeaturesFromFormData(formData), // Function to extract features
      hp: {
        max_hp: parseInt(formData.get("max_hp"), 10) || 0,
        current_hp: parseInt(formData.get("current_hp"), 10) || 0,
        temp_hp: parseInt(formData.get("temp_hp"), 10) || 0,
      },
      spell_slots: {
        max_spell_level: parseInt(formData.get("max_spell_level"), 10) || 0,
        max_slots: parseInt(formData.get("max_slots"), 10) || 0,
        used_slots: parseInt(formData.get("used_slots"), 10) || 0,
        can_use_magic: formData.get("can_use_magic") === "on",
      },
      spells: formData.get("spells")
        ? formData
            .get("spells")
            .split(",")
            .map((spell) => spell.trim())
        : [],
      notes: formData.get("notes") || "",
    };

    // Function to extract skills from formData
    function getSkillsFromFormData(formData) {
      const skills = [
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

      const skillsData = {};
      skills.forEach((skill) => {
        skillsData[skill] = {
          modifier: parseInt(formData.get(`${skill}_modifier`), 10) || 0,
          proficiency: formData.get(`${skill}_proficiency`) === "on",
        };
      });
      return skillsData;
    }

    // Function to extract features from formData
    function getFeaturesFromFormData(formData) {
      return {
        race_and_subrace: formData.get("race_and_subrace") || "",
        race_as_increase: formData.get("race_as_increase") || "",
        race_profiencies: formData.get("race_profiencies") || "",
        race_traits: formData.get("race_traits") || "",
        race_languages: formData.get("race_languages") || "",
        background_profiencies: formData.get("background_profiencies") || "",
        background_languages: formData.get("background_languages") || "",
        background_equipment: formData.get("background_equipment") || "",
        traits: formData.get("traits") || "",
        ideals: formData.get("ideals") || "",
        bonds: formData.get("bonds") || "",
        flaws: formData.get("flaws") || "",
      };
    }

    try {
      // Corrected SQL query with PostgreSQL-style placeholders
      // console.log(characterData);
      // console.log("gap");
      // console.log(characterData.skills);
      // console.log(characterData.skills.acrobatics);
      // console.log(characterData.skills.acrobatics.modifier);
      // console.log(characterData.skills.acrobatics.proficiency);
      // console.log(characterData.info.alignment.lawful);
      // console.log(characterData.info.alignment.morality);
      // console.log(characterData.inventory);
      // console.log(characterData.languages);
      // console.log(characterData.spells);
      const query = `
        INSERT INTO character(player_name, info, misc_info, ac, profiecency_bonus, stats, proficiencies, skills, inventory, languages, features, hp, spell_slots, spells, notes)
VALUES(
  $1,
  ($2,$3,$4,$5,($6,$7)::ALIGNMENT_CHART,$8,$9) :: CHARACTER_INFO,
  ($10,$11,$12,$13,$14,$15) :: MISC_INFO,
  $16,
  $17,
  ($18,$19,$20,$21,$22,$23) :: STATS,
  ($24, $25, $26, $27, $28, $29) :: PROF_BONUS,
  (($30,$31)::SKILL_MODIFIER,
  ($32,$33)::SKILL_MODIFIER,
  ($34,$35)::SKILL_MODIFIER,
  ($36,$37)::SKILL_MODIFIER,
  ($38,$39)::SKILL_MODIFIER,
  ($40,$41)::SKILL_MODIFIER,
  ($42,$43)::SKILL_MODIFIER,
  ($44,$45)::SKILL_MODIFIER,
  ($46,$47)::SKILL_MODIFIER,
  ($48,$49)::SKILL_MODIFIER,
  ($50,$51)::SKILL_MODIFIER,
  ($52,$53)::SKILL_MODIFIER,
  ($54,$55)::SKILL_MODIFIER,
  ($56,$57)::SKILL_MODIFIER,
  ($58,$59)::SKILL_MODIFIER,
  ($60,$61)::SKILL_MODIFIER,
  ($62,$63)::SKILL_MODIFIER,
  ($64,$65)::SKILL_MODIFIER
  ) :: SKILLS,
  $66,
  $67,
  ($68,$69,$70,$71,$72,$73,$74,$75,$76,$77,$78,$79) :: FEATURES,
  ($80,$81,$82) :: HIT_POINTS,
  ($83,$84,$85,$86) :: SPELL_SLOTS,
  $87,
  $88
);
      `;
      const values = [
        characterData.player_name,
        characterData.info.char_name,
        characterData.info.race,
        characterData.info.class,
        characterData.info.background,
        characterData.info.alignment.lawful,
        characterData.info.alignment.morality,
        characterData.info.xp,
        characterData.info.level,
        characterData.misc_info.sex,
        characterData.misc_info.size,
        characterData.misc_info.height,
        characterData.misc_info.weight,
        characterData.misc_info.speed,
        characterData.misc_info.initiative,
        characterData.ac,
        characterData.profiecency_bonus,
        characterData.stats.strength,
        characterData.stats.dexterity,
        characterData.stats.constitution,
        characterData.stats.intelligence,
        characterData.stats.wisdom,
        characterData.stats.charisma,
        characterData.proficiencies.str,
        characterData.proficiencies.dex,
        characterData.proficiencies.con,
        characterData.proficiencies.int,
        characterData.proficiencies.wis,
        characterData.proficiencies.cha,
        characterData.skills.acrobatics.modifier,
        characterData.skills.acrobatics.proficiency,
        characterData.skills.animal_handling.modifier,
        characterData.skills.animal_handling.proficiency,
        characterData.skills.arcana.modifier,
        characterData.skills.arcana.proficiency,
        characterData.skills.athletics.modifier,
        characterData.skills.athletics.proficiency,
        characterData.skills.deception.modifier,
        characterData.skills.deception.proficiency,
        characterData.skills.history.modifier,
        characterData.skills.history.proficiency,
        characterData.skills.insight.modifier,
        characterData.skills.insight.proficiency,
        characterData.skills.intimidation.modifier,
        characterData.skills.intimidation.proficiency,
        characterData.skills.investigation.modifier,
        characterData.skills.investigation.proficiency,
        characterData.skills.medicine.modifier,
        characterData.skills.medicine.proficiency,
        characterData.skills.nature.modifier,
        characterData.skills.nature.proficiency,
        characterData.skills.perception.modifier,
        characterData.skills.perception.proficiency,
        characterData.skills.performance.modifier,
        characterData.skills.performance.proficiency,
        characterData.skills.persuasion.modifier,
        characterData.skills.persuasion.proficiency,
        characterData.skills.religion.modifier,
        characterData.skills.religion.proficiency,
        characterData.skills.sleight_of_hand.modifier,
        characterData.skills.sleight_of_hand.proficiency,
        characterData.skills.stealth.modifier,
        characterData.skills.stealth.proficiency,
        characterData.skills.survival.modifier,
        characterData.skills.survival.proficiency,
        characterData.inventory,
        characterData.languages,
        characterData.features.race_and_subrace,
        characterData.features.race_as_increase,
        characterData.features.race_profiencies,
        characterData.features.race_traits,
        characterData.features.race_languages,
        characterData.features.background_profiencies,
        characterData.features.background_languages,
        characterData.features.background_equipment,
        characterData.features.traits,
        characterData.features.ideals,
        characterData.features.bonds,
        characterData.features.flaws,
        characterData.hp.max_hp,
        characterData.hp.current_hp,
        characterData.hp.temp_hp,
        characterData.spell_slots.max_spell_level,
        characterData.spell_slots.max_slots,
        characterData.spell_slots.used_slots,
        characterData.spell_slots.can_use_magic,
        characterData.spells,
        characterData.notes,

        // JSON.stringify(characterData.info),
        // JSON.stringify(characterData.misc_info),
        // JSON.stringify(characterData.stats),
        // JSON.stringify(characterData.proficiencies),
        // JSON.stringify(characterData.skills),
        // JSON.stringify(characterData.inventory),
        // JSON.stringify(characterData.languages),
        // JSON.stringify(characterData.features),
        // JSON.stringify(characterData.hp),
        // JSON.stringify(characterData.spell_slots),
        // JSON.stringify(characterData.spells),
      ];

      await db.query(query, values);

      // Redirect after successful creation
      //! redirect("/characters"); causes some sort of error.
    } catch (error) {
      console.error("Error creating character:", error);
      // Handle errors as needed
    }
  }

  return (
    <div className="p-8">
      <CreateCharacterForm saveCharacter={saveCharacter} userName={userName} />
    </div>
  );
}
