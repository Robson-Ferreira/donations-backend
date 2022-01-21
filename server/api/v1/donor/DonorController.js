import Logger from '../../../common/Logger';
import ResponseHandler from '../../../common/ResponseHandler';
import DonorService from './DonorService';
import fs from 'fs';
import path from 'path';

export class DonorController {
  async get(req, res) {
    try {
      Logger.info(`Request -> ${JSON.stringify(req.ip)}`);
      const action = new DonorService(req);
      const data = await action.get(req.query);
      return res.json(data);
    } catch (error) {
      Logger.error(error);
      ResponseHandler.error(res, error);
    }
  }

  async post(req, res) {
    try {
      Logger.info(`Request -> ${JSON.stringify(req.ip)}`);
      const action = new DonorService(req);
      const data = await action.create();
      const [nameFile] = fs.readdirSync(path.join(__dirname, 'uploads'));
      const pathFile = path.join(__dirname, `uploads/${nameFile}`);
      fs.unlinkSync(pathFile);
      return res.json(data);
    } catch (error) {
      Logger.error(error);
      ResponseHandler.error(res, error);
    }
  }
}

export default new DonorController();
