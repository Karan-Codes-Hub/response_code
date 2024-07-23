const express = require('express');
const jwt = require('jsonwebtoken');
const List = require('../models/List');
const User = require('../models/User');
const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Access denied');
  }
  try {
    const { userId } = jwt.verify(token, 'secretkey');
    req.userId = userId;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

router.post('/', authMiddleware, async (req, res) => {
  const { name, images } = req.body;
  try {
    const list = new List({ name, images, user: req.userId });
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(400).send('Error creating list');
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const lists = await List.find({ user: req.userId });
    res.json(lists);
  } catch (error) {
    res.status(400).send('Error fetching lists');
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.send('List deleted');
  } catch (error) {
    res.status(400).send('Error deleting list');
  }
});

module.exports = router;
