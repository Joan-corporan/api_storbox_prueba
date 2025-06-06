const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../db/dataBase");

const inicioDeSesion= async (req, res) => {
    const { rut, password } = req.body;

    try {
        // Buscar el usuario en la base de datos
        const result = await pool.query(
            "SELECT * FROM users WHERE rut = $1",
            [rut]
        );

        const user = result.rows[0];

        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }
        console.log("Valor de admin del usuario:", user.admin);

        // Generar un token JWT
        const token = jwt.sign({ userId: user.id, admin: user.admin }, process.env.JWT_SECRET, {
            expiresIn: "7h",
        });

        
        res.json({
            token,
            message: "Sesión iniciada correctamente",
            user: {
                nombre: user.nombre,
                rut:user.rut,
                admin: user.admin
                
              }
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
};
module.exports= inicioDeSesion