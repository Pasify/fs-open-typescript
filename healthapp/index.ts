import express from "express";
// import { error } from "node:console";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculator, type Operation } from "./calculator.ts";
import { calculateExercise } from "./exerciseCalculator.ts";
import { error } from "node:console";

const app = express();
app.use(express.json());

app.get("/ping", (_req, res) => {
  //   let x: string = 1;
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  console.log(`the req obj:`, req.query);
  const { height, weight } = req.query;
  if (typeof height !== "string" || typeof weight !== "string") {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  const heightNum: number = Number(height);
  const weightNum: number = Number(weight);

  if (isNaN(heightNum) || isNaN(weightNum)) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  res.send({
    height: heightNum,
    weight: weightNum,
    bmi: calculateBmi(heightNum, weightNum),
  });
});

app.post("/calculate", (req, res) => {
  const { value1, value2, op } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  if (!value1 || isNaN(Number(value1))) {
    res.status(400).send({ error: "..." });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  // const operation = op as Operation;
  const result = calculator(Number(value1), Number(value2), op as Operation);
  res.send({ result });
  console.log(result);
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (!Array.isArray(daily_exercises) || typeof target !== "number") {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }
  if (daily_exercises.some(isNaN)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const result = calculateExercise(target, daily_exercises);
  res.status(200).json(result);
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}...`);
});
