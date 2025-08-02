import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { sequelize } from "./repository/db";
import { Putnik } from "./models/Putnik";
import { Vozac } from "./models/Vozac";
import { Vozilo } from "./models/Vozilo";
import { Voznja } from "./models/Voznja";
import { Dispecer } from "./models/Dispecer";
import { Firma } from "./models/Firma";
import { Jezik } from "./models/Jezik";
import { Lokacija } from "./models/Lokacija";
import { Povratak } from "./models/Povratak";
import { PromenaStatusa } from "./models/PromenaStatusa";

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
      Dispecer.sync(),
      Firma.sync(),
      Jezik.sync(),
      Lokacija.sync(),
      Povratak.sync(),
      PromenaStatusa.sync()
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

const modelMap: { [key: string]: any } = {
  putnici: Putnik,
  vozaci: Vozac,
  vozila: Vozilo,
  voznje: Voznja,
  dispeceri: Dispecer,
  firme: Firma,
  jezici: Jezik,
  lokacije: Lokacija,
  povratci: Povratak,
  promene: PromenaStatusa
};


// Select * from entity , sa opcionalni where delom
// /putnici?ime=Marko&sort=prezime:desc&limit=5
app.get("/:entity", async (req: Request, res: Response) => {
  const { entity } = req.params;
  const model = modelMap[entity];
  if (!model) {
    return res.status(404).json({ error: "Unknown entity" });
  }
  try {
    const { limit, offset, sort, ...rest } = req.query;
    const where = { ...rest };
    let order = undefined;
    if (typeof sort === 'string') {
      order = sort.split(',').map(s => {
        const [field, dir] = s.split(':');
        // Default vrednost za sortiranje je ASC -> uzlazno
        return [field, (dir || 'ASC').toUpperCase()];
      });
    }
    const rows = await model.findAll({
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order
    });
    return res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});

// select * from entity where id
app.get("/:entity/:id", async (req: Request, res: Response) => {
  const { entity, id } = req.params;
  const model = modelMap[entity];
  if (!model) {
    return res.status(404).json({ error: "Unknown entity" });
  }
  try {
    const row = await model.findByPk(id);
    if (!row) return res.status(404).json({ error: "Not found" });
    return res.json(row);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});


// Update row , ali sa svim parametrima
app.put('/:entity/:id', async (req: Request, res: Response) => {
  const { entity, id } = req.params;
  const model = modelMap[entity];
  if (!model) {
    return res.status(404).json({ error: 'Unknown entity' });
  }
  try {
    const [updated] = await model.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    const row = await model.findByPk(id);
    return res.json(row);
  } catch (err) {
    res.status(500).json({ error: 'Update failed', details: err instanceof Error ? err.message : err });
  }
});

// Update row, ali samo neki parametri
app.patch('/:entity/:id', async (req: Request, res: Response) => {
  const { entity, id } = req.params;
  const model = modelMap[entity];
  if (!model) {
    return res.status(404).json({ error: 'Unknown entity' });
  }
  try {
    const [updated] = await model.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    const row = await model.findByPk(id);
    return res.json(row);
  } catch (err) {
    res.status(500).json({ error: 'Patch failed', details: err instanceof Error ? err.message : err });
  }
});

// Delete row by id
app.delete('/:entity/:id', async (req: Request, res: Response) => {
  const { entity, id } = req.params;
  const model = modelMap[entity];
  if (!model) {
    return res.status(404).json({ error: 'Unknown entity' });
  }
  try {
    const deleted = await model.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    return res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed', details: err instanceof Error ? err.message : err });
  }
});


// Insert into entity iz body request
app.post('/:entity', async (req: Request, res: Response) => {
  const { entity } = req.params;
  const model = modelMap[entity];
  if (!model) {
    return res.status(404).json({ error: 'Unknown entity' });
  }
  try {
    const created = await model.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: 'Insert failed', details: err instanceof Error ? err.message : err });
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
