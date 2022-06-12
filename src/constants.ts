export const constants = {
  JWT_SECRET: process.env.jwtSecret ?? 'secret',
  MYSQL_HOST: process.env.mysqlHost ?? 'localhost',
  MYSQL_PORT: Number(process.env.mysqlPort ?? 3306),
  MYSQL_DB: process.env.mysqlDatabase ?? 'nest_test',
  MYSQL_USER: process.env.mysqlUsername ?? 'root',
  MYSQL_PASSWORD: process.env.mysqlPassword ?? 'qwerty1234',

  REDIS_HOST: process.env.redisHost ?? 'localhost',
  REDIS_PORT: Number(process.env.redisPort ?? 6379),
  REDIS_PASSWORD: process.env.redisPassword ?? '',
};
