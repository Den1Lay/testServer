(this.webpackJsonpremind2=this.webpackJsonpremind2||[]).push([[0],{184:function(e,a,t){},187:function(e,a,t){},188:function(e,a,t){},189:function(e,a,t){},190:function(e,a,t){},191:function(e,a,t){},192:function(e,a,t){},193:function(e,a,t){},194:function(e,a,t){},195:function(e,a,t){},196:function(e,a,t){},197:function(e,a,t){},198:function(e,a,t){},199:function(e,a,t){},200:function(e,a,t){},201:function(e,a,t){},202:function(e,a,t){},203:function(e,a,t){},204:function(e,a,t){},205:function(e,a,t){},206:function(e,a,t){},207:function(e,a,t){},208:function(e,a,t){},209:function(e,a,t){},210:function(e,a,t){"use strict";t.r(a);var n,s,c=t(0),o=t(30),r=t(9),i=t(6),l=t(114),d=t(40),u=(t(165),t(115)),g=t(66),j=t(59),h="ADD_TO_CART",m="CHECKOUT_REQUEST",b="CHECKOUT_SUCCESS",v="CHECKOUT_FAILURE",O="MICRO_EVENT",f="ADD_ELEMENT",p="PRIVATE_MSG",_="JOIN_TO_ROOM",x="GET_MSGS",N="INIT",E="PICK_DIALOG",S="SET_DIALOG_TAB_MOD",k="SET_SEARCH_PEOPLE",y="CREATE_NEW_DIALOG",w="CREATE_MESSAGE",D="SET_MESSAGE",P="SET_DIALOG",M="READ_MESSAGES",I="SET_READ_MESSAGES",T="GET_POLL_MESSAGES",C="SET_V",A="SET_POLL_MESSAGES",R="EDIT_PROFILE",L="SET_PROFILE",G="SET_MY_PROFILE",U="SET_ONLINE",H="LOGOUT",F="ADD_QUERY",V={addedIds:[],quantityById:{}},z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V.addedIds,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case h:return-1!==e.indexOf(a.productId)?e:[].concat(Object(j.a)(e),[a.productId]);default:return e}},B=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V.quantityById,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case h:var t=a.productId;return Object(i.a)(Object(i.a)({},e),{},Object(g.a)({},t,(e[t]||0)+1));default:return e}},J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case m:return V;case v:return a.cart;case b:return console.log("%c%s","color: red; font-size: 15px;","SUCCESS_SEND"),V;default:return{addedIds:z(e.addedIds,a),quantityById:B(e.quantityById,a)}}},q={products:(null===(n=window.localStorage)||void 0===n?void 0:n.testData)?JSON.parse(null===(s=window.localStorage)||void 0===s?void 0:s.testData):function(){var e=new RegExp("[.]|[,]","g"),a="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.".replace(e,"").split(" "),t=[];function n(e,t){var s;if(s=e||a.splice(0,1)[0],Math.random()>.5&&a.length){var c=Math.floor(Math.min(5*Math.random(),a.length-1))+1,o=a.splice(0,c);t.push({name:s,type:"dir",payload:[]}),o.forEach((function(e){return n(e,t[t.length-1].payload)}))}else t.push({name:s,type:"target",payload:{A:Math.random(),B:Math.random(),C:Math.random()}})}for(;a.length;)n(null,t);var s={name:"main",type:"dir",payload:t};return window.localStorage.testData=JSON.stringify(s),s}()},W={elements:{}},$=Object(d.b)({productsEvents:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,a=arguments.length>1?arguments[1]:void 0,t=a.type,n=a.payload;switch(t){case O:return e+n;default:return e}},microEls:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,a=arguments.length>1?arguments[1]:void 0,t=a.type,n=a.payload;switch(t){case f:return function(){var a=n.name,t=n.A,s=n.B,c=n.C;return e.elements.hasOwnProperty(a)?e.elements[a].count++:e.elements[a]={A:t,B:s,C:c,count:1},e}();default:return e}}}),Y={room:"",lastMessage:{addres:"",message:""},v:"",dialogs:[],user:null,isAuth:!1,choosenDialogId:null,readyMessengesData:[],dialogTabMod:"base",searchPeople:[],newDialogTargetId:null,messageData:{},isLiveUnreaded:!1,readMessagesPass:"",newProfileData:{},logOutId:"",showSearchPeople:[]};function K(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return"".concat(e,"$$").concat(Math.random())}function X(e,a){for(var t=e.messages.sort((function(e,a){var t=e.createdAt,n=a.createdAt;return new Date(t)>new Date(n)?1:-1})),n=[],s={mounth:null,day:null},c=-1;++c<t.length;){var o=t[c].createdAt,r=new Date(o),i={mounth:r.getMonth(),day:r.getDate()};s.mounth!==i.mounth||s.day!==i.day?(s=i,n.push({date:l(i),messages:[d(t[c],a)]})):n[n.length-1].messages.push(d(t[c],a))}return n;function l(e){var a=e.mounth,t=e.day;return"".concat(t," ").concat({0:"January ",1:"February",2:"March",3:"April",4:"May",5:"June",6:"Jule",7:"August",8:"September",9:"October",10:"November",11:"December"}[a+""])}function d(e,a){var t=e.text,n=e.author,s=e.createdAt,c=e.readed,o=e.prevPoll,r=new Date(s);return{time:"".concat(r.getHours(),":").concat(r.getMinutes()),text:t,isMe:n===a._id,readed:c,prevPoll:o}}}function Q(e,a){for(var t=-1,n=-1;++n<e.length;)if(e[n].dialog._id===a){t=n;break}return t}var Z=Object(d.b)({cart:J,products:$,dialogs:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Y,a=arguments.length>1?arguments[1]:void 0,t=a.type,n=a.payload;switch(t){case p:return function(){var a=n.msg,t=n.addres;return e.lastMessage={addres:t,message:a},e.v=K("m"),e}();case _:return function(){var a=n.room;return e.room=a,e.v=K("r"),e}();case x:return e.v=K("g"),e;case y:return function(){var a=n.userId;return e.newDialogTargetId=a,e.v=K("createDialog"),e}();case P:return function(){var a=n.dialog;return e.dialogs.push({dialog:a,messages:[]}),e.v=K(),e}();case w:return function(){var a=n.text,t=function(){for(var a=-1,t=-1;++t<e.dialogs.length;)if(e.choosenDialogId===e.dialogs[t].dialog._id){a=t;break}return e.dialogs[a].dialog}();return e.messageData={poll:t.poll,dialogId:t._id,userId:e.user._id,targetUserId:t.author._id===e.user._id?t.partner._id:t.author._id,text:a},e.v=K("createMessage"),e}();case D:return function(){for(var a=n.message,t=n.dialogId,s=-1,c=-1;++c<e.dialogs.length;)if(e.dialogs[c].dialog._id===t){s=c;break}return e.dialogs[s].messages.push(a),t===e.choosenDialogId&&(e.readyMessengesData=X(e.dialogs[s],e.user),a.author!==e.user._id&&(e.isLiveUnreaded=!0)),e.v=K(),e}();case N:return function(){var a=n.dialogs,t=n.user;return(e=Object(i.a)(Object(i.a)({},e),{},{dialogs:a,user:t,isAuth:!0})).v=K("init"),e}();case S:return function(){var a=n.mod;return"search"===a?(e.dialogTabMod="search",e.v=K("searchPeople")):"base"===a&&(e.dialogTabMod="base",e.v=K()),e}();case k:return function(){var a=n.data;return e.searchPeople=a,e.showSearchPeople=a,e.v=K(),e}();case F:return function(){var a=n.text;return e.showSearchPeople=e.searchPeople.filter((function(e){var t=e.nickName.toLowerCase(),n=a.toLowerCase();return-1!==t.indexOf(n)})),e}();case E:return function(){var a=n._id,t=n.dialog;null!==t&&e.dialogs.push({dialog:t,messages:[]}),e.choosenDialogId=a;var s=Q(e.dialogs,a),c=X(e.dialogs[s],e.user);return e.readyMessengesData=c,e.v=K("pickDialog"),e}();case M:return function(){var a=n.pass;return e.readMessagesPass=a,e.v=K("readMessages"),e}();case I:return function(){for(var a=n.dialogId,t=n.messagesId,s=n.pass,c=Q(e.dialogs,a),o=!1,r=-1;++r<e.dialogs[c].messages.length;)for(var i=-1;++i<t.length;)e.dialogs[c].messages[r]._id===t[i]&&(e.dialogs[c].messages[r].readed=!0,e.dialogs[c].messages[r].author!==e.user._id&&(o=!0));o&&(e.isLiveUnreaded=!1);var l=X(e.dialogs[c],e.user);return e.readyMessengesData=l,e.v=K(s),e}();case T:return e.v=K("getPollMessages"),e;case C:return function(){var a=n.pass;return e.v=K(a),e}();case A:return function(){var a=n.messages,t=Q(e.dialogs,e.choosenDialogId);e.dialogs[t].messages=[].concat(Object(j.a)(a),Object(j.a)(e.dialogs[t].messages));var s=X(e.dialogs[t],e.user);return e.readyMessengesData=s,e.v=K("setPollMessages"),e}();case R:return function(){var a=n.nickName,t=n.loginName,s=n.password;return e.newProfileData={nickName:a,loginName:t,password:s,_id:e.user._id},e.v=K("editProfile"),e}();case G:return e.user=Object(i.a)(Object(i.a)({},e.user),e.newProfileData),e.v=K("setMyProfile"),e;case L:return function(){for(var a=n.nickName,t=n.loginName,s=n.password,c=n._id,o=-1;++o<e.dialogs.length;){var r=e.dialogs[o].dialog,l=r.author,d=r.partner;if(l._id===c){e.dialogs[o].dialog.author=Object(i.a)(Object(i.a)({},e.dialogs[o].dialog.author),{},{nickName:a,loginName:t,password:s});break}if(d._id===c){e.dialogs[o].dialog.partner=Object(i.a)(Object(i.a)({},e.dialogs[o].dialog.partner),{},{nickName:a,loginName:t,password:s});break}}return e.v=K("setProfile"),e}();case U:return function(){for(var a=n._id,t=n.status,s=-1;++s<e.dialogs.length;){var c=e.dialogs[s].dialog,o=c.author,r=c.partner;if(o._id===a){e.dialogs[s].dialog.author.online=t;break}if(r._id===a){e.dialogs[s].dialog.partner.online=t;break}}return e.v=K("setOnline"),e}();case H:return function(){var a=e.user._id;return(e=Y).logOutId=a,e.v=K("logOut"),e}();default:return e}}}),ee=t(123),ae=function(e){var a=e.type,t=e.title,n=e.description;ee.a[a]({message:t,description:n})},te=function(e){return e.charAt(0).toUpperCase()+e.substring(1)},ne=t(62),se=t.n(ne);se.a.defaults.baseURL="http://localhost:3000",se.a.defaults.headers.common.token=localStorage.token,window.axios=se.a;var ce=se.a,oe=function(e){return ce.post("/auth/login",e)},re=function(e){return ce.post("/auth/register",e)},ie=function(){return ce.post("/auth/check")},le=function(e){return{type:N,payload:e}},de=function(e){var a=e.status,t=e.token,n=e.data,s=e.message,c=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return function(e){"success"===a?(localStorage.token=t,window.axios.defaults.headers.common.token=t,ae({type:a,title:te(a),description:s}),console.log("ALIVE_EFFECTER"),e(le(n))):(ae({type:a,title:te(a),description:s}),c&&delete localStorage.token)}},ue=function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return{type:E,payload:{_id:e,dialog:a}}},ge=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return{type:M,payload:{pass:e}}},je=[u.a];var he=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||d.c,me=Object(d.d)(Z,he(d.a.apply(void 0,je))),be=Object(l.io)("http://localhost:3000",{transports:["websocket"]});be.on("connect",(function(e){be.emit("MSG",{data:"pass",token:"123"})})).on("CLIENT_MSG",(function(e){console.log("%c%s","font-size: 22px; color: red;",e)})).on("RES_PRIVATE_MSG",(function(e){console.log("%c%s","font-size: 22px; color: navy;","PRIVATE_MSG"),console.log("Message:",e)})).on("RES_MSGS",(function(e){console.log("%c%s","font-size: 22px; color: aqua;","GET_MSGS"),console.log("Data:",e)})).on("RES_PEOPLE",(function(e){me.dispatch(function(e){return{type:k,payload:{data:e}}}(e))})).on("RES_NEW_DIALOG",(function(e){var a=e.dialog;"me"===e.target?me.dispatch(ue(a._id,a)):me.dispatch(function(e){return{type:P,payload:{dialog:e}}}(a))})).on("RES_MESSAGE",(function(e){var a=e.message,t=e.dialogId;me.dispatch(function(e,a){return{type:D,payload:{message:e,dialogId:a}}}(a,t))})).on("SET_READ_MESSAGE",(function(e){var a=e.dialogId,t=e.messagesId,n=e.pass;me.dispatch(function(e,a,t){return{type:I,payload:{dialogId:e,messagesId:a,pass:t}}}(a,t,n))})).on("RES_POLL_MESSAGES",(function(e){var a=e.messages;me.dispatch(function(e){return{type:A,payload:{messages:e}}}(a))})).on("BAD_EDIT_PROFILE",(function(e){var a=e.message;ae({type:"error",title:"Error",description:a})})).on("SET_PROFILE",(function(e){var a=e.newProfileData;me.dispatch(function(e){var a=e.nickName,t=e.loginName,n=e.password,s=e._id;return{type:L,payload:{nickName:a,loginName:t,password:n,_id:s}}}(a))})).on("SET_MY_PROFILE",(function(){me.dispatch({type:G})})).on("SET_ONLINE",(function(e){var a=e._id,t=e.status;me.dispatch(function(e,a){return{type:U,payload:{_id:e,status:a}}}(a,t))})).on("disconnect",(function(e){console.log("%c%s","font-size: 22px; color: crimson;","DISCON:"),console.log("Reason:",e)}));me.subscribe((function(){var e=me.getState().dialogs,a=e.lastMessage,t=a.addres,n=a.message,s=e.room,c=e.v,o=e.newDialogTargetId,r=e.messageData,l=e.dialogs,d=e.choosenDialogId,u=e.user,g=e.readyMessengesData,j=e.readMessagesPass,h=e.newProfileData,m=e.logOutId,b=localStorage.token;if(""!==c){var v=c.split("$$")[0];switch(v){case"r":be.emit("JOIN_ROOM",{token:b,room:s},(function(e){console.log("%c%s","font-size: 22px; color: green;","SUCCESS_JOIN"),console.log("Rooms:",e)}));break;case"m":be.emit("PRIVATE_MSG",{token:b,payload:{addres:t,message:n}},(function(e){console.log("%c%s","font-size: 22px; color: green;","SUCCESS_SEND_MSG"),console.log("%c%s","font-size: 22px; color: aqua;","LAST_ROOMS:",e)}));break;case"g":console.log("SUB"),be.emit("GET_MSGS",{token:b});break;case"init":be.emit("JOIN",{token:b},(function(e){console.log("%c%s","font-size: 22px; color: green;","SUCCESS_JOIN",e)}));break;case"searchPeople":be.emit("GET_PEOPLE",{token:b});break;case"createDialog":be.emit("CREATE_NEW_DIALOG",{token:b,newDialogTargetId:o});break;case"createMessage":be.emit("CREATE_MESSAGE",Object(i.a)(Object(i.a)({},r),{},{token:b}));break;case"readMessages":!function(){for(var e=-1;++e<l.length&&l[e].dialog._id!==d;);var a=l[e].dialog.partner._id===u._id?l[e].dialog.author._id:l[e].dialog.partner._id,t=l[e].messages.filter((function(e){var t=e.readed,n=e.author;return!t&&n===a})).map((function(e){return e._id}));t.length?be.emit("READ_MESSAGE",{token:b,dialogId:d,messagesId:t,targetUserId:a,pass:j}):me.dispatch({type:C,payload:{pass:"pickEvent"}})}();break;case"getPollMessages":!function(){var e=g[0].messages[0].prevPoll;be.emit("GET_POLL_MESSAGES",{poll:e,token:b})}();break;case"editProfile":be.emit("EDIT_PROFILE",{token:b,newProfileData:h});break;case"logOut":be.emit("LOGOUT",{_id:m},(function(){}))}switch(v){case"pickDialog":me.dispatch(ge("pickEvent"))}}}));var ve=me,Oe=t(17),fe=t(16),pe=t(127),_e=(t(184),t(1)),xe=function(e){var a=Object(fe.h)().pathname.split("/").splice(1);var t=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,t=[],n=-1,s="";++n<e.length;){var c="/".concat(e[n]);t.push({text:e[n],path:s+c}),s+=c}return t}();return Object(_e.jsx)("div",{className:"bread",children:t.map((function(e){var a=e.path,t=e.text;return Object(_e.jsx)("li",{className:"bread_links",children:Object(_e.jsx)(Oe.b,{to:a,children:t})})}))})},Ne=function(e){return Object(_e.jsx)("div",{children:"Search"})},Ee=t(5),Se=t.n(Ee),ke=(t(187),function(e){var a=e.onClick,t=e.text,n=e.src,s=void 0===n?null:n,c=e.type;console.log("RENDER_Target");var o=Object(fe.g)(),r="".concat(o.location.pathname,"/").concat(t);return Object(_e.jsxs)("div",{className:Se()("target","target"===c&&"clickable"),onClick:function(){"dir"===c?o.push(r):a()},children:[s?Object(_e.jsx)("img",{src:s}):null,Object(_e.jsx)("div",{className:"target_text",children:t})]})}),ye=t(214),we=(t(188),ye.a.CheckableTag),De=function(e){var a=e.fValue,t=e.sValue,n=e.fHandl,s=e.sHandl,c=e.checkParam;return Object(_e.jsxs)("div",{className:"checkTags",children:[Object(_e.jsx)(we,{onClick:function(){return!c&&n()},checked:c,children:a}),Object(_e.jsx)(we,{onClick:function(){return c&&s()},checked:!c,children:t})]})},Pe=(t(189),function(e){var a=e.text,t=e.time,n=e.isMe,s=void 0===n||n,c=e.readed,o=void 0!==c&&c,r=s?"-isMe":"-isPartner";return Object(_e.jsxs)("section",{className:Se()("message","message".concat(r)),children:[Object(_e.jsxs)("div",{className:Se()("message__cloud","message__cloud".concat(r)),children:[Object(_e.jsx)("div",{className:"message__cloud_payload",children:a}),Object(_e.jsx)("div",{className:Se()("message__cloud_time","message__cloud_time".concat(r)),children:t})]}),s&&!o?Object(_e.jsx)("div",{className:"message__unreaded",children:""}):null]})}),Me=(t(190),function(e){var a=e.date,t=void 0===a?"13 February":a;return Object(_e.jsx)("section",{className:"dateElement",children:Object(_e.jsx)("div",{className:"dateElement__target",children:t})})}),Ie=(t(191),function(e){return Object(_e.jsxs)("section",{className:"cPHeader",children:[Object(_e.jsx)("div",{className:"cPHeader_rightSpace"}),Object(_e.jsx)("div",{className:"cPHeader__main",children:Object(_e.jsx)(xe,{})}),Object(_e.jsx)("div",{className:"cPHeader_rightSpace",children:Object(_e.jsx)(Oe.b,{to:"/result",children:"Result"})})]})}),Te=t(19),Ce=(t(192),Object(r.b)((function(e,a){var t=e.products;return{productsEvents:a.link?{products:!1}:t.productsEvents}}),{addElement:function(e){return{type:f,payload:e}}})((function e(a){var t=a.productsEvents,n=void 0===t?{}:t,s=a.rightPass,o=void 0!==s&&s,r=(a.link,a.addElement),l=(null===n||void 0===n?void 0:n.products)||null;o||(o=l);var d=Object(c.useState)(null),u=Object(Te.a)(d,2),g=u[0],j=u[1],h=Object(fe.h)().pathname;null===g&&j(o.payload.map((function(a,t){var n=a.name;return"dir"===a.type?Object(_e.jsx)(fe.b,{path:"".concat(h,"/").concat(n),children:Object(_e.jsx)(e,{rightPass:o.payload[t],link:n,addElement:r})}):null})));return Object(_e.jsxs)(_e.Fragment,{children:[o.name===function(e){var a=e.split("/");return a[a.length-1]}(h)?Object(_e.jsx)("div",{className:"chooseBoard",children:o.payload.map((function(e){var a=e.name,t=e.type,n=e.payload;return Object(_e.jsx)(ke,{text:a,type:t,onClick:function(){return r(Object(i.a)({name:a},n))}})}))}):null,Object(_e.jsx)(fe.d,{children:g})]})}))),Ae=t(124),Re=t(213),Le=t(125),Ge=(t(193),{createUser:function(e){return function(a){re(e).then((function(e){var t=e.data;console.log("%c%s","font-size: 22px; color: navy;","SERVER_RES"),console.log("RES_DEST:",t),de(t)(a)})).catch((function(e){console.log("%c%s","color: red;font-size:22px;","AXIOS_REGISTER_ERR:",e)}))}},loginUser:function(e){return function(a){oe(e).then((function(e){var t=e.data;console.log("%c%s","font-size: 22px; color: navy;","SERVER_RES"),console.log("RES:",t),de(t)(a)})).catch((function(e){console.log("%c%s","color: red;font-size:22px;","AXIOS_LOGIN_ERR:",e)}))}},checkAuth:function(){return function(e){ie().then((function(a){var t=a.data;console.log("%c%s","font-size: 22px; color: navy;","SERVER_RES"),console.log("RES_CHECK:",t),de(t,!0)(e)})).catch((function(e){console.log("%c%s","color: red;font-size:22px;","AXIOS_AUTO_LOGIN_ERR:",e)}))}}}),Ue=Object(r.b)((function(e){return{isAuth:e.dialogs.isAuth}}),Ge)((function(e){var a=e.isAuth,t=e.createUser,n=e.loginUser,s=e.checkAuth,o=Object(fe.g)(),r=Object(fe.h)(),l=Object(c.useState)("create"),d=Object(Te.a)(l,2),u=d[0],g=d[1],j=Object(c.useState)({nickName:"",password:"",passwordConfirm:""}),h=Object(Te.a)(j,2),m=h[0],b=h[1],v=m.nickName,O=m.password,f=m.passwordConfirm;Object(c.useEffect)((function(){var e,t;return(null===(e=localStorage)||void 0===e?void 0:e.token)&&!a&&s(),a&&(null===(t=localStorage)||void 0===t?void 0:t.token)&&function(){var e=(r.state||{from:{pathname:"/test"}}).from;o.replace(e)}(),function(){}}));var p={fValue:"LOGIN",sValue:"CREATE NEW",fHandl:function(){return g("login")},sHandl:function(){return g("create")},checkParam:"login"===u};return Object(_e.jsxs)("div",{className:"login",children:[Object(_e.jsx)("div",{className:"login__checkTags",children:Object(_e.jsx)(De,Object(i.a)({},p))}),Object(_e.jsx)("div",{className:"login__form",children:Object(_e.jsxs)("form",{onSubmit:function(e){e.preventDefault();var a=!1;O.length<3&&(a=!0,Ae.b.error("Password too short",3)),v.length<3&&(a=!0,Ae.b.error("Nickname too short",3)),"create"===u?(f!==O&&(a=!0,Ae.b.error("Passwords are not equal",3)),!a&&t(m)):!a&&n(m)},children:[Object(_e.jsx)("div",{className:Se()("formElement"),children:Object(_e.jsx)(Re.a,{placeholder:"Nickname",onChange:function(e){return b(Object(i.a)(Object(i.a)({},m),{},{nickName:e.target.value}))},value:v})}),Object(_e.jsx)("div",{className:Se()("formElement"),children:Object(_e.jsx)(Re.a.Password,{placeholder:"Password",onChange:function(e){return b(Object(i.a)(Object(i.a)({},m),{},{password:e.target.value}))},value:O})}),"create"===u&&Object(_e.jsx)("div",{className:Se()("formElement"),children:Object(_e.jsx)(Re.a.Password,{placeholder:"Password confirm",onChange:function(e){return b(Object(i.a)(Object(i.a)({},m),{},{passwordConfirm:e.target.value}))},value:f})}),Object(_e.jsx)("div",{className:Se()("formElement","login__form_submit"),children:Object(_e.jsx)(Le.a,{onClick:function(e){return console.log("click")},htmlType:"submit",children:"SEND DATA"})})]})})]})})),He=(t(194),function(e){var a=e.imgPlug,t=e.name,n=e.messange,s=e.infoCount,c=e.online,o=e.messageDls,r=e.authorIsYou,i=e.isSearchPeopleMod,l=void 0!==i&&i,d=e.isChoosen,u=e.clickHandler;return Object(_e.jsxs)("section",{className:Se()("dialog",d?"dialog__isChoosen":null),onClick:u,children:[Object(_e.jsxs)("div",{className:"dialog__leftPart",children:[Object(_e.jsx)("div",{className:"dialog__leftPart_imgPlug",children:a}),c&&Object(_e.jsx)("div",{className:"dialog__leftPart_online",children:""})]}),Object(_e.jsxs)("div",{className:"dialog__rightPart",children:[Object(_e.jsx)("div",{className:"dialog__rightPart_name",children:t}),l?null:Object(_e.jsxs)("div",{className:"dialog__rightPart_message",children:[Object(_e.jsx)("div",{className:"dialog__rightPart_message-payload",children:Object(_e.jsx)(ze,{text:"".concat(r?"You: ":"").concat(n)})}),Object(_e.jsx)("div",{className:"infoCountWrapper",children:Object(_e.jsx)("div",{className:"dialog__rightPart_message".concat(o),children:s})})]})]})]})}),Fe=Object(r.b)((function(e){return{}}),{})((function(e){var a,t=e.dialog,n=e.messages,s=e.me,c=e.choosenId,o=e.onClick,r=t.author._id===s._id?t.partner:t.author,l=t._id===c;if(n.length){var d=n[n.length-1].readed,u=n[n.length-1].author===s._id,g={0:{0:"-infoCount",1:"-none"},1:{0:"-unreaded",1:"-none"}}[+u][+d];a={imgPlug:r.nickName[0],name:r.nickName,messange:n[n.length-1].text,infoCount:"-infoCount"===g?function(){for(var e=n.reverse(),a=0,t=!1;!t&&a<e.length;)e[a].readed?t=!0:a++;return a>=10?"9+":a}():null,online:r.online,authorIsYou:u,messageDls:g,isChoosen:l}}else a={imgPlug:r.nickName[0],name:r.nickName,messange:"",infoCount:null,online:r.online,authorIsYou:!1,messageDls:"-none",isChoosen:l};return Object(_e.jsx)(He,Object(i.a)(Object(i.a)({},a),{},{clickHandler:function(){return!l&&o(t._id)}}))})),Ve=Object(r.b)((function(e){return{}}),{})((function(e){var a=e.user,t=e.choosenUserId,n=e.onClick,s=a,c=a._id===t,o={imgPlug:s.nickName[0],name:s.nickName,clickHandler:function(){return!c&&n(s._id)},online:s.online,isSearchPeopleMod:!0,isChoosen:c};return Object(_e.jsx)(He,Object(i.a)({},o))})),ze=(t(195),function(e){var a=e.text,t=Object(c.useRef)(null),n=Object(c.useRef)(null),s=Object(c.useState)(null),o=Object(Te.a)(s,2),r=o[0],l=o[1],d=Object(c.useState)({payload:a,ready:!1,changed:!1}),u=Object(Te.a)(d,2),g=u[0],j=u[1];return Object(c.useEffect)((function(){r!==a&&(l(a),j({payload:a,ready:!1,changed:!1}));var e=t.current.clientHeight,s=n.current.clientHeight,c=g.payload,o=g.ready,d=g.changed;if(s>e){var u=c.substring(0,.85*c.length/(s/e));j(Object(i.a)(Object(i.a)({},g),{},{payload:u,changed:!0}))}else if(!o){var h=c;h=d?"".concat(h.substring(0,c.length-3),"..."):h,j(Object(i.a)(Object(i.a)({},g),{},{payload:h,ready:!0}))}})),Object(_e.jsx)("div",{ref:t,className:"textReducer",children:Object(_e.jsx)("div",{ref:n,className:"textReducer__target",children:g.payload})})}),Be=(t(196),Object(r.b)((function(e){return{}}),{})((function(e){var a=Object(fe.g)();Object(fe.h)();return Object(_e.jsx)("section",{className:"navigation",children:Object(_e.jsx)("div",{className:"navigation__wrapper",children:[{text:"Market",linkTo:"market",disabled:!0},{text:"Messenger",linkTo:"messenger",disabled:!1},{text:" ",linkTo:"",disabled:!0},{text:"Me",linkTo:"me",disabled:!1}].map((function(e){var t=e.text,n=e.linkTo,s=e.disabled;return Object(_e.jsx)("div",{className:"navigation__wrapper_button",children:Object(_e.jsx)(Le.a,{onClick:function(){return a.push(n)},disabled:s,children:t})})}))})})}))),Je=(t(197),function(e){e.microEvent;return Object(_e.jsxs)("section",{className:"cPMain",children:[Object(_e.jsx)("div",{className:"cPMain_leftSpace"}),Object(_e.jsxs)("div",{className:"cPMain_main",children:[Object(_e.jsx)(Ne,{}),Object(_e.jsx)(Ce,{})]}),Object(_e.jsx)("div",{className:"cPMain_rightSpace"})]})}),qe=(t(198),["microEvent"]),We=Object(r.b)((function(e){return Object(i.a)({},e)}),{microEvent:function(){return{type:O,payload:Math.random()}}})((function(e){e.microEvent;var a=Object(pe.a)(e,qe);return console.log("ANO_DEBUG: ",a),Object(_e.jsxs)("section",{className:"choosePage",children:[Object(_e.jsx)(Ie,{}),Object(_e.jsx)(Je,{})]})})),$e=(t(199),function(e){return Object(_e.jsx)("section",{className:"previewPage",children:Object(_e.jsxs)("div",{className:"previewPage_main",children:[Object(_e.jsx)("div",{className:"previewPage_main__header",children:Object(_e.jsx)(Be,{})}),Object(_e.jsx)("div",{className:"previewPage_main__preview",children:"Wellcome to Denilay's chat"})]})})}),Ye=Object(r.b)((function(e){return{elements:e.products.microEls.elements}}))((function(e){for(var a=e.elements,t=[],n=-1,s=Object.keys(a);++n<s.length;)t.push(Object(_e.jsx)("div",{children:"".concat(s[n])}));return Object(_e.jsxs)("div",{children:["Result",Object(_e.jsx)(Oe.b,{to:"/main",children:"Main"}),t]})})),Ke=(t(200),{privateMsg:function(e){return{type:p,payload:e}},joinToRoom:function(e){return{type:_,payload:e}},getMsgs:function(){return{type:x}}}),Xe=Object(r.b)((function(e){return{isAuth:e.dialogs.isAuth}}),Ke)((function(e){var a=e.isAuth,t=e.privateMsg,n=e.joinToRoom,s=e.getMsgs,o=Object(c.useState)("Hey, Zues"),r=Object(Te.a)(o,2),i=r[0],l=r[1],d=Object(c.useState)("Olimpia"),u=Object(Te.a)(d,2),g=u[0],j=u[1];var h=Object(c.useState)("Olimpia"),m=Object(Te.a)(h,2),b=m[0],v=m[1];return Object(_e.jsxs)(_e.Fragment,{children:[Object(_e.jsxs)("section",{className:"testPage",children:[Object(_e.jsxs)("div",{className:"testPage_msg",children:[Object(_e.jsx)("input",{value:i,onChange:function(e){return l(e.target.value)},placeholder:"Msg"}),Object(_e.jsx)("input",{value:g,onChange:function(e){return j(e.target.value)},placeholder:"Addres"}),Object(_e.jsx)("button",{onClick:function(){t({msg:i,addres:g})},children:"SEND"})]}),Object(_e.jsxs)("div",{className:"testPage_msg",children:[Object(_e.jsx)("input",{value:b,onChange:function(e){return v(e.target.value)},placeholder:"Room"}),Object(_e.jsx)("button",{onClick:function(){n({room:b})},children:"JOIN"})]}),Object(_e.jsx)("div",{children:Object(_e.jsx)("button",{onClick:function(){console.clear(),s()},children:"GET_MSGS"})})]}),!a&&Object(_e.jsx)(fe.a,{to:"/login"})]})}));t(201);var Qe=Object(r.b)((function(e){return{isAuth:e.dialogs.isAuth}}))((function(e){return e.isAuth,Object(_e.jsxs)("section",{className:"loginPage",children:[Object(_e.jsx)(Oe.b,{to:"/test",children:"/Test"}),Object(_e.jsx)(Ue,{})]})})),Ze=(t(202),Re.a.TextArea),ea={createMessage:function(e){return{type:w,payload:{text:e}}},readMessages:ge,getPollMessages:function(){return{type:T}}},aa=Object(r.b)((function(e){var a=e.dialogs;return{choosenDialogId:a.choosenDialogId,readyMessengesData:a.readyMessengesData,dialogs:a.dialogs,newDialogTargetId:a.newDialogTargetId,v:a.v,isLiveUnreaded:a.isLiveUnreaded}}),ea)((function(e){var a=e.choosenDialogId,t=e.readyMessengesData,n=(e.dialogs,e.newDialogTargetId,e.v),s=e.isLiveUnreaded,o=e.createMessage,r=e.readMessages,l=e.getPollMessages,d=Object(c.useState)(""),u=Object(Te.a)(d,2),g=u[0],j=u[1],h=Object(c.useState)({}),m=Object(Te.a)(h,2),b=m[0],v=m[1],O=Object(c.useRef)(null),f=null!==a,p=function(){var e=[];return t.forEach((function(a){var t=a.date,n=a.messages;e.push(Object(_e.jsx)(Me,{date:t})),n.forEach((function(a){e.push(Object(_e.jsx)(Pe,Object(i.a)({},a)))}))})),e}();return Object(c.useEffect)((function(){var e=O.current,a=e.scrollHeight,t=(e.scrollTop,e.clientHeight),s=n.split("$$")[0];"pickEvent"===s&&(O.current.scrollTop=a-t),"setPollMessages"===s&&(O.current.scrollTop=a-b.realHeight),"pickEvent"===s&&p.length<15&&p.length>=1&&(v({realHeight:a}),l())})),Object(_e.jsxs)("section",{className:"chat",onMouseMove:function(e){s&&r()},children:[Object(_e.jsx)("div",{className:"chat__main",ref:O,onScroll:function(){var e=O.current,a=e.scrollTop,n=e.scrollHeight;0===a&&function(){var e,a,n;return"none"!==((null===t||void 0===t||null===(e=t[0])||void 0===e||null===(a=e.messages)||void 0===a||null===(n=a[0])||void 0===n?void 0:n.prevPoll)||"none")}()&&(v({realHeight:n}),l())},children:Object(_e.jsx)("div",{className:Se()("chat__main_wrapper",f?null:"chat__main_wrapper-help"),children:f?p:"Pick dialog"})}),Object(_e.jsxs)("div",{className:"chat__inputArea",children:[Object(_e.jsx)("div",{className:"chat__inputArea_textArea",children:Object(_e.jsx)(Ze,{autoSize:!0,onChange:function(e){return j(e.target.value)},value:g})}),Object(_e.jsx)("div",{className:"chat__inputArea_button",children:Object(_e.jsx)(Le.a,{onClick:function(){f&&(o(g),j(""))},children:"Send"})})]})]})})),ta=(t(203),{pickDialog:ue,createNewDialog:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return{type:y,payload:{userId:e}}}}),na=Object(r.b)((function(e){var a=e.dialogs;return{dialogs:a.dialogs,user:a.user,dialogTabMod:a.dialogTabMod,searchPeople:a.searchPeople,choosenDialogId:a.choosenDialogId,v:a.v,showSearchPeople:a.showSearchPeople}}),ta)((function(e){var a=e.dialogs,t=e.user,n=e.dialogTabMod,s=(e.searchPeople,e.choosenDialogId),c=(e.v,e.showSearchPeople),o=e.pickDialog,r=e.createNewDialog,l=(Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),function(e){return o(e)}),d=a.map((function(e){return Object(_e.jsx)(Fe,Object(i.a)(Object(i.a)({},e),{},{me:t,onClick:l,choosenId:s}))})),u=d.length,g=function(e){var t="";a.some((function(a){var n=a.dialog,s=n.author,c=n.partner,o=n._id;if(s._id===e||c._id===e)return t=o,!0}))?o(t):r(e)},j=function(){for(var e=null,n=-1;++n<a.length;){var c=a[n].dialog,o=c.author,r=c.partner;c._id===s&&(e=o._id===t._id?r._id:o._id)}return e}(),h=c.map((function(e){return e._id!==t._id?Object(_e.jsx)(Ve,{user:e,onClick:g,choosenUserId:j}):null}));return console.log("DIALOGS_COMPONENT:",d),Object(_e.jsx)("section",{className:"dialogsTab",children:"search"===n?Object(_e.jsx)("div",{className:"dialogsTab__wrapper",children:h}):Object(_e.jsx)("div",{className:Se()("dialogsTab__wrapper",u?null:"dialogsTab__wrapper-help"),children:u?d:"Find some-body"})})})),sa=(t(204),Object(r.b)((function(e){var a=e.dialogs;return{dialogs:a.dialogs,choosenDialogId:a.choosenDialogId,user:a.user,v:a.v}}),{})((function(e){var a=e.dialogs,t=e.choosenDialogId,n=e.user,s=e.v,o=Object(c.useState)({nickName:"",lastSeen:"",lastV:""}),r=Object(Te.a)(o,2),i=r[0],l=r[1];Object(c.useEffect)((function(){var e=s.split("$$")[0];if(s!==i.lastV)switch(e){case"pickDialog":case"setProfile":case"setOnline":case"pickEvent":!function(){for(var e=-1;++e<a.length;)if(a[e].dialog._id===t){var c=a[e].dialog,o=c.author,r=c.partner,i=o._id===n._id?r:o,d=i.nickName,u=i.online;l({nickName:d,lastSeen:u?"online":"offline",lastV:s})}}()}}));var d=i.nickName,u=i.lastSeen;return Object(_e.jsxs)("section",{className:"chatHeader",children:[Object(_e.jsxs)("div",{className:"chatHeader__leftPart",children:[Object(_e.jsx)("div",{className:"chatHeader__leftPart_partnerName",children:d}),Object(_e.jsx)("div",{className:"chatHeader__leftPart_lastSeenDate",children:u})]}),Object(_e.jsx)("div",{className:"chatHeader__rightPart",children:""})]})}))),ca=t(80),oa=t(128),ra=(t(205),{setDialogTabMod:function(e){return{type:S,payload:{mod:e}}},addQuery:function(e){return{type:F,payload:{text:e}}}}),ia=Object(r.b)((function(e){return{dialogTabMod:e.dialogs.dialogTabMod}}),ra)((function(e){var a=e.dialogTabMod,t=e.setDialogTabMod,n=e.addQuery,s=Object(c.useState)(""),o=Object(Te.a)(s,2),r=o[0],i=o[1],l="search"===a;function d(e){l||t("search")}return Object(_e.jsxs)("section",{className:"dialogsSearch",children:[Object(_e.jsx)(Re.a,{placeholder:"Search persons",bordered:!1,onFocus:d,onChange:function(e){i(e.target.value),n(e.target.value)},value:r,onPressEnter:function(e){return console.log("PRESS_ENTER")}}),Object(_e.jsx)("div",{className:"dialogsSearch__stopSearch",children:l?Object(_e.jsx)("div",{className:"dialogsSearch__stopSearch_icon",onClick:function(e){t("base"),i("")},children:Object(_e.jsx)(ca.a,{})}):Object(_e.jsx)("div",{className:"dialogsSearch__stopSearch_icon",onClick:d,children:Object(_e.jsx)(oa.a,{})})})]})})),la=(t(206),Object(r.b)((function(e){return{isAuth:e.dialogs.isAuth}}),{})((function(e){var a=e.isAuth,t=Object(fe.h)();return Object(_e.jsxs)(_e.Fragment,{children:[Object(_e.jsx)("section",{className:"messangerPage",children:Object(_e.jsxs)("div",{className:"messangerPage_main",children:[Object(_e.jsx)("div",{className:"messangerPage_main__header",children:Object(_e.jsx)(Be,{})}),Object(_e.jsxs)("div",{className:"messangerPage_main__chat",children:[Object(_e.jsxs)("div",{className:"messangerPage_main__chat-left",children:[Object(_e.jsx)(ia,{}),Object(_e.jsx)(na,{})]}),Object(_e.jsxs)("div",{className:"messangerPage_main__chat-right",children:[Object(_e.jsx)(sa,{}),Object(_e.jsx)(aa,{})]})]})]})}),!a&&Object(_e.jsx)(fe.a,{to:{pathname:"/login",state:{from:t.pathname}}})]})}))),da=(t(207),{editProfile:function(e){var a=e.nickName,t=e.loginName,n=e.password;return{type:R,payload:{nickName:a,loginName:t,password:n}}},logOut:function(){return{type:H}}}),ua=Object(r.b)((function(e){return{user:e.dialogs.user}}),da)((function(e){var a=e.user,t=e.editProfile,n=e.logOut,s=Object(fe.g)(),o=Object(c.useState)({nickName:(null===a||void 0===a?void 0:a.nickName)||"",loginName:(null===a||void 0===a?void 0:a.loginName)||"",password:(null===a||void 0===a?void 0:a.password)||""}),r=Object(Te.a)(o,2),l=r[0],d=r[1],u=[];if(null!==a){var g=a.nickName,j=void 0===g?"":g,h=a.loginName,m=void 0===h?"":h,b=a.password,v=void 0===b?"":b,O=l.nickName,f=l.loginName,p=l.password;j!==O&&u.push("nickName"),m!==f&&u.push("loginName"),v!==p&&u.push("password")}var _=l.nickName,x=l.loginName,N=l.password;return Object(_e.jsxs)("section",{className:"editor",children:[Object(_e.jsxs)("div",{className:"editor__main",children:[Object(_e.jsxs)("div",{className:"editor__main_inputs",children:[Object(_e.jsx)("div",{className:"editor__main_inputs_wrapper",children:Object(_e.jsx)(Re.a,{onChange:function(e){var a=e.target.value;return d(Object(i.a)(Object(i.a)({},l),{},{nickName:a}))},addonBefore:Object(_e.jsx)("div",{className:"https",children:"NickName"}),value:_})}),Object(_e.jsx)("div",{className:"editor__main_inputs_wrapper",children:Object(_e.jsx)(Re.a,{onChange:function(e){var a=e.target.value;return d(Object(i.a)(Object(i.a)({},l),{},{loginName:a}))},addonBefore:Object(_e.jsx)("div",{className:"https",children:"LoginName"}),value:x})}),Object(_e.jsx)("div",{className:"editor__main_inputs_wrapper",children:Object(_e.jsx)(Re.a,{onChange:function(e){var a=e.target.value;return d(Object(i.a)(Object(i.a)({},l),{},{password:a}))},addonBefore:Object(_e.jsx)("div",{className:"https",children:"Password"}),placeholder:"New password",value:N})})]}),Object(_e.jsxs)("div",{className:"editor__main_buttons",children:[Object(_e.jsx)(Le.a,{onClick:function(){u.length&&(Object.values(l).every((function(e){return e.length>=3}))?t(l):ae({type:"warning",title:"Warning",description:"The minimum response length for each field is 3 characters"}))},children:"Save"}),Object(_e.jsx)(Le.a,{danger:!0,onClick:function(){delete localStorage.token,delete window.axios.defaults.headers.common.token,n(),s.push("login")},children:"LogOut"})]})]}),Object(_e.jsx)("div",{className:"editor__state",children:u.length?Object(_e.jsxs)(_e.Fragment,{children:[Object(_e.jsx)("div",{className:"editor__state_reset",children:Object(_e.jsx)(Le.a,{type:"dashed",onClick:function(){var e=a.nickName,t=a.loginName,n=a.password;d({nickName:e,loginName:t,password:n})},children:"Reset changes"})}),Object(_e.jsxs)("div",{className:"editor__state_unsaved",children:["*Unsaved:",Object(_e.jsx)("ul",{children:u.map((function(e){return Object(_e.jsx)("li",{children:e})}))})]})]}):null})]})})),ga=(t(208),Object(r.b)((function(e){return{isAuth:e.dialogs.isAuth}}),{})((function(e){var a=e.isAuth,t=Object(fe.h)();return Object(_e.jsxs)(_e.Fragment,{children:[Object(_e.jsx)("section",{className:"mePage",children:Object(_e.jsxs)("div",{className:"mePage__main",children:[Object(_e.jsx)("div",{className:"mePage__main_header",children:Object(_e.jsx)(Be,{})}),Object(_e.jsx)("div",{className:"mePage__main_editor",children:Object(_e.jsx)(ua,{})})]})}),!a&&Object(_e.jsx)(fe.a,{to:{pathname:"/login",state:{from:t.pathname}}})]})}))),ja=(t(209),function(){return Object(_e.jsx)("div",{className:"pageWrapper",children:Object(_e.jsx)(Oe.a,{children:Object(_e.jsxs)(fe.d,{children:[Object(_e.jsx)(fe.b,{exact:!0,path:"/",children:Object(_e.jsx)($e,{})}),Object(_e.jsx)(fe.b,{exact:!0,path:"/result",children:Object(_e.jsx)(Ye,{})}),Object(_e.jsx)(fe.b,{path:"/main",children:Object(_e.jsx)(We,{})}),Object(_e.jsx)(fe.b,{exact:!0,path:"/dude/*",children:Object(_e.jsx)("div",{children:"hey dude"})}),Object(_e.jsx)(fe.b,{exact:!0,path:"/test",children:Object(_e.jsx)(Xe,{})}),Object(_e.jsx)(fe.b,{exact:!0,path:"/login",children:Object(_e.jsx)(Qe,{})}),Object(_e.jsx)(fe.b,{exact:!0,path:"/messenger",children:Object(_e.jsx)(la,{})}),Object(_e.jsx)(fe.b,{exact:!0,path:"/me",children:Object(_e.jsx)(ga,{})})]})})})});Object(o.render)(Object(_e.jsx)(r.a,{store:ve,children:Object(_e.jsx)(ja,{})}),document.getElementById("root"))}},[[210,1,2]]]);
//# sourceMappingURL=main.3d31d6e3.chunk.js.map