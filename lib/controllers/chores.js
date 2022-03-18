const { Router } = require('express');
const Chore = require('../models/Chore');

module.exports = Router().post('/', async (req, res) => {
  const friend = await Chore.insert(req.body);
  res.send(friend);
});
