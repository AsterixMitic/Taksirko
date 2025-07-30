import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { sequelize } from "./repository/db";
import { Putnik } from "./models/Putnik";
import { Vozac } from "./models/Vozac";
import { Vozilo } from "./models/Vozilo";
import { Voznja } from "./models/Voznja";

const app = express();
const port = 3000;

dotenv.config();

app.use(express.json());

// Testiranje da li konekcija radi
// !important development only
sequelize.authenticate()
  .then(() => {
    console.log("Database connected.");
    return Promise.all([
      Putnik.sync(),
      Vozac.sync(),
      Vozilo.sync(),
      Voznja.sync(),
    ]);
  })
  .then(() => {
    console.log("Models synced.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});


// --- PUTNIK ---
app.get("/putnici", async (req: Request, res: Response) => {
  try {
    const rows = await Putnik.findAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});
app.get("/putnici/:id", async (req: Request, res: Response) => {
  try {
    const row = await Putnik.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});
app.post("/putnici", async (req: Request, res: Response) => {
  try {
    const created = await Putnik.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: "Insert failed", details: err });
  }
});

// --- VOZAC ---
app.get("/vozaci", async (req: Request, res: Response) => {
  try {
    const rows = await Vozac.findAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});
app.get("/vozaci/:id", async (req: Request, res: Response) => {
  try {
    const row = await Vozac.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});
app.post("/vozaci", async (req: Request, res: Response) => {
  try {
    const created = await Vozac.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: "Insert failed", details: err });
  }
});

// --- VOZILO ---
app.get("/vozila", async (req: Request, res: Response) => {
  try {
    const rows = await Vozilo.findAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});
app.get("/vozila/:id", async (req: Request, res: Response) => {
  try {
    const row = await Vozilo.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});
app.post("/vozila", async (req: Request, res: Response) => {
  try {
    const created = await Vozilo.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: "Insert failed", details: err });
  }
});

// --- VOZNJA ---
app.get("/voznje", async (req: Request, res: Response) => {
  try {
    const rows = await Voznja.findAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});
app.get("/voznje/:id", async (req: Request, res: Response) => {
  try {
    const row = await Voznja.findByPk(req.params.id);
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});
app.post("/voznje", async (req: Request, res: Response) => {
  try {
    const created = await Voznja.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: "Insert failed", details: err });
  }
});

app.get("/time", (req: Request, res: Response) => {
  const now = new Date();
  res.json({
    currentTime: now.toISOString()
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
