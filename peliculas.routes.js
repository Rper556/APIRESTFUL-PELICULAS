const express = require('express');
const router = express.Router();
const service = require('../services/peliculas.service');

// ✅ GET -> /peliculas (todas)
router.get('/', async (req, res) => {
  try {
    const peliculas = await service.getAll();
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener películas"
    });
  }
});

// ✅ GET -> /peliculas/:id
router.get('/:id', async (req, res) => {
  try {
    const pelicula = await service.getById(req.params.id);

    if (!pelicula) {
      return res.status(404).json({
        error: "Película no encontrada"
      });
    }

    res.json(pelicula);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener la película"
    });
  }
});

// ✅ POST -> /peliculas
router.post('/', async (req, res) => {
  try {
    const { titulo, director, anio } = req.body;

    // Validación básica
    if (!titulo) {
      return res.status(400).json({
        error: "El campo 'titulo' es obligatorio"
      });
    }

    const nueva = await service.create({ titulo, director, anio });
    res.status(201).json(nueva);

  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// ✅ PUT -> /peliculas/:id
router.put('/:id', async (req, res) => {
  try {
    const { titulo, director, anio } = req.body;

    const actualizada = await service.update(req.params.id, {
      titulo,
      director,
      anio
    });

    if (!actualizada) {
      return res.status(404).json({
        error: "Película no encontrada"
      });
    }

    res.json(actualizada);

  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// ✅ DELETE -> /peliculas/:id
router.delete('/:id', async (req, res) => {
  try {
    const eliminada = await service.remove(req.params.id);

    if (!eliminada) {
      return res.status(404).json({
        error: "Película no encontrada"
      });
    }

    res.json({
      mensaje: "Película eliminada correctamente"
    });

  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar la película"
    });
  }
});

module.exports = router;