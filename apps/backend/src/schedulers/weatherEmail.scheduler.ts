// Create APIs if we need to manage schedules dynamically

import { weatherEmailQueue } from "../queues/weatherEmail.queue.js";

// Code to schedule a new job
export async function scheduleWeatherEmail(
  city: string,
  recipientEmail: string,
  cronPattern: string = "0 17 * * *" // run everyday at 5pm
) {
  try {
    await weatherEmailQueue.upsertJobScheduler(
      "daily-weather-email",
      { pattern: cronPattern },
      { data: { city, recipientEmail } }
    );
    console.log(`✅ Scheduled weather email for ${city} at 5 PM daily`);
    console.log(`   Recipient: ${recipientEmail}`);
    console.log(`   Pattern: ${cronPattern}`);
  } catch (error) {
    console.log("Error inside scheduleWeatherEmail", error);
    throw error;
  }
}

// Code to remove specific scheduled job
export async function removeScheduledJobs(schedulerId: string) {
  try {
    const removed = await weatherEmailQueue.removeJobScheduler(schedulerId);
    if (removed) {
      console.log(`✅ Removed scheduled job with key: ${schedulerId}`);
    } else {
      console.log(`⚠️ No scheduled job found with ID: ${schedulerId}`);
    }
    return removed;
  } catch (error) {
    console.log("Error inside removeScheduledJobs", error);
    throw error;
  }
}

// Code to get all scheduled jobs
export async function getScheduledJobs() {
  try {
    const schedulers = await weatherEmailQueue.getJobSchedulers();

    schedulers.forEach((scheduler) => {
      console.log(`   - Key: ${scheduler.key}`);
      console.log(`     Pattern: ${scheduler.pattern}`);
    });
    return schedulers;
  } catch (error) {
    console.log("Error inside getScheduledJobs", error);
    throw error;
  }
}

export async function removeAllScheduledJobs() {
  try {
    // 1. Remove schedulers
    const schedulers = await weatherEmailQueue.getJobSchedulers();
    let schedulersRemoved = 0;

    for (const scheduler of schedulers) {
      if (!scheduler.key) continue;

      const removed = await weatherEmailQueue.removeJobScheduler(scheduler.key);
      if (removed) {
        console.log(`🗑️ Removed scheduler: ${scheduler.key}`);
        schedulersRemoved++;
      }
    }

    // 2. Drain all waiting and delayed jobs (bulk operation)
    await weatherEmailQueue.drain();
    console.log(`🗑️ Drained all waiting and delayed jobs from the queue`);

    return {
      schedulersRemoved,
      message: "All schedulers removed and queue drained",
    };
  } catch (error) {
    console.error("Error inside removeAllScheduledJobs", error);
    throw error;
  }
}
