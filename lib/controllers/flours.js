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
      res.send(flour);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const flour = await Flour.updateById(req.params.id, req.body);
      res.send(flour);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
