const {pool}= require("../db/dataBase")


const getListaDeUsers=async(req,res)=>{
   const {rut}=req.query
    try {
        const response = await pool.query("SELECT nombre, rut, created_at  FROM users WHERE rut != $1",[rut])
            
           

        const usuario=response.rows
        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los usuarios",
            error: error,
        })
    }
}
module.exports= getListaDeUsers