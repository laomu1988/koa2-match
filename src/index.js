/**
 * 匹配处理程序
 * */
require("babel-core/register");
require("babel-polyfill");

var _ = require('lodash');

var rules = [];
/**
 * 增加匹配规则和回调
 * */
function match(rule, callback) {
  if (_.isArray(rule)) {
    rule.forEach(function (r) {
      r && r.rule && r.callback && rules.push(r);
    });
  } else if (rule && callback) {
    rules.push({rule, callback})
  }
}
/**
 * 清空所有规则 todo:
 * */
function clean(rule, callback) {

}

async function ctx_handle(ctx, handle) {
  if (_.isArray(handle)) {
    // todo: 假如是promise,则顺序执行
    handle.forEach(h => ctx_handle(ctx, h));
  }
  else if (_.isFunction(handle)) {
    return handle(ctx);
  }
  else if (_.isPlainObject(handle)) {
    ctx_plain_change(ctx, handle);
  }
}
// todo: 直接修改ctx属性
function ctx_plain_change(ctx, plainObject) {
  // for (let attr in plainObject) {
  //   let attrs = attr.split('.');
  //   if (attrs.length === 1) {
  //     ctx.response[attr] = plainObject[attr];
  //   }
  // }
}
/**
 * 返回koa中间件
 */
function callback() {
  return async function (ctx, next) {
    var request_callbacks = [], response_callback = [];
    rules.forEach(function (r) {
      let rule = r.rule, callback = r.callback;
      if (_.isString(rule) || _.isRegExp(rule) || _.isFunction(rule)) {
        rule = {url: rule};
      }
      for (var key in rule) {
        if (key === 'phase') continue;
        var condition = rule[key];
        if (!TestRule(GetVal(ctx, key), condition)) {
          return;
        }
      }
      rule.phase === 'response' ? response_callback.push(callback) : request_callbacks.push(callback);
    });
    request_callbacks.length > 0 && await ctx_handle(ctx, request_callbacks);
    await next();
    response_callback.length > 0 && await ctx_handle(ctx, response_callback);
  }
}

module.exports.rules = rules;
module.exports.callback = callback;
module.exports.match = match;
module.exports.clean = clean;


function GetVal(ctx, key) {
  switch (key) {
    case 'fullUrl':
      var request = ctx.request;
      if (request.url.indexOf('http') === 0) {
        return request.url;
      }
      return request.protocol + '://' + request.header.host + request.url;
    case 'url':
      return ctx.request.url;
    default:
      var val = ctx.request[key];
      if (typeof val === 'string') {
        return val.toLowerCase();
      }
      return ctx.get(key) || ctx[key];
  }
}
function TestRule(val, rule) {
  if (_.isFunction(rule)) {
    return rule(val);
  } else if (_.isRegExp(rule)) {
    return rule.test(val);
  } else if (_.isString(rule)) {
    return (val + '').indexOf(rule) >= 0;
  }
  return false;
}
