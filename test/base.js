var koa = require('koa');
var app = new koa();
var match = require('../lib/index.js');

match.match('test_str', function (ctx) {
  ctx.response.body = 'test_str';
});


match.match('test_plain', {body: 'test_plain'});


match.match([
  {
    rule: /test_arr/,
    callback: function (ctx) {
      ctx.response.body = 'test_arr';
    }
  },
  {rule: /test_plain2/, callback: {body: 'test2'}},
]);


match.match(/.*/, function (ctx) {
  console.log('url:', ctx.url);
  if (!ctx.response.body) ctx.response.body = 'not_found';
});

var middleware = match.callback();

app.use(middleware);

console.log('rules:', match.rules);

// app.listen(4000);

module.exports = app;