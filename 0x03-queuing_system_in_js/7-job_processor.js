#!/usr/bin/yarn dev
// This script is intended to be run with Yarn's development environment

// Import the createQueue and Job classes from the 'kue' package
import { createQueue, Job } from 'kue';

// Define an array of blacklisted phone numbers
const BLACKLISTED_NUMBERS = ['4153518780', '4153518781'];

// Create a new job queue
const queue = createQueue();

/**
 * Sends a push notification to a user.
 * @param {String} phoneNumber - The phone number of the user
 * @param {String} message - The message to be sent
 * @param {Job} job - The job object
 * @param {*} done - The callback function to be called when the job is done
 */
const sendNotification = (phoneNumber, message, job, done) => {
  let total = 2, pending = 2; // Set total and pending counts for progress tracking
  let sendInterval = setInterval(() => {
    // Update job progress if half of the notifications are sent
    if (total - pending <= total / 2) {
      job.progress(total - pending, total);
    }
    // Check if the phone number is blacklisted
    if (BLACKLISTED_NUMBERS.includes(phoneNumber)) {
      // If blacklisted, mark the job as failed with an error message
      done(new Error(`Phone number ${phoneNumber} is blacklisted`));
      clearInterval(sendInterval); // Stop the send interval
      return;
    }
    // If all notifications are sent, log the notification details
    if (total === pending) {
      console.log(
        `Sending notification to ${phoneNumber},`,
        `with message: ${message}`,
      );
    }
    // Decrement the pending count and call 'done' if all notifications are sent
    --pending || done();
    // Clear the interval if all notifications are sent
    pending || clearInterval(sendInterval);
  }, 1000); // Interval of 1 second between sending notifications
};

// Process jobs of type 'push_notification_code_2' with a concurrency limit of 2
queue.process('push_notification_code_2', 2, (job, done) => {
  // Call the sendNotification function to send notifications for the current job
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
