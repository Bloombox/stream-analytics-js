!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.StreamAnalytics=t():e.StreamAnalytics=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="dist/",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){var r=n(2),o=n(5),i=n(6),s=n(7),a=function(e){this.configure(e||{})};a.prototype.configure=function(e){this.client=new s(e),this.userId=null},a.prototype.setUser=function(e){this.userId=e},a.prototype._sendEventFactory=function(e,t){return function(n,o){var i=r(n,t,{flatten:!0});"undefined"==typeof i?this._sendEvent(e,n,o):"function"==typeof o&&o(i)}},a.prototype._sendEvent=function(e,t,n){return null===this._userId&&n("userId was not set"),t.user_id=this.userId,this.client.send(e,t,n)},a.prototype.trackImpression=a.prototype._sendEventFactory("impression",o.impressionSpec),a.prototype.trackEngagement=a.prototype._sendEventFactory("engagement",o.engagementSpec),a.Client=s,a.errors=i,n(9)(a),e.exports=a},function(e,t,n){(function(e){(function(e,t,r){"use strict";var o=function(e,t,n){n=i.extend({},i.options,n);var r,s,a=i.runValidations(e,t,n);for(r in a)for(s in a[r])if(i.isPromise(a[r][s]))throw new Error("Use validate.async if you want support for promises");return o.processValidationResults(a,n)},i=o;i.extend=function(e){return[].slice.call(arguments,1).forEach(function(t){for(var n in t)e[n]=t[n]}),e},i.extend(o,{Promise:"undefined"!=typeof Promise?Promise:null,moment:"undefined"!=typeof moment?moment:null,XDate:"undefined"!=typeof XDate?XDate:null,EMPTY_STRING_REGEXP:/^\s*$/,runValidations:function(e,t,n){var r,o,s,a,u,c,f,l=[];i.isDomElement(e)&&(e=i.collectFormValues(e));for(r in t){s=i.getDeepObjectValue(e,r),a=i.result(t[r],s,e,r,n,t);for(o in a){if(u=i.validators[o],!u)throw f=i.format("Unknown validator %{name}",{name:o}),new Error(f);c=a[o],c=i.result(c,s,e,r,n,t),c&&l.push({attribute:r,error:u.call(u,s,c,r,e)})}}return l},processValidationResults:function(e,t){var n={};e.forEach(function(e){var t=e.error,r=e.attribute;i.isString(t)&&(t=[t]),t&&(n[r]=(n[r]||[]).concat(t))});for(var r in n)return i.fullMessages(n,t)},async:function(e,t,n){n=i.extend({},i.async.options,n);var r=i.runValidations(e,t,n);return new i.Promise(function(t,o){i.waitForResults(r).then(function(){var s=i.processValidationResults(r,n);s?o(s):t(e)}).then(void 0,i.error)})},single:function(e,t,n){return n=i.extend({},i.single.options,n,{flatten:!0,fullMessages:!1}),i({single:e},{single:t},n)},waitForResults:function(e){var t=e.reduce(function(e,t){return i.isPromise(t.error)?e.then(function(){return t.error.then(function(){t.error=null},function(e){e||i.warn("Validator promise was rejected but didn't return an error"),t.error=e}).then(void 0,i.error)}).then(void 0,i.error):e},new i.Promise(function(e){e()}));return t.then(void 0,i.error)},result:function(e){var t=[].slice.call(arguments,1);return"function"==typeof e&&(e=e.apply(null,t)),e},isNumber:function(e){return"number"==typeof e&&!isNaN(e)},isFunction:function(e){return"function"==typeof e},isInteger:function(e){return i.isNumber(e)&&e%1===0},isObject:function(e){return e===Object(e)},isDefined:function(e){return null!==e&&void 0!==e},isPromise:function(e){return!!e&&i.isFunction(e.then)},isDomElement:function(e){return e&&i.isFunction(e.querySelectorAll)&&i.isFunction(e.querySelector)?i.isObject(document)&&e===document?!0:"object"==typeof HTMLElement?e instanceof HTMLElement:e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName:!1},isEmpty:function(e){var t;if(!i.isDefined(e))return!0;if(i.isFunction(e))return!1;if(i.isString(e))return i.EMPTY_STRING_REGEXP.test(e);if(i.isArray(e))return 0===e.length;if(i.isObject(e)){for(t in e)return!1;return!0}return!1},format:i.extend(function(e,t){return e.replace(i.format.FORMAT_REGEXP,function(e,n,r){return"%"===n?"%{"+r+"}":String(t[r])})},{FORMAT_REGEXP:/(%?)%\{([^\}]+)\}/g}),prettify:function(e){return e.replace(/([^\s])\.([^\s])/g,"$1 $2").replace(/\\+/g,"").replace(/[_-]/g," ").replace(/([a-z])([A-Z])/g,function(e,t,n){return""+t+" "+n.toLowerCase()}).toLowerCase()},isString:function(e){return"string"==typeof e},isArray:function(e){return"[object Array]"==={}.toString.call(e)},contains:function(e,t){return i.isDefined(e)?i.isArray(e)?-1!==e.indexOf(t):t in e:!1},getDeepObjectValue:function(e,t){if(!i.isObject(e)||!i.isString(t))return void 0;var n,r="",o=!1;for(n=0;n<t.length;++n)switch(t[n]){case".":if(o)o=!1,r+=".";else{if(!(r in e))return void 0;e=e[r],r=""}break;case"\\":o?(o=!1,r+="\\"):o=!0;break;default:o=!1,r+=t[n]}return i.isDefined(e)&&r in e?e[r]:void 0},collectFormValues:function(e,t){var n,r,o,s,a={};if(!e)return a;for(t=t||{},o=e.querySelectorAll("input[name]"),n=0;n<o.length;++n)r=o.item(n),i.isDefined(r.getAttribute("data-ignored"))||(s=i.sanitizeFormValue(r.value,t),"number"===r.type?s=+s:"checkbox"===r.type?r.attributes.value?r.checked||(s=a[r.name]||null):s=r.checked:"radio"===r.type&&(r.checked||(s=a[r.name]||null)),a[r.name]=s);for(o=e.querySelectorAll("select[name]"),n=0;n<o.length;++n)r=o.item(n),s=i.sanitizeFormValue(r.options[r.selectedIndex].value,t),a[r.name]=s;return a},sanitizeFormValue:function(e,t){return t.trim&&i.isString(e)&&(e=e.trim()),t.nullify!==!1&&""===e?null:e},capitalize:function(e){return i.isString(e)?e[0].toUpperCase()+e.slice(1):e},fullMessages:function(e,t){function n(e,n){n.forEach(function(n){"^"===n[0]?n=n.slice(1):t.fullMessages!==!1&&(n=i.format("%{attr} %{message}",{attr:i.capitalize(i.prettify(e)),message:n})),n=n.replace(/\\\^/g,"^"),t.flatten?o.push(n):(o[e]||(o[e]=[])).push(n)})}t=t||{};var r,o=t.flatten?[]:{};if(!e)return o;for(r in e)n(r,e[r]);return o},exposeModule:function(e,t,n,r,o){n?(r&&r.exports&&(n=r.exports=e),n.validate=e):(t.validate=e,e.isFunction(o)&&o.amd&&o("validate",[],function(){return e}))},warn:function(e){"undefined"!=typeof console&&console.warn&&console.warn(e)},error:function(e){"undefined"!=typeof console&&console.error&&console.error(e)}}),o.validators={presence:function(e,t){return t=i.extend({},this.options,t),i.isEmpty(e)?t.message||this.message||"can't be blank":void 0},length:function(e,t,n){if(!i.isEmpty(e)){t=i.extend({},this.options,t);var r,o=t.is,s=t.maximum,a=t.minimum,u=t.tokenizer||function(e){return e},c=[];e=u(e);var f=e.length;return i.isNumber(f)?(i.isNumber(o)&&f!==o&&(r=t.wrongLength||this.wrongLength||"is the wrong length (should be %{count} characters)",c.push(i.format(r,{count:o}))),i.isNumber(a)&&a>f&&(r=t.tooShort||this.tooShort||"is too short (minimum is %{count} characters)",c.push(i.format(r,{count:a}))),i.isNumber(s)&&f>s&&(r=t.tooLong||this.tooLong||"is too long (maximum is %{count} characters)",c.push(i.format(r,{count:s}))),c.length>0?t.message||c:void 0):(i.error(i.format("Attribute %{attr} has a non numeric value for `length`",{attr:n})),t.message||this.notValid||"has an incorrect length")}},numericality:function(e,t){if(!i.isEmpty(e)){t=i.extend({},this.options,t);var n,r,o=[],s={greaterThan:function(e,t){return e>t},greaterThanOrEqualTo:function(e,t){return e>=t},equalTo:function(e,t){return e===t},lessThan:function(e,t){return t>e},lessThanOrEqualTo:function(e,t){return t>=e}};if(t.noStrings!==!0&&i.isString(e)&&(e=+e),!i.isNumber(e))return t.message||this.notValid||"is not a number";if(t.onlyInteger&&!i.isInteger(e))return t.message||this.notInteger||"must be an integer";for(n in s)if(r=t[n],i.isNumber(r)&&!s[n](e,r)){var a=this["not"+i.capitalize(n)]||"must be %{type} %{count}";o.push(i.format(a,{count:r,type:i.prettify(n)}))}return t.odd&&e%2!==1&&o.push(this.notOdd||"must be odd"),t.even&&e%2!==0&&o.push(this.notEven||"must be even"),o.length?t.message||o:void 0}},datetime:i.extend(function(e,t){if(!i.isEmpty(e)){t=i.extend({},this.options,t);var n,r=[],o=t.earliest?this.parse(t.earliest,t):NaN,s=t.latest?this.parse(t.latest,t):NaN;return e=this.parse(e,t),isNaN(e)||t.dateOnly&&e%864e5!==0?t.message||this.notValid||"must be a valid date":(!isNaN(o)&&o>e&&(n=this.tooEarly||"must be no earlier than %{date}",n=i.format(n,{date:this.format(o,t)}),r.push(n)),!isNaN(s)&&e>s&&(n=this.tooLate||"must be no later than %{date}",n=i.format(n,{date:this.format(s,t)}),r.push(n)),r.length?t.message||r:void 0)}},{parse:function(e,t){if(i.isFunction(i.XDate))return new i.XDate(e,!0).getTime();if(i.isDefined(i.moment))return+i.moment.utc(e);throw new Error("Neither XDate or moment.js was found")},format:function(e,t){var n=t.dateFormat;if(i.isFunction(i.XDate))return n=n||(t.dateOnly?"yyyy-MM-dd":"yyyy-MM-dd HH:mm:ss"),new XDate(e,!0).toString(n);if(i.isDefined(i.moment))return n=n||(t.dateOnly?"YYYY-MM-DD":"YYYY-MM-DD HH:mm:ss"),i.moment.utc(e).format(n);throw new Error("Neither XDate or moment.js was found")}}),date:function(e,t){return t=i.extend({},t,{dateOnly:!0}),i.validators.datetime.call(i.validators.datetime,e,t)},format:function(e,t){(i.isString(t)||t instanceof RegExp)&&(t={pattern:t}),t=i.extend({},this.options,t);var n,r=t.message||this.message||"is invalid",o=t.pattern;return i.isEmpty(e)?void 0:i.isString(e)?(i.isString(o)&&(o=new RegExp(t.pattern,t.flags)),n=o.exec(e),n&&n[0].length==e.length?void 0:r):r},inclusion:function(e,t){if(!i.isEmpty(e)&&(i.isArray(t)&&(t={within:t}),t=i.extend({},this.options,t),!i.contains(t.within,e))){var n=t.message||this.message||"^%{value} is not included in the list";return i.format(n,{value:e})}},exclusion:function(e,t){if(!i.isEmpty(e)&&(i.isArray(t)&&(t={within:t}),t=i.extend({},this.options,t),i.contains(t.within,e))){var n=t.message||this.message||"^%{value} is restricted";return i.format(n,{value:e})}},email:i.extend(function(e,t){t=i.extend({},this.options,t);var n=t.message||this.message||"is not a valid email";if(!i.isEmpty(e))return i.isString(e)&&this.PATTERN.exec(e)?void 0:n},{PATTERN:/^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i}),equality:function(e,t,n,r){if(!i.isEmpty(e)){i.isString(t)&&(t={attribute:t}),t=i.extend({},this.options,t);var o=t.message||this.message||"is not equal to %{attribute}";if(i.isEmpty(t.attribute)||!i.isString(t.attribute))throw new Error("The attribute must be a non empty string");var s=i.getDeepObjectValue(r,t.attribute),a=t.comparator||function(e,t){return e===t};return a(e,s,t,n,r)?void 0:i.format(o,{attribute:i.prettify(t.attribute)})}}},o.exposeModule(o,this,e,t,n(4))}).call(this,t,e,n(4))}).call(t,n(3)(e))},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},function(e,t,n){var r=n(2);r.validators.features=function(e,t,n,i){if("undefined"==typeof e||null===e)return e;if(!r.isArray(e))return"needs to be a list of features";for(var s=e.length-1;s>=0;s--)if(r(e[s],o))return"should have group and value keys"},r.validators.isArray=function(e,t,n,o){return r.isArray(e)?void 0:"needs to be an array"};var o={group:{presence:!0},value:{presence:!0}},i={label:{presence:!0},boost:{presence:!1,numericality:!0},features:{features:!0}},s={foreign_ids:{presence:!0,isArray:!0},boost:{presence:!1,numericality:!0},features:{features:!0}};e.exports={engagementSpec:i,impressionSpec:s}},function(e,t){function n(e,t){this.message=e,Error.call(this,this.message),o?Error.captureStackTrace(this,t):i?this.stack=(new Error).stack:this.stack=""}var r=e.exports,o="function"==typeof Error.captureStackTrace,i=!!(new Error).stack;r._Abstract=n,n.prototype=new Error,r.MissingUserId=function(e){n.call(this,e)},r.MissingUserId.prototype=new n,r.MisconfiguredClient=function(e){n.call(this,e)},r.MisconfiguredClient.prototype=new n},function(e,t,n){var r=n(8),o=n(6),i=function(){this.initialize.apply(this,arguments)};i.prototype={baseUrl:"http://localhost:8000/analytics/v1.0/",initialize:function(e){var t=e||{};if(!t.apiKey||!t.token)throw new o.MisconfiguredClient("the client must be initialized with apiKey and token");this.apiKey=t.apiKey,this.token=t.token},send:function(e,t,n){return this.post({url:this.baseUrl+e+"/",body:t},n)},userAgent:function(){var e=this.node?"node":"browser",t="unknown";return"stream-javascript-client-"+e+"-"+t},enrichKwargs:function(e){return void 0===e.qs&&(e.qs={}),e.qs.api_key=this.apiKey,e.json=!0,e.headers={},e.headers["stream-auth-type"]="jwt",e.headers.Authorization=this.token,e.headers["X-Stream-Client"]=this.userAgent(),e},post:function(e,t){return e=this.enrichKwargs(e),e.method="POST",r(e,t)}},e.exports=i},function(e,t){function n(e,t){if("function"!=typeof t)throw new Error("Bad callback given: "+t);if(!e)throw new Error("No options given");var s=e.onResponse;if(e="string"==typeof e?{uri:e}:JSON.parse(JSON.stringify(e)),e.onResponse=s,e.verbose&&(n.log=i()),e.url&&(e.uri=e.url,delete e.url),!e.uri&&""!==e.uri)throw new Error("options.uri is a required argument");if("string"!=typeof e.uri)throw new Error("options.uri must be a string");for(var a=["proxy","_redirectsFollowed","maxRedirects","followRedirect"],c=0;c<a.length;c++)if(e[a[c]])throw new Error("options."+a[c]+" is not supported");if(e.callback=t,e.method=e.method||"GET",e.headers=e.headers||{},e.body=e.body||null,e.timeout=e.timeout||n.DEFAULT_TIMEOUT,e.headers.host)throw new Error("Options.headers.host is not supported");e.json&&(e.headers.accept=e.headers.accept||"application/json","GET"!==e.method&&(e.headers["content-type"]="application/json"),"boolean"!=typeof e.json?e.body=JSON.stringify(e.json):"string"!=typeof e.body&&(e.body=JSON.stringify(e.body)));var f=function(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t.join("&")};if(e.qs){var l="string"==typeof e.qs?e.qs:f(e.qs);-1!==e.uri.indexOf("?")?e.uri=e.uri+"&"+l:e.uri=e.uri+"?"+l}var d=function(e){var t={};t.boundry="-------------------------------"+Math.floor(1e9*Math.random());var n=[];for(var r in e)e.hasOwnProperty(r)&&n.push("--"+t.boundry+'\nContent-Disposition: form-data; name="'+r+'"\n\n'+e[r]+"\n");return n.push("--"+t.boundry+"--"),t.body=n.join(""),t.length=t.body.length,t.type="multipart/form-data; boundary="+t.boundry,t};if(e.form){if("string"==typeof e.form)throw"form name unsupported";if("POST"===e.method){var p=(e.encoding||"application/x-www-form-urlencoded").toLowerCase();switch(e.headers["content-type"]=p,p){case"application/x-www-form-urlencoded":e.body=f(e.form).replace(/%20/g,"+");break;case"multipart/form-data":var h=d(e.form);e.body=h.body,e.headers["content-type"]=h.type;break;default:throw new Error("unsupported encoding:"+p)}}}return e.onResponse=e.onResponse||o,e.onResponse===!0&&(e.onResponse=t,e.callback=o),!e.headers.authorization&&e.auth&&(e.headers.authorization="Basic "+u(e.auth.username+":"+e.auth.password)),r(e)}function r(e){function t(){f=!0;var t=new Error("ETIMEDOUT");return t.code="ETIMEDOUT",t.duration=e.timeout,n.log.error("Timeout",{id:u._id,milliseconds:e.timeout}),e.callback(t,u)}function r(t){if(f)return n.log.debug("Ignoring timed out state change",{state:u.readyState,id:u.id});if(n.log.debug("State change",{state:u.readyState,id:u.id,timed_out:f}),u.readyState===c.OPENED){n.log.debug("Request started",{id:u.id});for(var r in e.headers)u.setRequestHeader(r,e.headers[r])}else u.readyState===c.HEADERS_RECEIVED?o():u.readyState===c.LOADING?(o(),i()):u.readyState===c.DONE&&(o(),i(),s())}function o(){if(!m.response){if(m.response=!0,n.log.debug("Got response",{id:u.id,status:u.status}),clearTimeout(u.timeoutTimer),u.statusCode=u.status,d&&0==u.statusCode){var t=new Error("CORS request rejected: "+e.uri);return t.cors="rejected",m.loading=!0,m.end=!0,e.callback(t,u)}e.onResponse(null,u)}}function i(){m.loading||(m.loading=!0,n.log.debug("Response body loading",{id:u.id}))}function s(){if(!m.end){if(m.end=!0,n.log.debug("Request done",{id:u.id}),u.body=u.responseText,e.json)try{u.body=JSON.parse(u.responseText)}catch(t){return e.callback(t,u)}e.callback(null,u,u.body)}}var u=new c,f=!1,d=a(e.uri),p="withCredentials"in u;if(l+=1,u.seq_id=l,u.id=l+": "+e.method+" "+e.uri,u._id=u.id,d&&!p){var h=new Error("Browser does not support cross-origin request: "+e.uri);return h.cors="unsupported",e.callback(h,u)}u.timeoutTimer=setTimeout(t,e.timeout);var m={response:!1,loading:!1,end:!1};return u.onreadystatechange=r,u.open(e.method,e.uri,!0),d&&(u.withCredentials=!!e.withCredentials),u.send(e.body),u}function o(){}function i(){var e,t,n={},r=["trace","debug","info","warn","error"];for(t=0;t<r.length;t++)e=r[t],n[e]=o,"undefined"!=typeof console&&console&&console[e]&&(n[e]=s(console,e));return n}function s(e,t){function n(n,r){return"object"==typeof r&&(n+=" "+JSON.stringify(r)),e[t].call(e,n)}return n}function a(e){var t,n=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/;try{t=location.href}catch(r){t=document.createElement("a"),t.href="",t=t.href}var o=n.exec(t.toLowerCase())||[],i=n.exec(e.toLowerCase()),s=!(!i||i[1]==o[1]&&i[2]==o[2]&&(i[3]||("http:"===i[1]?80:443))==(o[3]||("http:"===o[1]?80:443)));return s}function u(e){var t,n,r,o,i,s,a,u,c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",f=0,l=0,d="",p=[];if(!e)return e;do t=e.charCodeAt(f++),n=e.charCodeAt(f++),r=e.charCodeAt(f++),u=t<<16|n<<8|r,o=u>>18&63,i=u>>12&63,s=u>>6&63,a=63&u,p[l++]=c.charAt(o)+c.charAt(i)+c.charAt(s)+c.charAt(a);while(f<e.length);switch(d=p.join(""),e.length%3){case 1:d=d.slice(0,-2)+"==";break;case 2:d=d.slice(0,-1)+"="}return d}var c=XMLHttpRequest;if(!c)throw new Error("missing XMLHttpRequest");n.log={trace:o,debug:o,info:o,warn:o,error:o};var f=18e4,l=0;n.withCredentials=!1,n.DEFAULT_TIMEOUT=f,n.defaults=function(e,t){var r=function(t){var n=function(n,r){n="string"==typeof n?{uri:n}:JSON.parse(JSON.stringify(n));for(var o in e)void 0===n[o]&&(n[o]=e[o]);return t(n,r)};return n},o=r(n);return o.get=r(n.get),o.post=r(n.post),o.put=r(n.put),o.head=r(n.head),o};var d=["get","put","post","head"];d.forEach(function(e){var t=e.toUpperCase(),r=e.toLowerCase();n[r]=function(e){"string"==typeof e?e={method:t,uri:e}:(e=JSON.parse(JSON.stringify(e)),e.method=t);var r=[e].concat(Array.prototype.slice.apply(arguments,[1]));return n.apply(this,r)}}),n.couch=function(e,t){function r(e,n,r){if(e)return t(e,n,r);if((n.statusCode<200||n.statusCode>299)&&r.error){e=new Error("CouchDB error: "+(r.error.reason||r.error.error));for(var o in r)e[o]=r[o];return t(e,n,r)}return t(e,n,r)}"string"==typeof e&&(e={uri:e}),e.json=!0,e.body&&(e.json=e.body),delete e.body,t=t||o;var i=n(e,r);return i},e.exports=n},function(e,t,n){var r=n(10);e.exports=function(e){var t,n=window.StreamAnalytics||null,o=window._StreamAnalytics||null;n&&o&&(t=o.clients||{},r(t,function(t,o){r(e.prototype,function(e,t){n.prototype[t]=e}),t._config&&t.configure.call(t,t._config),t._setUser&&t.setUser.call(t,t._setUser),t._trackImpression&&r(t._trackImpression,function(e){t.trackImpression.apply(t,e)}),t._trackEngagement&&r(t._trackEngagement,function(e){t.trackEngagement.apply(t,e)}),r(["_config","_setUser","_trackEngagement","_trackImpression"],function(e){if(t[e]){t[e]=void 0;try{delete t[e]}catch(n){}}})})),window._StreamAnalytics=void 0;try{delete window[_StreamAnalytics]}catch(i){}}},function(e,t){e.exports=function(e,t,n){var r;if(!e)return 0;if(n=n?n:e,e instanceof Array){for(r=0;r<e.length;r++)if(t.call(n,e[r],r,e)===!1)return 0}else for(r in e)if(e.hasOwnProperty(r)&&t.call(n,e[r],r,e)===!1)return 0;return 1}}])});