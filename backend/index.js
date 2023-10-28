const express = require('express');
const app = express();
const port = 3001;  // Choose a port that's not conflicting with your React app
const db = require('./db');
const cors = require('cors');
app.use(cors());



app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.post('/api/addRiddles', async (req, res) => {
    try {
        // Sample riddle data (Replace this with the actual data)
        const riddles = [
            {
                question: "I'm tall when I'm young and I'm short when I'm old. What am I?",
                answer: ['candle'],
                isSolved: false,
            },
            {
                question: "A zombie, a mummy, and a ghost bought a house. It has all of the usual rooms except for one. What room won't you find?",
                answer: ['living room', 'livingroom'],
                isSolved: false,
            },
            {
                question: "What do you call a witch at the beach?",
                answer: ['sandwich', 'sandwitch', 'sand witch', 'sand-witch'],
                isSolved: false,
            },
            {
                question: "What is a ghost's favorite dessert?",
                answer: ['i-scream', 'ice cream', 'i scream', 'ice-cream'],
                isSolved: false,
            },
            {
                question: "How do you fix a damaged jack-o-lantern?",
                answer: ['pumpkin patch', 'pumpkinpatch'],
                isSolved: false,
            },
            {
                question: "What is a mummy's favorite type of music?",
                answer: ['wrap', 'rap'],
                isSolved: false,
            },
            {
                question: "What do you get when you cross a snowman with a vampire?",
                answer: ['frostbite', 'frost bite'],
                isSolved: false,
            },
            {
                question: "The more you take away, the bigger I get. What am I?",
                answer: ['grave'],
                isSolved: false,
            },

        ]

        const insertedRiddles = [];
        for (const { question, answer, isSolved } of riddles) {
            const newRiddle = await db.query(
                "INSERT INTO riddles (question, answer, isSolved) VALUES ($1, $2, $3) RETURNING *",
                [question, answer, isSolved]
            );
            insertedRiddles.push(newRiddle.rows[0]);
        }

        res.json(insertedRiddles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.get('/api/riddles', async (req, res) => {
    try {
        const allRiddles = await db.query("SELECT * FROM riddles");
        res.json(allRiddles.rows);
    } catch (err) {
        console.error(err.message);
    }
});

