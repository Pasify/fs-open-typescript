import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
const PORT = 3001;
app.get("/api/ping", (_req, res) => {
  res.send("pong").status(200);
});

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
