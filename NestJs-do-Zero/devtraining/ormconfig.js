module.exports = {
  type: 'postgres',
  host: 'postgres', //nome no docker compose
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'devtraining',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: __dirname + '/src/migrations',
  },
};
