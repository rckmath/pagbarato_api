export default class Constants {
  public static env = process.env.NODE_ENV;

  public static port = process.env.PORT;

  public static db = { url: process.env.DATABASE_URL };
}
