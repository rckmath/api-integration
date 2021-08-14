import Constants from './src/config/constants.js';
import initializeDatabase from './src/config/db.js';
import server from './src/server.js';

const { port } = Constants;

initializeDatabase(Constants);

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
