"use strict";
var expect = require('chai').expect;
var agent = require('supertest').agent;
var http = require('http');

var app = require('./base');
agent = agent(http.createServer(app.callback()));
describe('test match method', function () {
  this.timeout(3000);
  it('test_get', function (done) {
    agent.get('/test_get').set('Accept', 'text/html').expect(200).end(function (err, res) {
      // console.log('body:', res);
      expect(res.text === 'not_found').to.be.ok;
      done(err);
    });
  });

  it('test_str', function (done) {
    agent.get('/test_str').expect(200).end(function (err, res) {
      expect(res.text === 'test_str').to.be.ok;
      done(err);
    });
  });

  it('test_plain', function (done) {
    agent.get('/test_plain').expect(200).end(function (err, res) {
      expect(res.text === 'test_plain').to.be.ok;
      done(err);
    });
  });

  it('test_arr', function (done) {
    agent.get('/test_arr').expect(200).end(function (err, res) {
      expect(res.text === 'test_arr').to.be.ok;
      done(err);
    });
  });

});