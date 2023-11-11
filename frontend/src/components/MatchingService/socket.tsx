import { io, Socket } from 'socket.io-client';

// Create a socket instance
// const baseUrl = process.env.REACT_APP_MATCHING_BASE_URL;
// const socket: Socket = baseUrl ? io(baseUrl) : io("http://localhost:3005/"); // Replace with your server URL if defined, otherwise use default URL
const socket: Socket = io("http://localhost:3005/"); // Replace with your server URL if defined, otherwise use default URL

// Event listener for when a match is found
socket.on('matchFound', (user) => {
  // Handle the matched user data here, e.g., update state or trigger an action
  console.log('Match found!', user);
});

export default socket;