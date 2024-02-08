#!/usr/bin/yarn dev
// This script is intended to be run with Yarn's development environment

// Import the promisify function from the 'util' module
import { promisify } from 'util';

// Import the createClient function and print function from the 'redis' package
import { createClient, print } from 'redis';

// Create a new Redis client instance
const client = createClient();

// Event listener for errors that occur during the connection
client.on('error', (err) => {
  // Log an error message if the Redis client fails to connect to the server
  console.log('Redis client not connected to the server:', err.toString());
});

// Function to set a new school name and value in the Redis database
const setNewSchool = (schoolName, value) => {
  // Use the SET command to set the value of the specified key (schoolName)
  // to the provided value. Pass the print function as a callback to handle the result
  client.SET(schoolName, value, print);
};

// Function to asynchronously display the value of a school stored in the Redis database
const displaySchoolValue = async (schoolName) => {
  // Use promisify to convert the callback-based client.GET function into a promise-based function
  // Bind the client to the promisified version of the GET function
  const getAsync = promisify(client.GET).bind(client);
  
  // Use await to asynchronously retrieve the value of the specified key (schoolName)
  // from the Redis database using the promisified GET function
  console.log(await getAsync(schoolName));
};

// Async function to execute the main functionality of the script
async function main() {
  // Display the value of the 'Holberton' key in the Redis database
  await displaySchoolValue('Holberton');
  
  // Set a new school name 'HolbertonSanFrancisco' with a value of '100' in the Redis database
  setNewSchool('HolbertonSanFrancisco', '100');
  
  // Display the value of the 'HolbertonSanFrancisco' key in the Redis database
  await displaySchoolValue('HolbertonSanFrancisco');
}

// Event listener for successful connection to the Redis server
client.on('connect', async () => {
  // Log a success message when the Redis client connects to the server
  console.log('Redis client connected to the server');
  
  // Call the main function to execute the main functionality of the script
  await main();
});
