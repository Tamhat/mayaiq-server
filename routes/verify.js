// verify.router.js
const express = require('express');
const router = express.Router();
const Verify = require('../models/verify');

// POST route to create a new verification code
router.post('/', async (req, res) => {
  try {
    const { code } = req.body;
    // const code = Math.floor(Math.random() * 10000).toString();

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ message: 'Invalid code format' });
    }

    const newVerify = new Verify({ code });
    await newVerify.save();
    return res.status(201).json(newVerify);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route to retrieve all verification codes
router.get('/', async (req, res) => {
  try {
    const verificationCodes = await Verify.find();
    return res.json(verificationCodes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT route to update an existing verification code
router.put('/:id', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ message: 'Invalid code format' });
    }

    const verification = await Verify.findByIdAndUpdate(
      req.params.id,
      { code },
      { new: true }
    );

    if (!verification) {
      return res.status(404).json({ message: 'Verification not found' });
    }

    return res.json(verification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
