require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const client = new MongoClient(process.env.MONGODB_URI);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

client.connect()
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.log(error));

app.get("/api/message", async function (req, res) {
    const database = client.db("mini_vercel_db");
    const collection = database.collection("messages");

    const message = await collection.findOne();

    res.json(message);
});

app.post("/api/message", async function (req, res) {
    const database = client.db("mini_vercel_db");
    const collection = database.collection("messages");

    await collection.updateOne(
        {},
        { $set: { message: req.body.message } }
    );

    res.json({ success: true });
});

app.listen(3000, function () {
    console.log("Server running on http://localhost:3000");
});