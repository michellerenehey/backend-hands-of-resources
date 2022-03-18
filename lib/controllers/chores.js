const { Router } = require('express');
const Chore = require('../models/Chore');

module.exports = Router()
  .post('/', async (req, res) => {
    const chore = await Chore.insert(req.body);
    res.send(chore);
  })

  .get('/', async (req, res) => {
    const chores = await Chore.findAll();
    res.send(chores);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const chore = await Chore.findById(req.params.id);
      if (!chore) {
        const error = new Error('Chore not found');
        error.status = 404;
        throw error;
      }
      res.send(chore);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const chore = await Chore.updateById(req.params.id, req.body);
    res.send(chore);
  })

  .delete('/:id', async (req, res) => {
    const chore = await Chore.deleteById(req.params.id);
    res.send(chore);
  });
