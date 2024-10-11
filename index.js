const express = require("express")
require("dotenv").config()
const app= express()
const port = process.env.PORT || 3000
const cors = require("cors")
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const clientsRoutes = require("./routes/getRoute")
const { dbConnection } = require("./db/dataBase")
const verifyToken = require("./auth/vericarToken")
const login= require("./auth/login")
const registrarse = require("./auth/register")
const createClient = require("./controller/postClient")

dbConnection()
const swaggerDocument = YAML.load('./api/openApi.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors())
app.use(express.json());
app.use(express.static("public"));
app.use("/api/clients/api/login", login); 
app.use("/api/clients/api/registrarse",verifyToken, registrarse); 

app.use("/api/clients/create", verifyToken, createClient)

app.use("/api/clients",verifyToken, clientsRoutes)
app.listen(port,()=>{
    console.log(`Server escuchando en el ${port}`)
    console.log('Documentación API disponible en http://localhost:3000/api-docs')
})