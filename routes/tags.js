const pipeP = require('ramda/src/pipeP');

const sendTags = (res) => (tags) => {
  res.send(tags);
};

const createTagsArray = (tags) => tags.map(({ tag }) => tag);

const getTags = (db) => (formattedTagIds) => db('tags').whereIn('id', formattedTagIds);

const formatTagIds = (tagIds) => tagIds.map(({ tagId }) => tagId);

const getTagIds = (db) => (req) =>
  db('post_tags')
    .where('postId', req.params.id)
    .select('tagId');

const sendTagsArray = (req, res, db) =>
  pipeP(getTagIds(db), formatTagIds, getTags(db), createTagsArray, sendTags(res))(req);

module.exports = (app, db) => {
  app.get('/posts/:id/tags', async (req, res) => {
    sendTagsArray(req, res, db);
  });
};
