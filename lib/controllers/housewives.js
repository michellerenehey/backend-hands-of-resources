const { Router } = require('express');
const Housewife = require('../models/Housewife');

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
      if (!housewife) {
        const error = new Error('Housewife not found');
        error.status = 404;
        throw error;
      }
      res.send(housewife);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const updatedHousewife = await Housewife.updateById(
      req.params.id,
      req.body
    );
    res.send(updatedHousewife);
  })

  .delete('/:id', async (req, res) => {
    const housewife = await Housewife.deleteById(req.params.id);
    res.send(housewife);
  });
