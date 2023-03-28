/* eslint-disable linebreak-style */
import {server as _server} from '@hapi/hapi';
import {routes} from './routes.mjs';

const init = async () => {
  const server = _server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
