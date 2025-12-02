import { Router } from "express";
import {
  createSchedule,
  deleteSchedule,
  listSchedules,
  deleteAllSchedules,
} from "../controllers/weatherEmailScheduler.controller.js";
import { validate } from "../middlewares/schemaValidation.middleware.js";
import {
  createScheduleSchema,
  deleteScheduleSchema,
} from "../validations/weatherEmailScheduler.validation.js";

const router = Router();

router.post("/create", validate(createScheduleSchema), createSchedule);
router.delete(
  "/delete/:schedulerId",
  validate(deleteScheduleSchema),
  deleteSchedule
);
router.get("/list", listSchedules);
router.delete("/delete-all-schedules", deleteAllSchedules);

export default router;
