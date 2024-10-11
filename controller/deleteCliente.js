const { pool } = require("../db/dataBase")


const deleteCliente=async(req,res)=>{
    try {
        const{rut_cliente} =req.params
        const response = await pool.query('DELETE FROM clientes WHERE rut_cliente=$1',[rut_cliente])
        
        if(response.rowCount===0){
            return res.status(404).json({message: "El cliente no existe"})
        }
        
        res.status(200).json({message: "El cliente ha sido eliminado correctamente"})
        
        
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el cliente",
            error: error.message
        })
    }
}

module.exports = deleteCliente
    
