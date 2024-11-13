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

    const characterData = {
      player_name: clerkId, // Use clerk_id as the player_name
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
      skills: getSkillsFromFormData(formData), // Function to extract skills
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
      const query = `
        INSERT INTO characters 
        (player_name, info, misc_info, ac, profiecency_bonus, stats, proficiencies, skills, inventory, languages, features, hp, spell_slots, spells, notes) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      `;
      const values = [
        characterData.player_name,
        JSON.stringify(characterData.info),
        JSON.stringify(characterData.misc_info),
        characterData.ac,
        characterData.profiecency_bonus,
        JSON.stringify(characterData.stats),
        JSON.stringify(characterData.proficiencies),
        JSON.stringify(characterData.skills),
        JSON.stringify(characterData.inventory),
        JSON.stringify(characterData.languages),
        JSON.stringify(characterData.features),
        JSON.stringify(characterData.hp),
        JSON.stringify(characterData.spell_slots),
        JSON.stringify(characterData.spells),
        characterData.notes,
      ];

      await db.query(query, values);

      // Redirect after successful creation
      redirect("/characters");
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
