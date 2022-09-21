import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'postgres',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'devtraining',
        entities: [__dirname + '/**/*.entity.js'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
