
// import Redis from 'ioredis';
// import dotenv from 'dotenv';
// dotenv.config();

// console.log(process.env.REDIS_HOST, process.env.REDIS_PORT, process.env.REDIS_PASSWORD);

// const redisClient = new Redis({
//   host: process.env.REDIS_HOST ,
//   port: process.env.REDIS_PORT,
//   password:process.env.REDIS_PASSWORD, // Optional, only if set in Redis Cloud
//   tls: {}, // Required for Redis Cloud (enables SSL)
// });

// redisClient.on('connect', () => {
//   console.log('✅ Connected to Redis Cloud successfully');
// });

// redisClient.on('error', (err) => {
//   console.error('❌ Redis connection error:', err);
// });

// export default redisClient;
