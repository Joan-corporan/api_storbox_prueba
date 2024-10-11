const { pool } = require("../db/dataBase"); 

const updateClient=async(req, res)=>{
    try {
        const {rut_cliente}=req.params;
        const  {id_sucursal, nombre_cliente, email_cliente, telefono_cliente, fecha_registro }=req.body;
        
        if(!id_sucursal||!nombre_cliente||!email_cliente||!telefono_cliente||!fecha_registro){
            return res.status(400).json({
                status: 'Error',
                message: "Todos los campos son obligatorios para la actualización"
            })
        }
      
    const clienteActual = await pool.query('SELECT * FROM clientes WHERE rut_cliente=$1', [rut_cliente]);
    
    
    if (clienteActual.rowCount === 0) {
      return res.status(404).json({
        status: 'Error',
        message: "El cliente no existe",
      });
    }

    const cliente = clienteActual.rows[0]; // Datos actuales del cliente
    
   
    if (
      cliente.id_sucursal === id_sucursal &&
      cliente.nombre_cliente === nombre_cliente &&
      cliente.email_cliente === email_cliente &&
      cliente.telefono_cliente === telefono_cliente  
      
    ) {
      return res.status(400).json({
        status: 'Error',
        message: "No hay modificaciones a realizar, los datos son los mismos",
      });
    }
    
   
    const nuevoCliente = await pool.query(
      'UPDATE clientes SET id_sucursal=$1, nombre_cliente=$2, email_cliente=$3, telefono_cliente=$4, fecha_registro=$5 WHERE rut_cliente=$6',
      [id_sucursal, nombre_cliente, email_cliente, telefono_cliente, fecha_registro, rut_cliente]
    );

        res.status(200).json({
            message: 'Cliente actualizado correctamente',
            
        });

        
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el cliente',
            error: error.message
        })
    }

}
module.exports= updateClient