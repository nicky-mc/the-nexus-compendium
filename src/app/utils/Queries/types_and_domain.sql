--! Due to the nature of experimentation many of these new features, many of these features have been changed or unused in the final design.

CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  clerk_id TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL
);

-- CREATE DOMAIN morality_axis AS VARCHAR(10) NOT NULL CHECK(VALUE in ('Good', 'Neutral', 'Evil'));
-- CREATE DOMAIN law_axis AS VARCHAR(10) NOT NULL CHECK(VALUE in ('Lawful', 'Neutral', 'Chaotic'));


-- CREATE DOMAIN required_varchar AS VARCHAR(255) NOT NULL;
-- CREATE DOMAIN non_negative_int AS INT NOT NULL CHECK(VALUE >= 0);
-- DROP DOMAIN levels CASCADE;

-- CREATE DOMAIN levels AS NON_NEGATIVE_INT CHECK(VALUE <= 20 AND VALUE > 0);

-- DROP TYPE alignment_chart CASCADE
CREATE TYPE alignment_chart AS(
  lawful TEXT,
  morality TEXT
);

-- DROP TYPE character_info

CREATE TYPE character_info AS (
char_name REQUIRED_VARCHAR,
race REQUIRED_VARCHAR,
class REQUIRED_VARCHAR,
background REQUIRED_VARCHAR,
alignment ALIGNMENT_CHART,
xp POSITIVE_INT,--TYPE GOT CHANGED LATER
level POSITIVE_INT--TPYE GOT CHANGED LATER
);

-- CREATE TYPE  misc_info AS(
--   sex VARCHAR(1),
--   size VARCHAR(1),
--   height VARCHAR(10),
--   weight POSITIVE_INT,
--   speed POSITIVE_INT,
--   initiative INT
-- )


-- CREATE TYPE stats AS (
-- strength NON_NEGATIVE_INT,
-- dexterity NON_NEGATIVE_INT,
-- constitution NON_NEGATIVE_INT,
-- intelligence NON_NEGATIVE_INT,
-- wisdom NON_NEGATIVE_INT,
-- charisma NON_NEGATIVE_INT
-- );



-- ALTER TYPE stats ALTER ATTRIBUTE strength SET DATA TYPE POSITIVE_INT;
-- ALTER TYPE stats ALTER ATTRIBUTE dexterity SET DATA TYPE POSITIVE_INT;
-- ALTER TYPE stats ALTER ATTRIBUTE constitution SET DATA TYPE POSITIVE_INT;
-- ALTER TYPE stats ALTER ATTRIBUTE intelligence SET DATA TYPE POSITIVE_INT;
-- ALTER TYPE stats ALTER ATTRIBUTE wisdom SET DATA TYPE POSITIVE_INT;
-- ALTER TYPE stats ALTER ATTRIBUTE charisma SET DATA TYPE POSITIVE_INT;


-- CREATE DOMAIN default_false_bool AS BOOLEAN DEFAULT FALSE;
-- CREATE DOMAIN stats_acronym AS VARCHAR(3) NOT NULL CHECK(VALUE IN ('STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'));
DROP TYPE prof_bonus
CREATE TYPE prof_bonus AS (
str BOOLEAN,
dex BOOLEAN,
con BOOLEAN,
int BOOLEAN,
wis BOOLEAN,
cha BOOLEAN
);


-- CREATE DOMAIN required_text AS TEXT NOT NULL;
-- CREATE DOMAIN default_one AS INT DEFAULT 1;
-- CREATE DOMAIN required_decimal AS DECIMAL(5,2) NOT NULL CHECK(VALUE >= 0);

-- CREATE TYPE items AS (
--   item_name REQUIRED_VARCHAR,
--   item_type REQUIRED_VARCHAR,
--   quantity DEFAULT_ONE,
--   description REQUIRED_TEXT,
--   weight REQUIRED_DECIMAL
-- );

-- CREATE TYPE attacks AS (--may delete)
--   attack_name REQUIRED_VARCHAR,
--   attack_bonus NON_NEGATIVE_INT,--if not delete, set to positive int
--   damage REQUIRED_VARCHAR,
--   damage_type REQUIRED_VARCHAR
-- );

CREATE TYPE features AS (
  race_and_subrace TEXT,
  race_as_increase TEXT,
  race_profiencies TEXT,
  race_traits TEXT,
  race_languages TEXT,
  background_profiencies TEXT,
  background_languages TEXT,
  background_equipment TEXT,
  traits TEXT,
  ideals TEXT,
  bonds TEXT,
  flaws TEXT
);

-- CREATE DOMAIN default_zero_int AS NON_NEGATIVE_INT DEFAULT 0;
-- CREATE DOMAIN level AS LEVELS DEFAULT 1;

-- CREATE TYPE hit_points AS (
--   max_hp NON_NEGATIVE_INT,
--   current_hp NON_NEGATIVE_INT,
--   temp_hp DEFAULT_ZERO_INT
-- );
-- ALTER TYPE hit_points ALTER ATTRIBUTE max_hp SET DATA TYPE POSITIVE_INT;
-- ALTER TYPE hit_points ALTER ATTRIBUTE current_hp SET DATA TYPE POSITIVE_INT;
-- ALTER TYPE hit_points ALTER ATTRIBUTE temp_hp SET DATA TYPE POSITIVE_INT;

