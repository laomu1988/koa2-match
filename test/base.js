var koa = require('koa');
var app = new koa();
var match = require('../lib/index.js');

match.match('test_str', function (ctx) {
  ctx.response.body = 'test_str';
});


match.match('test_plain', {body: 'test_plain'});

// 测试未通过原因: response的header不能直接赋值, 需要使用setHeader赋值
match.match('test_plain_mixin', {
  'response.body': 'test_plain_mixin',
  'response.header.server1': 'test-server1',
  response: {
    header: {
      'cookie': 'set-cookie',
      'server2': 'test-server2'
    }
  }
});

// 一次添加多个匹配规则
match.match([
  {
    rule: /test_arr/,
    callback: function (ctx) {
      ctx.response.body = 'test_arr';
    }
  },
  {rule: /test_plain2/, callback: {body: 'test2'}},
]);

// promise
match.match('test_promise1', function (ctx) {
  // console.log('is run promise1');
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      ctx.response.body = 'test_promise1';
      resolve();
    }, 100);
  });
});

// promise链
match.match('test_promise_chain', function (ctx) {
  // console.log('is run test_promise_chain2.1');
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      ctx.response.body = 'test_promise_chain2.1';
      resolve();
    }, 100);
  });
});
match.match('test_promise_chain', function (ctx) {
  // console.log('is run test_promise_chain2.2');
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      ctx.response.body = 'test_promise_chain2.2';
      resolve();
    }, 100);
  });
});


match.match(function (ctx) {
  console.log('url:', ctx.url);
  if (!ctx.response.body) ctx.response.body = 'not_found';
});

var middleware = match.callback();

app.use(middleware);

console.log('rules:', match.getRules());

setTimeout(function () {
  // 程序启动后再添加规则是否可以
  match.match('test_add_later', {'body': 'test_add_later'})
}, 200);

// app.listen(4000);

module.exports = app;