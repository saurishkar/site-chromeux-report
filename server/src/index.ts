import express, { Express } from "express";
import dotenv from "dotenv";
import { CHROMEUX_API_ENDPOINT } from "./constants/api";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.disable('x-powered-by');

app.get("/status", (req, res) => {
  res.send("Looking good!");
});

app.get("/api/get_report/:url", (req, res) => {
  const apiKey = process.env.CHROMEUX_API_KEY;
  const origin = req.params.url;
  if (!apiKey) {
    res.status(422).send("API KEY missing");
    return;
  }
  const url = `${CHROMEUX_API_ENDPOINT}?key=${apiKey}`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      origin: decodeURIComponent(origin),
    }),
  })
    .then((response) => response.json())
    .then((response) => res.send(response.record))
    .catch((err) => res.status(422).send(err));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
