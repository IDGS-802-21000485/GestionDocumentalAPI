// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const documentoRoutes = require("./routes/documentoRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🔗 Conectado a MongoDB"))
  .catch((error) => console.log("❌ Error al conectar a MongoDB:", error));

app.use("/api/documentos", documentoRoutes);
app.use("/api/usuarios", usuarioRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