-- ALTER TYPE character_info ALTER ATTRIBUTE level SET DATA TYPE LEVEL;
-- ALTER TYPE character_info ALTER ATTRIBUTE xp SET DATA TYPE POSITIVE_INT;
-- CREATE DOMAIN spell_level_range AS INT NOT NULL CHECK(VALUE > 0 AND VALUE < 10);


-- CREATE TYPE spell_slots AS (
--   max_spell_level SPELL_LEVEL_RANGE,
--   max_slots DEFAULT_ZERO_INT,
--   used_slots DEFAULT_ZERO_INT
-- );

-- ALTER TYPE spell_slots ADD ATTRIBUTE can_use_magic BOOLEAN;
-- ALTER TYPE spell_slots ALTER ATTRIBUTE max_slots SET DATA TYPE POSITIVE_INT;
-- ALTER TYPE spell_slots ALTER ATTRIBUTE max_spell_level SET DATA TYPE POSITIVE_INT
-- ALTER TYPE spell_slots ALTER ATTRIBUTE used_slots SET DATA TYPE POSITIVE_INT;
-- CREATE DOMAIN spell_level_ranges AS INT CHECK(VALUE >= 0 AND VALUE <= 9);--probably unused.

-- CREATE TYPE spell AS (
--   spell_name REQUIRED_VARCHAR,
--   spell_level SPELL_LEVEL,
--   school REQUIRED_VARCHAR,
--   casting_time REQUIRED_VARCHAR,
--   range REQUIRED_VARCHAR,
--   components REQUIRED_TEXT,
--   duration REQUIRED_VARCHAR,
--   description REQUIRED_TEXT
-- );

-- ALTER TYPE spell ALTER ATTRIBUTE spell_level SET DATA TYPE POSITIVE_INT;




CREATE TYPE skills AS (
  skill_name REQUIRED_VARCHAR,
  proficiency DEFAULT_FALSE_BOOL,
  ability_modifier PROF_BONUS
);

ALTER TYPE skills DROP ATTRIBUTE skill_name; 
ALTER TYPE skills DROP ATTRIBUTE proficiency; 
ALTER TYPE skills DROP ATTRIBUTE ability_modifier; 

CREATE TYPE skill_modifier AS (
  modifier REQUIRED_INT,
  proficiency DEFAULT_FALSE_BOOL
);

ALTER TYPE skills ADD ATTRIBUTE acrobatics SKILL_MODIFIER;
ALTER TYPE skills ADD ATTRIBUTE animal_handling SKILL_MODIFIER;
ALTER TYPE skills ADD ATTRIBUTE arcana SKILL_MODIFIER;
ALTER TYPE skills ADD ATTRIBUTE athletics SKILL_MODIFIER;
ALTER TYPE skills ADD ATTRIBUTE deception SKILL_MODIFIER;
ALTER TYPE skills ADD ATTRIBUTE history SKILL_MODIFIER;
ALTER TYPE skills ADD ATTRIBUTE insight SKILL_MODIFIER;
ALTER TYPE skills ADD ATTRIBUTE intimidation SKILL_MODIFIER;
ALTER TYPE skills ADD ATTRIBUTE investigation SKILL_MODIFIER;
ALTER TYPE skills ADD ATTRIBUTE medicine SKILL_MODIFIER;
ALTER TYPE skills ADD ATTRIBUTE nature SKILL_MODIFIER;
ALTER TYPE skills ADD ATTRIBUTE perception SKILL_MODIFIER;
ALTER TYPE skills ADD ATTRIBUTE performance SKILL_MODIFIER;
ALTER TYPE skills ADD ATTRIBUTE persuasion SKILL_MODIFIER;
ALTER TYPE skills ADD ATTRIBUTE religion SKILL_MODIFIER;
ALTER TYPE skills ADD ATTRIBUTE slight_of_hand SKILL_MODIFIER;
ALTER TYPE skills ADD ATTRIBUTE stealth SKILL_MODIFIER;
ALTER TYPE skills ADD ATTRIBUTE survival SKILL_MODIFIER;

-- ALTER TYPE saving_throws ALTER ATTRIBUTE str SET DATA TYPE skill_modifier;
-- ALTER TYPE saving_throws ALTER ATTRIBUTE dex SET DATA TYPE skill_modifier;
-- ALTER TYPE saving_throws ALTER ATTRIBUTE con SET DATA TYPE skill_modifier;
-- ALTER TYPE saving_throws ALTER ATTRIBUTE int SET DATA TYPE skill_modifier;
-- ALTER TYPE saving_throws ALTER ATTRIBUTE wis SET DATA TYPE skill_modifier;
-- ALTER TYPE saving_throws ALTER ATTRIBUTE cha SET DATA TYPE skill_modifier;

-- ALTER TYPE attacks ALTER ATTRIBUTE attack_bonus SET DATA TYPE int;

-- DROP TABLE TEST

-- - CREATE DOMAIN required_int AS INT NOT NULL;
-- 
