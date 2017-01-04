var koa = require('koa');
var app = new koa();
var match = require('../lib/index.js');

match.match('/test', function (ctx) {
  ctx.response.body = 'test';
});
match.match(/^\/$/, function (ctx) {
  ctx.response.body = 'index';
});

match.match([
  {
    rule: /test/, callback: function () {
  },
    rule: /test2/, callback: {body: 'test2'}
  },
]);

app.use(match.callback());


app.listen(4000);