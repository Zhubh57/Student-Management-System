require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/student_mgmt',
  JWT_SECRET: process.env.JWT_SECRET || 'secret_key_placeholder',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
