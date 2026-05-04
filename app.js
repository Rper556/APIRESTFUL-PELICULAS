const express = require('express');
const app = express();

// 📦 IMPORTS
const peliculasRoutes = require('./routes/peliculas.routes');
const auth = require('./middlewares/auth');

// 🔐 JWT
const jwt = require('jsonwebtoken');
const SECRET_KEY = "123456";

// ✅ MIDDLEWARES
app.use(express.json());

// 📝 LOGGER
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 🔑 API KEY
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== "123456") {
    return res.status(403).json({
      error: "API Key inválida"
    });
  }

  next();
});

// 🔐 LOGIN (NO protegido con JWT)
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  if (usuario === "admin" && password === "1234") {

    const token = jwt.sign(
      { usuario },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  }

  res.status(401).json({
    error: "Credenciales incorrectas"
  });
});

// 🎬 RUTAS PROTEGIDAS
app.use('/peliculas', auth, peliculasRoutes);

// 🚀 SERVIDOR
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});