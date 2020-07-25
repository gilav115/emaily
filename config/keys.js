//keys.js

// process.env.NODE_ENV => given by heroku
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
