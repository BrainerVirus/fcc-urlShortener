import express from "express";
import cors from "cors";
import "./db/db.js";
import "dotenv/config";
import {
  createShortUrl,
  getShortUrl,
} from "./controllers/shortUrlController.js";
const app = express();

// Basic Configuration
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: false,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", createShortUrl);

app.get("/api/shorturl/:id", getShortUrl);

const port = 8080;
app.listen(process.env.PORT || port, function () {
  console.log(`Listening on port ${port}`);
});
