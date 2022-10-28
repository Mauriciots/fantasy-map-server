import { Sequelize } from 'sequelize';
import EnvVars from '@configurations/EnvVars';

let sequelizeInstance: Sequelize | null = null;

export const getSequelize = () => {
  if (!sequelizeInstance) {
    console.log('Creating new sequelize instance');
    sequelizeInstance = new Sequelize(EnvVars.postgresConnectionString);
  }
  return sequelizeInstance;
};
