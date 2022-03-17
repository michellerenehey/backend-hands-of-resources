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
  });