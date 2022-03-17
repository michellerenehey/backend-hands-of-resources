const { Router } = require('express');
const Housewife = require('../models/Housewife');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const housewife = await Housewife.insert(req.body);
    res.send(housewife);
  })

  .get('/', async (req, res) => {
    const housewives = await Housewife.findAll();
    res.send(housewives);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const housewife = await Housewife.findById(req.params.id);
      res.send(housewife);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const updatedHousewife = await Housewife.updateById(
        req.params.id,
        req.body
      );
      if (!updatedHousewife) {
        const error = new Error('No updated housewife found.');
        error.status = 404;
        throw error;
      }
      res.send(updatedHousewife);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const housewife = await Housewife.deleteById(req.params.id);
    res.send(housewife);
  });
