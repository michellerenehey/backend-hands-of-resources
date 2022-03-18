const { Router } = require('express');
const Friend = require('../models/Friend');

module.exports = Router()
  .post('/', async (req, res) => {
    const friend = await Friend.insert(req.body);
    res.send(friend);
  })

  .get('/', async (req, res) => {
    const friend = await Friend.findAll();
    res.send(friend);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const friend = await Friend.findById(req.params.id);
      if (!friend) {
        const error = new Error('Friend not found');
        error.status = 404;
        throw error;
      }
      res.send(friend);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const friend = await Friend.updateById(req.params.id, req.body);
    res.send(friend);
  })

  .delete('/:id', async (req, res) => {
    const friend = await Friend.deleteById(req.params.id);
    res.send(friend);
  });
