const { pool } = require("../db/dataBase");

const getCliente = async (req, res) => { // Asegúrate de incluir req
    try {
      const result = await pool.query("SELECT * FROM CLIENTES");
      console.log(result);
      const clientes = result.rows; // Accede a los datos
      res.status(200).json(clientes); // Envía los clientes como respuesta
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Error al obtener los clientes",
        error: err,
      });
    }
  };
  

module.exports = getCliente;

