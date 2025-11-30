import { Request, Response } from "express";
import { weatherEmailAgent } from "../agents/weatherEmail.agent.js";

export const sendWeatherEmail = async (req: Request, res: Response) => {
  try {
    const { city, recipientEmail } = req.body;
    const result = await weatherEmailAgent.invoke({
      city,
      recipientEmail,
    });
    return res.status(200).json({
      success: true,
      message: "Weather email sent successfully",
      result: result.result,
      city: result.city,
    });
  } catch (error) {
    console.log("Error inside sendWeatherEmail controller:", error);
    return res.status(500).json({ error: "Failed to send weather email" });
  }
};
