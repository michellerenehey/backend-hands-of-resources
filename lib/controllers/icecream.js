const { Router } = require('express');
const IceCream = require('../models/IceCream');

module.exports = Router()
  .post('/', async (req, res) => {
    const icecream = await IceCream.insert(req.body);
    res.send(icecream);
  })

  .get('/', async (req, res) => {
    const icecream = await IceCream.findAll();
    res.send(icecream);
  })

  .get('/:id', async (req, res) => {
    const icecream = await IceCream.findById(req.params.id);
    res.send(icecream);
  });
