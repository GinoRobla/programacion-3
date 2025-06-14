const express = require("express");
const app = express();
const cors = require("cors");

const personaRoutes = require("./routes/persona.routes");

app.use(express.json());
app.use(cors());
app.use("/api", personaRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
