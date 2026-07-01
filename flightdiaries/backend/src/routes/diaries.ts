import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
    res.send(`Hello from the diaries route!, fetching all diaries!`);
});

router.post("/", (_, res) => {
    res.send(`saving a new diary entry!`);
});

export default router;