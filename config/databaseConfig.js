import enviroment from './environment';
import Logger from '../server/common/Logger';

const { dbConfig } = enviroment;

Logger.info(`Environment ${JSON.stringify(dbConfig)}`);

const databaseConfig = {
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  schema: dbConfig.schema,
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  define: {
    underscored: true,
    freezeTableName: false,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
    },
    timestamps: true,
  },
  timezone: '-03:00',
  autoreconnect: true,
  logging: (sql, timing) => Logger.info(
    sql, typeof timing === 'number' ? `Δ: ${timing}ms` : '',
  ),
};

export default databaseConfig;