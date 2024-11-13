--! Queries used to test stuff.

-- CREATE TABLE IF NOT EXISTS test(
--   id SERIAL PRIMARY KEY,
--   name TEXT,
--   alignment ALIGNMENT_CHART
-- );

-- -- INSERT INTO test(name, alignment) VALUES ('test', '(Good,Lawful)' :: ALIGNMENT_CHART)
-- INSERT INTO test(name, alignment) VALUES ('test 2', '(Neutral,Chaotic)' :: ALIGNMENT_CHART)
-- SELECT * FROM test
-- SELECT name, (alignment).lawful FROM test

-- DROP TABLE test
-- CREATE TABLE IF NOT EXISTS testtwo(
--   id SERIAL PRIMARY KEY,
--   test_skills SKILLS
-- );

-- CREATE TABLE IF NOT EXISTS test(
--   id SERIAL PRIMARY KEY,
--   username TEXT REFERENCES users (username),
--   info CHARACTER_INFO
-- );

-- INSERT INTO test(username, info) VALUES(
--   'test',
--   ('Benedict','Human','Cleric','Acolyte','(Lawful,Good)'::ALIGNMENT_CHART,1,1) :: CHARACTER_INFO
-- );

-- SELECT username, (info).xp FROM test


-- INSERT INTO testtwo(test_skills) VALUES(
--   ((-1,false)::SKILL_MODIFIER,
--   (3,false)::SKILL_MODIFIER,
--   (0,false)::SKILL_MODIFIER,
--   (2,false)::SKILL_MODIFIER,
--   (1,false)::SKILL_MODIFIER,
--   (2,true)::SKILL_MODIFIER,
--   (5,true)::SKILL_MODIFIER,
--   (-1,false)::SKILL_MODIFIER,
--   (0,false)::SKILL_MODIFIER,
--   (5,true)::SKILL_MODIFIER,
--   (0,false)::SKILL_MODIFIER,
--   (3,false)::SKILL_MODIFIER,
--   (1,false)::SKILL_MODIFIER,
--   (1,false)::SKILL_MODIFIER,
--   (2,true)::SKILL_MODIFIER,
--   (-1,false)::SKILL_MODIFIER,
--   (-1,false)::SKILL_MODIFIER,
--   (3,false)::SKILL_MODIFIER
--   ) :: SKILLS
-- );

-- SELECT ((test_skills).medicine).modifier, ((test_skills).medicine).proficiency FROM testtwo

-- DROP TABLE test_domain;
-- CREATE DOMAIN positive_int AS INT CHECK(VALUE >= 0);

-- CREATE TABLE IF NOT EXISTS test_domain(
--   id SERIAL PRIMARY KEY,
--   test NON_NEGATIVE_INT,
--   secondtest POSITIVE_INT
-- );

-- INSERT INTO test_domain(test, secondtest) VALUES(1,-1);

-- CREATE TABLE IF NOT EXISTS test_three(
--   id SERIAL PRIMARY KEY,
--   test_stats STATS
-- );

-- DROP TABLE TEST_THREE;

-- INSERT INTO test_three(test_stats)VALUES(
--   (0,0,0,0,0,0) :: STATS
-- )
-- DROP TABLE test_spells

-- CREATE TABLE IF NOT EXISTS test_spells(
--   id SERIAL PRIMARY KEY,
--   spell_slots SPELL_SLOTS,
--   spells SPELL[]
-- );

-- INSERT INTO test_spells(spell_slots, spells)VALUES(
--   (1,3,1,true) :: SPELL_SLOTS,
--   ARRAY[('bane',1,'enchantment','1 action','30 yards','V S M (a drop of blood)','1 minute','Up to three creatures of your choice that you can see within range must make Charisma saving throw. Whenever a target that fails this saving throw makes an attack roll or a saving throw before the spell ends, the target must roll a d4 and subtract the number rolled from the attack roll or saving throw.') :: SPELL, 
--   ('resistance',0,'abjuration','1 action','touch','V S M (A miniature cloak)','1 minute','You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one saving throw of its choice. It can roll the die before or after the saving throw. The spell then ends.') :: SPELL]
-- );
-- -- SELECT (spells[1]).description  FROM test_spells

-- INSERT INTO test_spells(spell_slots, spells) VALUES(((null,null,null,false):: SPELL_SLOTS), null);
-- CREATE TABLE TEST(
--   ID SERIAL PRIMARY KEY,
--   test MISC_INFO
-- );

INSERT INTO test(test) VALUES(
  ('M','M','5''8',146,30,-1) :: MISC_INFO
)

DROP TABLE test;
DROP TABLE test_domain;
DROP TABLE test_spells;
DROP TABLE testtwo;

-- CREATE TABLE IF NOT EXISTS test_one(
--   id SERIAL PRIMARY KEY,
--   player_name VARCHAR(255) references users(username),
--   info CHARACTER_INFO
-- );

INSERT INTO test_one(player_name, info)
VALUES(
  'test',
  ('Benedict','Human','Cleric','Acolyte','(Lawful,Good)'::ALIGNMENT_CHART,0,1) :: CHARACTER_INFO);