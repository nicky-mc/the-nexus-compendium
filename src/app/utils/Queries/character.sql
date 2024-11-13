--! When I need to change something that is being used in the character table.
-- DROP TABLE character

--! create character table
CREATE TABLE IF NOT EXISTS character(
  id SERIAL PRIMARY KEY,
  player_name TEXT REFERENCES users (username),
  info CHARACTER_INFO,
  misc_info MISC_INFO,
  ac INT,
  profiecency_bonus POSITIVE_INT,
  stats STATS,
  proficiencies PROF_BONUS,
  skills SKILLS,
  inventory text[],
  languages VARCHAR(255)[],
  features FEATURES,
  hp HIT_POINTS,
  spell_slots SPELL_SLOTS,
  spells varchar[],
  notes TEXT
);

--! seed dummy data to test if the character table functions correctly
INSERT INTO character(player_name, info, misc_info, ac, profiecency_bonus, stats, proficiencies, skills, inventory, languages, features, hp, spell_slots, spells, notes)
VALUES(
  'test',
  ('Benedict','Human','Cleric','Acolyte','(Lawful,Good)'::ALIGNMENT_CHART,0,1) :: CHARACTER_INFO,
  ('M','M','5''8',146,30,-1) :: MISC_INFO,
  18,
  2,
  (15,9,14,11,16,13) :: STATS,
  (false, false, false, false, true, true) :: PROF_BONUS,
  ((-1,false)::SKILL_MODIFIER,
  (3,false)::SKILL_MODIFIER,
  (0,false)::SKILL_MODIFIER,
  (2,false)::SKILL_MODIFIER,
  (1,false)::SKILL_MODIFIER,
  (2,true)::SKILL_MODIFIER,
  (5,true)::SKILL_MODIFIER,
  (-1,false)::SKILL_MODIFIER,
  (0,false)::SKILL_MODIFIER,
  (5,true)::SKILL_MODIFIER,
  (0,false)::SKILL_MODIFIER,
  (3,false)::SKILL_MODIFIER,
  (1,false)::SKILL_MODIFIER,
  (1,false)::SKILL_MODIFIER,
  (2,true)::SKILL_MODIFIER,
  (-1,false)::SKILL_MODIFIER,
  (-1,false)::SKILL_MODIFIER,
  (3,false)::SKILL_MODIFIER
  ) :: SKILLS,
  -- name, type, quantity, description, weight.
  ARRAY['mace (x1)', 'light crossbow (x1)', 'bolts (x20)', 'holy symbol (x1)', 'common clothes (x1)', 'belt pouch (x1)', 'backpack (x1)', 'blanket (x1)', 'candles (x10)', 'tinderbox (x1)', 'alms box (x1)', 'blocks of incense (x5)', 'censer (x1)', 'vestments (x1)', 'waterskin (x5)'],
  ARRAY['Common','Elvish','Dwarvish','Gnomish'],
  ('','+1 to each','none','Speed + 30', 'Common  + one' ,'insight, religion','two of your choice','holy symbol, prayer book','see omens in every event','Charity','Everything I do is for the common people','I am inflexible in my thinking') :: FEATURES,
  (10,10,0) :: HIT_POINTS,
  (1,3,3,true) :: SPELL_SLOTS,
  ARRAY['bane', 'sacred flame', 'sanctuary'],
  'Interesting notes about this character.'
);
