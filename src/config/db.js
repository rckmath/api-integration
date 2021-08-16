import mongoose from 'mongoose';

const initializeDatabase = (Constants, isJob) => {
  const { db } = Constants;

  const _prefix = isJob ? 'Job' : 'API';

  mongoose
    .connect(db.uri, {
      user: db.user,
      pass: db.pass,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

  mongoose.connection.on('error', () => console.error(`${_prefix} connection error: `));
  mongoose.connection.once('open', () => console.log(`${_prefix} connected with '${db.name}' database`));
  mongoose.connection.on('disconnected', () => console.log(`${_prefix} database connection lost`));
};

export default initializeDatabase;
