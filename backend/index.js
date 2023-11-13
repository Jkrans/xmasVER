const express = require('express');
const app = express();
const port = process.env.PORT || 3001;  // Use environment variable if available
const db = require('./db');
const cors = require('cors');
app.use(cors());

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
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

// riddles for ChallengeFour component
app.get('/api/riddles', async (req, res) => {
    try {
        const allRiddles = await db.query("SELECT * FROM riddles");
        res.json(allRiddles.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// riddles for ChallengeTwo component
app.get('/api/ch2riddles', async (req, res) => {
    try {
        const allRiddles = await db.query("SELECT * FROM ch2riddles");
        res.json(allRiddles.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/api/addStories', async (req, res) => {
    try {
        const stories = [
            {
                title: "The Enclosure",
                story: [
                    "As you strut around your enclosure, you overhear the farmer chatting with his family. \"This one's gotten nice and plump,\" he points right at you, \"I reckon they’ll be the star of our Thanksgiving table!\" Panic surges through your feathers; it's clear you're slated to be the main course. You've got to make a plan and fast.",
                    "Your eyes dart to the gate of your enclosure. It's locked with a peculiar mechanism featuring a set of icons: a corn cob, a pumpkin, green beans, mashed potatoes, and a pie. Next to the lock, a sign reads, \"Enter the coded values for the image to unlock.\" Below that there are more instructions that state \"The code will reset each day for security purposes by the farmer. If you need to get out, you can solve the equations below.\"",
                    "You smirk to yourself. They clearly underestimated this \"Bird Brain\" when they devised this \"turkey-proof plan.\" They'll soon find out just how clever a turkey can be. It's time to hatch your plan and fly the coop."
                ]
            }
        ];

        const insertedStories = [];
        for (const { title, story } of stories) {
            const newStory = await db.query(
                "INSERT INTO stories (title, story) VALUES ($1, $2) RETURNING *",
                [title, JSON.stringify(story)]
            );
            insertedStories.push(newStory.rows[0]);
        }

        res.json(insertedStories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


app.get('/api/stories/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const storyQuery = await db.query('SELECT * FROM stories WHERE story_id = $1', [id]);
        const storyData = storyQuery.rows[0];

        if (!storyData) {
            return res.status(404).json({ error: 'Story not found' });
        }

        res.json(storyData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/riddles/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const riddleQuery = await db.query('SELECT * FROM riddles WHERE id = $1', [id]);
        const riddleData = riddleQuery.rows[0];

        if (!riddleData) {
            return res.status(404).json({ error: 'Riddle not found' });
        }

        res.json(riddleData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



