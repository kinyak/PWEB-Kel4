module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'alumnifti',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    define: {
      freezeTableName: true
    },
    logging: console.log 
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
    database: 'alumnifti',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    define: {
      freezeTableName: true
    },
  }
};
