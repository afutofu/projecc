// Initialize message listeners
const initMessageListeners = (socket) => {
  // Listening for message from client
  socket.on("sendMessage", ({ data, channelId, projectId }, callback) => {
    const messageObject = {
      _id: 131313,
      user: "John Doe",
      text: "Yo wassup",
      date: "7/4/2020 12:11",
    };

    console.log("\tNew message in", channelId);

    // Emits message to other clients in same namespace and room
    socket.broadcast
      .to(channelId)
      .emit("message", { type: "CREATE", data, channelId, projectId });

    callback();
  });

  // Listening for message from client
  socket.on("deleteMessage", ({ data, channelId, projectId }) => {
    console.log("\tDeleted message in", channelId);

    // Emits message info to other clients in same namespace and room to remove in frontend
    socket.broadcast
      .to(channelId)
      .emit("message", { type: "DELETE", data, channelId, projectId });
  });
};

module.exports = { initMessageListeners };
