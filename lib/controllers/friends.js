const { Router } = require('express');
const Friend = require('../models/Friend');

module.exports = Router().post('/', async (req, res) => {
  const friend = await Friend.insert(req.body);
  res.send(friend);
});
