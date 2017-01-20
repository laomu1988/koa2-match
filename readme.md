# koa2 match rule and change response
 匹配规则并修改响应数据


## install
```
npm install koa@next
npm install koa2-match
```

## usage
```
var koa = require('koa');
var app = new koa();
var match = require('koa2-match');

match.match('test_str', function (ctx) {
  ctx.response.body = 'test_str';
});

app.use(match.callback());

console.log('rules:', match.rules);

app.listen(4000, function(err){
    err && console.error(err) || console.log('start Server At http://localhost:4000');
});
```

## api
* match(rule,callback) 匹配后执行程序修改请求或者响应
* getRules()  取得所有的匹配规则列表
* setRules(rules) 批量设置匹配规则
* clean() 清空所有匹配规则
* callback() 生成koa@next的中间件

## build
```
npm install -g babel-cli babel-loader mocha
npm run build
```

## history
* v1.0.1
    - 匹配的第二个参数是一个对象时,自动修改ctx对应字段
* v1.0.0
    - 匹配后执行函数替换内容

## todo:
* [ ] 按次序匹配,执行完一个匹配之后再判断下一个匹配项
* [ ] 匹配后直接根据指定对象修改ctx