// /config/db.js
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("🟢 Conexión a MongoDB Atlas exitosa");
  } catch (error) {
    console.error("🔴 Error de conexión a MongoDB:", error);
    process.exit(1); // Salir si falla la conexión
  }
};

module.exports = connectDB;
