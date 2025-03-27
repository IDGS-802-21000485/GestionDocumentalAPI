// /routes/usuarioRoutes.js
const express = require("express");
const router = express.Router();
const {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
  buscarUsuarios
} = require("../controllers/usuarioController");

// Rutas CRUD
router.post("/", crearUsuario);
router.get("/", obtenerUsuarios);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

// Ruta de búsqueda
router.get("/buscar", buscarUsuarios);

module.exports = router;
