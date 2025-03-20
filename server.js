import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static frontend files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serving static files from 'public' folder
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath))

// Serving index.html when accessing "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

// Start server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));