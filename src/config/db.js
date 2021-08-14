import mongoose from 'mongoose';

const initializeDatabase = (Constants) => {
  const { db } = Constants;

  mongoose
    .connect(db.uri, {
      user: db.user,
      pass: db.pass,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

  mongoose.connection.on('error', () => console.error('Connection error: '));
  mongoose.connection.once('open', () => console.log(`Connected with '${db.name}' database`));
  mongoose.connection.on('disconnected', () => console.log('Database connection lost'));
};

export default initializeDatabase;
