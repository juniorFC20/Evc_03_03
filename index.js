require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado a MongoDB"))
.catch(err => console.error("❌ Error al conectar:", err));


const Cita = require('./models/Cita');


async function insertarDatosDeEjemplo() {
  const cantidad = await Cita.countDocuments();
  if (cantidad === 0) {
    await Cita.insertMany([
      {
        paciente: "Ana Torres",
        doctor: "Dr. Julio Ramirez",
        especialidad: "Ginecología",
        fecha: new Date("2025-07-25"),
        hora: "09:00",
        motivo: "Controles prenatales"
      },
      {
        paciente: "Carlos Mendoza",
        doctor: "Dra. Sara Delgado",
        especialidad: "Dermatología",
        fecha: new Date("2025-07-26"),
        hora: "14:30",
        motivo: "Revisión de manchas en la piel"
      },
      {
        paciente: "Luisa Acosta",
        doctor: "Dr. Ernesto Salas",
        especialidad: "Oftalmología",
        fecha: new Date("2025-07-27"),
        hora: "11:15",
        motivo: "Control visual anual"
      }
    ]);
    console.log("📌 Datos de ejemplo insertados.");
  }
}
insertarDatosDeEjemplo();

const citasRoutes = require('./routes/citas');
app.use('/api/citas', citasRoutes);

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
