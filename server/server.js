const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
  // Custom login logic here
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running on http://localhost:3001');
});
