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
* getRules()  取得所有的规则列表
* setRules(rules) 批量设置匹配规则
* clean() 清空所有匹配规则
* callback() 生成koa@next的中间件

## build
```
npm install -g babel-cli babel-loader mocha
npm run build
```

## history
* v1.0.4
    - 匹配规则为函数时,其参数改为ctx
* v1.0.3
    - 回调处理支持配置为数组
    - 代码格式话
* v1.0.2
    - 自动为匹配规则生成随机id
    - 匹配规则执行完一个后再匹配下一个
    - 执行完成后ctx._matchs存放当前链接匹配的所有规则
* v1.0.1
    - 匹配的第二个参数是一个对象时,自动修改ctx对应字段
* v1.0.0
    - 匹配后执行函数替换内容

## todo:

* [x] 为规则自动分配一个id
* [x] 当前地址匹配匹配了哪些规则
* [ ] 删除规则
* [x] 按次序匹配,执行完一个匹配之后再判断下一个匹配项
* [x] 匹配后直接根据指定对象修改ctx
