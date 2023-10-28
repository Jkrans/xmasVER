CREATE TABLE riddles (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT[] NOT NULL,
  isSolved BOOLEAN NOT NULL
);
