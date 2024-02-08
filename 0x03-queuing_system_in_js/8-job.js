#!/usr/bin/yarn dev
// This script is intended to be run with Yarn's development environment

// Import the Queue and Job classes from the 'kue' package
import { Queue, Job } from 'kue';

/**
 * Creates push notification jobs from the array of job info.
 * @param {Job[]} jobs - Array of job information
 * @param {Queue} queue - The Kue queue instance
 */
export const createPushNotificationsJobs = (jobs, queue) => {
  // Check if 'jobs' is an array
  if (!(jobs instanceof Array)) {
    throw new Error('Jobs is not an array');
  }
  
  // Iterate over each job info object in the 'jobs' array
  for (const jobInfo of jobs) {
    // Create a new job in the queue with the type 'push_notification_code_3' and the job info
    const job = queue.create('push_notification_code_3', jobInfo);

    // Event listeners for different stages of the job lifecycle
    job
      // Event listener for when the job is enqueued
      .on('enqueue', () => {
        console.log('Notification job created:', job.id);
      })
      // Event listener for when the job is completed successfully
      .on('complete', () => {
        console.log('Notification job', job.id, 'completed');
      })
      // Event listener for when the job fails
      .on('failed', (err) => {
        console.log('Notification job', job.id, 'failed:', err.message || err.toString());
      })
      // Event listener for progress updates of the job
      .on('progress', (progress, _data) => {
        console.log('Notification job', job.id, `${progress}% complete`);
      });

    // Save the job to the queue
    job.save();
  }
};

// Export the createPushNotificationsJobs function as the default export
export default createPushNotificationsJobs;
