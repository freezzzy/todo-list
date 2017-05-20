import express from 'express';

const router = express.Router();

router.get('/tasks', (req, res) => {
  res.send('tasks');
});

export default router;
