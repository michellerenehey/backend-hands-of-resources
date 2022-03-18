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
  });
