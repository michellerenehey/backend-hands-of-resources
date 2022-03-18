const { Router } = require('express');
const Flour = require('../models/Flour');

module.exports = Router()
  .post('/', async (req, res) => {
    const flour = await Flour.insert(req.body);
    res.send(flour);
  })

  .get('/', async (req, res) => {
    const flours = await Flour.findAll();
    res.send(flours);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const flour = await Flour.findById(req.params.id);
      if (!flour) {
        const error = new Error('Flour not found');
        error.status = 404;
        throw error;
      }
      res.send(flour);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const flour = await Flour.updateById(req.params.id, req.body);
    res.send(flour);
  })

  .delete('/:id', async (req, res) => {
    const flour = await Flour.deleteById(req.params.id);
    res.send(flour);
  });
