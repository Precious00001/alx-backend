#!/usr/bin/yarn dev
// This script is intended to be run with Yarn's development environment

// Import the createQueue function from the 'kue' package
import { createQueue } from 'kue';

// Create a new job queue with the name 'push_notification_code'
const queue = createQueue({name: 'push_notification_code'});

// Create a new job for sending a push notification
const job = queue.create('push_notification_code', {
  phoneNumber: '09078187411', // Phone number to send the notification to
  message: 'Registration successful', // Message content of the notification
});

// Event listeners for different stages of the job lifecycle
job
  // Event listener for when the job is enqueued
  .on('enqueue', () => {
    console.log('Notification job created:', job.id);
  })
  // Event listener for when the job is completed successfully
  .on('complete', () => {
    console.log('Notification job completed');
  })
  // Event listener for when the job fails after an attempt
  .on('failed attempt', () => {
    console.log('Notification job failed');
  });

// Save the job to the queue
job.save();
