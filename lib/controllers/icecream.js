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

  .get('/:id', async (req, res, next) => {
    try {
      const icecream = await IceCream.findById(req.params.id);
      res.send(icecream);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const icecream = await IceCream.updateById(req.params.id, req.body);
      res.send(icecream);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    console.log('req', req.params.id);
    const icecream = await IceCream.deleteById(req.params.id);
    res.send(icecream);
  });
