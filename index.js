const express = require('express');
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);

const app = express();
const port = 8080;

app.use(bodyParser.json());

const getAll = async (table, res) => {
  const records = await db(table).select();
  res.send(records);
};

app.get('/users', (req, res) => {
  getAll('users', res);
});

app.get('/users/:id', async (req, res) => {
  const user = await db('users').where('id', req.params.id);
  res.send(user);
});

app.get('/users/:id/posts', async (req, res) => {
  const posts = await db('posts').where('userId', req.params.id);
  res.send(posts);
});

app.post('/users/new', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.send({ error: true, message: 'You must provide a name' });
    return;
  }

  const [newUserId] = await db('users').insert({ name }, 'id');

  res.send({ id: newUserId, status: 'ok' });
});

app.put('/users/:id', async (req, res) => {
  const { name } = req.body;

  const [updatedUserId] = await db('users')
    .where('id', req.params.id)
    .update({ name }, 'id');

  res.send({ id: updatedUserId, status: 'ok' });
});

app.listen(port, function() {
  console.log(`\n=== API up on port: ${port} ===\n`);
});
