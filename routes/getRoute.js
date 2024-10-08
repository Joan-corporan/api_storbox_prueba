const {Router} = require('express');
const getCliente = require('../controller/getCliente');
const updateClient = require('../controller/putClient');
const createClient = require('../controller/postClient');
const getClientePorFiltro = require('../controller/getClientesPorFiltro');

const router =Router()

router.get("/getAll",getCliente)
router.get("/filtro",getClientePorFiltro)
router.post("/create",createClient)
router.put("/:rut_cliente",updateClient)


module.exports = router