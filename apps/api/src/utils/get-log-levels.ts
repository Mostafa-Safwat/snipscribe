import { LogLevel } from '@nestjs/common/services/logger.service';

/**
 * Gets log levels.
 * Hides `debug` and `verbose` log levels in production.
 * @param{boolean} isProduction - Whether the application is running in production.
 * @returns{LogLevel[]} - Log levels.
 */
export const getLogLevels = (isProduction: boolean): LogLevel[] => {
    if (isProduction) {
        return ['log', 'warn', 'error'];
    }
    return ['error', 'warn', 'log', 'verbose', 'debug'];
};
