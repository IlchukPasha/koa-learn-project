module.exports = (models, done) => {
  models.umzug.down({ to: 0 }).then(function() {
    models.umzug.up().then(function() {
      done();
    });
  });
};
