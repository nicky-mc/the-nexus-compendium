-- ! get everything
SELECT * FROM character WHERE id = 1


-- ! get player info
SELECT player_name, (info).char_name, (info).race, (info).class, (info).background, ((info).alignment).lawful, ((info).alignment).morality, (info).xp, (info).level FROM character WHERE id = 1

-- ! get misc info
SELECT (misc_info).sex, (misc_info).size, (misc_info).height, (misc_info).weight, (misc_info).speed, (misc_info).initiative, notes FROM character WHERE id = 1

-- ! get stats
SELECT ac, profiecency_bonus, (stats).strength, (stats).dexterity, (stats).constitution, (stats).intelligence, (stats).wisdom, (stats).charisma, (proficiencies).str, (proficiencies).dex, (proficiencies).con, (proficiencies).int, (proficiencies).wis, (proficiencies).cha FROM character WHERE id = 1


-- ! get skills
SELECT 
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
FROM character WHERE id = 1

-- ! get inventory
SELECT inventory FROM character WHERE id = 1

-- ! get features
SELECT languages, (features).race_and_subrace, (features).race_as_increase, (features).race_profiencies, (features).race_traits, (features).race_languages, (features).background_profiencies, (features).background_languages, (features).background_equipment, (features).traits, (features).ideals, (features).bonds, (features).flaws FROM character WHERE id = 1

-- ! get hp
SELECT (hp).max_hp, (hp).current_hp, (hp).temp_hp  FROM character WHERE id = 1

-- ! get spells
SELECT (spell_slots).max_spell_level, (spell_slots).max_slots, (spell_slots).used_slots, (spell_slots).can_use_magic, spells  FROM character WHERE id = 1


