const jwt = require("jsonwebtoken"); // Asegúrate de tener este módulo importado
const bcrypt = require("bcryptjs");
const { pool } = require("../db/dataBase");

const registrarse = async (req, res) => {
  const { rut, password } = req.body;

  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar el usuario en la base de datos
    await pool.query(
      "INSERT INTO users (rut, password) VALUES ($1, $2)",
      [rut, hashedPassword]
    );

    
    res.status(201).json({ message: "Usuario registrado con éxito" }); // Enviar el token al cliente
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};
module.exports =registrarse