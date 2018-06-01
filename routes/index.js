const users = require('./users');
const posts = require('./posts');

module.exports = (...args) => {
  users(...args);
  posts(...args);
};
