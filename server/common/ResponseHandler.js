import { get } from 'lodash';

import Logger from './Logger';
export default class ResponseHandler {
  static error(response, error) {
    if (!error) {
      Logger.error(error, 'Unhandled Error');
      return response.status(500).json('Erro inesperado');
    }

    if (error.name === 'ValidationError') {
        Logger.error(error);
        const errs = [];
        error.errors.forEach((v, index) => {
            const errorName = get(error, `inner[${index}].type`, '');
            console.log(errorName);
            errs.push({
                message: v,
                description: v,
            });
        });
        return response.status(error.status || 400).json({
            message: error.message,
            description: error.description,
            errors: errs,
        });
    }
    return response.status(error.status || 500).json(error.message);
  }
}
