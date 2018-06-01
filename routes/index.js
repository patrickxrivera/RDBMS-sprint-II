const users = require('./users');
const posts = require('./posts');
const tags = require('./tags');

module.exports = (...args) => {
  users(...args);
  posts(...args);
  tags(...args);
};
