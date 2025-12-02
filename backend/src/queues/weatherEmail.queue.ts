import { redisConnection } from "../config/redis.config.js";
import { Queue } from "bullmq";

export interface WeatherEmailJobData {
  city: string;
  recipientEmail: string;
}

export const weatherEmailQueue = new Queue<WeatherEmailJobData>(
  "weather-email-queue",
  {
    connection: redisConnection,
  }
);

console.log("Weather email queue created successfully");
