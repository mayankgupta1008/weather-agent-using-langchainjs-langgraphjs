import { Router } from "express";
import { sendWeatherEmail } from "../controllers/weatherEmail.controller.js";

const router = Router();

router.post("/send", sendWeatherEmail);

export default router;
