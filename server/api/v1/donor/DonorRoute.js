import * as express from 'express';
import DonorController from './DonorController';
import { upload } from './DonorMiddleware';

export default express
  .Router()
  .get('/', DonorController.get)
  .post('/', upload.single('file'), DonorController.post);
