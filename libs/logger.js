const appRoot = require('app-root-path');
const winston = require('winston');
const fs = require('fs');
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();
dd = (dd < 10) ? '0' + dd : dd;
mm = (mm < 10) ? '0' + mm : mm;
today = mm + '-' + dd + '-' + yyyy;

const logDir = 'logs/';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const options = {
  file: {
    level: 'info',
    name: 'file.info',
    filename: `${appRoot}/logs/info-` + today + `.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true,
    tailable: true,
    prettyPrint: true
  },
  errorFile: {
    level: 'error',
    name: 'file.error',
    filename: `${appRoot}/logs/error-` + today + `.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true,
    tailable: true,
    prettyPrint: true
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [
    new(winston.transports.Console)(options.console),
    new(winston.transports.File)(options.errorFile),
    new(winston.transports.File)(options.file)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};
logger.setMaxListeners(0);
module.exports = logger;
