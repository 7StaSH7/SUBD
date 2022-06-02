import dotenv from 'dotenv';
import log4js from 'log4js';
import { ConnectionOptions, createConnection, getConnectionOptions } from 'typeorm';
dotenv.config();

export const sqlLogger = log4js.getLogger('sql');

export const connect = async () => {
  const options = await getConnectionOptions();

  Object.assign(options, {
    type: 'postgres',
    synchronize: process.env.DANGER_ALLOW_ALTER_TABLES === 'true',
    logging: process.env.LOG_QUERIES === 'true' ? ['warn', 'query', 'schema'] : false,
  } as ConnectionOptions);

  return createConnection(options);
};
