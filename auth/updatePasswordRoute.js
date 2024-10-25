const express = require("express");
const bcrypt = require("bcryptjs");
const { pool } = require("../db/dataBase");
const updatePasswordRoute=async(req, res) => {
    const { rut, newPassword, secretKey } = req.body;

    // Verifica la clave secreta
    if (secretKey !== process.env.JWT_SECRET) {
        return res.status(403).json({ message: "Acceso denegado" });
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const result = await pool.query(
            "UPDATE users SET password = $1 WHERE rut = $2 RETURNING *",
            [hashedPassword, rut]
        );

        if (result.rows.length > 0) {
            return res.json({ message: "Contraseña actualizada con éxito" });
        } else {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        return res.status(500).json({ message: "Error al actualizar la contraseña" });
    }
}
module.exports =  updatePasswordRoute ;