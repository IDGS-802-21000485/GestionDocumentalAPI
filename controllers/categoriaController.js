const Categoria = require("../models/categoriaModel");

// 📌 Crear Categoría
exports.crearCategoria = async (req, res) => {
  try {
    const nuevaCategoria = new Categoria(req.body);
    const categoriaGuardada = await nuevaCategoria.save();
    res.status(201).json(categoriaGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear categoría", error });
  }
};

// 📌 Obtener todas las Categorías
exports.obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener categorías", error });
  }
};

// 📌 Obtener Categoría por ID
exports.obtenerCategoriaPorId = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar la categoría", error });
  }
};

// 📌 Actualizar Categoría
exports.actualizarCategoria = async (req, res) => {
  try {
    const categoriaActualizada = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!categoriaActualizada) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }
    res.json(categoriaActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar categoría", error });
  }
};

// 📌 Eliminar Categoría
exports.eliminarCategoria = async (req, res) => {
  try {
    const categoriaEliminada = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoriaEliminada) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }
    res.json({ mensaje: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar categoría", error });
  }
};
