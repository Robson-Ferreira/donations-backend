import * as http from 'http';
import * as os from 'os';
import * as bodyParser from 'body-parser';
import cors from 'cors';

import Express from 'express';
import Logger from './Logger';

const app = new Express();

const corsOption = {
  allowedHeaders: [
    'Authorization',
    'Accept',
    'Content-type',
    'cache-control',
    'access-control-allow-methods',
    'access-control-allow-origin',
    'access-control-allow-credentials',
    'x-requested-with',
    'access-control-allow-headers',
  ],
};

export default class ExpressServer {
  constructor() {
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cors(corsOption));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
  }

  router(routes) {
    routes(app);
    return this;
  }

  listen(port = process.env.APP_PORT) {
    const welcome = p => () => {
      Logger.info(
        `up and running in ${process.env.NODE_ENV}@:${os.hostname()} on port: ${p}`,
      );
    };
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}
