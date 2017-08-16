const { each } = require('lodash');

module.exports = {
  validate_errors: e => {
    let validate_errors = {};
    each(e.errors, error => {
      let p = error.path;
      if (validate_errors[p]) {
        validate_errors[p].push(error.message);
      } else {
        validate_errors[p] = [];
        validate_errors[p].push(error.message);
      }
    });
    return validate_errors;
  }
};
