import express from "express";

const app = express();

app.use(express.json());
const PORT = 3000;
app.get("/api/ping", (_req, res) => {
  res.send("pong").status(200);
});

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
