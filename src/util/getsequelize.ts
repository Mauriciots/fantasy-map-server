import { Dialect, Sequelize } from 'sequelize';
import EnvVars from '@configurations/EnvVars';

let sequelizeInstance: Sequelize | null = null;

export const getSequelize = () => {
  if (!sequelizeInstance) {
    sequelizeInstance = new Sequelize(EnvVars.dbName, EnvVars.dbUser, EnvVars.dbPassword, {
      dialect: EnvVars.dbDialect as Dialect,
      host: EnvVars.dbHost,
    });
  }
  return sequelizeInstance;
};
