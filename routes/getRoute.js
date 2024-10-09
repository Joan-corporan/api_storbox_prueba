const {Router} = require('express');
const getCliente = require('../controller/getCliente');
const updateClient = require('../controller/putClient');
const createClient = require('../controller/postClient');
const getClientePorFiltro = require('../controller/getClientesPorFiltro');
const resgistrarse = require('../auth/register');
const inicioDeSesion = require('../auth/login');

const router =Router()
router.get("/getAll",getCliente)
router.get("/filtro",getClientePorFiltro)
router.post("/create",createClient)
router.put("/:rut_cliente",updateClient)

// Ruta de registro y inicio de sesion

router.post("/api/registrarse",resgistrarse)
router.post("/api/login",inicioDeSesion)

module.exports = router