(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{15:function(e,t,n){e.exports=n(52)},19:function(e,t,n){e.exports=n(55)},24:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"a",function(){return o});var r="https://e-commerce-yoga-prod.herokuapp.com/",o=4},303:function(e,t,n){__NEXT_REGISTER_PAGE("/items",function(){return e.exports=n(304),{page:e.exports.default}})},304:function(e,t,n){"use strict";n.r(t);var r=n(90);t.default=r.default},52:function(e,t,n){"use strict";var r=n(38),o=n(17);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(n(53)),a=o(n(50)),u=o(n(21)),c=o(n(22)),l=o(n(33)),f=o(n(34)),p=o(n(35)),s=o(n(51)),d=o(n(29)),m=n(71),y=r(n(0)),h=(o(n(3)),r(n(44))),b=n(40);var g=function(e){function t(){var e,n,r,o,i,c;(0,u.default)(this,t);for(var p=arguments.length,y=new Array(p),g=0;g<p;g++)y[g]=arguments[g];return n=(0,l.default)(this,(e=(0,f.default)(t)).call.apply(e,[this].concat(y))),(0,d.default)((0,s.default)((0,s.default)(n)),"formatUrls",(r=function(e,t){return{href:e&&"object"===(0,a.default)(e)?(0,m.format)(e):e,as:t&&"object"===(0,a.default)(t)?(0,m.format)(t):t}},o=null,i=null,c=null,function(e,t){if(e===o&&t===i)return c;var n=r(e,t);return o=e,i=t,c=n,n})),(0,d.default)((0,s.default)((0,s.default)(n)),"linkClicked",function(e){var t=e.currentTarget,r=t.nodeName,o=t.target;if("A"!==r||!(o&&"_self"!==o||e.metaKey||e.ctrlKey||e.shiftKey||e.nativeEvent&&2===e.nativeEvent.which)){var i=n.formatUrls(n.props.href,n.props.as),a=i.href,u=i.as;if(function(e){var t=(0,m.parse)(e,!1,!0),n=(0,m.parse)((0,b.getLocationOrigin)(),!1,!0);return!t.host||t.protocol===n.protocol&&t.host===n.host}(a)){var c=window.location.pathname;a=(0,m.resolve)(c,a),u=u?(0,m.resolve)(c,u):a,e.preventDefault();var l=n.props.scroll;null==l&&(l=u.indexOf("#")<0);var f=n.props.replace?"replace":"push";h.default[f](a,u,{shallow:n.props.shallow}).then(function(e){e&&l&&(window.scrollTo(0,0),document.body.focus())}).catch(function(e){n.props.onError&&n.props.onError(e)})}}}),n}return(0,p.default)(t,e),(0,c.default)(t,[{key:"componentDidMount",value:function(){this.prefetch()}},{key:"componentDidUpdate",value:function(e){(0,i.default)(this.props.href)!==(0,i.default)(e.href)&&this.prefetch()}},{key:"prefetch",value:function(){if(this.props.prefetch&&"undefined"!=typeof window){var e=window.location.pathname,t=this.formatUrls(this.props.href,this.props.as).href,n=(0,m.resolve)(e,t);h.default.prefetch(n)}}},{key:"render",value:function(){var e=this,t=this.props.children,n=this.formatUrls(this.props.href,this.props.as),r=n.href,o=n.as;"string"==typeof t&&(t=y.default.createElement("a",null,t));var i=y.Children.only(t),a={onClick:function(t){i.props&&"function"==typeof i.props.onClick&&i.props.onClick(t),t.defaultPrevented||e.linkClicked(t)}};return!this.props.passHref&&("a"!==i.type||"href"in i.props)||(a.href=o||r),a.href&&"undefined"!=typeof __NEXT_DATA__&&__NEXT_DATA__.nextExport&&(a.href=(0,h._rewriteUrlForNextExport)(a.href)),y.default.cloneElement(i,a)}}]),t}(y.Component);t.default=g},53:function(e,t,n){e.exports=n(54)},54:function(e,t,n){var r=n(13),o=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return o.stringify.apply(o,arguments)}},90:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),i=n(5),a=n(7),u=n.n(a),c=n(6),l=(n(3),n(15)),f=n.n(l),p=c.b.h3.withConfig({displayName:"Title",componentId:"sc-16nq74k-0"})(["margin:0 1rem;text-align:center;transform:skew(-5deg) rotate(-1deg);margin-top:-3rem;text-shadow:2px 2px 0 rgba(0,0,0,0.1);a{background:",";display:inline;line-height:1.3;font-size:4rem;text-align:center;color:white;padding:0 1rem;}"],function(e){return e.theme.red}),s=c.b.div.withConfig({displayName:"ItemStyles__Item",componentId:"sc-16pk14u-0"})(["background:white;border:1px solid ",";box-shadow:",";position:relative;display:flex;flex-direction:column;img{width:100%;height:240px;object-fit:cover;}p{font-size:12px;line-height:2;font-weight:300;flex-grow:1;padding:0 3rem;font-size:1.5rem;}.buttonList{display:grid;width:100%;border-top:1px solid ",";grid-template-columns:repeat(auto-fit,minmax(100px,1fr));grid-gap:1px;background:",";& > *{background:white;border:0;font-size:1rem;padding:1rem;}}"],function(e){return e.theme.offWhite},function(e){return e.theme.bs},function(e){return e.theme.lightgrey},function(e){return e.theme.lightgrey}),d=c.b.span.withConfig({displayName:"PriceTag",componentId:"nwbk6t-0"})(["background:",";transform:rotate(3deg);color:white;font-weight:600;padding:5px;line-height:1;font-size:3rem;display:inline-block;position:absolute;top:-3px;right:-3px;"],function(e){return e.theme.red}),m=n(23),y=n(8),h=n.n(y);function b(e){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function g(e,t,n,r,o,i,a){try{var u=e[i](a),c=u.value}catch(e){return void n(e)}u.done?t(c):Promise.resolve(c).then(r,o)}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function x(){var e=function(e,t){t||(t=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n  mutation DELETE_ITEM_MUTATION ( $id: ID! ) {\n    deleteItem( id: $id ) {\n      id\n    }\n  }\n"]);return x=function(){return e},e}var j=u()(x()),k=function(e){function t(){var e,n,r,o;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var i=arguments.length,a=new Array(i),u=0;u<i;u++)a[u]=arguments[u];return r=this,n=!(o=(e=w(t)).call.apply(e,[this].concat(a)))||"object"!==b(o)&&"function"!=typeof o?E(r):o,O(E(n),"deleteItem",function(){var e,t=(e=h.a.mark(function e(t){return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:confirm("Are you sure you want delete this item?")&&t().catch(function(e){alert(e.message)});case 1:case"end":return e.stop()}},e)}),function(){var t=this,n=arguments;return new Promise(function(r,o){var i=e.apply(t,n);function a(e){g(i,r,o,a,u,"next",e)}function u(e){g(i,r,o,a,u,"throw",e)}a(void 0)})});return function(e){return t.apply(this,arguments)}}()),O(E(n),"update",function(e,t){var n=e.readQuery({query:te});n.items=n.items.filter(function(e){return e.id!==t.data.deleteItem.id}),e.writeQuery({query:te,data:n})}),n}var n,a,u;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(t,r["Component"]),n=t,(a=[{key:"render",value:function(){var e=this;return o.a.createElement(i.Mutation,{refetchQueries:["ALL_ITEMS_QUERY","PAGINATION_QUERY"],mutation:j,variables:{id:this.props.id},update:this.update},function(t,n){n.loading,n.error;return o.a.createElement("button",{onClick:function(){return e.deleteItem(t)}},e.props.children)})}}])&&v(n.prototype,a),u&&v(n,u),t}(),P=n(9);function S(e){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function C(e,t){return!t||"object"!==S(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function I(e){return(I=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function N(e,t){return(N=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function A(){var e=function(e,t){t||(t=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n  mutation ADD_TO_CART_MUTATION($id: ID!) {\n    addToCart(id: $id) {\n      id\n      quantity\n    }\n  }\n"]);return A=function(){return e},e}var q=u()(A()),z=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),C(this,I(t).apply(this,arguments))}var n,a,u;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&N(e,t)}(t,r["Component"]),n=t,(a=[{key:"render",value:function(){var e=this.props.id;return o.a.createElement(i.Mutation,{refetchQueries:[{query:P.a}],mutation:q,variables:{id:e}},function(e,t){var n=t.loading;return o.a.createElement("button",{disabled:n,onClick:e},"Add",n&&"ing"," to Cart 🛒")})}}])&&T(n.prototype,a),u&&T(n,u),t}();function D(e){return(D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function U(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function L(e,t){return!t||"object"!==D(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function R(e){return(R=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function M(e,t){return(M=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var Q=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),L(this,R(t).apply(this,arguments))}var n,i,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&M(e,t)}(t,r["Component"]),n=t,(i=[{key:"render",value:function(){var e=this.props.item;return o.a.createElement(s,null,e.image&&o.a.createElement("img",{width:"200",src:e.image,alt:e.title}),o.a.createElement(p,null,o.a.createElement(f.a,{href:{pathname:"/item",query:{id:e.id}}},o.a.createElement("a",null,e.title))),o.a.createElement(d,null,Object(m.a)(e.price)),o.a.createElement("p",null,e.description),o.a.createElement("div",{className:"buttonList"},o.a.createElement(f.a,{href:{pathname:"/update",query:{id:e.id}}},o.a.createElement("a",null," Edit ✏️")),o.a.createElement(z,{id:e.id}),o.a.createElement(k,{id:e.id},"Delete this item 🗑️")))}}])&&U(n.prototype,i),a&&U(n,a),t}(),$=n(19),J=n.n($),G=c.b.div.withConfig({displayName:"PaginationStyles",componentId:"aduuar-0"})(["text-align:center;display:inline-grid;grid-template-columns:repeat(4,auto);align-items:stretch;justify-content:center;align-content:center;margin:2rem 0;border:1px solid ",";border-radius:10px;& > *{margin:0;padding:15px 30px;border-right:1px solid ",";&:last-child{border-right:0;}}a[aria-disabled='true']{color:grey;pointer-events:none;}"],function(e){return e.theme.lightgrey},function(e){return e.theme.lightgrey}),Y=n(24);function F(){var e=function(e,t){t||(t=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n  query PAGINATION_QUERY {\n    itemsConnection {\n      aggregate {\n        count\n      }\n    }\n  }\n"]);return F=function(){return e},e}var K=u()(F()),X=function(e){return o.a.createElement(i.Query,{query:K},function(t){var n=t.data,r=t.error;if(t.loading)return o.a.createElement("p",null,"Loading...");if(r)return o.a.createElement("p",null,"Error: ",r.message);var i=n.itemsConnection.aggregate.count,a=Math.ceil(i/Y.a),u=e.page;return o.a.createElement(G,{"data-test":"pagination"},o.a.createElement(J.a,null,o.a.createElement("title",null,"Sick Fits | page ",u," of ",a)),o.a.createElement(f.a,{prefetch:!0,href:{pathname:"items",query:{page:u-1}}},o.a.createElement("a",{className:"prev","aria-disabled":u<=1}," 🔙 Prev ")),o.a.createElement("p",null,u," of",o.a.createElement("span",{className:"total-pages"},a)),o.a.createElement("p",null,i," items total!"),o.a.createElement(f.a,{href:{pathname:"items",query:{page:u+1}}},o.a.createElement("a",{className:"next","aria-disabled":u>=a}," Next 🔜 ")))})};function W(e){return(W="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function H(e,t){return!t||"object"!==W(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function V(e){return(V=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Z(e,t){return(Z=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function ee(){var e=function(e,t){t||(t=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ",") {\n    items (skip: $skip, first: $first, orderBy: createdAt_DESC) {\n      id\n      title\n      price\n      description\n      image\n      largeImage\n    }\n  }\n"]);return ee=function(){return e},e}var te=u()(ee(),Y.a),ne=c.b.div.withConfig({displayName:"Items__Center",componentId:"tikday-0"})(["text-align:center;"]),re=c.b.div.withConfig({displayName:"Items__ItemsList",componentId:"tikday-1"})(["display:grid;grid-template-columns:1fr 1fr;grid-gap:60px;max-width:",";margin:0 auto;"],function(e){return e.theme.maxWidth}),oe=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),H(this,V(t).apply(this,arguments))}var n,a,u;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Z(e,t)}(t,r["Component"]),n=t,(a=[{key:"render",value:function(){return o.a.createElement(ne,null,o.a.createElement(X,{page:this.props.page}),o.a.createElement(i.Query,{query:te,variables:{skip:this.props.page*Y.a-Y.a}},function(e){var t=e.data,n=e.error;return e.loading?o.a.createElement("p",null,"Loading..."):n?o.a.createElement("p",null,"Error: ",n.message):o.a.createElement(re,null,t.items.map(function(e){return o.a.createElement(Q,{item:e,key:e.id})}))}),o.a.createElement(X,{page:this.props.page}))}}])&&B(n.prototype,a),u&&B(n,u),t}();t.default=function(e){return o.a.createElement("div",null,o.a.createElement(oe,{page:parseFloat(e.query.page)||1}))}}},[[303,1,0]]]);