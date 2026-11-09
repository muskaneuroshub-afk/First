import 'dotenv/config';
import { buildApp } from './app';
import { env } from './config/env';
import logger from './lib/logger';
import { prisma } from './lib/prisma';

const app = buildApp();

const server = app.listen(env.PORT, () => {
  logger.info(
    { port: env.PORT, nodeEnv: env.NODE_ENV },
    `Portfolio backend listening on port ${env.PORT}`,
  );
});

async function shutdown(signal: string) {
  logger.info({ signal }, 'Received shutdown signal, closing gracefully…');
  server.close(async () => {
    await prisma.$disconnect();
    logger.info('Server closed and database disconnected.');
    process.exit(0);
  });
}

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));

