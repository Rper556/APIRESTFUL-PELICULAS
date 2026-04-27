const express = require('express');
const sequelize = require('./database');

const peliculasRoutes = require('./routes/peliculas.routes');
const logger = require('./middlewares/logger');
const apiKey = require('./middlewares/apiKey');

const app = express();

app.use(express.json());
app.use(logger);
app.use(apiKey);

app.use('/peliculas', peliculasRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
  });
});