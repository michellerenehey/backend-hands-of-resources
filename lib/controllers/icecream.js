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
      if (!icecream) {
        const error = new Error('icecream not found');
        error.status = 404;
        throw error;
      }
      res.send(icecream);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const icecream = await IceCream.updateById(req.params.id, req.body);
    res.send(icecream);
  })

  .delete('/:id', async (req, res) => {
    const icecream = await IceCream.deleteById(req.params.id);
    res.send(icecream);
  });
