import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { queryCrUX } from "./queries/chrome-ux";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.disable("x-powered-by");

app.get("/status", (req, res) => {
  res.send("Looking good!");
});

app.get("/api/get_report", async (req, res) => {
  const { urls } = req.query;
  const origins = urls as string[];
  const sortBy = req.query.sortBy as string;
  if (!origins.length) {
    res.status(422).send({ error: "No urls present" });
    return;
  }
  const data = await queryCrUX({ urls: origins, sortBy });
  res.status(200).send({ data: data[0] });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
