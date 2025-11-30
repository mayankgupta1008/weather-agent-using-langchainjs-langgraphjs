import dotenv from "dotenv";
dotenv.config();

import express from "express";
import weatherEmailRoute from "./routes/weatherEmail.route.js";

const app = express();
app.use(express.json());

app.use("/api/weatherEmail", weatherEmailRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
