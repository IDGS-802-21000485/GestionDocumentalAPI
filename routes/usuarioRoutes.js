// /routes/usuarioRoutes.js
const express = require("express");
const router = express.Router();
const {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario
} = require("../controllers/usuarioController");

// Rutas CRUD
router.post("/", crearUsuario);            // Crear usuario
router.get("/", obtenerUsuarios);          // Obtener todos los usuarios
router.put("/:id", actualizarUsuario);     // Actualizar usuario
router.delete("/:id", eliminarUsuario);    // Eliminar usuario

module.exports = router;
