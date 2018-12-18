
const winston = require('winston');
const expressWinston = require('express-winston');

const loggerParams = {
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

const whitelist = {
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

const expressParams = Object.assign(loggerParams, whitelist);

const Logger = expressWinston.logger(expressParams);

const Error = expressWinston.errorLogger(expressParams);

module.exports = { Logger, Error, loggerParams };
