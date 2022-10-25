import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@configurations/EnvVars';
import server from './server';

import { Sequelize } from 'sequelize';

// **** Start server **** //

const msg = 'Express server started on port: ' + EnvVars.port.toString();
const sequelize = new Sequelize(EnvVars.postgresConnectionString);

(async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
    server.listen(EnvVars.port, () => logger.info(msg));
  } catch (error) {
    logger.err(error);
  }
})();
