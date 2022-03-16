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

  .get('/:id', async (req, res) => {
    const housewife = await Housewife.findById(req.params.id);
    res.send(housewife);
  });
