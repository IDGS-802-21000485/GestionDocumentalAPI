const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");

router.post("/", categoriaController.crearCategoria); // Crear
router.get("/", categoriaController.obtenerCategorias); // Obtener todas
router.get("/:id", categoriaController.obtenerCategoriaPorId); // Obtener por ID
router.put("/:id", categoriaController.actualizarCategoria); // Actualizar
router.delete("/:id", categoriaController.eliminarCategoria); // Eliminar

module.exports = router;
