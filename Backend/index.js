const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

class Channel {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.messages = [];
  }
}

class Message {
  constructor(content, author) {
    this.content = content;
    this.author = author;
  }
}

let channels = [new Channel(0, "default channel")];

app.get("/messages/:id", (req, res) => {
  const { id } = req.params;
  const channel = channels.find((c) => c.id == id);

  if (!channel) {
    return res.status(404).send("Channel not found");
  }

  res.status(200).send(channel.messages);
});

app.get("/save", (req, res) => {
  //fs.writeFileSync("./data.json", JSON.stringify(channels, null, 2), "utf-8");
  const db = new sqlite3.Database("./data.db");
  print("Saving data to database");

  db.serialize(() => {
    db.run(
      "CREATE TABLE IF NOT EXISTS channels (id INTEGER PRIMARY KEY, name TEXT)"
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, content TEXT, author TEXT, channelId INTEGER, FOREIGN KEY(channelId) REFERENCES channels(id))"
    );

    db.run("DELETE FROM messages");
    db.run("DELETE FROM channels");

    channels.forEach((channel) => {
      db.run("INSERT INTO channels (id, name) VALUES (?, ?)", [
        channel.id,
        channel.name,
      ]);
      channel.messages.forEach((message) => {
        db.run(
          "INSERT INTO messages (content, author, channelId) VALUES (?, ?, ?)",
          [message.content, message.author, channel.id]
        );
      });
    });
  });
  res.status(200).send("Data saved");
});

app.get("/load", (req, res) => {
  const db = new sqlite3.Database("./data.db");

  console.log("Loading data from database");

  db.serialize(() => {
    db.all("SELECT * FROM channels", (err, channelRows) => {
      if (err) {
        console.error("Failed to load channels:", err);
        return res.status(500).send("Failed to load channels");
      }

      channels = channelRows.map((row) => new Channel(row.id, row.name));

      db.all("SELECT * FROM messages", (err, messageRows) => {
        if (err) {
          console.error("Failed to load messages:", err);
          return res.status(500).send("Failed to load messages");
        }

        messageRows.forEach((row) => {
          const channel = channels.find((c) => c.id == row.channelId);
          if (channel) {
            channel.messages.push(new Message(row.content, row.author));
          }
        });

        console.log("Data loaded successfully");
        db.close();
        return res.status(200).send("Data loaded");
      });
    });
  });
});

app.get("/channels", (req, res) => {
  res.status(200).send(channels);
});

app.post("/createChannel", (req, res) => {
  const { channelName } = req.body;

  if (!channelName) {
    return res.status(400).send("Missing channel name");
  }

  channels.push(new Channel(channels.length, channelName));
  res.status(201).send("Channel created");
});

app.delete("/deleteChannel/:id", (req, res) => {
  const { id } = req.params;
  const channelIndex = channels.findIndex((c) => c.id == id);

  if (channelIndex === -1) {
    return res.status(404).send("Channel not found");
  }

  channels.splice(channelIndex, 1);
  res.status(200).send("Channel deleted");
});

app.post("/sendMessage", (req, res) => {
  const { author, content, channelId } = req.body;

  if (!author || !content || !channelId) {
    return res.status(400).send("Missing author, content, or channelId");
  }

  const channel = channels.find((c) => c.id == Number(channelId));

  if (!channel) {
    return res.status(404).send("Channel not found");
  }

  channel.messages.push(new Message(content, author));
  res.status(200).send("Message sent");
  console.log(
    `Message sent by ${author} on channel ${channelId}: "${content}"`
  );
});
