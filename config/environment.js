import dotenv from 'dotenv'
dotenv.config();

console.log('Environment: ' + process.env.NODE_ENV);

export default {
  dbConfig: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    schema: process.env.DATABASE_SCHEMA,
  },
  App: {
    id: process.env.APP_ID || 'donations-api',
    port: process.env.APP_PORT || 80,
  },
  sendGrid: {
    token: process.env.SENDGRID_API_TOKEN,
    sender: process.env.SENDGRID_EMAIL_SENDER,
    receiver: process.env.SENDGRID_EMAIL_RECEIVER,
  },
  logLevel: process.env.LOG_LEVEL || 'debug',
  requestLimit: process.env.REQUEST_LIMIT || '10mb',
};
