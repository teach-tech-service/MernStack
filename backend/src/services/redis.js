import client from "../config/redis";
import {
  NOT_FOUND_KEY,
  REDIS_INTERNAL_ERROR,
  FOUND_KEY
} from "../statuses/redisStatuses";

export function setToRedis(TOKEN_STACK, key, value, options) {
  return new Promise((resolve, reject) => {
    client.select(TOKEN_STACK, function(err) {
      if (err) {
        reject(REDIS_INTERNAL_ERROR);
      }
      client.set(key, value, ...options, err => {
        if (err) {
          reject(REDIS_INTERNAL_ERROR);
        }
        resolve();
      });
    });
  });
}

export function getFromRedis(TOKEN_STACK, key) {
  return new Promise((resolve, reject) => {
    client.select(TOKEN_STACK, function() {
      client.get(key, (err, reply) => {
        if (err) {
          reject(REDIS_INTERNAL_ERROR + err);
        }
        if (!reply) {
          reject(NOT_FOUND_KEY);
        }
        resolve({
          status: FOUND_KEY,
          message: reply
        });
      });
    });
  });
}

export function deleteFromRedis(TOKEN_STACK, key) {
  client.select(REDIS_CONFIRM_EMAIL_STACK, function() {
    client.del(key);
  });
}
