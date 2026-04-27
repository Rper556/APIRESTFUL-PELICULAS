const Pelicula = require('../modules/pelicula.model');

const getAll = () => Pelicula.findAll();

const getById = (id) => Pelicula.findByPk(id);

const create = (data) => Pelicula.create(data);

const update = async (id, data) => {
  const pelicula = await Pelicula.findByPk(id);
  if (!pelicula) return null;
  return pelicula.update(data);
};

const remove = async (id) => {
  const pelicula = await Pelicula.findByPk(id);
  if (!pelicula) return null;
  await pelicula.destroy();
  return true;
};

module.exports = { getAll, getById, create, update, remove };