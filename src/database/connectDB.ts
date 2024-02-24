import { Sequelize } from 'sequelize-typescript';
import { dbConfig } from '~/utils/dbConfig';

export default function connectDB() {
  console.log('dbConfig:', dbConfig);

  const sequelize = new Sequelize({
    database: dbConfig.database,
    username: dbConfig.user,
    password: dbConfig.password,
    host: dbConfig.host,
    dialect: 'mysql',
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    },
    port: dbConfig.port,
    models: [__dirname + '/models'],
    logging: false
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connected to MySQL database');
    })
    .catch((err: Error) => {
      console.error('Error connecting to MySQL database:', err);
    });

  // Synchronize models with the database
  sequelize
    .sync({ force: false, alter: true })
    .then(() => {
      console.log('Database tables synchronized');
    })
    .catch((error) => {
      console.error('Error synchronizing database tables:', error);
    });

  // // Create a connection
  // const connection: Connection = mysql.createConnection(dbConfig);

  // // Connect to the database
  // connection.connect((err: MysqlError) => {
  //   if (err) {
  //     console.error('Error connecting to MySQL database:', err);
  //     return;
  //   }
  //   console.log('Connected to MySQL database');
  // });
  // // Perform database operations here...

  // // Close the connection when done
  // connection.end();
}
