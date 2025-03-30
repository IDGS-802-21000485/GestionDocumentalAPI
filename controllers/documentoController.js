const Documento = require("../models/documentoModel");

// 📌 Crear Documento
exports.crearDocumento = async (req, res) => {
  try {
    const nuevoDocumento = new Documento(req.body);
    const documentoGuardado = await nuevoDocumento.save();
    res.status(201).json(documentoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear documento", error });
  }
};

// 📌 Obtener Todos los Documentos
exports.obtenerDocumentos = async (req, res) => {
  try {
    const documentos = await Documento.find();
    res.json(documentos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener documentos", error });
  }
};

// 📌 Buscar Documentos por ID de Usuario
exports.buscarDocumentosPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const documentos = await Documento.find({ usuarioId: idUsuario }).populate("usuarioId");

    if (documentos.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron documentos para este usuario." });
    }

    res.json(documentos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar documentos por usuario", error });
  }
};

// 📌 Buscar Documento por ID de Documento
exports.buscarDocumentoPorId = async (req, res) => {
  const { idDocumento } = req.params;

  try {
    const documento = await Documento.findById(idDocumento).populate("_id");

    if (!documento) {
      return res.status(404).json({ mensaje: "Documento no encontrado." });
    }

    res.json(documento);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar el documento", error });
  }
};

// 📌 Actualizar Documento
exports.actualizarDocumento = async (req, res) => {
  try {
    const documentoActualizado = await Documento.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(documentoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar documento", error });
  }
};

// 📌 Eliminar Documento
exports.eliminarDocumento = async (req, res) => {
  try {
    await Documento.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Documento eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar documento", error });
  }
};
