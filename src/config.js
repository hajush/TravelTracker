module.exports = {
  'secret': 'calvinandjeff',
  // Having the database here will cause some grief when you push to Heroku.
  // Would be better to push this back out to srcServer.js. - Harold
  'database': 'mongodb://localhost/giphys'
};
