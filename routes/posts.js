module.exports = (app, db) => {
  app.get('/posts', async (req, res) => {
    const posts = await db('posts').select();
    res.send(posts);
  });

  app.get('/posts/:id', async (req, res) => {
    const [post] = await db('posts').where('id', req.params.id);
    const { id, userId, text } = post;

    const [user] = await db('users')
      .where('id', userId)
      .select('name');

    const tagIds = await db('post_tags').where('postId', id);
    const formattedTagIds = tagIds.map(({ tagId }) => tagId);
    const tags = await db('tags').whereIn('id', formattedTagIds);
    const tagsArray = tags.map(({ tag }) => tag);

    res.send({ text, name: user.name, tags: tagsArray });
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
