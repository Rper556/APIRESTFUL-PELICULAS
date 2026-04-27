const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Pelicula = sequelize.define('Pelicula', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  director: DataTypes.STRING,
  anio: DataTypes.INTEGER
});

module.exports = Pelicula;