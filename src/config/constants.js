export default class Constants {
  static env = process.env.NODE_ENV;

  static port = process.env.PORT;
  static host = process.env.HOST;

  static db = {
    uri: process.env.DATABASE_URI,
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    name: process.env.DATABASE_NAME,
  };

  static bling = {
    apiKey: process.env.BLING_API_KEY,
    baseUrl: process.env.BLING_BASE_URL,
  }

  static pipedrive = {
    apiKey: process.env.PIPEDRIVE_API_KEY,
    baseUrl: process.env.PIPEDRIVE_BASE_URL,
  }
}