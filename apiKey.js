module.exports = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== '123456') {
    return res.status(403).json({ error: 'API KEY inválida' });
  }

  next();
};