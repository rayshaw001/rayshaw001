(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{283:function(e,t,n){},285:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(27),i=n.n(c),r=(n(88),n(21)),l=n(22),u=n(24),s=n(23),m=n(25),d=(n(90),n(76)),h=n.n(d),p=n(47),f=n.n(p),v=n(82),b=n.n(v),E=n(77),k=n.n(E),w=n(81),O=n.n(w),j=n(79),y=n.n(j),g=n(80),C=n.n(g),N=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(u.a)(this,Object(s.a)(t).call(this,e))).handleClick=function(e){console.log(e)},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.props.notes.map(function(t){return o.a.createElement(k.a,{onClick:function(t){return e.handleClick(t)}},o.a.createElement(y.a,null,o.a.createElement(C.a,null)),o.a.createElement(O.a,{primary:t.name,secondary:t.date}))});return o.a.createElement("div",{className:"NodeList"},o.a.createElement(b.a,null,t))}}]),t}(a.Component),I=(n(283),function(e){function t(e){return Object(r.a)(this,t),Object(u.a)(this,Object(s.a)(t).call(this,e))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return o.a.createElement("div",{className:"Header"})}}]),t}(a.Component)),M=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(u.a)(this,Object(s.a)(t).call(this,e))).state={input:"",notes:[]},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this,t="https://api.github.com/repos/rayshaw001/books/contents/Note/",n=[];f.a.get(t).then(function(a){a.data.map(function(a){f.a.get(t+a.name).then(function(t){n.push({name:t.data.name,content:decodeURIComponent(escape(window.atob(t.data.content))),date:""}),e.setState({notes:n})})})})}},{key:"render",value:function(){return o.a.createElement("div",{className:"Main"},o.a.createElement("div",null,o.a.createElement(I,null)),o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement(N,{notes:this.state.notes})),o.a.createElement("div",null,o.a.createElement(h.a,{className:"markdown",source:this.state.input}))))}},{key:"handleOnItemClick",value:function(e){this.setState({input:e})}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(M,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},83:function(e,t,n){e.exports=n(285)},88:function(e,t,n){},90:function(e,t,n){}},[[83,2,1]]]);
//# sourceMappingURL=main.2b96c714.chunk.js.map