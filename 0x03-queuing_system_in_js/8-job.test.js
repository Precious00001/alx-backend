#!/usr/bin/yarn test
// This script is intended to be run with Yarn's test runner

// Import necessary libraries for testing
import sinon from 'sinon'; // Import sinon for mocking console.log
import { expect } from 'chai'; // Import expect from chai for assertions
import { createQueue } from 'kue'; // Import createQueue from kue for creating a test queue
import createPushNotificationsJobs from './8-job.js'; // Import the function to be tested

// Describe block for the test suite
describe('createPushNotificationsJobs', () => {
  // Create a sinon spy to mock console.log
  const BIG_BROTHER = sinon.spy(console);
  // Create a test queue with a specific name
  const QUEUE = createQueue({ name: 'push_notification_code_test' });

  // Set up before hook to enter test mode for the queue
  before(() => {
    QUEUE.testMode.enter(true);
  });

  // Set up after hook to clear test mode and exit it
  after(() => {
    QUEUE.testMode.clear();
    QUEUE.testMode.exit();
  });

  // Set up afterEach hook to reset the history of console.log spy
  afterEach(() => {
    BIG_BROTHER.log.resetHistory();
  });

  // Test case to check error handling when jobs is not an array
  it('displays an error message if jobs is not an array', () => {
    // Expect the function to throw an error when called with a non-array argument
    expect(
      createPushNotificationsJobs.bind(createPushNotificationsJobs, {}, QUEUE)
    ).to.throw('Jobs is not an array');
  });

  // Test case to check if jobs are added to the queue with correct type and data
  it('adds jobs to the queue with the correct type', (done) => {
    // Expect the length of jobs in the test queue to be 0 initially
    expect(QUEUE.testMode.jobs.length).to.equal(0);
    // Define an array of job information
    const jobInfos = [
      {
        phoneNumber: '44556677889',
        message: 'Use the code 1982 to verify your account',
      },
      {
        phoneNumber: '98877665544',
        message: 'Use the code 1738 to verify your account',
      },
    ];
    // Call the function to add jobs to the queue
    createPushNotificationsJobs(jobInfos, QUEUE);
    // Expect the length of jobs in the test queue to be 2 after adding jobs
    expect(QUEUE.testMode.jobs.length).to.equal(2);
    // Expect the first job in the test queue to have correct type and data
    expect(QUEUE.testMode.jobs[0].data).to.deep.equal(jobInfos[0]);
    expect(QUEUE.testMode.jobs[0].type).to.equal('push_notification_code_3');
    // Process the job to execute it
    QUEUE.process('push_notification_code_3', () => {
      // Expect console.log to be called with specific arguments
      expect(
        BIG_BROTHER.log
          .calledWith('Notification job created:', QUEUE.testMode.jobs[0].id)
      ).to.be.true;
      done(); // Call done to indicate test completion
    });
  });

  // Test case to check if progress event handler is registered for a job
  it('registers the progress event handler for a job', (done) => {
    // Add a listener for the progress event of the first job in the test queue
    QUEUE.testMode.jobs[0].addListener('progress', () => {
      // Expect console.log to be called with specific arguments
      expect(
        BIG_BROTHER.log
          .calledWith('Notification job', QUEUE.testMode.jobs[0].id, '25% complete')
      ).to.be.true;
      done(); // Call done to indicate test completion
    });
    // Emit the progress event for the first job with 25% progress
    QUEUE.testMode.jobs[0].emit('progress', 25);
  });

  // Test case to check if failed event handler is registered for a job
  it('registers the failed event handler for a job', (done) => {
    // Add a listener for the failed event of the first job in the test queue
    QUEUE.testMode.jobs[0].addListener('failed', () => {
      // Expect console.log to be called with specific arguments
      expect(
        BIG_BROTHER.log
          .calledWith('Notification job', QUEUE.testMode.jobs[0].id, 'failed:', 'Failed to send')
      ).to.be.true;
      done(); // Call done to indicate test completion
    });
    // Emit the failed event for the first job with an error message
    QUEUE.testMode.jobs[0].emit('failed', new Error('Failed to send'));
  });

  // Test case to check if complete event handler is registered for a job
  it('registers the complete event handler for a job', (done) => {
    // Add a listener for the complete event of the first job in the test queue
    QUEUE.testMode.jobs[0].addListener('complete', () => {
      // Expect console.log to be called with specific arguments
      expect(
        BIG_BROTHER.log
          .calledWith('Notification job', QUEUE.testMode.jobs[0].id, 'completed')
      ).to.be.true;
      done(); // Call done to indicate test completion
    });
    // Emit the complete event for the first job
    QUEUE.testMode.jobs[0].emit('complete');
  });
});
