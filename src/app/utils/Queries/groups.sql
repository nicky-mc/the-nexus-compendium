CREATE TABLE IF NOT EXISTS groups(
  group_id SERIAL PRIMARY KEY,
  DM TEXT REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS player_group_junction(
  group_id INT REFERENCES groups(group_id),
  player TEXT REFERENCES users(username)
);