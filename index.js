const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000

//Midlleware
app.use(cors());
app.use(express.json())

//Client conection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wntpe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('Hello World!')
});

async function run() {
    try {
        await client.connect();

        const database = client.db('volunteerNetwork');
        const eventCollection = database.collection('events');

        //Add data to databse
        const events = [
            { title: 'Child Support', image: 'https://ibb.co/cYyDw04' },
            { title: 'Refuge Shelter', image: 'https://ibb.co/9w3BXNX' },
            { title: 'Food Charity', image: 'https://ibb.co/XX6LMqT' },
            { title: 'Host a clothing swap', image: 'https://ibb.co/PTjcBNT' },
            { title: 'Host a river clean-up', image: 'https://ibb.co/h8d6J3v' },
            { title: 'clean water for children', image: 'https://ibb.co/cYpF3DV' },
            { title: 'Good education', image: 'https://ibb.co/8m3fdsr' },
            { title: 'New books for children', image: 'https://ibb.co/dbp9Qxq' },
            { title: 'Host a study group', image: 'https://ibb.co/Bc6y1bV' },
            { title: 'Build bird house for your neighbors', image: 'https://ibb.co/djv730L' },
            { title: 'Organize books at the library', image: 'https://ibb.co/LJR1hCq' },
            { title: 'Give a seminer on driveing safety', image: 'https://ibb.co/vDMnVww' },
            { title: 'Give free music lessons', image: 'https://ibb.co/gT7qMyx' },
            { title: 'Teach people how to register to vote', image: 'https://ibb.co/ZfGTNfP' },
            { title: 'Clean up your local park', image: 'https://ibb.co/Pt6VvSN' },
            { title: 'Give IT help to local students', image: 'https://ibb.co/dc7znSX' },
            { title: 'Foster a shelter animal', image: 'https://ibb.co/SyKkvrv' },
            { title: 'Babysit during a PTA meetings', image: 'https://ibb.co/YjsWZQJ' },
            { title: 'Collect stuffed animals', image: 'https://ibb.co/fd1N8dF' },
            { title: 'Collect school supplies', image: 'https://ibb.co/QjxJSfP' },
        ];

        const result = await eventCollection.insertMany(events)

        console.log(`${result.insertedCount} documents were inserted`)

        //Send data
        app.get('/events', async (req, res) => {
            const cursor = eventCollection.find({})
            const events = await cursor.toArray();
            res.send(events);
        })

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir)
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})