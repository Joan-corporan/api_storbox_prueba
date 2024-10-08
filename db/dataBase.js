const { Pool } = require('pg');
// const DB_NAME= process.env.DB_NAME 
// const DB_PASSWORD= process.env.DB_PASSWORD
// const DB_HOST= process.env.DB_HOST
// const DB_USER= process.env.DB_USER
// const DB_PORT= process.env.DB_PORT


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME ,
  password: process.env.DB_PASSWORD ,
  port: process.env.DB_PORT
});
const dbConnection = async () => {
    try {
  
      await pool.query('SELECT NOW()');
      console.log('Base de datos conectada correctamente');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      throw new Error('Error al iniciar la base de datos');
    }
  };
  
  module.exports = {
    dbConnection,
    pool
  
  };

