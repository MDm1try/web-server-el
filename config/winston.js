import winston from 'winston';

require('dotenv').config();

const options = {
  console: {
    level: 'debug',
    handleException: true,
    format:
      process.env.NODE_END === 'production'
        ? winston.format.json()
        : winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
  },
};

const transports = [new winston.transports.Console(options.console)];

const logger = winston.createLogger({
  transports,
  exitOnError: false,
});

export default logger;
