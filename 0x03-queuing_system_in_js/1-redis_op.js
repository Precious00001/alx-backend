#!/usr/bin/yarn dev
// This script is intended to be run with Yarn's development environment

// Import the createClient function and print function from the 'redis' package
import { createClient, print } from 'redis';

// Create a new Redis client instance
const client = createClient();

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

// Function to set a new school name and value in the Redis database
const setNewSchool = (schoolName, value) => {
  // Use the SET command to set the value of the specified key (schoolName)
  // to the provided value. Pass the print function as a callback to handle the result
  client.SET(schoolName, value, print);
};

// Function to display the value of a school stored in the Redis database
const displaySchoolValue = (schoolName) => {
  // Use the GET command to retrieve the value of the specified key (schoolName)
  // from the Redis database. Pass a callback function to handle the result
  client.GET(schoolName, (_err, reply) => {
    // Log the value retrieved from the Redis database
    console.log(reply);
  });
};

// Display the value of the 'Holberton' key in the Redis database
displaySchoolValue('Holberton');

// Set a new school name 'HolbertonSanFrancisco' with a value of '100' in the Redis database
setNewSchool('HolbertonSanFrancisco', '100');

// Display the value of the 'HolbertonSanFrancisco' key in the Redis database
displaySchoolValue('HolbertonSanFrancisco');

