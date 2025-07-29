import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
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
