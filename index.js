const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x4r9eu9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();

        const database = client.db("loyaltyBookings");
        const bookingCollection = database.collection("booking");

        const countrydatabase = client.db("loyaltyCountry");
        const countryCollection = countrydatabase.collection("country");

        const eventsdatabase = client.db("loyaltyEvents");
        const eventsCollection = eventsdatabase.collection("events");

        // GET API FOR BOOKINGS
        app.get('/bookings', async (req, res) => {
            const cursor = bookingCollection.find({})
            const allBookings = await cursor.toArray();
            res.send(allBookings);
        })
        // GET API FOR COUNTRY
        app.get('/country', async (req, res) => {
            const cursor = countryCollection.find({})
            const allBookings = await cursor.toArray();
            res.send(allBookings);
        })
        // GET API FOR Event
        app.get('/events', async (req, res) => {
            const cursor = eventsCollection.find({})
            const allBookings = await cursor.toArray();
            res.send(allBookings);
        })
        // POST API FOR BOOKINGS
        app.post('/bookings', async (req, res) => {
            const bookings = req.body
            const result = await bookingCollection.insertOne(bookings);
            res.json(result)
            console.log(result)
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
        })
        // POST API FOR COUNTRY
        app.post('/country', async (req, res) => {
            const bookings = req.body
            const result = await countryCollection.insertOne(bookings);
            res.json(result)
            console.log(result)
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
        })
        // POST API FOR events
        app.post('/events', async (req, res) => {
            const bookings = req.body
            const result = await eventsCollection.insertOne(bookings);
            res.json(result)
            console.log(result)
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
        })
        // DELETE Bookings
        app.delete('/bookings/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await bookingCollection.deleteOne(query);
            console.log("delete", id)
            res.json(result)
        })
        // DELETE Events
        app.delete('/events/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await eventsCollection.deleteOne(query);
            console.log("delete", id)
            res.json(result)
        })
        // DELETE country
        app.delete('/country/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await countryCollection.deleteOne(query);
            console.log("delete", id)
            res.json(result)
        })




    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.listen(port, () => {
    console.log(`Listening on port`, port);
})