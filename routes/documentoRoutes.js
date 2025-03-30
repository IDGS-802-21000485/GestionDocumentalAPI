const express = require("express");
const router = express.Router();
const documentoController = require("../controllers/documentoController");

router.post("/", documentoController.crearDocumento);
router.get("/", documentoController.obtenerDocumentos);
router.get("/usuario/:idUsuario", documentoController.buscarDocumentosPorUsuario);
router.get("/:idDocumento", documentoController.buscarDocumentoPorId);
router.put("/:id", documentoController.actualizarDocumento);
router.delete("/:id", documentoController.eliminarDocumento);

module.exports = router;
