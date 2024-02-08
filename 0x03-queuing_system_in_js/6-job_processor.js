#!/usr/bin/yarn dev
// This script is intended to be run with Yarn's development environment

// Import the createQueue function from the 'kue' package
import { createQueue } from 'kue';

// Create a new job queue
const queue = createQueue();

// Function to send a notification to a phone number with a given message
const sendNotification = (phoneNumber, message) => {
  console.log(
    `Sending notification to ${phoneNumber},`,
    'with message:',
    message,
  );
};

// Process jobs of type 'push_notification_code'
queue.process('push_notification_code', (job, done) => {
  // Retrieve data from the job, including the phone number and message
  const phoneNumber = job.data.phoneNumber;
  const message = job.data.message;

  // Call the sendNotification function with the retrieved data
  sendNotification(phoneNumber, message);

  // Call the done function to indicate that the job processing is complete
  done();
});
