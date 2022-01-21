import enviroment from '../../config/environment';

export default {
  underscored: true,
  schema: enviroment.dbConfig.schema || 'public',
};