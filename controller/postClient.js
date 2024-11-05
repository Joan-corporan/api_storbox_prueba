const { pool } = require("../db/dataBase");

const createClient = async (req, res) => {
  try {
    const {
      id_sucursal,
      rut_cliente,
      nombre_cliente,
      email_cliente,
      telefono_cliente,
      genero
    } = req.body;
    const fecha_registro = new Date();

   
     const rutExistente = await pool.query(
       "SELECT * FROM clientes WHERE rut_cliente = $1 ",
       [rut_cliente]
     );
     if(rutExistente.rowCount>0){
        return res.status(400).json({ message: "El rut del cliente ya existe" });
     }
    
   
    const nuevoRegistro = await pool.query(
      "INSERT INTO CLIENTES (id_sucursal, rut_cliente, nombre_cliente, email_cliente, telefono_cliente, fecha_registro, genero) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [
        id_sucursal,
        rut_cliente,
        nombre_cliente,
        email_cliente,
        telefono_cliente,
        fecha_registro,
        genero
      ]
    );
    
    res.status(201).json({
      status: "Success",
      message: "Cliente creado correctamente",
      detail: nuevoRegistro,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "Hubo un error al crear el cliente",
      detail: error.message,
    });
  }
};
module.exports = createClient;
