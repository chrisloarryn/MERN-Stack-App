(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[5],{44:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a(46);function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}},46:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"a",(function(){return n}))},47:function(e,t,a){"use strict";var n=a(16);a.d(t,"c",(function(){return r})),a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return c})),a.d(t,"d",(function(){return l}));var r=function(){return{type:"REQUIRE"}},i=function(e){return{type:"MINLENGTH",val:e}},c=function(){return{type:"EMAIL"}},l=function(e,t){var a,r=!0,i=function(e){if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=Object(n.a)(e))){var t=0,a=function(){};return{s:a,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,i,c=!0,l=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return c=e.done,e},e:function(e){l=!0,i=e},f:function(){try{c||null==r.return||r.return()}finally{if(l)throw i}}}}(t);try{for(i.s();!(a=i.n()).done;){var c=a.value;"REQUIRE"===c.type&&(r=r&&e.trim().length>0),"MINLENGTH"===c.type&&(r=r&&e.trim().length>=c.val),"MAXLENGTH"===c.type&&(r=r&&e.trim().length<=c.val),"MIN"===c.type&&(r=r&&+e>=c.val),"MAX"===c.type&&(r=r&&+e<=c.val),"EMAIL"===c.type&&(r=r&&/^\S+@\S+\.\S+$/.test(e))}}catch(l){i.e(l)}finally{i.f()}return r}},53:function(e,t,a){"use strict";var n=a(10),r=a(44),i=a(0),c=a.n(i),l=a(47),u=(a(54),function(e,t){switch(t.type){case"CHANGE":return Object(r.a)(Object(r.a)({},e),{},{value:t.val,isValid:Object(l.d)(t.val,t.validators)});case"TOUCH":return Object(r.a)(Object(r.a)({},e),{},{isTouched:!0});default:return e}});t.a=function(e){var t=Object(i.useReducer)(u,{value:e.initialValue||"",isTouched:!1,isValid:e.initialValid||!1}),a=Object(n.a)(t,2),r=a[0],l=a[1],o=e.id,s=e.onInput,d=r.value,p=r.isValid;Object(i.useEffect)((function(){s(o,d,p)}),[o,d,p,s]);var f=function(t){l({type:"CHANGE",val:t.target.value,validators:e.validators})},v=function(){l({type:"TOUCH"})},b="input"===e.element?c.a.createElement("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:f,onBlur:v,value:r.value}):c.a.createElement("textarea",{id:e.id,rows:e.rows||3,onChange:f,onBlur:v,value:r.value});return c.a.createElement("div",{className:"form-control ".concat(!r.isValid&&r.isTouched&&"form-control--invalid")},c.a.createElement("label",{htmlFor:e.id},e.label),b,!r.isValid&&r.isTouched&&c.a.createElement("p",null,e.errorText))}},54:function(e,t,a){},55:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var n=a(10),r=a(46),i=a(44),c=a(0),l=function(e,t){switch(t.type){case"INPUT_CHANGE":var a=!0;for(var n in e.inputs)e.inputs[n]&&(a=n===t.inputId?a&&t.isValid:a&&e.inputs[n].isValid);return Object(i.a)(Object(i.a)({},e),{},{inputs:Object(i.a)(Object(i.a)({},e.inputs),{},Object(r.a)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:a});case"SET_DATA":return{inputs:t.inputs,isValid:t.formIsValid};default:return e}},u=function(e,t){var a=Object(c.useReducer)(l,{inputs:e,isValid:t}),r=Object(n.a)(a,2),i=r[0],u=r[1];return[i,Object(c.useCallback)((function(e,t,a){u({type:"INPUT_CHANGE",value:t,isValid:a,inputId:e})}),[]),Object(c.useCallback)((function(e,t){u({type:"SET_DATA",inputs:e,formIsValid:t})}),[])]}},56:function(e,t,a){"use strict";var n=a(10),r=a(0),i=a.n(r),c=a(45);a(57);t.a=function(e){var t=Object(r.useState)(),a=Object(n.a)(t,2),l=a[0],u=a[1],o=Object(r.useState)(),s=Object(n.a)(o,2),d=s[0],p=s[1],f=Object(r.useState)(!1),v=Object(n.a)(f,2),b=v[0],m=v[1],O=Object(r.useRef)();Object(r.useEffect)((function(){if(l){var e=new FileReader;e.onload=function(){p(e.result)},e.readAsDataURL(l)}}),[l]);return i.a.createElement("div",{className:"form-control"},i.a.createElement("input",{id:e.id,ref:O,style:{display:"none"},type:"file",accept:".jpg,.png,.jpeg",onChange:function(t){var a,n=b;t.target.files&&1===t.target.files.length?(a=t.target.files[0],u(a),m(!0),n=!0):(m(!1),n=!1),e.onInput(e.id,a,n)}}),i.a.createElement("div",{className:"image-upload ".concat(e.center&&"center")},i.a.createElement("div",{className:"image-upload__preview"},d&&i.a.createElement("img",{src:d,alt:"Preview"}),!d&&i.a.createElement("p",null,"Please pick an image.")),i.a.createElement(c.a,{type:"button",onClick:function(){O.current.click()}},"PICK IMAGE")),!b&&i.a.createElement("p",null,e.errorText))}},57:function(e,t,a){},58:function(e,t,a){},70:function(e,t,a){"use strict";a.r(t);var n=a(48),r=a.n(n),i=a(49),c=a(10),l=a(0),u=a.n(l),o=a(8),s=a(53),d=a(45),p=a(51),f=a(15),v=a(56),b=a(47),m=a(55),O=a(52),j=a(11);a(58);t.default=function(){var e=Object(l.useContext)(j.a),t=Object(O.a)(),a=t.isLoading,n=t.error,y=t.sendRequest,E=t.clearError,h=Object(m.a)({title:{value:"",isValid:!1},description:{value:"",isValid:!1},address:{value:"",isValid:!1},image:{value:null,isValid:!1}},!1),g=Object(c.a)(h,2),I=g[0],T=g[1],w=Object(o.g)(),V=function(){var t=Object(i.a)(r.a.mark((function t(a){var n,i,c,l,u,o;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),t.prev=1,n=I.inputs,i=n.title,c=n.description,l=n.address,u=n.image,(o=new FormData).append("title",i.value),o.append("description",c.value),o.append("creator",e.userId),o.append("address",l.value),o.append("image",u.value),t.next=11,y("".concat("http://localhost:5000/api/v1","/places"),"POST",o,{Authorization:"Bearer ".concat(e.token)});case 11:w.push("/"),t.next=16;break;case 14:t.prev=14,t.t0=t.catch(1);case 16:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e){return t.apply(this,arguments)}}();return u.a.createElement(u.a.Fragment,null,u.a.createElement(p.a,{error:n,onClear:E}),u.a.createElement("form",{className:"place-form",onSubmit:V},a&&u.a.createElement(f.a,{asOverlay:!0}),u.a.createElement(s.a,{id:"title",element:"input",type:"text",label:"Title",validators:[Object(b.c)()],errorText:"Please enter a valid title.",onInput:T}),u.a.createElement(s.a,{id:"description",element:"textarea",label:"Description",validators:[Object(b.b)(5)],errorText:"Please enter a valid description (at least 5 characters).",onInput:T}),u.a.createElement(s.a,{id:"address",element:"input",label:"Address",validators:[Object(b.c)()],errorText:"Please enter a valid address.",onInput:T}),u.a.createElement(v.a,{id:"image",onInput:T,errorText:"Please provide an image."}),u.a.createElement(d.a,{type:"submit",disabled:!I.isValid},"ADD PLACE")))}}}]);
//# sourceMappingURL=5.ed0e5997.chunk.js.map