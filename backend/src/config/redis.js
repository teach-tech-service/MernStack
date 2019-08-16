import redis from "redis";

const REDIS_PORT = process.env.REDIS_PORT || 6379,
  REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
const client = redis.createClient(REDIS_PORT, REDIS_HOST);

client.on("connect", function() {
  console.log(`Connected to redis instance on ${REDIS_HOST}:${REDIS_PORT}`);
});

client.on("error", function(err) {
  console.log("Error " + err);
});

export default client;
