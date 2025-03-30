const Documento = require("../models/documentoModel");

// 📌 Crear Documento
exports.crearDocumento = async (req, res) => {
  try {
    const { nombreArchivo, tipoArchivo, categoriaId, usuarioId, archivo } = req.body;

    if (!archivo) {
      return res.status(400).json({ mensaje: "El archivo es obligatorio" });
    }

    // Convertir Base64 a Buffer
    const archivoBuffer = Buffer.from(archivo, "base64");

    const nuevoDocumento = new Documento({
      nombreArchivo,
      tipoArchivo,
      categoriaId,
      usuarioId,
      archivo: archivoBuffer
    });

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

    // Convertir Buffer a Base64 antes de enviarlos
    const documentosBase64 = documentos.map((doc) => ({
      ...doc.toObject(),
      archivo: doc.archivo.toString("base64"),
    }));

    res.json(documentosBase64);
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

    // Convertir Buffer a Base64
    const documentosBase64 = documentos.map((doc) => ({
      ...doc.toObject(),
      archivo: doc.archivo.toString("base64"),
    }));

    res.json(documentosBase64);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar documentos por usuario", error });
  }
};

// 📌 Buscar Documento por ID de Documento
exports.obtenerDocumentoPorId = async (req, res) => {
  try {
    const documento = await Documento.findById(req.params.id);

    if (!documento) {
      return res.status(404).json({ mensaje: "Documento no encontrado" });
    }

    // Convertir Buffer a Base64 antes de enviarlo
    const documentoBase64 = documento.archivo.toString("base64");

    res.json({
      ...documento.toObject(),
      archivo: documentoBase64,
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el documento", error });
  }
};

// 📌 Actualizar Documento
exports.actualizarDocumento = async (req, res) => {
  try {
    const { archivo } = req.body;

    // Si el usuario envía un archivo en Base64, lo convertimos a Buffer
    if (archivo) {
      req.body.archivo = Buffer.from(archivo, "base64");
    }

    const documentoActualizado = await Documento.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!documentoActualizado) {
      return res.status(404).json({ mensaje: "Documento no encontrado" });
    }

    // Convertir Buffer a Base64 antes de enviar la respuesta
    const documentoBase64 = {
      ...documentoActualizado.toObject(),
      archivo: documentoActualizado.archivo.toString("base64"),
    };

    res.json(documentoBase64);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar documento", error });
  }
};

// 📌 Eliminar Documento
exports.eliminarDocumento = async (req, res) => {
  try {
    const documentoEliminado = await Documento.findByIdAndDelete(req.params.id);

    if (!documentoEliminado) {
      return res.status(404).json({ mensaje: "Documento no encontrado" });
    }

    res.json({ mensaje: "Documento eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar documento", error });
  }
};
