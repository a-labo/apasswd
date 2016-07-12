/**
 * Password manager
 * @module apasswd
 * @version 1.0.3
 */

'use strict';

var pkg = require('../package.json');
var create = require('./create');
var constants = require('./constants');
var APasswd = require('./apasswd');
var fromSpecString = require('./from_spec_string');

var lib = create({});

Object.assign(lib, create, constants, {
  create: create,
  fromSpecString: fromSpecString,
  APasswd: APasswd
});

module.exports = lib;