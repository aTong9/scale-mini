(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"132":function(e,t,r){"use strict";var n=r(8),a=r(9),o=r(11),s=r(4),i=r(14),c=function pageToLogin(){(function getCurrentPageUrl(){var e=i.default.getCurrentPages();return e[e.length-1].route})().includes("login")||i.default.navigateTo({"url":"/pages/login/login"})},u=200,p=401,d=403,b=404,g=502,l=r(49),f=[function customInterceptor(e){var t=e.requestParams;return e.proceed(t).then((function(e){return e.statusCode===b?Promise.reject("请求资源不存在"):e.statusCode===g?Promise.reject("服务端出现了问题"):e.statusCode===d?(Object(i.setStorageSync)("Authorization",""),c(),Promise.reject("没有权限访问")):e.statusCode===p?(Object(i.setStorageSync)("Authorization",""),c(),Promise.reject("需要鉴权")):e.statusCode===u?1e6===e.data.code?(l.a.state.sessionId||l.a.commit(l.b.SET_USER_INFO,{"sessionId":e.cookies?e.cookies.join(";").split(";")[0]:""}),e.data.result):1010102===e.data.code?(l.a.commit(l.b.CLEAR_USER_INFO),Promise.reject({"errMsg":"请重新登录"})):e.data.C0?e.data:(Object(i.showToast)({"title":e.data.message,"icon":"none"}),Promise.reject({"errMsg":e.data.message})):void 0})).catch((function(e){return Object(i.showToast)({"title":"".concat("string"==typeof e?e:e.errMsg),"icon":"error"}),Promise.reject(e)}))},i.default.interceptors.logInterceptor],m=(r(10),function toUpperCase(e){if(""!==e)return e.toLocaleUpperCase()});var h=r(131),j=r.n(h),O=r(133),y=r.n(O);f.forEach((function(e){return Object(i.addInterceptor)(e)}));var v=function(){function Http(){Object(a.a)(this,Http),Object(s.a)(this,"baseConfig",{"url":"","method":"post","baseURL":"".concat("http://39.107.67.8:5050"),"header":{"Content-Type":"application/json"},"data":{},"timeout":15e3,"responseType":"text"})}return Object(o.a)(Http,[{"key":"request","value":function request(e){var t=Object(n.a)(Object(n.a)(Object(n.a)({},this.baseConfig),e),{},{"url":0===e.url.indexOf("http")?e.url:(e.baseURL||this.baseConfig.baseURL)+e.url,"method":m(e.method),"header":Object(n.a)(Object(n.a)({},this.baseConfig.header),{},{"cookie":l.a.state.sessionId})});t.data=Object(n.a)(Object(n.a)({},t.data),{},{"user_token":l.a.state.token,"api_token":l.a.state.token?j()("".concat(l.a.state.token).concat(t.url.replace("http://39.107.67.8:5050","http://39.107.67.8:5050")).concat(y()().format("YYYY-MM-DD")).concat("B759F724AA7A840F878CD16C3861AC89")):""});var r={};return Object.keys(t).forEach((function(e){""!==t[e]&&void 0!==t[e]&&null!==t[e]&&(r[e]=t[e])})),console.log("params",r),Object(i.request)(r)}},{"key":"get","value":function get(e,t){return this.request({"method":"get","url":e,"data":t})}},{"key":"post","value":function post(e,t){return this.request({"method":"POST","url":e,"data":t})}}]),Http}();t.a=new v},"134":function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var n=r(132),a=r(131),o=r.n(a),s=((new Date).getTime(),o()("103959597"+(new Date).getTime()+"d019d0fea8a848ea8e49dffc0d999ce3"),{"login":function login(e){return n.a.get("/api/user/user/user_login",e)},"register":function register(e){return n.a.get("/api/user/user/user_register",e)},"userQuery":function userQuery(){return n.a.get("/api/user/user/user_query")},"problemQuery":function problemQuery(){return n.a.get("/api/company/problem/problem_query")},"privacyQuery":function privacyQuery(){return n.a.get("/api/company/privacy/privacy_query")},"userAvatar":function userAvatar(e){return n.a.post("/api/user/user/user_avatar",e)},"userExtend":function userExtend(e){return n.a.get("/api/user/user/user_extend",e)},"userUpdate":function userUpdate(e){return n.a.post("/api/user/user/user_update",e)},"user_nickname":function user_nickname(e){return n.a.post("/api/user/user/user_nickname",e)},"user_gender":function user_gender(e){return n.a.post("/api/user/user/user_gender",e)},"user_birthday":function user_birthday(e){return n.a.post("/api/user/user/user_birthday",e)},"user_phone":function user_phone(e){return n.a.post("/api/user/user/user_phone",e)},"user_height":function user_height(e){return n.a.post("/api/user/user/user_height",e)},"user_weight":function user_weight(e){return n.a.post("/api/user/user/user_weight",e)}})},"146":function(e,t,r){var n=r(35),a=r(175);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var o={"insert":"head","singleton":!1};n(a,o);e.exports=a.locals||{}},"174":function(e,t,r){"use strict";r(146)},"175":function(e,t,r){(t=r(33)(!1)).push([e.i,".page {\n  height: 100vh;\n  padding: 0.64rem;\n  background: #f9f9f9;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  overflow-y: auto;\n}\n.no-login {\n  text-align: center;\n  padding: 0 0.98133rem;\n  height: 100%;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: flex;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n      align-items: center;\n}\n.no-login .empty {\n  width: 5.80267rem;\n  height: 5.07733rem;\n  margin-top: 2.56rem;\n}\n.no-login .nut-button {\n  margin-top: 2.816rem;\n}\n.section {\n  margin-bottom: 0.85333rem;\n  padding: 0.64rem;\n  background-color: #fff;\n  border-radius: 0.512rem;\n  -webkit-box-shadow: 0 0.08533rem 0.34133rem rgba(0, 0, 0, 0.04);\n          box-shadow: 0 0.08533rem 0.34133rem rgba(0, 0, 0, 0.04);\n}\n.section h3 {\n  color: #d79347;\n  padding-bottom: 0.68267rem;\n  border-bottom: 0.04267rem solid #dcdcdc;\n}\n.section p {\n  line-height: 1.5;\n  font-size: 0.64rem;\n  color: #666;\n  padding: 0 0.64rem 0.64rem;\n}\n.section .privacy-content {\n  border-top: 0.04267rem dashed #dcdcdc;\n  padding-top: 0.64rem;\n}",""]),e.exports=t},"185":function(e,t,r){"use strict";r.r(t);var n=r(5),a=r(0),o={"class":"page"},s={"key":0,"class":"section"},i=Object(n.h)("h3",{"class":"f17 mb16"},"隐私政策条款",-1),c=Object(n.h)("p",{"class":""},"本政策适用于：",-1),u=Object(n.h)("p",{"class":"privacy-content"},"本政策帮助你了解一下内容：",-1);var p,d=r(8),b=r(4),g=r(50),l=r(24),f=r(1),m=r(134),h=Object(n.m)({"name":"Privacy","components":(p={},Object(b.a)(p,l.a.name,l.a),Object(b.a)(p,g.a.name,g.a),p),"setup":function setup(){var e=Object(f.l)(1),t=Object(f.k)({"privacy":{}});Object(n.x)((function(){r()}));var r=function getData(){m.a.privacyQuery().then((function(e){t.privacy=e}))};return Object(d.a)({"activeName":e},Object(f.q)(t))}}),j=(r(174),r(130));const O=r.n(j)()(h,[["render",function render(e,t,r,p,d,b){return Object(n.A)(),Object(n.g)("div",o,[Object(n.h)("div",null,[e.privacy?(Object(n.A)(),Object(n.g)("div",s,[i,Object(n.h)("p",null,"最近更新日期："+Object(a.L)(e.privacy.update_date),1),c,(Object(n.A)(!0),Object(n.g)(n.b,null,Object(n.E)(e.privacy.target_condition,(function(e,t){return Object(n.A)(),Object(n.g)("p",{"key":t},Object(a.L)(e),1)})),128)),u,(Object(n.A)(!0),Object(n.g)(n.b,null,Object(n.E)(e.privacy.privacy_content,(function(e,t){return Object(n.A)(),Object(n.g)("p",{"key":t},Object(a.L)(t+1)+"、"+Object(a.L)(e),1)})),128))])):Object(n.f)("",!0)])])}]]);t.default=O}}]);