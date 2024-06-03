module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'alumnifti',
    host: 'localhost',
    port: 3307,
    dialect: 'mysql',
    define: {
      freezeTableName: true
    },
    logging: console.log // Enable logging to console
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
