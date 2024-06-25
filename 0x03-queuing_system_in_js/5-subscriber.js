#!/usr/bin/yarn dev
// This script is intended to be run with Yarn's development environment

// Import the createClient function from the 'redis' package
import { createClient } from 'redis';

// Create a new Redis client instance
const client = createClient();

// Define a constant for the exit message
const EXIT_MSG = 'KILL_SERVER';

// Event listener for errors that occur during the connection
client.on('error', (err) => {
  // Log an error message if the Redis client fails to connect to the server
  console.log('Redis client not connected to the server:', err.toString());
});

// Event listener for successful connection to the Redis server
client.on('connect', () => {
  // Log a success message when the Redis client connects to the server
  console.log('Redis client connected to the server');
});

// Subscribe to the 'holberton school channel'
client.subscribe('holberton school channel');

// Event listener for messages received on the subscribed channel
client.on('message', (_err, msg) => {
  // Log the received message to the console
  console.log(msg);

  // If the received message is the exit message, perform cleanup actions
  if (msg === EXIT_MSG) {
    // Unsubscribe from the channel
    client.unsubscribe();

    // Quit the Redis client, terminating the connection to the server
    client.quit();
  }
});
