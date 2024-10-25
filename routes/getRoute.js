const {Router} = require('express');
/* const getCliente = require('../controller/getCliente'); */
const updateClient = require('../controller/putClient');
const createClient = require('../controller/postClient');
const getClientePorFiltro = require('../controller/getClientesPorFiltro');
/* const resgistrarse = require('../auth/register'); */
/* const inicioDeSesion = require('../auth/login'); */
const deleteCliente  = require('../controller/deleteCliente');
const getListaDeUsers = require('../controller/getListaDeUsers');
const deleteUserOfList = require('../controller/deleteUserOfList');
const getCliente = require('../controller/getCliente');
/* const updatePasswordRoute = require('../auth/updatePasswordRoute'); */

const router =Router()

router.get("/filtro",getClientePorFiltro)
router.get("/getUserList",getListaDeUsers)
router.get("/getAll", getCliente)
router.put("/:rut_cliente",updateClient)
router.post("/create",createClient)
/* router.post("update-password",updatePasswordRoute) */
router.delete("/:rut_cliente",deleteCliente)
router.delete("/usuarios/:rut",deleteUserOfList)




module.exports = router