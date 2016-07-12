/**
 * Create pdkdf2 digest.
 * @function pdkdf2Digest
 * @param {string} text - Text to digest.
 * @param {string} salt - Digest salt.
 * @param {object} [options] - Optional settings.
 * @param {number} [options.iterations=100] - Iteration count.
 * @param {number} [options.length=84] - Key length.
 * @param {string} [options.format='base64']
 * @returns {Promise}
 */

'use strict';

var co = require('co');
var crypto = require('crypto');

var _require = require('../constants');

var DEFAULT_ITERATIONS = _require.DEFAULT_ITERATIONS;
var DEFAULT_LENGTH = _require.DEFAULT_LENGTH;
var DEFAULT_FORMAT = _require.DEFAULT_FORMAT;


var DIGEST = 'sha512';

/** @lends pdkdf2Digest */
function pdkdf2Digest(text, salt) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  if (!salt) {
    throw new Error('Salt is required.');
  }
  var iterations = options.iterations || DEFAULT_ITERATIONS;
  var length = options.length || DEFAULT_LENGTH;
  var format = options.format || DEFAULT_FORMAT;
  return co(regeneratorRuntime.mark(function _callee() {
    var buffer, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new Promise(function (resolve, reject) {
              return crypto.pbkdf2(text, salt, iterations, length, DIGEST, function (err, buffer) {
                return err ? reject(err) : resolve(buffer);
              });
            });

          case 2:
            buffer = _context.sent;
            result = Buffer(buffer, 'binary').toString(format);
            return _context.abrupt('return', result);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
}

pdkdf2Digest.sync = function (text, salt) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  if (!salt) {
    throw new Error('Salt is required.');
  }
  var iterations = options.iterations || DEFAULT_ITERATIONS;
  var length = options.length || DEFAULT_LENGTH;
  var format = options.format || DEFAULT_FORMAT;
  var buffer = crypto.pbkdf2Sync(text, salt, iterations, length, DIGEST);
  return Buffer(buffer, 'binary').toString(format);
};

module.exports = pdkdf2Digest;