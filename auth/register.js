const bcrypt = require("bcryptjs");



const resgistrarse=async(req,res)=>{
    const { username, password } = req.body;

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Guardar el usuario en la base de datos
        await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2)",
            [username, hashedPassword]
        );

        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al registrar el usuario" });
    }
};
module.exports = resgistrarse;
