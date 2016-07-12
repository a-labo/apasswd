/**
 * Apeman password context.
 * @constructor APasswd
 * @param {object} config - Password configuration.
 * @param {string} [config.algorithm='pdkdf2'] - Name of algorithm.
 * @param {number} [config.iterations=100] - Iteration count.
 * @param {number} [config.length=84] - Key length.
 * @param {string} [config.format='base64'] - Digest format.
 */

'use strict';

var _newSalt = require('./salting/new_salt');
var co = require('co');
var pdkdf2Digest = require('./digesting/pdkdf2_digest');

var _require = require('./constants');

var DEFAULT_ALGORITHM = _require.DEFAULT_ALGORITHM;
var DEFAULT_ITERATIONS = _require.DEFAULT_ITERATIONS;
var DEFAULT_LENGTH = _require.DEFAULT_LENGTH;
var DEFAULT_FORMAT = _require.DEFAULT_FORMAT;

/** @lends APasswd */

function APasswd(config) {
  var s = this;
  Object.assign(s, config);
}

APasswd.prototype = {
  algorithm: DEFAULT_ALGORITHM,
  iterations: DEFAULT_ITERATIONS,
  length: DEFAULT_LENGTH,
  format: DEFAULT_FORMAT,
  /**
   * Digest a password.
   * @param {string} text - Text to digest.
   * @param {string} salt - Salt for digest.
   * @returns {Promise}
   */
  digest: function digest(text, salt) {
    var s = this;
    return co(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = s.algorithm;
              _context.next = _context.t0 === 'pdkdf2' ? 3 : 6;
              break;

            case 3:
              _context.next = 5;
              return pdkdf2Digest(text, salt, {
                iterations: s.iterations,
                length: s.length,
                format: s.format
              });

            case 5:
              return _context.abrupt('return', _context.sent);

            case 6:
              throw new Error('Unknown algorithm: ' + s.algorithm);

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
  },

  /**
   * Generate a new salt.
   * @param {number} [len=8] - Salt length.
   * @returns {Promise.<string>} - New salt.
   */
  newSalt: function newSalt(len) {
    return _newSalt(len || 8);
  },

  /**
   * Get spec string.
   * @returns {string} spec - Spec of this password.
   */
  toSpecString: function toSpecString() {
    var s = this;
    return [s.algorithm, s.iterations, s.length].join(':');
  }
};

module.exports = APasswd;