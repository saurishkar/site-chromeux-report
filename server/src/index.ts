import express, { Express } from "express";

const app: Express = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.send("Helloworld");
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});