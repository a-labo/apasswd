/**
 * Test case for apasswd.
 * Runs with mocha.
 */
'use strict'

const APasswd = require('../lib/apasswd.js')
const assert = require('assert')
const co = require('co')

describe('apasswd', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Apeman password', () => co(function * () {
    let passwd = new APasswd()
    assert.ok(passwd.newSalt())
    let digest = yield passwd.digest('foo', 'bar')
    assert.ok(digest)
  }))

  it('Apeman password', () => co(function * () {
    let passwd = new APasswd({
      algorithm: 'pdkdf2',
      iterations: 100,
      length: 84
    })
    let spec = passwd.toSpecString()
    assert.equal(spec, 'pdkdf2:100:84')
  }))
})

/* global describe, before, after, it */
