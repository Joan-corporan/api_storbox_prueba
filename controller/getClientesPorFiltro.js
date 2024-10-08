const { pool } = require("../db/dataBase");

const getClientePorFiltro = async (req, res) => {
  try {
    const {
      id_sucursal,
      nombre_cliente,
      email_cliente,
      telefono_cliente,
      fecha_desde,
      fecha_hasta,
      rut_cliente,
    } = req.query;
    if (
        !id_sucursal &&
        !nombre_cliente &&
        !email_cliente &&
        !telefono_cliente &&
        !fecha_desde &&
        !fecha_hasta &&
        !rut_cliente
      ) {
        return res.status(400).json({ message: "Debe proporcionar al menos un filtro para realizar la búsqueda" });
      }

    let query = "SELECT * FROM clientes WHERE 1=1";
    const values = [];
    
    if (id_sucursal) {
      query += ` AND id_sucursal = $${values.length + 1}`;
      values.push(id_sucursal);
    }
    if (rut_cliente) {
      query += ` AND rut_cliente = $${values.length + 1}`;
      values.push(rut_cliente);
    }
    if (nombre_cliente) {
      query += ` AND nombre_cliente ILIKE $${values.length + 1}`;
      values.push(`%${nombre_cliente}%`);
    }
    if (email_cliente) {
      query += ` AND email_cliente ILIKE $${values.length + 1}`;
      values.push(`%${email_cliente}%`);
    }
    if (telefono_cliente) {
      query += ` AND telefono_cliente ILIKE $${values.length + 1}`;
      values.push(`%${telefono_cliente}%`);
    }
    if (fecha_desde && fecha_hasta) {
      query += ` AND fecha_registro BETWEEN $${values.length + 1} AND $${
        values.length + 2
      }`;
      values.push(fecha_desde, fecha_hasta);
    } else if (fecha_desde) {
      query += ` AND fecha_registro >= $${values.length + 1}`;
      values.push(fecha_desde);
    } else if (fecha_hasta) {
      query += ` AND fecha_registro <= $${values.length + 1}`;
      values.push(fecha_hasta);
    }

    const clientes = await pool.query(query, values);
    if (clientes.rowCount === 0) {
      return res.status(404).json({
        message: "No se encontraron clientes con los filtros ingresados",
      });
    }
    console.log(values);
    res.status(200).json({
      status: "Success",
      detail: clientes.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Error al obtener los clientes",
      detail: err.message || err,
    });
  }
};
module.exports = getClientePorFiltro;
