/*! For license information please see index.js.LICENSE.txt */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("React")):"function"==typeof define&&define.amd?define(["React"],e):"object"==typeof exports?exports.OrangeHelpSearch=e(require("React")):t.OrangeHelpSearch=e(t.React)}(this,(t=>(()=>{"use strict";var e={883:e=>{e.exports=t}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var a=r[t]={exports:{}};return e[t](a,a.exports,n),a.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var o={};n.d(o,{default:()=>y});var a=n(883),i=n.n(a);function c(t){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c(t)}function u(){u=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",l=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(t){f=function(t,e,r){return t[e]=r}}function h(t,e,r,n){var a=e&&e.prototype instanceof b?e:b,i=Object.create(a.prototype),c=new A(n||[]);return o(i,"_invoke",{value:k(t,r,c)}),i}function p(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=h;var y="suspendedStart",d="suspendedYield",v="executing",m="completed",g={};function b(){}function w(){}function x(){}var E={};f(E,i,(function(){return this}));var S=Object.getPrototypeOf,L=S&&S(S(G([])));L&&L!==r&&n.call(L,i)&&(E=L);var O=x.prototype=b.prototype=Object.create(E);function j(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function N(t,e){function r(o,a,i,u){var l=p(t[o],t,a);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==c(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,i,u)}),(function(t){r("throw",t,i,u)})):e.resolve(f).then((function(t){s.value=t,i(s)}),(function(t){return r("throw",t,i,u)}))}u(l.arg)}var a;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return a=a?a.then(o,o):o()}})}function k(e,r,n){var o=y;return function(a,i){if(o===v)throw Error("Generator is already running");if(o===m){if("throw"===a)throw i;return{value:t,done:!0}}for(n.method=a,n.arg=i;;){var c=n.delegate;if(c){var u=_(c,n);if(u){if(u===g)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===y)throw o=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=v;var l=p(e,r,n);if("normal"===l.type){if(o=n.done?m:d,l.arg===g)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o=m,n.method="throw",n.arg=l.arg)}}}function _(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,_(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var a=p(o,e.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,g;var i=a.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,g):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function P(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function T(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function A(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(P,this),this.reset(!0)}function G(e){if(e||""===e){var r=e[i];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}throw new TypeError(c(e)+" is not iterable")}return w.prototype=x,o(O,"constructor",{value:x,configurable:!0}),o(x,"constructor",{value:w,configurable:!0}),w.displayName=f(x,s,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,x):(t.__proto__=x,f(t,s,"GeneratorFunction")),t.prototype=Object.create(O),t},e.awrap=function(t){return{__await:t}},j(N.prototype),f(N.prototype,l,(function(){return this})),e.AsyncIterator=N,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new N(h(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},j(O),f(O,s,"Generator"),f(O,i,(function(){return this})),f(O,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=G,A.prototype={constructor:A,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(T),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(u&&l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!l)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,g):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),T(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;T(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:G(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),g}},e}function l(t,e,r,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function s(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(t){l(a,n,o,i,c,"next",t)}function c(t){l(a,n,o,i,c,"throw",t)}i(void 0)}))}}function f(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,a,i,c=[],u=!0,l=!1;try{if(a=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=a.call(r)).done)&&(c.push(n.value),c.length!==e);u=!0);}catch(t){l=!0,o=t}finally{try{if(!u&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(l)throw o}}return c}}(t,e)||function(t,e){if(t){if("string"==typeof t)return h(t,e);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?h(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}const p=function(t){var e=t.searchEndpoint,r=t.autocompleteEndpoint,n=f((0,a.useState)(""),2),o=n[0],c=n[1],l=f((0,a.useState)(""),2),h=l[0],p=l[1],y=f((0,a.useState)(!1),2),d=y[0],v=y[1],m=f((0,a.useState)([]),2),g=m[0],b=m[1],w=f((0,a.useState)(!1),2),x=w[0],E=w[1],S=function(){var t=s(u().mark((function t(r){var n,a;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r.preventDefault(),o.trim()){t.next=3;break}return t.abrupt("return");case 3:return v(!0),t.prev=4,t.next=7,fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:o})});case 7:return n=t.sent,t.next=10,n.json();case 10:a=t.sent,p(a.answer),t.next=18;break;case 14:t.prev=14,t.t0=t.catch(4),console.error("Search error:",t.t0),p("Désolé, une erreur est survenue lors de la recherche.");case 18:v(!1),E(!1);case 20:case"end":return t.stop()}}),t,null,[[4,14]])})));return function(e){return t.apply(this,arguments)}}(),L=function(){var t=s(u().mark((function t(e){var n,o,a;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.target.value,c(n),!(n.length>=3)){t.next=19;break}return t.prev=3,t.next=6,fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:n})});case 6:return o=t.sent,t.next=9,o.json();case 9:a=t.sent,b(a.suggestions),E(!0),t.next=17;break;case 14:t.prev=14,t.t0=t.catch(3),console.error("Autocomplete error:",t.t0);case 17:t.next=21;break;case 19:b([]),E(!1);case 21:case"end":return t.stop()}}),t,null,[[3,14]])})));return function(e){return t.apply(this,arguments)}}();return i().createElement("div",{className:"brix---cta-section",style:{backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"}},i().createElement("div",{className:"brix---container-default-2 w-container"},i().createElement("div",{className:"w-layout-grid brix---grid-cta-v4"},i().createElement("div",{className:"brix---mg-bottom-24px"},i().createElement("div",{className:"brix---color-neutral-100"},i().createElement("h2",{className:"brix---heading-h2-size-2"},"Vous avez besoin d'aide ?"))),i().createElement("div",{className:"brix---mg-bottom-32px-2"},i().createElement("form",{onSubmit:S,className:"brix---position-relative"},i().createElement("input",{type:"text",className:"brix---input-large-button-inside w-input",placeholder:"Saisissez votre demande",value:o,onChange:L,style:{color:"white",caretColor:"white"}}),i().createElement("button",{type:"submit",className:"brix---btn-primary-small-input w-button",disabled:d},d?"Recherche...":"Chercher"),x&&g.length>0&&i().createElement("div",{className:"absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg"},g.map((function(t,e){return i().createElement("div",{key:e,className:"p-2 hover:bg-gray-100 cursor-pointer",onClick:function(){c(t),E(!1)}},t)}))))),h&&i().createElement("div",{className:"mt-6 p-4 bg-white rounded-lg shadow"},i().createElement("div",{className:"prose max-w-none"},h)))))},y=p;return"undefined"!=typeof window&&(window.OrangeHelpSearch=p),o.default})()));