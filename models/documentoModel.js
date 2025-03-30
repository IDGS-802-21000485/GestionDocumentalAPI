const { text } = require("express");
const mongoose = require("mongoose");

const documentoSchema = new mongoose.Schema({
  nombreArchivo: { type: String, required: true },
  tipoArchivo: { type: String, required: true },
  categoriaId: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria", required: true },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  fechaSubida: { type: Date, default: Date.now },
  archivo: { type: Buffer, required: true }
});

// Definir y exportar el modelo correctamente
const Documento = mongoose.model("Documento", documentoSchema);

module.exports = Documento;
