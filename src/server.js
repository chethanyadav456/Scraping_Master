import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dbConnect from "./db/dbConnect.js";
import NEWS from "./db/models/NEWS.model.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await dbConnect();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  try {
    const articles = await NEWS.find({});
    res.render("index", { articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).send("Error fetching articles.");
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
