const winston = require('winston');
const expressWinston = require('express-winston');

/**
 * loggerParams the general parameters for loggers
 */
const loggerParams = {
  level: process.env.NODE_ENV === 'test' ? 'warn' : 'info',
  format: winston.format.combine(
    winston.format.label({ label: 'Logger' }),
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf((info) => {
      let meta = '';
      if (info.meta) {
        const metaRes = JSON.stringify(info.meta);
        meta = `|| Full Req Meta: ${metaRes}`;
      }
      return `${info.timestamp} ${info.level}: ${info.message} ${meta}`;
    })
  ),
  transports: [
    new winston.transports.Console()
  ]
};

/**
 * configuration for expressWinston on top of winston
 */
const expressWinstonConfig = {
  requestWhitelist:
  [
    'url',
    'headers.host',
    'headers.user-agent',
    'method',
    'httpVersion',
    'originalUrl',
    'referer',
    'responseTime'
  ],
  bodyWhitelist: ['forestID', 'region', 'forest', 'type']
};

/**
 * new object with all the params needed for express winston
 */
const expressParams = Object.assign(loggerParams, expressWinstonConfig);

/**
 * new Logger for expressWinston
 */
const Logger = expressWinston.logger(expressParams);

/**
 * new ErrorLogger for expressWinston
 */
const Error = expressWinston.errorLogger(expressParams);

module.exports = { Logger, Error, loggerParams };
