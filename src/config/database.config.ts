import { registerAs } from '@nestjs/config';

console.log(process.env.DATABASE_CONNECTION_STRING);
export default registerAs('database', () => ({
  connectionString: process.env.DATABASE_CONNECTION_STRING,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
}));
