const {Router} = require('express');
const updateClient = require('../controller/putClient');
const createClient = require('../controller/postClient');
const getClientePorFiltro = require('../controller/getClientesPorFiltro');
const deleteCliente  = require('../controller/deleteCliente');
const getListaDeUsers = require('../controller/getListaDeUsers');
const deleteUserOfList = require('../controller/deleteUserOfList');
const getCliente = require('../controller/getCliente');
const registrarse = require('../auth/register');
const checkAdmin = require('../auth/checkAdmin');


const router =Router()

router.get("/filtro",getClientePorFiltro)
router.get("/getUserList",checkAdmin,getListaDeUsers)
router.get("/getAll", getCliente)
router.put("/:rut_cliente",updateClient)
router.post("/create",createClient)
router.delete("/:rut_cliente",deleteCliente)
router.delete("/usuarios/:rut",checkAdmin,deleteUserOfList)
router.post("/registrarse",checkAdmin, registrarse);
/* app.post("/api/clients/create", verifyToken, createClient); */



module.exports = router