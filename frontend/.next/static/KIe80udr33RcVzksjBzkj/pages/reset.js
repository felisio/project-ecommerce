(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{310:function(e,t,n){__NEXT_REGISTER_PAGE("/reset",function(){return e.exports=n(326),{page:e.exports.default}})},326:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(8),s=n.n(a),i=(n(3),n(5)),c=n(7),u=n.n(c),f=(n(14),n(9)),l=n(16),p=n(12);function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t,n,r,o,a,s){try{var i=e[a](s),c=i.value}catch(e){return void n(e)}i.done?t(c):Promise.resolve(c).then(r,o)}function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function P(){var e=function(e,t){t||(t=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n  mutation REQUEST_PASSSWORD_MUTATION(\n    $resetToken: String!\n    $password: String!\n    $confirmPassword: String!\n  ) {\n    resetPassword(\n      resetToken: $resetToken\n      password: $password\n      confirmPassword: $confirmPassword\n    ) {\n      id\n      name\n      email\n    }\n  }\n"]);return P=function(){return e},e}var E=u()(P()),S=function(e){function t(){var e,n,r,o;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var a=arguments.length,s=new Array(a),i=0;i<a;i++)s[i]=arguments[i];return r=this,o=(e=b(t)).call.apply(e,[this].concat(s)),n=!o||"object"!==d(o)&&"function"!=typeof o?y(r):o,v(y(n),"state",{password:"",confirmPassword:""}),v(y(n),"saveToState",function(e){n.setState(v({},e.target.name,e.target.value))}),n}var n,a,c;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(t,r["Component"]),n=t,(a=[{key:"render",value:function(){var e=this;return o.a.createElement(i.Mutation,{mutation:E,refetchQueries:[{query:f.a}],variables:{resetToken:this.props.resetToken,password:this.state.password,confirmPassword:this.state.confirmPassword}},function(t,n){var r=n.loading,a=n.error;n.called;return o.a.createElement(l.a,{method:"post",onSubmit:function(){var n,r=(n=s.a.mark(function n(r){return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r.preventDefault(),n.next=3,t();case 3:n.sent,e.setState({password:"",confirmPassword:""});case 5:case"end":return n.stop()}},n)}),function(){var e=this,t=arguments;return new Promise(function(r,o){var a=n.apply(e,t);function s(e){m(a,r,o,s,i,"next",e)}function i(e){m(a,r,o,s,i,"throw",e)}s(void 0)})});return function(e){return r.apply(this,arguments)}}()},o.a.createElement("fieldset",{disabled:r,"aria-busy":r},o.a.createElement("h2",null,"Insert the password and confirm to change"),o.a.createElement(p.a,{error:a}),o.a.createElement("label",{htmlFor:"password"},"Password",o.a.createElement("input",{type:"password",name:"password",placeholder:"password",value:e.state.password,onChange:e.saveToState})),o.a.createElement("label",{htmlFor:"password"},"Confirm Password",o.a.createElement("input",{type:"password",name:"confirmPassword",placeholder:"confirmPassword",value:e.state.confirmPassword,onChange:e.saveToState})),o.a.createElement("button",{type:"submit"},"Reset!")))})}}])&&w(n.prototype,a),c&&w(n,c),t}();t.default=function(e){return o.a.createElement("div",null,o.a.createElement(S,{resetToken:e.query.resetToken}))}}},[[310,1,0]]]);