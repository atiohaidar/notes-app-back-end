const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({ 
    
    port: '5000',
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'], // awalnya ini ga bisa, ternyata ada kebijakan baru, jadi ada yang kudu di disable
        //penjelasannya:  https://www.dicoding.com/academies/261/discussions/133122
      },
    },
  });
  server.route(routes) // atur route nya
  await server.start()
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init()
