// /models/usuarioModel.js
const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  telefono: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  rol: { type: String, enum: ["administrador", "docente", "administrativo"], required: true },
  fechaRegistro: { type: Date, default: Date.now }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
