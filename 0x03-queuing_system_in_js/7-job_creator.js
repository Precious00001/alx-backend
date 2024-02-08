#!/usr/bin/yarn dev
// This script is intended to be run with Yarn's development environment

// Import the createQueue function from the 'kue' package
import { createQueue } from 'kue';

// Array of jobs containing phone numbers and verification messages
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account',
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account',
  },
];

// Create a new job queue with the name 'push_notification_code_2'
const queue = createQueue({ name: 'push_notification_code_2' });

// Iterate over each job info object in the 'jobs' array
for (const jobInfo of jobs) {
  // Create a new job in the queue with the type 'push_notification_code_2' and the job info
  const job = queue.create('push_notification_code_2', jobInfo);

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
