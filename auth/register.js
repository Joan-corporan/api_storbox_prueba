const bcrypt = require("bcryptjs");
const { pool } = require("../db/dataBase");

const registrarse = async (req, res) => {
  const { rut, password,name } = req.body;

  const userExists = await pool.query("SELECT * FROM users WHERE rut = $1", [rut]);
  
  if (userExists.rows.length > 0) {
    return res.status(409).json({ message: "El Rut ya existe!" }); 
  }

  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar el usuario en la base de datos
    await pool.query(
      "INSERT INTO users (rut, password, nombre) VALUES ($1, $2, $3)",
      [rut, hashedPassword, name]
    );

    
    res.status(201).json({ message: "Usuario registrado con éxito" }); // Enviar el token al cliente
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};
module.exports =registrarse