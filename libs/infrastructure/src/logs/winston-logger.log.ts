import * as colorsLib from '@colors/colors';
import { ILogger, LogLevel } from '@domain';
import { Logger as WinstonLoggerType, format } from 'winston';
import * as Transport from 'winston-transport';
import * as logfmt from 'logfmt';
import * as winston from 'winston';

const { timestamp, simple, colorize, errors, json, uncolorize } = format;

const colors = {
  fatal: 'brightRed',
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
  trace: 'cyan',
} as const;

const upperCaseLevel = format((info) => ({
  ...info,
  level: info.level.toUpperCase(),
}));

const defaultFormatter = winston.format.combine(
  upperCaseLevel(),
  colorize({ level: true, colors }),
  errors({ stack: true }),
  timestamp(),
  simple()
);

export class WinstonLogger implements ILogger {
  private logger: WinstonLoggerType;

  constructor(options: {
    level: LogLevel;
    appName: string;
    environment: string;
    containerId?: string;
    outputFormat?: 'text' | 'json';
    testingMode?: boolean;
    customTransports?: Transport[];
    getRequestId?: () => string | undefined;
  }) {
    const {
      level,
      appName,
      environment,
      containerId,
      outputFormat,
      testingMode,
      customTransports,
      getRequestId,
    } = options;

    const getPainter = (level: LogLevel) => colorsLib[colors[level]];

    const rTracerStringFormatter = format.printf((info) => {
      const { level, ...rest } = info;
      const rid = getRequestId ? getRequestId() : null;
      const timestamp = new Date(
        rest['timestamp'] as string | Date
      ).toLocaleString();
      delete rest['timestamp'];

      const levelColor = getPainter(
        colorsLib.strip(level).toLowerCase() as LogLevel
      );
      const headerSection = colorsLib.gray(
        `${levelColor(
          `${appName} | ${containerId ?? '-'} | ${environment} | ${timestamp}`
        )} | ${colorsLib.bold(level)} | ${colorsLib.white(rid ?? '-')} |`
      );

      const bodySection = logfmt.stringify(
        Object.entries(rest as object).reduce(
          (acc, [key, val]) => ({
            ...acc,
            [colorsLib.gray(key)]:
              key.startsWith('metadata') || key.startsWith('stack')
                ? colorsLib.bold(val)
                : colorsLib.bold(colorsLib.brightWhite(val)),
          }),
          {}
        )
      );

      return `${headerSection} ${bodySection}`;
    });

    const rTracerJsonFormatter = format(({ level, ...info }) => {
      const rid = getRequestId ? getRequestId() : null;

      return {
        level: level.toUpperCase(),
        ...info,
        app_name: appName,
        environment: environment,
        ...(containerId ? { container_id: containerId } : {}),
        ...(rid ? { request_id: rid } : {}),
      };
    });

    this.logger = winston.createLogger({
      levels: { fatal: 0, error: 1, warn: 2, info: 3, debug: 4, trace: 5 },
      level: 'info',
      format: defaultFormatter,
      transports: [
        new winston.transports.Console({
          silent: testingMode,
          level: level,
          format:
            outputFormat == 'json'
              ? winston.format.combine(
                  uncolorize(),
                  rTracerJsonFormatter(),
                  json()
                )
              : rTracerStringFormatter,
          handleExceptions: true,
          handleRejections: true,
        }),
        ...(customTransports ?? []),
      ],
      exitOnError: false,
    });
  }

  addTransport(tr: Transport) {
    this.logger.add(tr);
  }

  removeTransport(tr: Transport) {
    this.logger.remove(tr);
  }

  getTransports(): Transport[] {
    return this.logger.transports;
  }

  setGlobalLevel(level: LogLevel): void {
    this.logger.transports.forEach((t) => {
      t.level = level;
    });
  }

  mute(): void {
    this.logger.transports.forEach((t) => {
      t.silent = true;
    });
  }

  unmute(): void {
    this.logger.transports.forEach((t) => {
      t.silent = false;
    });
  }

  fatal(
    message: string | Error,
    metadata?: object,
    code?: string | number
  ): void {
    this.logger.log('fatal', {
      ...(code ? { code } : {}),
      message,
      ...(metadata ? { metadata } : {}),
    });
  }

  error(message: string | Error, metadata?: object, code?: string | number) {
    this.logger.error({
      ...(code ? { code } : {}),
      message,
      ...(metadata ? { metadata } : {}),
    });
  }

  warn(message: string, metadata?: object) {
    this.logger.warn({ message, ...(metadata ? { metadata } : {}) });
  }

  info(message: string, metadata?: object) {
    this.logger.info({ message, ...(metadata ? { metadata } : {}) });
  }

  log(message: string, metadata?: object) {
    this.logger.log({ level: this.logger.level, message, metadata });
  }

  debug(message: string, metadata?: object) {
    this.logger.debug({ message, ...(metadata ? { metadata } : {}) });
  }

  trace(message: string, metadata?: object): void {
    this.logger.log('trace', { message, ...(metadata ? { metadata } : {}) });
  }

  formatToHttpRequest(props: {
    remoteHost: string;
    method: string;
    path: string;
    protocolVersion: string;
    timestamp: number;
    httpStatus: number;
    bytesSent: number;
    msTime: number;
  }): string {
    return `${props.remoteHost} [${new Date(props.timestamp).toISOString()}] '${
      props.method
    } ${props.path} ${props.protocolVersion}' ${
      props.httpStatus >= 500
        ? colorsLib.red(props.httpStatus.toString()) // red
        : props.httpStatus >= 400
        ? colorsLib.yellow(props.httpStatus.toString()) // yellow
        : props.httpStatus >= 300
        ? colorsLib.cyan(props.httpStatus.toString()) // cyan
        : props.httpStatus >= 200
        ? colorsLib.green(props.httpStatus.toString()) // green
        : props.httpStatus
    } ${props.bytesSent} ${props.msTime}`;
  }
}
