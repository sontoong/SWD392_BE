import dotenv from 'dotenv';
import connectToDB from './database/connectDB';

import app from './app';

// Load environment variables from .env file
dotenv.config();

// Handling unhandled rejections
process.on('uncaughtException', (err: Error) => {
  console.log('UNCAUGHT REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

const conn = connectToDB();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handling unhandled rejections
process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);

  // Calling server.close() will give the server time to finish all the requests that are still pending or being handled at the moment
  // then it will close the server and exit the application
  server.close(() => {
    process.exit(1);
  });
});
