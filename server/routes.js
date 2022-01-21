import * as express from 'express';

import DonorRoute from './api/v1/donor/DonorRoute';

export default function routes(app) {
  app.use(
    '/api',
    express
      .Router()
      .use('/v1/donor', DonorRoute)
  );
}


