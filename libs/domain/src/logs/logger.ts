export interface ILogger {
  fatal(
    message: string | Error,
    metadata?: object,
    code?: string | number
  ): void;
  error(
    message: string | Error,
    metadata?: unknown,
    code?: string | number
  ): void;
  warn(message: string, metadata?: object): void;
  info(message: string, metadata?: object): void;
  debug(message: string, metadata?: object): void;
  trace(message: string, metadata?: object): void;
  log(message: string, metadata?: object): void;
}

export type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';
