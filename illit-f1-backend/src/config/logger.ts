// src/config/logger.ts

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export const logger = {
  log: (level: LogLevel, message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level}]`;

    if (data) {
      console.log(`${prefix} ${message}`, data);
    } else {
      console.log(`${prefix} ${message}`);
    }
  },

  debug: (message: string, data?: any) => logger.log(LogLevel.DEBUG, message, data),
  info: (message: string, data?: any) => logger.log(LogLevel.INFO, message, data),
  warn: (message: string, data?: any) => logger.log(LogLevel.WARN, message, data),
  error: (message: string, data?: any) => logger.log(LogLevel.ERROR, message, data)
};
