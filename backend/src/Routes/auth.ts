import express from "express";
const use = require("../util.ts").use;
import { loginHandler } from "../Controllers/auth";

const router = express.Router();

router.post("/api/v1/login", use(loginHandler));

export default router;
