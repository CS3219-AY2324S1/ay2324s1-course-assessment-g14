import { Server, Socket } from 'socket.io';

// Your existing matching service logic
export function initializeMatchingService(io: Server) {
  // Maintain an array to store active users seeking a match
  const activeUsers: { socket: Socket; preferences: any }[] = [];

  io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    socket.on('startMatching', (preferences: any) => {
      // Add the user to the list of active users with their preferences
      activeUsers.push({ socket, preferences });

      // Attempt to find a match for the user
      tryMatchForUser(socket, preferences);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');

      // Remove the user from the list of active users when they disconnect
      removeUserFromActiveList(socket);
    });

    // Other event handlers as needed
  });

  function tryMatchForUser(socket: Socket, preferences: any) {
    const { difficulty, category } = preferences;

    // Iterate through active users to find a match
    const matchedUser = activeUsers.find((user) => {
      return (
        user.socket !== socket && // Exclude the current user from matching with themselves
        user.preferences.difficulty === difficulty &&
        user.preferences.category === category
      );
    });

    if (matchedUser) {
      // Remove both users from the active list
      removeUserFromActiveList(socket);
      removeUserFromActiveList(matchedUser.socket);

      // Emit "matchFound" to both users
      socket.emit('matchFound', matchedUser.preferences);
      matchedUser.socket.emit('matchFound', preferences);
    } else {
      // Handle the case when no match is found for the user
      // You can emit a "noMatchFound" event or handle it differently
    }
  }

  function removeUserFromActiveList(socket: Socket) {
    // Remove the user from the list of active users by socket ID
    const index = activeUsers.findIndex((user) => user.socket === socket);
    if (index !== -1) {
      activeUsers.splice(index, 1);
    }
  }
}