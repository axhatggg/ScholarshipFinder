// routes/scholarships.js
import express from 'express';
import Scholarship from '../models/Scholarship.js';

const router = express.Router();

// GET all scholarships
router.get('/', async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    console.log("a")
    res.status(200).json(scholarships);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
