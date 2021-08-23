const http = require('http'); // on importe http
const app = require('./app'); // on importe l'app

// Renvoie un port valide qu'il soit sous la forme d'une chaine ou d'un numéro 
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


// Recherche les differentes erreurs et les geres de manière appropriés puis l'enregistre dans le serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// crée le serveur
const server = http.createServer(app);

server.on('error', errorHandler); // Gère les erreurs s'il y'en a

// Ecoute les evenements et consigne le port ou le canal nommé sur lequel le server s'exécute dans la console 
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port); // Le serveur est à l'ecoute sur le port configuré plus haut
