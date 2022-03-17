const { Router } = require('express');
const IceCream = require('../models/IceCream');

module.exports = Router().post('/', async (req, res) => {
  const icecream = await IceCream.insert(req.body);
  res.send(icecream);
});
