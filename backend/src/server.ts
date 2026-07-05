import express from "express";
import cors from "cors";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const catalog = JSON.parse(readFileSync(join(__dirname, "data/catalog.json"), "utf-8"));

const app = express();
app.use(cors());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/catalog", (_req, res) => {
  res.json(catalog);
});

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
