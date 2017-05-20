/* eslint array-callback-return: "off" */

import express from 'express';
import mongojs from 'mongojs';
import dotenv from 'dotenv';

dotenv.config();

const db = mongojs(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}`,
  ['tasks'],
);

const router = express.Router();

router.get('/tasks', (req, res) => {
  db.tasks.find((err, results) => {
    if (err) {
      res.send(err);
    }
    res.json(results);
  });
});

router.get('/tasks/:id', (req, res) => {
  db.tasks.findOne(
    {
      _id: mongojs.ObjectId(req.params.id),
    },
    (err, result) => {
      if (err) {
        res.send(err);
      }
      res.json(result);
    },
  );
});

router.post('/tasks', (req, res) => {
  const task = req.body;
  if (!task.title) {
    res.status(400);
    res.json({
      error: 'Bad Request',
    });
  } else {
    db.tasks.save(task, (err, result) => {
      if (err) {
        res.send(err);
      }
      res.json(result);
    });
  }
});

router.delete('/tasks/:id', (req, res) => {
  db.tasks.remove(
    {
      _id: mongojs.ObjectId(req.params.id),
    },
    (err, result) => {
      if (err) {
        res.send(err);
      }
      res.json(result);
    },
  );
});

router.put('/tasks/:id', (req, res) => {
  const task = req.body;
  if (!task.title) {
    res.status(400);
    res.json({
      error: 'Bad Request',
    });
  } else {
    db.tasks.update(
      {
        _id: mongojs.ObjectId(req.params.id),
      },
      task,
      {},
      (err, result) => {
        if (err) {
          res.send(err);
        }
        res.json(result);
      },
    );
  }
});

export default router;
