import express, { Request, Response } from "express";
import { addExpense, getBalance } from "../Controllers/tracker";
const use = require("../util.ts").use;
const trackerRouter = express.Router();

trackerRouter.get("/api/v1/balance", use(getBalance));
trackerRouter.get("/api/v1/credit");

trackerRouter.get("/api/v1/debit");
trackerRouter.post("/api/v1/expense", addExpense);
trackerRouter.delete("/api/v1/expense");
trackerRouter.put("/api/v1/expense");

export default trackerRouter;
