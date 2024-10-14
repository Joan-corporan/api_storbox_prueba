const {pool}=require("../db/dataBase")

const deleteUserOfList=async(req,res)=>{
    try {
    const {rut}=req.params
    const response= await pool.query("DELETE FROM users WHERE rut=$1", [rut])

    if(response.rowCount===0)
        return res.status(404).json({
            status: 'Error',
            message: "El usuario no existe"
        })
        res.status(200).json({
            status: 'Success',
            message: "Usuario eliminado correctamente"
        })
} catch (error) {
    res.status(500).json({
        status: 'Error',
        message: "Hubo un error al eliminar el usuario",
        detail: error.message
    })
}
}
module.exports=deleteUserOfList