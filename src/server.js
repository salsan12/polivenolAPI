const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const port = process.env.PORT || 8000;

const start = async () => {
  const server = Hapi.server({
    port: port,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register(require('@hapi/vision'));

  server.views({
    engines: {
      html: require('handlebars'),
    },
    relativeTo: __dirname,
    path: 'views',
  });

  // server.route({
  //   method: 'GET',
  //   path: '/',
  //   handler: function (request, h) {
  //     return h.view('index');
  //   }
  // });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
}

start();