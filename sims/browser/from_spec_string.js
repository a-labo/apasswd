/**
 * Create a pon password context from spec string.
 * @function fromSpecString
 * @param {string} spec - Spec string.
 * @returns {APasswd} - An apeman password instance.
 */

'use strict';

var create = require('./create');

var _require = require('./constants');

var DEFAULT_ITERATIONS = _require.DEFAULT_ITERATIONS;
var DEFAULT_LENGTH = _require.DEFAULT_LENGTH;

/** @lends fromSpecString */

function fromSpecString(spec) {
  var values = String(spec).split(/:/g);
  return create({
    algorithm: values[0],
    iterations: Number(values[1] || DEFAULT_ITERATIONS),
    length: Number(values[2] || DEFAULT_LENGTH)
  });
}

module.exports = fromSpecString;