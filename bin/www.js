const app = require('../app');
const debug = require('debug')('server:server');
const http = require('http');
const mongoose = require('mongoose')
const dataLoader = require('../utils/dataLoader')
const chalk = require('chalk')

const SocketServer = require('../routes/socket');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
const server = http.createServer(app);

dataLoader().then(() => {
  server.listen(port, () => console.log(`Listen localhost:${port}`));
  server.on('error', onError);
  server.on('listening', onListening);

  new SocketServer(server);
}).catch(er => console.log(chalk.redBright('DATA_LOADER_ER:'), er))


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}



function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}


function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
