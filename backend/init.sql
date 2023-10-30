CREATE TABLE riddles (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT[] NOT NULL,
  isSolved BOOLEAN NOT NULL
);

CREATE TABLE stories (
  story_id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  story JSONB NOT NULL
);
