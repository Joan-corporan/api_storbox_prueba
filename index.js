const express = require("express")
 require("dotenv").config()
const app= express()
const port = process.env.PORT || 3000
const cors = require("cors")
const clientsRoutes = require("./routes/getRoute")
const { dbConnection } = require("./db/dataBase")

dbConnection()

app.use(cors())
app.use(express.json());
app.use(express.static("public"));
app.use("/api/clients",clientsRoutes)
app.listen(port,()=>{
    console.log(`Server escuchando en el ${port}`)
})