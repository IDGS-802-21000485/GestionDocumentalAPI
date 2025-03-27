// /controllers/usuarioController.js
const Usuario = require("../models/usuarioModel");

// Crear Usuario
exports.crearUsuario = async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear usuario", error });
  }
};

// Obtener Usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuarios", error });
  }
};

// Actualizar Usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar usuario", error });
  }
};

// Eliminar Usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar usuario", error });
  }
};

// Buscar Usuario por cualquier campo
exports.buscarUsuarios = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ mensaje: "Debe proporcionar un término de búsqueda." });
  }

  try {
    const usuarios = await Usuario.find({
      $or: [
        { nombre: { $regex: query, $options: "i" } },
        { apellido: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { telefono: { $regex: query, $options: "i" } }
      ]
    });

    if (usuarios.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron usuarios." });
    }

    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar usuarios", error });
  }
};
