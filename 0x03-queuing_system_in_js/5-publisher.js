#!/usr/bin/yarn dev
// This script is intended to be run with Yarn's development environment

// Import the createClient function from the 'redis' package
import { createClient } from 'redis';

// Create a new Redis client instance
const client = createClient();

// Event listener for errors that occur during the connection
client.on('error', (err) => {
  // Log an error message if the Redis client fails to connect to the server
  console.log('Redis client not connected to the server:', err.toString());
});

// Function to publish a message to the 'holberton school channel' after a specified delay
const publishMessage = (message, time) => {
  setTimeout(() => {
    // Log a message indicating that the message is about to be sent
    console.log(`About to send ${message}`);
    
    // Publish the message to the 'holberton school channel'
    client.publish('holberton school channel', message);
  }, time);
};

// Event listener for successful connection to the Redis server
client.on('connect', () => {
  // Log a success message when the Redis client connects to the server
  console.log('Redis client connected to the server');
});

// Publish messages with specified delays
publishMessage('Holberton Student #1 starts course', 100);
publishMessage('Holberton Student #2 starts course', 200);
publishMessage('KILL_SERVER', 300); // Message to instruct subscribers to exit
publishMessage('Holberton Student #3 starts course', 400);
