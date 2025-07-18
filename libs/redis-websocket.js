const WebSocket = require('ws');
const redis = require('redis');
// Connect to Redis
var redisClientSUB = redis.createClient();
var redisClientPUB = redis.createClient();

// Create & Start the WebSocket server
const server = new WebSocket.Server({
  port: process.env.WEB_SOCKET_PORT,
});

console.log("WebSocket server started at ws://locahost:" + process.env.WEB_SOCKET_PORT);

server.on('connection', function connection(ws) {
  redisClientSUB.subscribe('channel');
  // broadcast on web socket when receving a Redis PUB/SUB Event
  redisClientSUB.on('message', function (channel, message) {
    ws.send(message);
  })

});

/**
 * This function is called to publish message to channel
 */
const publishToChannel = async (channel,message) => {
  try {
    // Register event for client connection
      redisClientPUB.publish(channel, message);
  } catch (err) {
    throw err;
  }
};

/**
 * Exporting the modules
 */
module.exports = {
  publishToChannel
};
