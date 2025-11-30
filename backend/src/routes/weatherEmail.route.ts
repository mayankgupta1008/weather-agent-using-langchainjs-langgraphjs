import { Router } from "express";
import { sendWeatherEmail } from "../controllers/weatherEmail.controller.js";

const router = Router();

router.post("/sendWeatherEmail", sendWeatherEmail);

export default router;
