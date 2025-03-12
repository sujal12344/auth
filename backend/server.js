import express from "express";
import dotenv, { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path, { dirname } from "path";

// import { fileURLToPath } from "url";
// const __dirname = fileURLToPath(new URL  (".", import.meta.url));
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

app.listen(PORT, async () => {
  console.log(`Server is runs on http://localhost:${PORT}`);
});