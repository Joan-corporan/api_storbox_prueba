const {Router} = require('express');
/* const getCliente = require('../controller/getCliente'); */
const updateClient = require('../controller/putClient');
const createClient = require('../controller/postClient');
const getClientePorFiltro = require('../controller/getClientesPorFiltro');
const resgistrarse = require('../auth/register');
const inicioDeSesion = require('../auth/login');
const deleteCliente  = require('../controller/deleteCliente');

const router =Router()
/* router.get("/getAll",getCliente) */
router.get("/filtro",getClientePorFiltro)
router.put("/:rut_cliente",updateClient)
router.post("/create",createClient)
router.delete("/:rut_cliente",deleteCliente)

// Ruta de registro y inicio de sesion

/* router.post("/api/registrarse",resgistrarse)
router.post("/api/login",inicioDeSesion) */

module.exports = router