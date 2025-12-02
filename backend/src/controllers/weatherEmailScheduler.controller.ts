import { Request, Response } from "express";
import {
  scheduleWeatherEmail,
  removeScheduledJobs,
  getScheduledJobs,
  removeAllScheduledJobs,
} from "../schedulers/weatherEmail.scheduler.js";

export const createSchedule = async (req: Request, res: Response) => {
  try {
    const { city, recipientEmail, pattern } = req.body;
    await scheduleWeatherEmail(city, recipientEmail, pattern);
    return res.status(200).json({
      success: true,
      message: "Schedule created successfully",
      data: {
        city,
        recipientEmail,
        pattern: pattern || "0 17 * * *",
      },
    });
  } catch (error: any) {
    console.log("Error inside createSchedule controller", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create schedule",
      error: error.message,
    });
  }
};

export const deleteSchedule = async (req: Request, res: Response) => {
  try {
    const { schedulerId } = req.params;
    const removed = await removeScheduledJobs(schedulerId);
    if (removed) {
      return res.status(200).json({
        success: true,
        message: "Schedule deleted successfully",
        data: {
          schedulerId,
        },
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
        data: {
          schedulerId,
        },
      });
    }
  } catch (error: any) {
    console.log("Error inside deleteSchedule controller", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete schedule",
      error: error.message,
    });
  }
};

export const listSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await getScheduledJobs();
    return res.status(200).json({
      success: true,
      message: "Schedules retrieved successfully",
      data: {
        count: schedules.length,
        schedules: schedules,
      },
    });
  } catch (error: any) {
    console.log("Error inside listSchedules controller", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve schedules",
      error: error.message,
    });
  }
};

export const deleteAllSchedules = async (req: Request, res: Response) => {
  try {
    const removed = await removeAllScheduledJobs();
    if (removed) {
      return res.status(200).json({
        success: true,
        message: "All schedules deleted successfully",
        data: removed,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No schedules found",
        data: removed,
      });
    }
  } catch (error: any) {
    console.log("Error inside deleteAllSchedules controller", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete schedules",
      error: error.message,
    });
  }
};
