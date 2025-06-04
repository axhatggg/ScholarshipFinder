import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  // console.log(1);
  const { uid, name, email } = req.body;
  try {
    let user = await User.findOne({ uid });
    if (!user) {
      user = new User({ uid, name, email });
      await user.save();
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:uid', async (req, res) => {
  const user = await User.findOne({ uid: req.params.uid });
  if (user) res.json(user);
  else res.status(404).send("User not found");
});

router.put('/:uid', async (req, res) => {
  console.log("debug")
  console.log(req.body);
  console.log(req.params.uid);
  console.log(req.originalUrl);
  const updatedUser = await User.findOneAndUpdate({ uid: req.params.uid }, req.body, { new: true });
  console.log(updatedUser);
  res.json(updatedUser);
});


export default router;
