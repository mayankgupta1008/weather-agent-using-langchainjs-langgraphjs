import dotenv from "dotenv";
dotenv.config();

import express from "express";
import weatherEmailRoute from "./routes/weatherEmail.route.js";
import weatherEmailSchedulerRoute from "./routes/weatherEmailScheduler.route.js";
import "./workers/weatherEmail.worker.js";

const app = express();
app.use(express.json());

app.use("/api/weatherEmail", weatherEmailRoute);
app.use("/api/weatherEmailScheduler", weatherEmailSchedulerRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
  console.log("Worker is listening to jobs");
});
