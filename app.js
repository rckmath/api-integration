import Constants from './src/config/constants.js';
import initializeDatabase from './src/config/db.js';
import server from './src/server.js';

const { port } = Constants;
const { host } = Constants;

initializeDatabase(Constants);

server.listen(port, host, () => {
  console.log(`Listening on port: ${port}`);
});
