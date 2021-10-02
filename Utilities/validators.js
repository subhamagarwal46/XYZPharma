exports.dateValidator = function (v) {
  return /^[0-3][0-9]\/[0-1][0-9]\/\d{4}$/.test(v);
};
