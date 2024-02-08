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

// Function to update a hash with a new field and value
const updateHash = (hashName, fieldName, fieldValue) => {
  // Use the HSET command to set the field 'fieldName' with value 'fieldValue' in the hash 'hashName'
  // Pass the print function as a callback to handle the result
  client.HSET(hashName, fieldName, fieldValue, print);
};

// Function to print all fields and values of a hash
const printHash = (hashName) => {
  // Use the HGETALL command to retrieve all fields and values of the hash 'hashName'
  // Pass a callback function to handle the result
  client.HGETALL(hashName, (_err, reply) => console.log(reply));
};

// Function to execute the main functionality of the script
function main() {
  // Define an object containing school names and their corresponding values
  const hashObj = {
    Portland: 50,
    Seattle: 80,
    'New York': 20,
    Bogota: 20,
    Cali: 40,
    Paris: 2,
  };

  // Iterate over each key-value pair in the 'hashObj' object
  for (const [field, value] of Object.entries(hashObj)) {
    // Update the hash 'HolbertonSchools' with each field-value pair
    updateHash('HolbertonSchools', field, value);
  }

  // Print all fields and values of the hash 'HolbertonSchools'
  printHash('HolbertonSchools');
}

// Event listener for successful connection to the Redis server
client.on('connect', () => {
  // Log a success message when the Redis client connects to the server
  console.log('Redis client connected to the server');
  
  // Call the main function to execute the main functionality of the script
  main();
});
