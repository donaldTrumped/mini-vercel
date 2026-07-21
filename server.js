require("dotenv").config();
console.log(process.env.MONGODB_URI);

const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

const client = new MongoClient(process.env.MONGODB_URI);

async function connectDB() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
    }
}

app.use(express.static(__dirname));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/message", async function (req, res) {
    await connectDB();

    const database = client.db("mini_vercel_db");
    const collection = database.collection("messages");

    const message = await collection.findOne();

    res.json(message);
});

app.listen(3000, function () {
    console.log("Server running on http://localhost:3000");
});