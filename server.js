// server.js
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Ruta principal de Usuarios
app.use("/api/usuarios", require("./routes/usuarioRoutes"));

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🟢 Servidor corriendo en el puerto ${PORT}`));
