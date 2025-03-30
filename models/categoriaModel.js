const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
  nombreCategoria: { type: String, required: true, unique: true }
});

const Categoria = mongoose.model("Categoria", categoriaSchema);

module.exports = Categoria;
