const app = require('./app');
const { PORT } = require('./config');

/**
 * Start the server
 */
const server = app.listen(PORT, () => {
  console.log(`
  --------------------------------------------------
     🚀 Server is running on http://localhost:${PORT}
     Environment: ${process.env.NODE_ENV || 'development'}
  --------------------------------------------------
  `);
});

/**
 * Handle Unhandled Rejections (e.g. Broken Promises)
 */
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

/**
 * Handle Uncaught Exceptions
 */
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
