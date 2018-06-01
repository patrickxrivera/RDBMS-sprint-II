module.exports = (app, db) => {
  app.get('/posts', async (req, res) => {
    const posts = await db('posts').select();
    res.send(posts);
  });

  app.get('/posts/:id', async (req, res) => {
    const post = await db('posts').where('id', req.params.id);
    res.send(post);
  });

  app.post('/posts/new/:userId', async (req, res) => {
    const { userId } = req.params;
    const { text } = req.body;

    const [newPostId] = await db('posts').insert({ userId, text }, 'id');

    res.send({ id: newPostId, success: 'ok' });
  });

  app.put('/posts/:id', async (req, res) => {
    const { text } = req.body;

    const [updatedPostId] = await db('posts')
      .where('id', req.params.id)
      .update({ text }, 'id');

    res.send({ id: updatedPostId, success: 'ok' });
  });

  app.delete('/posts/:id', async (req, res) => {
    const isSuccess = await db('posts')
      .where('id', req.params.id)
      .delete();

    if (isSuccess) {
      res.send({ status: 'ok' });
      return;
    }

    res.send({ error: 'true', message: 'Invalid id.' });
  });
};
