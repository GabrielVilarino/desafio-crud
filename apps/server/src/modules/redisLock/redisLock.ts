import Redlock from 'redlock';
import { redisClient } from './redisClient';

export const redisLock = new Redlock([redisClient], {
    retryCount: 3,
    retryDelay: 200,
  });