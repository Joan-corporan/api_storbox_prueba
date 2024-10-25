const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const cors = require("cors");

const clientsRoutes = require("./routes/getRoute");
const { dbConnection } = require("./db/dataBase");
const verifyToken = require("./auth/vericarToken");
const login = require("./auth/login");
const registrarse = require("./auth/register");
const createClient = require("./controller/postClient");


app.use(express.json());
const corsOptions = {
    origin: ['http://localhost:5173',process.env.URL_FRONTENDD], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  };
  app.use(cors(corsOptions));
app.use(express.static("public"));
app.use("/api/clients/login", login);
app.use("/api/clients/registrarse", verifyToken, registrarse);
app.use("/api/clients/create", verifyToken, createClient);

app.use("/api/clients", verifyToken, clientsRoutes);
app.listen(port, () => {
  console.log(`Server escuchando en el ${port}`);
});
