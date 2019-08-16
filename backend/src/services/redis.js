import client from "../config/redis";
import {
    NOT_FOUND_KEY,
    REDIS_INTERNAL_ERROR,
    FOUND_KEY,
    REDIS_DELETE_TOKEN_STACK
  } from "../statuses/redisStatuses";

export function setToTokenStack(key, companyId) {
  return new Promise((resolve, reject) => {
    client.select(REDIS_DELETE_TOKEN_STACK, function(err) {
      if (err) {
        reject(REDIS_INTERNAL_ERROR);
      }
      client.set(key, companyId, "EX", 3600 * 24, err => {
        if (err) {
          reject(REDIS_INTERNAL_ERROR);
        }
        resolve();
      });
    });
  });
}

export function getFromTokenStack(key) {
  return new Promise((resolve, reject) => {
    client.select(REDIS_DELETE_TOKEN_STACK, function() {
      client.get(key, (err, reply) => {
        if (err) {
          reject(REDIS_INTERNAL_ERROR);
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
