module.exports = (app, db) => {
  app.get('/users', async (req, res) => {
    const users = await db('users').select();
    res.send(users);
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

  app.delete('/users/:id', async (req, res) => {
    const isSuccess = await db('users')
      .where('id', req.params.id)
      .del();

    if (isSuccess) {
      res.send({ status: 'ok' });
      return;
    }

    res.send({ error: true, message: 'unable to delete' });
  });
};
