(this["webpackJsonptweetme-web"]=this["webpackJsonptweetme-web"]||[]).push([[0],{12:function(e,t,c){},13:function(e,t,c){},15:function(e,t,c){"use strict";c.r(t);var n=c(1),s=c.n(n),a=c(6),r=c.n(a),o=(c(12),c.p+"static/media/logo.6ce24c58.svg"),i=(c(13),c(7)),l=c(2);var j=c(0);function b(e){var t=s.a.createRef(),c=Object(n.useState)([]),a=Object(l.a)(c,2),r=a[0],o=a[1];return Object(j.jsxs)("div",{className:e.className,children:[Object(j.jsx)("div",{className:"col-12 mb-3",children:Object(j.jsxs)("form",{onSubmit:function(e){e.preventDefault();var c=t.current.value,n=Object(i.a)(r);n.unshift({content:c,likes:0,id:22}),o(n),t.current.value=""},children:[Object(j.jsx)("textarea",{ref:t,required:!0,className:"form-control",name:"tweet"}),Object(j.jsx)("button",{type:"submit",className:"btn btn-primary my-3",children:"Tweet"})]})}),Object(j.jsx)(p,{newTweet:r})]})}function u(e){var t=e.tweet,c=e.action,s=Object(n.useState)(t.likes?t.likes:0),a=Object(l.a)(s,2),r=a[0],o=a[1],i=Object(n.useState)(!1),b=Object(l.a)(i,2),u=b[0],d=b[1],p=e.className?p:"btn btn-primary btn-sm",m=c.display?c.display:"Action",O=t.likes>1?"s":"",f="like"===c.type?"".concat(r," ").concat(m)+O:m;return Object(j.jsx)("button",{className:p,onClick:function(e){e.preventDefault(),"like"===c.type&&(!0===u?(o(r-1),d(!1)):(o(r+1),d(!0)))},children:f})}function d(e){var t=e.tweet,c=e.className?e.className:"col-10 mx-auto col-md-6";return Object(j.jsxs)("div",{className:c,children:[Object(j.jsxs)("p",{children:[t.id," - ",t.content]}),Object(j.jsxs)("div",{className:"btn btn-group",children:[Object(j.jsx)(u,{tweet:t,action:{type:"like",display:"Like"}}),Object(j.jsx)(u,{tweet:t,action:{type:"retweet",display:"Retweet"}})]})]})}function p(e){var t=Object(n.useState)([]),c=Object(l.a)(t,2),s=c[0],a=c[1],r=Object(n.useState)([]),o=Object(l.a)(r,2),b=o[0],u=o[1];return Object(n.useEffect)((function(){var t=Object(i.a)(e.newTweet).concat(s);t.length!==b.length&&u(t)}),[e.newTweet,b,s]),Object(n.useEffect)((function(){!function(e){var t=new XMLHttpRequest;t.responseType="json",t.open("GET","http://localhost:8000/api/tweet/"),t.onload=function(){e(t.response,t.status)},t.onerror=function(t){console.log(t),e({message:"Request was an error"},400)},t.send()}((function(e,t){console.log(e,t),200===t?a(e):alert("An error occured")}))}),[]),Object(j.jsx)("div",{children:b.map((function(e,t){return Object(j.jsx)(d,{tweet:e,className:"my-5 mx-5 border"},"".concat(t,"-{tweet-id}"))}))})}var m=function(){return Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)("header",{className:"App-header",children:[Object(j.jsx)("img",{src:o,className:"App-logo",alt:"logo"}),Object(j.jsxs)("p",{children:["Edit ",Object(j.jsx)("code",{children:"src/App.js"})," and save to reload."]}),Object(j.jsx)(b,{}),Object(j.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})},O=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,16)).then((function(t){var c=t.getCLS,n=t.getFID,s=t.getFCP,a=t.getLCP,r=t.getTTFB;c(e),n(e),s(e),a(e),r(e)}))},f=document.getElementById("root");f&&r.a.render(Object(j.jsx)(s.a.StrictMode,{children:Object(j.jsx)(m,{})}),f);var h=document.getElementById("tweetme");h&&r.a.render(Object(j.jsx)(b,{}),h),O()}},[[15,1,2]]]);
//# sourceMappingURL=main.9fd9d924.chunk.js.map