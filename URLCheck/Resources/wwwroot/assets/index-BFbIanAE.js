var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var C=Array.isArray;function w(){}var T={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function D(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function ee(e,t){return D(e.type,t,e.props)}function te(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function ne(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var re=/\/+/g;function ie(e,t){return typeof e==`object`&&e&&e.key!=null?ne(``+e.key):t.toString(36)}function ae(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(w,w):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function oe(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,oe(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+ie(e,0):a,C(o)?(i=``,c!=null&&(i=c.replace(re,`$&/`)+`/`),oe(o,r,i,``,function(e){return e})):o!=null&&(te(o)&&(o=ee(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(re,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(C(e))for(var u=0;u<e.length;u++)a=e[u],s=l+ie(a,u),c+=oe(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+ie(a,u++),c+=oe(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return oe(ae(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function O(e,t,n){if(e==null)return e;var r=[],i=0;return oe(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function se(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var k=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function ce(e){var t=T.T,n={};n.types=t===null?null:t.types,T.T=n;try{var r=e(),i=T.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(w,k)}catch(e){k(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),T.T=t}}function le(e){var t=T.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else ce(le.bind(null,e))}var ue={map:O,forEach:function(e,t,n){O(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return O(e,function(){t++}),t},toArray:function(e){return O(e,function(e){return e})||[]},only:function(e){if(!te(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=ue,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=T,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return T.H.useMemoCache(e)}},e.addTransitionType=le,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!E.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return D(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)E.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return D(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=te,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:se}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=ce,e.unstable_useCacheRefresh=function(){return T.H.useCacheRefresh()},e.use=function(e){return T.H.use(e)},e.useActionState=function(e,t,n){return T.H.useActionState(e,t,n)},e.useCallback=function(e,t){return T.H.useCallback(e,t)},e.useContext=function(e){return T.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return T.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return T.H.useEffect(e,t)},e.useEffectEvent=function(e){return T.H.useEffectEvent(e)},e.useId=function(){return T.H.useId()},e.useImperativeHandle=function(e,t,n){return T.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return T.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return T.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return T.H.useMemo(e,t)},e.useOptimistic=function(e,t){return T.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return T.H.useReducer(e,t,n)},e.useRef=function(e){return T.H.useRef(e)},e.useState=function(e){return T.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return T.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return T.H.useTransition()},e.version=`19.3.1`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,ee());else{var t=n(l);t!==null&&re(x,t.startTime-e)}}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&re(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?ee():S=!1}}}var ee;if(typeof y==`function`)ee=function(){y(D)};else if(typeof MessageChannel<`u`){var te=new MessageChannel,ne=te.port2;te.port1.onmessage=D,ee=function(){ne.postMessage(null)}}else ee=function(){_(D,0)};function re(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,re(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,ee()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=d(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=d(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),m=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}function h(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&h(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var x=null,S=null;function C(e,t,n){return e===n||e===t&&(x=e,!0)}function w(e,t,n){return e===n?(S=e,!1):e===t&&(S!==null&&(x=e),!0)}function T(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function E(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var D=Object.assign,ee=Symbol.for(`react.element`),te=Symbol.for(`react.transitional.element`),ne=Symbol.for(`react.portal`),re=Symbol.for(`react.fragment`),ie=Symbol.for(`react.strict_mode`),ae=Symbol.for(`react.profiler`),oe=Symbol.for(`react.consumer`),O=Symbol.for(`react.context`),se=Symbol.for(`react.forward_ref`),k=Symbol.for(`react.suspense`),ce=Symbol.for(`react.suspense_list`),le=Symbol.for(`react.memo`),ue=Symbol.for(`react.lazy`),de=Symbol.for(`react.activity`),fe=Symbol.for(`react.legacy_hidden`),pe=Symbol.for(`react.memo_cache_sentinel`),me=Symbol.for(`react.view_transition`),he=Symbol.for(`react.recoverable`),ge=Symbol.iterator;function _e(e){return typeof e!=`object`||!e?null:(e=ge&&e[ge]||e[`@@iterator`],typeof e==`function`?e:null)}var ve=Symbol.for(`react.client.reference`);function ye(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===ve?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case re:return`Fragment`;case ae:return`Profiler`;case ie:return`StrictMode`;case k:return`Suspense`;case ce:return`SuspenseList`;case de:return`Activity`;case me:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case ne:return`Portal`;case O:return e.displayName||`Context`;case oe:return(e._context.displayName||`Context`)+`.Consumer`;case se:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case le:return t=e.displayName||null,t===null?ye(e.type)||`Memo`:t;case ue:t=e._payload,e=e._init;try{return ye(e(t))}catch{}}return null}var be=Array.isArray,A=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,j=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,xe={pending:!1,data:null,method:null,action:null},Se=[],Ce=-1;function we(e){return{current:e}}function Te(e){0>Ce||(e.current=Se[Ce],Se[Ce]=null,Ce--)}function M(e,t){Ce++,Se[Ce]=e.current,e.current=t}var Ee=we(null),De=we(null),Oe=we(null),ke=we(null);function Ae(e,t){switch(M(Oe,t),M(De,e),M(Ee,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?up(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=up(t),e=dp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}Te(Ee),M(Ee,e)}function je(){Te(Ee),Te(De),Te(Oe)}function Me(e){var t=e.memoizedState;t!==null&&(sh._currentValue=t.memoizedState,M(ke,e)),t=Ee.current;var n=dp(t,e.type);t!==n&&(M(De,e),M(Ee,n))}function Ne(e){De.current===e&&(Te(Ee),Te(De)),ke.current===e&&(Te(ke),sh._currentValue=xe)}var Pe,Fe;function Ie(e){if(Pe===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Pe=t&&t[1]||``,Fe=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Pe+e+Fe}var Le=!1;function Re(e,t){if(!e||Le)return``;Le=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Le=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Ie(n):``}function ze(e,t){switch(e.tag){case 26:case 27:case 5:return Ie(e.type);case 16:return Ie(`Lazy`);case 13:return e.child!==t&&t!==null?Ie(`Suspense Fallback`):Ie(`Suspense`);case 19:return Ie(`SuspenseList`);case 0:case 15:return Re(e.type,!1);case 11:return Re(e.type.render,!1);case 1:return Re(e.type,!0);case 31:return Ie(`Activity`);case 30:return Ie(`ViewTransition`);default:return``}}function Be(e){try{var t=``,n=null;do t+=ze(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Ve=Object.prototype.hasOwnProperty,He=t.unstable_scheduleCallback,Ue=t.unstable_cancelCallback,We=t.unstable_shouldYield,Ge=t.unstable_requestPaint,Ke=t.unstable_now,qe=t.unstable_getCurrentPriorityLevel,Je=t.unstable_ImmediatePriority,Ye=t.unstable_UserBlockingPriority,Xe=t.unstable_NormalPriority,Ze=t.unstable_LowPriority,Qe=t.unstable_IdlePriority,$e=t.log,et=t.unstable_setDisableYieldValue,tt=null,nt=null;function N(e){if(typeof $e==`function`&&et(e),nt&&typeof nt.setStrictMode==`function`)try{nt.setStrictMode(tt,e)}catch{}}var rt=Math.clz32?Math.clz32:ot,it=Math.log,at=Math.LN2;function ot(e){return e>>>=0,e===0?32:31-(it(e)/at|0)|0}var st=256,ct=262144,lt=4194304;function ut(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function dt(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=ut(n))):i=ut(o):i=ut(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=ut(n))):i=ut(o)):i=ut(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function ft(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function pt(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-rt(n),i=1<<r;t|=e[r],n&=~i}return t}function mt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ht(){var e=lt;return lt<<=1,!(lt&62914560)&&(lt=4194304),e}function gt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function _t(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function vt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-rt(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&yt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function yt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-rt(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function bt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-rt(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function xt(e,t){var n=t&-t;return n=n&42?1:St(n),(n&(e.suspendedLanes|t))===0?n:0}function St(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ct(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function wt(){var e=j.p;return e===0?(e=window.event,e===void 0?32:Ch(e.type)):e}function Tt(e,t){var n=j.p;try{return j.p=e,t()}finally{j.p=n}}var Et=Math.random().toString(36).slice(2),Dt=`__reactFiber$`+Et,Ot=`__reactProps$`+Et,kt=`__reactContainer$`+Et,At=`__reactEvents$`+Et,jt=`__reactListeners$`+Et,Mt=`__reactHandles$`+Et,Nt=`__reactResources$`+Et,Pt=`__reactMarker$`+Et,Ft=`__reactLoad$`+Et;function It(e){delete e[Dt],delete e[Ot],delete e[jt],delete e[Mt]}function Lt(e){var t;if(t=e[Dt])return t;for(var n=e.parentNode;n;){if(t=n[kt]||n[Dt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=fm(e);e!==null;){if(n=e[Dt])return n;e=fm(e)}return t}e=n,n=e.parentNode}return null}function Rt(e){if(e=e[Dt]||e[kt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function zt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Bt(e){var t=e[Nt];return t||=e[Nt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Vt(e){e[Pt]=!0}function Ht(e){e[Ft]=void 0}var Ut=new Set,Wt={};function Gt(e,t){Kt(e,t),Kt(e+`Capture`,t)}function Kt(e,t){for(Wt[e]=t,e=0;e<t.length;e++)Ut.add(t[e])}var qt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Jt={},Yt={};function Xt(e){return Ve.call(Yt,e)?!0:Ve.call(Jt,e)?!1:qt.test(e)?Yt[e]=!0:(Jt[e]=!0,!1)}var P=!1;function Zt(){var e=P;return P=!1,e}function Qt(e,t,n){if(Xt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function $t(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function en(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function tn(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function nn(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function rn(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function an(e){if(!e._valueTracker){var t=nn(e)?`checked`:`value`;e._valueTracker=rn(e,t,``+e[t])}}function on(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=nn(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var sn=/[\n"\\]/g;function cn(e){return e.replace(sn,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function ln(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+tn(t)):e.value!==``+tn(t)&&(e.value=``+tn(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):dn(e,tn(n)):o===`number`&&e.value==t?dn(e,tn(e.value)):dn(e,tn(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+tn(s):e.removeAttribute(`name`)}function un(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){an(e);return}n=n==null?``:``+tn(n),t=t==null?n:``+tn(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),an(e)}function dn(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function fn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+tn(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function pn(e,t,n){t!=null&&(t=``+tn(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+tn(n)}function mn(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(be(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=tn(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),an(e)}function hn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var gn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function _n(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||gn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function vn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,P=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(_n(e,a,r),P=!0)}else for(var o in t)t.hasOwnProperty(o)&&_n(e,o,t[o])}function yn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var bn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),xn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Sn(e){return xn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function Cn(){}var wn=null;function Tn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var En=null,Dn=null;function On(e){var t=Rt(e);if(t&&(e=t.stateNode)){var n=e[Ot]||null;a:switch(e=t.stateNode,t.type){case`input`:if(ln(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+cn(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[Ot]||null;if(!a)throw Error(i(90));ln(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&on(r)}break a;case`textarea`:pn(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&fn(e,!!n.multiple,t,!1)}}}var kn=!1;function An(e,t,n){if(kn)return e(t,n);kn=!0;try{return e(t)}finally{if(kn=!1,(En!==null||Dn!==null)&&(zd(),En&&(t=En,e=Dn,Dn=En=null,On(t),e)))for(t=0;t<e.length;t++)On(e[t])}}function jn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[Ot]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var Mn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Nn=!1;if(Mn)try{var Pn={};Object.defineProperty(Pn,"passive",{get:function(){Nn=!0}}),window.addEventListener(`test`,Pn,Pn),window.removeEventListener(`test`,Pn,Pn)}catch{Nn=!1}var Fn=null,In=null,Ln=null;function Rn(){if(Ln)return Ln;var e,t=In,n=t.length,r,i=`value`in Fn?Fn.value:Fn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Ln=i.slice(e,1<r?1-r:void 0)}function zn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Bn(){return!0}function F(){return!1}function Vn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Bn:F,this.isPropagationStopped=F,this}return D(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Bn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Bn)},persist:function(){},isPersistent:Bn}),t}var Hn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Un=Vn(Hn),Wn=D({},Hn,{view:0,detail:0}),Gn=Vn(Wn),I,Kn,qn,Jn=D({},Wn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ar,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==qn&&(qn&&e.type===`mousemove`?(I=e.screenX-qn.screenX,Kn=e.screenY-qn.screenY):Kn=I=0,qn=e),I)},movementY:function(e){return`movementY`in e?e.movementY:Kn}}),Yn=Vn(Jn),Xn=Vn(D({},Jn,{dataTransfer:0})),Zn=Vn(D({},Wn,{relatedTarget:0})),Qn=Vn(D({},Hn,{animationName:0,elapsedTime:0,pseudoElement:0})),$n=Vn(D({},Hn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),er=Vn(D({},Hn,{data:0})),tr={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},nr={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},rr={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function ir(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=rr[e])?!!t[e]:!1}function ar(){return ir}var or=Vn(D({},Wn,{key:function(e){if(e.key){var t=tr[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=zn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?nr[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ar,charCode:function(e){return e.type===`keypress`?zn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?zn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),sr=Vn(D({},Jn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),cr=Vn(D({},Hn,{submitter:0})),lr=Vn(D({},Wn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ar})),ur=Vn(D({},Hn,{propertyName:0,elapsedTime:0,pseudoElement:0})),dr=Vn(D({},Jn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),fr=Vn(D({},Hn,{newState:0,oldState:0,source:0})),pr=[9,13,27,32],mr=Mn&&`CompositionEvent`in window,hr=null;Mn&&`documentMode`in document&&(hr=document.documentMode);var gr=Mn&&`TextEvent`in window&&!hr,_r=Mn&&(!mr||hr&&8<hr&&11>=hr),vr=` `,yr=!1;function br(e,t){switch(e){case`keyup`:return pr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function xr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var Sr=!1;function Cr(e,t){switch(e){case`compositionend`:return xr(t);case`keypress`:return t.which===32?(yr=!0,vr):null;case`textInput`:return e=t.data,e===vr&&yr?null:e;default:return null}}function wr(e,t){if(Sr)return e===`compositionend`||!mr&&br(e,t)?(e=Rn(),Ln=In=Fn=null,Sr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return _r&&t.locale!==`ko`?null:t.data;default:return null}}var Tr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Er(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!Tr[e.type]:t===`textarea`}function Dr(e,t,n,r){En?Dn?Dn.push(r):Dn=[r]:En=r,t=Jf(t,`onChange`),0<t.length&&(n=new Un(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var Or=null,kr=null;function Ar(e){Vf(e,0)}function jr(e){if(on(zt(e)))return e}function Mr(e,t){if(e===`change`)return t}var Nr=!1;if(Mn){var Pr;if(Mn){var Fr=`oninput`in document;if(!Fr){var Ir=document.createElement(`div`);Ir.setAttribute(`oninput`,`return;`),Fr=typeof Ir.oninput==`function`}Pr=Fr}else Pr=!1;Nr=Pr&&(!document.documentMode||9<document.documentMode)}function Lr(){Or&&(Or.detachEvent(`onpropertychange`,Rr),kr=Or=null)}function Rr(e){if(e.propertyName===`value`&&jr(kr)){var t=[];Dr(t,kr,e,Tn(e)),An(Ar,t)}}function zr(e,t,n){e===`focusin`?(Lr(),Or=t,kr=n,Or.attachEvent(`onpropertychange`,Rr)):e===`focusout`&&Lr()}function Br(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return jr(kr)}function Vr(e,t){if(e===`click`)return jr(t)}function Hr(e,t){if(e===`input`||e===`change`)return jr(t)}function L(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Ur=typeof Object.is==`function`?Object.is:L;function Wr(e,t){if(Ur(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ve.call(t,i)||!Ur(e[i],t[i]))return!1}return!0}function Gr(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Kr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function qr(e,t){var n=Kr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Kr(n)}}function Jr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Jr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Yr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Gr(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Gr(e.document)}return t}function Xr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Zr=Mn&&`documentMode`in document&&11>=document.documentMode,Qr=null,$r=null,ei=null,ti=!1;function ni(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ti||Qr==null||Qr!==Gr(r)||(r=Qr,`selectionStart`in r&&Xr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ei&&Wr(ei,r)||(ei=r,r=Jf($r,`onSelect`),0<r.length&&(t=new Un(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Qr)))}function ri(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var ii={animationend:ri(`Animation`,`AnimationEnd`),animationiteration:ri(`Animation`,`AnimationIteration`),animationstart:ri(`Animation`,`AnimationStart`),transitionrun:ri(`Transition`,`TransitionRun`),transitionstart:ri(`Transition`,`TransitionStart`),transitioncancel:ri(`Transition`,`TransitionCancel`),transitionend:ri(`Transition`,`TransitionEnd`)},ai={},oi={};Mn&&(oi=document.createElement(`div`).style,`AnimationEvent`in window||(delete ii.animationend.animation,delete ii.animationiteration.animation,delete ii.animationstart.animation),`TransitionEvent`in window||delete ii.transitionend.transition);function si(e){if(ai[e])return ai[e];if(!ii[e])return e;var t=ii[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in oi)return ai[e]=t[n];return e}var ci=si(`animationend`),li=si(`animationiteration`),ui=si(`animationstart`),di=si(`transitionrun`),fi=si(`transitionstart`),pi=si(`transitioncancel`),mi=si(`transitionend`),hi=new Map,gi=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);gi.push(`scrollEnd`);function _i(e,t){hi.set(e,t),Gt(t,[e])}var vi=0;function yi(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=bd.identifierPrefix;var n=vi++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function bi(e){if(e==null||typeof e==`string`)return e;var t=null,n=Od;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function xi(e,t){return e=bi(e),t=bi(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var Si=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},Ci=[],wi=0,Ti=0;function Ei(){for(var e=wi,t=Ti=wi=0;t<e;){var n=Ci[t];Ci[t++]=null;var r=Ci[t];Ci[t++]=null;var i=Ci[t];Ci[t++]=null;var a=Ci[t];if(Ci[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Ai(n,i,a)}}function Di(e,t,n,r){Ci[wi++]=e,Ci[wi++]=t,Ci[wi++]=n,Ci[wi++]=r,Ti|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Oi(e,t,n,r){return Di(e,t,n,r),ji(e)}function ki(e,t){return Di(e,null,null,t),ji(e)}function Ai(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-rt(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ji(e){if(50<kd)throw kd=0,Ad=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Mi={};function Ni(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pi(e,t,n,r){return new Ni(e,t,n,r)}function Fi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ii(e,t){var n=e.alternate;return n===null?(n=Pi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Li(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Ri(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)Fi(r)&&(s=1);else if(typeof r==`string`)s=qm(e,n,Ee.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case de:return e=Pi(31,n,t,a),e.elementType=de,e.lanes=o,e;case re:return zi(n.children,a,o,t);case ie:s=8,a|=24;break;case ae:return e=Pi(12,n,t,a|2),e.elementType=ae,e.lanes=o,e;case k:return e=Pi(13,n,t,a),e.elementType=k,e.lanes=o,e;case ce:return e=Pi(19,n,t,a),e.elementType=ce,e.lanes=o,e;case fe:case me:return e=a|32,e=Pi(30,n,t,e),e.elementType=me,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case O:s=10;break a;case oe:s=9;break a;case se:s=11;break a;case le:s=14;break a;case ue:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=Pi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function zi(e,t,n,r){return e=Pi(7,e,r,t),e.lanes=n,e}function Bi(e,t,n){return e=Pi(6,e,null,t),e.lanes=n,e}function Vi(e){var t=Pi(18,null,null,0);return t.stateNode=e,t}function Hi(e,t,n){return t=Pi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Ui=new WeakMap;function Wi(e,t){if(typeof e==`object`&&e){var n=Ui.get(e);return n===void 0?(t={value:e,source:t,stack:Be(t)},Ui.set(e,t),t):n}return{value:e,source:t,stack:Be(t)}}var Gi=[],Ki=0,qi=null,Ji=0,Yi=[],Xi=0,Zi=null,Qi=1,$i=``;function ea(e,t){Gi[Ki++]=Ji,Gi[Ki++]=qi,qi=e,Ji=t}function ta(e,t,n){Yi[Xi++]=Qi,Yi[Xi++]=$i,Yi[Xi++]=Zi,Zi=e;var r=Qi;e=$i;var i=32-rt(r)-1;r&=~(1<<i),n+=1;var a=32-rt(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Qi=1<<32-rt(t)+i|n<<i|r,$i=a+e}else Qi=1<<a|n<<i|r,$i=e}function na(e){e.return!==null&&(ea(e,1),ta(e,1,0))}function ra(e){for(;e===qi;)qi=Gi[--Ki],Gi[Ki]=null,Ji=Gi[--Ki],Gi[Ki]=null;for(;e===Zi;)Zi=Yi[--Xi],Yi[Xi]=null,$i=Yi[--Xi],Yi[Xi]=null,Qi=Yi[--Xi],Yi[Xi]=null}function ia(e,t){Yi[Xi++]=Qi,Yi[Xi++]=$i,Yi[Xi++]=Zi,Qi=t.id,$i=t.overflow,Zi=e}var aa=null,R=null,z=!1,oa=null,sa=!1,ca=Error(i(519));function la(e){throw ha(Wi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),ca}function ua(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[Dt]=e,t[Ot]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<zf.length;n++)Q(zf[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),un(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),mn(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||ep(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=Cn),t=!0):t=!1,t||la(e,!0)}function da(e){for(aa=e.return;aa;)switch(aa.tag){case 5:case 31:case 13:sa=!1;return;case 27:case 3:sa=!0;return;default:aa=aa.return}}function fa(e){if(e!==aa)return!1;if(!z)return da(e),z=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||pp(e.type,e.memoizedProps)),n=!n),n&&R&&la(e),da(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));R=dm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));R=dm(e)}else t===27?(t=R,Sp(e.type)?(e=um,um=null,R=e):R=t):R=aa?lm(e.stateNode.nextSibling):null;return!0}function pa(){R=aa=null,z=!1}function ma(){var e=oa;return e!==null&&(fd===null?fd=e:fd.push.apply(fd,e),oa=null),e}function ha(e){oa===null?oa=[e]:oa.push(e)}var ga=we(null),_a=null,va=null;function ya(e,t,n){M(ga,t._currentValue),t._currentValue=n}function ba(e){e._currentValue=ga.current,Te(ga)}function xa(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Sa(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),xa(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),xa(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),xa(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Ca(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Ur(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===ke.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[sh]:e.push(sh))}a=a.return}return e!==null&&Sa(t,e,n,r),t.flags|=262144,e!==null}function wa(e){for(e=e.firstContext;e!==null;){if(!Ur(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ta(e){_a=e,va=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ea(e){return Oa(_a,e)}function Da(e,t){return _a===null&&Ta(e),Oa(e,t)}function Oa(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},va===null){if(e===null)throw Error(i(308));va=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else va=va.next=t;return n}var ka=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Aa=t.unstable_scheduleCallback,ja=t.unstable_NormalPriority,Ma={$$typeof:O,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Na(){return{controller:new ka,data:new Map,refCount:0}}function Pa(e){e.refCount--,e.refCount===0&&Aa(ja,function(){e.controller.abort()})}function Fa(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var Ia=null;function La(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Ra=null,za=0,Ba=0,Va=null;function Ha(e,t){if(Ra===null){var n=Ra=[];za=0,Ba=Pf(),Va={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return za++,t.then(Ua,Ua),t}function Ua(){if(--za===0&&(Ia=null,Ra!==null)){Va!==null&&(Va.status=`fulfilled`);var e=Ra;Ra=null,Ba=0,Va=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Wa(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Ga=A.S;A.S=function(e,t){if(hd=Ke(),typeof t==`object`&&t&&typeof t.then==`function`&&Ha(e,t),Ia!==null)for(var n=bf;n!==null;)Fa(n,Ia),n=n.next;if(n=e.types,n!==null){for(var r=bf;r!==null;)Fa(r,n),r=r.next;if(Ba!==0){r=Ia,r===null&&(r=Ia=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Ga!==null&&Ga(e,t)};var B=we(null);function Ka(){var e=B.current;return e===null?$u.pooledCache:e}function V(e,t){t===null?M(B,B.current):M(B,t.pool)}function qa(){var e=Ka();return e===null?null:{parent:Ma._currentValue,pool:e}}var Ja=Error(i(460)),Ya=Error(i(474)),Xa=Error(i(542)),Za={then:function(){}};function Qa(e){return e=e.status,e===`fulfilled`||e===`rejected`}function $a(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Cn,Cn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ro(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(Cn,Cn);else{if(e=$u,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ro(e),e}throw to=t,Ja}}function eo(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(to=e,Ja):e}}var to=null;function no(){if(to===null)throw Error(i(459));var e=to;return to=null,e}function ro(e){if(e===Ja||e===Xa)throw Error(i(483))}var io=null,ao=0;function oo(e){var t=ao;return ao+=1,io===null&&(io=[]),$a(io,e,t)}function so(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function co(e,t){throw t.$$typeof===ee?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function lo(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Ii(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Bi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===re?(e=d(e,t,n.props.children,r,n.key),so(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===ue&&eo(i)===t.type)?(t=a(t,n.props),so(t,n),t.return=e,t):(t=Ri(n.type,n.key,n.props,null,e.mode,r),so(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Hi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=zi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Bi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case te:return n=Ri(t.type,t.key,t.props,null,e.mode,n),so(n,t),n.return=e,n;case ne:return t=Hi(t,e.mode,n),t.return=e,t;case ue:return t=eo(t),f(e,t,n)}if(be(t)||_e(t))return t=zi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,oo(t),n);if(t.$$typeof===O)return f(e,Da(e,t),n);co(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case te:return n.key===i?l(e,t,n,r):null;case ne:return n.key===i?u(e,t,n,r):null;case ue:return n=eo(n),p(e,t,n,r)}if(be(n)||_e(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,oo(n),r);if(n.$$typeof===O)return p(e,t,Da(e,n),r);co(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case te:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case ne:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ue:return r=eo(r),m(e,t,n,r,i)}if(be(r)||_e(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,oo(r),i);if(r.$$typeof===O)return m(e,t,n,Da(t,r),i);co(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),z&&ea(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return z&&ea(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),z&&ea(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),z&&ea(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return z&&ea(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),z&&ea(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===re&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case te:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===re){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),so(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===ue&&eo(l)===r.type){n(e,r.sibling),c=a(r,o.props),so(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===re?(c=zi(o.props.children,e.mode,c,o.key),so(c,o),c.return=e,e=c):(c=Ri(o.type,o.key,o.props,null,e.mode,c),so(c,o),c.return=e,e=c)}return s(e);case ne:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Hi(o,e.mode,c),c.return=e,e=c}return s(e);case ue:return o=eo(o),_(e,r,o,c)}if(be(o))return h(e,r,o,c);if(_e(o)){if(l=_e(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,oo(o),c);if(o.$$typeof===O)return _(e,r,Da(e,o),c);co(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Bi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{ao=0;var i=_(e,t,n,r);return io=null,i}catch(t){if(t===Ja||t===Xa)throw t;var a=Pi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var uo=lo(!0),fo=lo(!1),po=!1;function mo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ho(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function go(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function _o(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,q&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ji(e),Ai(e,null,n),t}return Di(e,r,t,n),ji(e)}function vo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,bt(e,n)}}function yo(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var bo=!1;function xo(){if(bo){var e=Va;if(e!==null)throw e}}function So(e,t,n,r){bo=!1;var i=e.updateQueue;po=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Y&f)===f:(r&f)===f){f!==0&&f===Ba&&(bo=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=D({},d,f);break a;case 2:po=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),od|=o,e.lanes=o,e.memoizedState=d}}function Co(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function wo(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Co(n[e],t)}var To=we(null),Eo=we(0);function Do(e,t){e=id,M(Eo,e),M(To,t),id=e|t.baseLanes}function Oo(){M(Eo,id),M(To,To.current)}function ko(){id=Eo.current,Te(To),Te(Eo)}var Ao=we(null),jo=null;function Mo(e){var t=e.alternate;M(Lo,Lo.current&1),M(Ao,e),jo===null&&(t===null||To.current!==null||t.memoizedState!==null)&&(jo=e)}function No(e){M(Lo,Lo.current),M(Ao,e),jo===null&&(jo=e)}function Po(e){e.tag===22?(M(Lo,Lo.current),M(Ao,e),jo===null&&(jo=e)):Fo()}function Fo(){M(Lo,Lo.current),M(Ao,Ao.current)}function Io(e){Te(Ao),jo===e&&(jo=null),Te(Lo)}var Lo=we(0);function Ro(e,t){M(Ao,Ao.current),M(Lo,t)}function zo(e){Te(Lo),Te(Ao),jo===e&&(jo=null)}function Bo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||om(n)||sm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Vo=0,H=null,U=null,Ho=null,Uo=!1,Wo=!1,Go=!1,Ko=0,qo=0,Jo=null,Yo=0;function W(){throw Error(i(321))}function Xo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ur(e[n],t[n]))return!1;return!0}function Zo(e,t,n,r,i,a){return Vo=a,H=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,A.H=e===null||e.memoizedState===null?mc:hc,Go=!1,a=n(r,i),Go=!1,Wo&&(a=$o(t,n,r,i)),Qo(e),a}function Qo(e){A.H=pc;var t=U!==null&&U.next!==null;if(Vo=0,Ho=U=H=null,Uo=!1,qo=0,Jo=null,t)throw Error(i(300));e===null||Mc||(e=e.dependencies,e!==null&&wa(e)&&(Mc=!0))}function $o(e,t,n,r){H=e;var a=0;do{if(Wo&&(Jo=null),qo=0,Wo=!1,25<=a)throw Error(i(301));if(a+=1,Ho=U=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}A.H=gc,o=t(n,r)}while(Wo);return o}function es(){var e=A.H,t=e.useState()[0];return t=typeof t.then==`function`?ss(t):t,e=e.useState()[0],(U===null?null:U.memoizedState)!==e&&(H.flags|=1024),t}function ts(){var e=Ko!==0;return Ko=0,e}function ns(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function rs(e){if(Uo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Uo=!1}Vo=0,Ho=U=H=null,Wo=!1,qo=Ko=0,Jo=null}function is(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ho===null?H.memoizedState=Ho=e:Ho=Ho.next=e,Ho}function as(){if(U===null){var e=H.alternate;e=e===null?null:e.memoizedState}else e=U.next;var t=Ho===null?H.memoizedState:Ho.next;if(t!==null)Ho=t,U=e;else{if(e===null)throw H.alternate===null?Error(i(467)):Error(i(310));U=e,e={memoizedState:U.memoizedState,baseState:U.baseState,baseQueue:U.baseQueue,queue:U.queue,next:null},Ho===null?H.memoizedState=Ho=e:Ho=Ho.next=e}return Ho}function os(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ss(e){var t=qo;return qo+=1,Jo===null&&(Jo=[]),e=$a(Jo,e,t),t=H,(Ho===null?t.memoizedState:Ho.next)===null&&(t=t.alternate,A.H=t===null||t.memoizedState===null?mc:hc),e}function cs(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return ss(e);if(e.$$typeof===he)return;if(e.$$typeof===O)return Ea(e)}throw Error(i(438,String(e)))}function ls(e){var t=null,n=H.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=H.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=os(),H.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=pe;return t.index++,n}function us(e,t){return typeof t==`function`?t(e):t}function ds(e){return fs(as(),U,e)}function fs(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Vo&f)===f:(Y&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===Ba&&(d=!0);else if((Vo&p)===p){u=u.next,p===Ba&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,H.lanes|=p,od|=p;f=u.action,Go&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,H.lanes|=f,od|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Ur(o,e.memoizedState)&&(Mc=!0,d&&(n=Va,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function ps(e){var t=as(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Ur(o,t.memoizedState)||(Mc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function ms(e,t,n){var r=H,a=as(),o=z;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Ur((U||a).memoizedState,n);if(s&&(a.memoizedState=n,Mc=!0),a=a.queue,zs(_s.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||Ho!==null&&!!(Ho.memoizedState.tag&1),Ps(e?9:8,{destroy:void 0},gs.bind(null,r,a,n,t),null),e){if(r.flags|=2048,$u===null)throw Error(i(349));o||Vo&127||hs(r,t,n)}return n}function hs(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=H.updateQueue,t===null?(t=os(),H.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function gs(e,t,n,r){t.value=n,t.getSnapshot=r,vs(t)&&ys(e)}function _s(e,t,n){return n(function(){vs(t)&&ys(e)})}function vs(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ur(e,n)}catch{return!0}}function ys(e){var t=ki(e,2);t!==null&&Pd(t,e,2)}function bs(e){var t=is();if(typeof e==`function`){var n=e;if(e=n(),Go){N(!0);try{n()}finally{N(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:us,lastRenderedState:e},t}function xs(e,t,n,r){return e.baseState=n,fs(e,U,typeof r==`function`?r:us)}function Ss(e,t,n,r,a){if(uc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};A.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Cs(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Cs(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=A.T,o={};o.types=a===null?null:a.types,A.T=o;try{var s=n(i,r),c=A.S;c!==null&&c(o,s),ws(e,t,s)}catch(n){Es(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),A.T=a}}else try{a=n(i,r),ws(e,t,a)}catch(n){Es(e,t,n)}}function ws(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Ts(e,t,n)},function(n){return Es(e,t,n)}):Ts(e,t,n)}function Ts(e,t,n){t.status=`fulfilled`,t.value=n,Ds(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Cs(e,n)))}function Es(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Ds(t),t=t.next;while(t!==r)}e.action=null}function Ds(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Os(e,t){return t}function ks(e,t){if(z){var n=$u.formState;if(n!==null){a:{var r=H;if(z){if(R){b:{for(var i=R,a=sa;i.nodeType!==8;)if(!a||(i=lm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){R=lm(i.nextSibling),r=i.data===`F!`;break a}}la(r)}r=!1}r&&(t=n[0])}}return n=is(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Os,lastRenderedState:t},n.queue=r,n=sc.bind(null,H,r),r.dispatch=n,r=bs(!1),a=lc.bind(null,H,!1,r.queue),r=is(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Ss.bind(null,H,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function As(e){return js(as(),U,e)}function js(e,t,n){if(t=fs(e,t,Os)[0],e=ds(us)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=ss(t)}catch(e){throw e===Ja?Xa:e}else r=t;t=as();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(H.flags|=2048,Ps(9,{destroy:void 0},Ms.bind(null,i,n),null)),[r,a,e]}function Ms(e,t){e.action=t}function Ns(e){var t=as(),n=U;if(n!==null)return js(t,n,e);as(),t=t.memoizedState,n=as();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Ps(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=H.updateQueue,t===null&&(t=os(),H.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Fs(){return as().memoizedState}function Is(e,t,n,r){var i=is();H.flags|=e,i.memoizedState=Ps(1|t,{destroy:void 0},n,r===void 0?null:r)}function Ls(e,t,n,r){var i=as();r=r===void 0?null:r;var a=i.memoizedState.inst;U!==null&&r!==null&&Xo(r,U.memoizedState.deps)?i.memoizedState=Ps(t,a,n,r):(H.flags|=e,i.memoizedState=Ps(1|t,a,n,r))}function Rs(e,t){Is(8390656,8,e,t)}function zs(e,t){Ls(2048,8,e,t)}function Bs(e){H.flags|=4;var t=H.updateQueue;if(t===null)t=os(),H.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Vs(e){var t=as().memoizedState;return Bs({ref:t,nextImpl:e}),function(){if(q&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Hs(e,t){return Ls(4,2,e,t)}function Us(e,t){return Ls(4,4,e,t)}function Ws(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Gs(e,t,n){n=n==null?null:n.concat([e]),Ls(4,4,Ws.bind(null,t,e),n)}function Ks(){}function qs(e,t){var n=as();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Xo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Js(e,t){var n=as();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Xo(t,r[1]))return r[0];if(r=e(),Go){N(!0);try{e()}finally{N(!1)}}return n.memoizedState=[r,t],r}function Ys(e,t,n){return n===void 0||Vo&1073741824&&!(Y&261930)?e.memoizedState=t:(e.memoizedState=n,e=Md(),H.lanes|=e,od|=e,n)}function Xs(e,t,n,r){return Ur(n,t)?n:To.current===null?!(Vo&106)||Vo&1073741824&&!(Y&261930)?(Mc=!0,e.memoizedState=n):(e=Md(),H.lanes|=e,od|=e,t):(e=Ys(e,n,r),Ur(e,t)||(Mc=!0),e)}function Zs(e,t,n,r,i){var a=j.p;j.p=a!==0&&8>a?a:8;var o=A.T,s={};s.types=o===null?null:o.types,A.T=s,lc(e,!1,t,n);try{var c=i(),l=A.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?cc(e,t,Wa(c,r),jd(e)):cc(e,t,r,jd(e))}catch(n){cc(e,t,{then:function(){},status:`rejected`,reason:n},jd())}finally{j.p=a,o!==null&&s.types!==null&&(o.types=s.types),A.T=o}}function Qs(){}function $s(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=ec(e).queue;Zs(e,a,t,xe,n===null?Qs:function(){return tc(e),n(r)})}function ec(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:xe,baseState:xe,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:us,lastRenderedState:xe},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:us,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function tc(e){var t=ec(e);t.next===null&&(t=e.alternate.memoizedState),cc(e,t.next.queue,{},jd())}function nc(){return Ea(sh)}function rc(){return as().memoizedState}function ic(){return as().memoizedState}function ac(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=jd();e=go(n);var r=_o(t,e,n);r!==null&&(Pd(r,t,n),vo(r,t,n)),t={cache:Na()},e.payload=t;return}t=t.return}}function oc(e,t,n){var r=jd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},uc(e)?dc(t,n):(n=Oi(e,t,n,r),n!==null&&(Pd(n,e,r),fc(n,t,r)))}function sc(e,t,n){cc(e,t,n,jd())}function cc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(uc(e))dc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Ur(s,o))return Di(e,t,i,0),$u===null&&Ei(),!1}catch{}if(n=Oi(e,t,i,r),n!==null)return Pd(n,e,r),fc(n,t,r),!0}return!1}function lc(e,t,n,r){if(r={lane:2,revertLane:Pf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},uc(e)){if(t)throw Error(i(479))}else t=Oi(e,n,r,2),t!==null&&Pd(t,e,2)}function uc(e){var t=e.alternate;return e===H||t!==null&&t===H}function dc(e,t){Wo=Uo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function fc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,bt(e,n)}}var pc={readContext:Ea,use:cs,useCallback:W,useContext:W,useEffect:W,useImperativeHandle:W,useLayoutEffect:W,useInsertionEffect:W,useMemo:W,useReducer:W,useRef:W,useState:W,useDebugValue:W,useDeferredValue:W,useTransition:W,useSyncExternalStore:W,useId:W,useHostTransitionStatus:W,useFormState:W,useActionState:W,useOptimistic:W,useMemoCache:W,useCacheRefresh:W,useEffectEvent:W},mc={readContext:Ea,use:cs,useCallback:function(e,t){return is().memoizedState=[e,t===void 0?null:t],e},useContext:Ea,useEffect:Rs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Is(4194308,4,Ws.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Is(4194308,4,e,t)},useInsertionEffect:function(e,t){Is(4,2,e,t)},useMemo:function(e,t){var n=is();t=t===void 0?null:t;var r=e();if(Go){N(!0);try{e()}finally{N(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=is();if(n!==void 0){var i=n(t);if(Go){N(!0);try{n(t)}finally{N(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=oc.bind(null,H,e),[r.memoizedState,e]},useRef:function(e){var t=is();return e={current:e},t.memoizedState=e},useState:function(e){e=bs(e);var t=e.queue,n=sc.bind(null,H,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Ks,useDeferredValue:function(e,t){return Ys(is(),e,t)},useTransition:function(){var e=bs(!1);return e=Zs.bind(null,H,e.queue,!0,!1),is().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=H,a=is();if(z){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),$u===null)throw Error(i(349));Y&127||hs(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Rs(_s.bind(null,r,o,e),[e]),r.flags|=2048,Ps(9,{destroy:void 0},gs.bind(null,r,o,n,t),null),n},useId:function(){var e=is(),t=$u.identifierPrefix;if(z){var n=$i,r=Qi;n=(r&~(1<<32-rt(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Ko++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Yo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:nc,useFormState:ks,useActionState:ks,useOptimistic:function(e){var t=is();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=lc.bind(null,H,!0,n),n.dispatch=t,[e,t]},useMemoCache:ls,useCacheRefresh:function(){return is().memoizedState=ac.bind(null,H)},useEffectEvent:function(e){var t=is(),n={impl:e};return t.memoizedState=n,function(){if(q&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},hc={readContext:Ea,use:cs,useCallback:qs,useContext:Ea,useEffect:zs,useImperativeHandle:Gs,useInsertionEffect:Hs,useLayoutEffect:Us,useMemo:Js,useReducer:ds,useRef:Fs,useState:function(){return ds(us)},useDebugValue:Ks,useDeferredValue:function(e,t){return Xs(as(),U.memoizedState,e,t)},useTransition:function(){var e=ds(us)[0],t=as().memoizedState;return[typeof e==`boolean`?e:ss(e),t]},useSyncExternalStore:ms,useId:rc,useHostTransitionStatus:nc,useFormState:As,useActionState:As,useOptimistic:function(e,t){return xs(as(),U,e,t)},useMemoCache:ls,useCacheRefresh:ic,useEffectEvent:Vs},gc={readContext:Ea,use:cs,useCallback:qs,useContext:Ea,useEffect:zs,useImperativeHandle:Gs,useInsertionEffect:Hs,useLayoutEffect:Us,useMemo:Js,useReducer:ps,useRef:Fs,useState:function(){return ps(us)},useDebugValue:Ks,useDeferredValue:function(e,t){var n=as();return U===null?Ys(n,e,t):Xs(n,U.memoizedState,e,t)},useTransition:function(){var e=ps(us)[0],t=as().memoizedState;return[typeof e==`boolean`?e:ss(e),t]},useSyncExternalStore:ms,useId:rc,useHostTransitionStatus:nc,useFormState:Ns,useActionState:Ns,useOptimistic:function(e,t){var n=as();return U===null?(n.baseState=e,[e,n.queue.dispatch]):xs(n,U,e,t)},useMemoCache:ls,useCacheRefresh:ic,useEffectEvent:Vs};function _c(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:D({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var vc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=jd(),i=go(r);i.payload=t,n!=null&&(i.callback=n),t=_o(e,i,r),t!==null&&(Pd(t,e,r),vo(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=jd(),i=go(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=_o(e,i,r),t!==null&&(Pd(t,e,r),vo(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=jd(),r=go(n);r.tag=2,t!=null&&(r.callback=t),t=_o(e,r,n),t!==null&&(Pd(t,e,n),vo(t,e,n))}};function yc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Wr(n,r)||!Wr(i,a):!0}function bc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&vc.enqueueReplaceState(t,t.state,null)}function xc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=D({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Sc(e){Si(e)}function Cc(e){console.error(e)}function wc(e){Si(e)}function Tc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Ec(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Dc(e,t,n){return n=go(n),n.tag=3,n.payload={element:null},n.callback=function(){Tc(e,t)},n}function Oc(e){return e=go(e),e.tag=3,e}function kc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Ec(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Ec(t,n,r),typeof i!=`function`&&(vd===null?vd=new Set([this]):vd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Ac(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Ca(t,n,a,!0),n=Ao.current,n!==null){switch(n.tag){case 31:case 13:case 19:return jo===null?Kd():n.alternate===null&&ad===0&&(ad=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Za?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),mf(e,r,a)),!1;case 22:return n.flags|=65536,r===Za?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),mf(e,r,a)),!1}throw Error(i(435,n.tag))}return mf(e,r,a),Kd(),!1}if(z)return t=Ao.current,t===null?(r!==ca&&(t=Error(i(423),{cause:r}),ha(Wi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Wi(r,n),a=Dc(e.stateNode,r,a),yo(e,a),ad!==4&&(ad=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==ca&&(e=Error(i(422),{cause:r}),ha(Wi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Wi(o,n),dd===null?dd=[o]:dd.push(o),ad!==4&&(ad=2),t===null)return!0;r=Wi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Dc(n.stateNode,r,e),yo(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(vd===null||!vd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Oc(a),kc(a,e,n,r),yo(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var jc=Error(i(461)),Mc=!1;function Nc(e,t,n,r){t.child=e===null?fo(t,null,n,r):uo(t,e.child,n,r)}function Pc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Ta(t),r=Zo(e,t,n,o,a,i),s=ts(),e!==null&&!Mc?(ns(e,t,i),cl(e,t,i)):(z&&s&&na(t),t.flags|=1,Nc(e,t,r,i),t.child)}function Fc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!Fi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Ic(e,t,a,r,i)):(e=Ri(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!ll(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Wr:n,n(o,r)&&e.ref===t.ref)return cl(e,t,i)}return t.flags|=1,e=Ii(a,r),e.ref=t.ref,e.return=t,t.child=e}function Ic(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Wr(a,r)&&e.ref===t.ref){if(Mc=!1,t.pendingProps=r=a,ll(e,i))e.flags&131072&&(Mc=!0);else return t.lanes=e.lanes,cl(e,t,i)}}return Wc(e,t,n,r,i)}function Lc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return zc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&V(t,a===null?null:a.cachePool),a===null?Oo():Do(t,a),Po(t);else return r=t.lanes=536870912,zc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&V(t,null),Oo(),Fo()):(V(t,a.cachePool),Do(t,a),Fo(),t.memoizedState=null);return Nc(e,t,i,n),t.child}function Rc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function zc(e,t,n,r,i){var a=Ka();return a=a===null?null:{parent:Ma._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&V(t,null),Oo(),Po(t),e!==null&&Ca(e,t,r,!0),t.childLanes=i,null}function Bc(e,t){return t=$c({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Vc(e,t,n){return uo(t,e.child,null,n),e=Bc(t,t.pendingProps),e.flags|=2,Io(t),t.memoizedState=null,e}function Hc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(z){if(r.mode===`hidden`)return e=Bc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Rc(null,e);if(No(t),(e=R)?(e=am(e,sa),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Zi===null?null:{id:Qi,overflow:$i},retryLane:536870912,hydrationErrors:null},n=Vi(e),n.return=t,t.child=n,aa=t,R=null)):e=null,e===null)throw la(t);return t.lanes=536870912,null}return Bc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(No(t),a){if(t.flags&256)t.flags&=-257,t=Vc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(Mc||Ca(e,t,n,!1),a=(n&e.childLanes)!==0,Mc||a){if(To.current===null){if(r=$u,r!==null&&(s=xt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,ki(e,s),Pd(r,e,s),jc;Kd()}t=Vc(e,t,n)}else e=o.treeContext,R=lm(s.nextSibling),aa=t,z=!0,oa=null,sa=!1,e!==null&&ia(t,e),t=Bc(t,r),t.flags|=134221824;return t}return e=Ii(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Uc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Wc(e,t,n,r,i){return Ta(t),n=Zo(e,t,n,r,void 0,i),r=ts(),e!==null&&!Mc?(ns(e,t,i),cl(e,t,i)):(z&&r&&na(t),t.flags|=1,Nc(e,t,n,i),t.child)}function Gc(e,t,n,r,i,a){return Ta(t),t.updateQueue=null,n=$o(t,r,n,i),Qo(e),r=ts(),e!==null&&!Mc?(ns(e,t,a),cl(e,t,a)):(z&&r&&na(t),t.flags|=1,Nc(e,t,n,a),t.child)}function Kc(e,t,n,r,i){if(Ta(t),t.stateNode===null){var a=Mi,o=n.contextType;typeof o==`object`&&o&&(a=Ea(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=vc,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},mo(t),o=n.contextType,a.context=typeof o==`object`&&o?Ea(o):Mi,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(_c(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&vc.enqueueReplaceState(a,a.state,null),So(t,r,a,i),xo(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=xc(n,s);a.props=c;var l=a.context,u=n.contextType;o=Mi,typeof u==`object`&&u&&(o=Ea(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&bc(t,a,r,o),po=!1;var f=t.memoizedState;a.state=f,So(t,r,a,i),xo(),l=t.memoizedState,s||f!==l||po?(typeof d==`function`&&(_c(t,n,d,r),l=t.memoizedState),(c=po||yc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,ho(e,t),o=t.memoizedProps,u=xc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Mi,typeof l==`object`&&l&&(c=Ea(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&bc(t,a,r,c),po=!1,f=t.memoizedState,a.state=f,So(t,r,a,i),xo();var p=t.memoizedState;o!==d||f!==p||po||e!==null&&e.dependencies!==null&&wa(e.dependencies)?(typeof s==`function`&&(_c(t,n,s,r),p=t.memoizedState),(u=po||yc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&wa(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,Uc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=uo(t,e.child,null,i),t.child=uo(t,null,n,i)):Nc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=cl(e,t,i),e}function qc(e,t,n,r){return pa(),t.flags|=256,Nc(e,t,n,r),t.child}var Jc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Yc(e){return{baseLanes:e,cachePool:qa()}}function Xc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=ld),e}function Zc(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Lo.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(z){if(i?Mo(t):Fo(),(e=R)?(e=am(e,sa),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Zi===null?null:{id:Qi,overflow:$i},retryLane:536870912,hydrationErrors:null},n=Vi(e),n.return=t,t.child=n,aa=t,R=null)):e=null,e===null)throw la(t);return t.lanes=sm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(Fo(),i=t.mode,a=$c({mode:`hidden`,children:a},i),r=zi(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=Yc(n),r.childLanes=Xc(e,o,n),t.memoizedState=Jc,Rc(null,r)):(Mo(t),Qc(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return tl(e,t,a,o,r,c,s,n)}return i?(Fo(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Ii(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=zi(i,a,n,null),i.flags|=2):i=Ii(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Rc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=Yc(n):(a=i.cachePool,a===null?a=qa():(s=Ma._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=Xc(e,o,n),t.memoizedState=Jc,Rc(e.child,r)):(Mo(t),n=e.child,e=n.sibling,n=Ii(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Qc(e,t){return t=$c({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function $c(e,t){return e=Pi(22,e,null,t),e.lanes=0,e}function el(e,t,n){return uo(t,e.child,null,n),e=Qc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function tl(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(Mo(t),t.flags&=-257,el(e,t,c)):t.memoizedState===null?(Fo(),o=a.fallback,s=t.mode,a=$c({mode:`visible`,children:a.children},s),o=zi(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,uo(t,e.child,null,c),a=t.child,a.memoizedState=Yc(c),a.childLanes=Xc(e,r,c),t.memoizedState=Jc,Rc(null,a)):(Fo(),t.child=e.child,t.flags|=128,null);if(Mo(t),sm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,ha({value:a,source:null,stack:null})),el(e,t,c)}if(Mc||Ca(e,t,c,!1),r=(c&e.childLanes)!==0,Mc||r){if(To.current!==null)return el(e,t,c);if(r=$u,r!==null&&(a=xt(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,ki(e,a),Pd(r,e,a),jc;return om(o)||Kd(),el(e,t,c)}return om(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,R=lm(o.nextSibling),aa=t,z=!0,oa=null,sa=!1,e!==null&&ia(t,e),t=Qc(t,a.children),t.flags|=134221824,t)}function nl(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),xa(e.return,t,n)}function rl(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Bo(n)===null&&(t=e),e=e.sibling}return t}function il(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function al(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function ol(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Lo.current;if(t.flags&128)return Ro(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Ro(t,o),i===`backwards`&&e!==null?(al(e),Nc(e,t,r,n),al(e)):Nc(e,t,r,n),r=z?Ji:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&nl(e,n,t);else if(e.tag===19)nl(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=rl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,al(t)),il(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Bo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}il(t,!0,n,null,a,r);break;case`together`:il(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=rl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),il(t,!1,i,n,a,r)}return t.child}function sl(e,t,n){var r=t.pendingProps;return ya(t,t.type,r.value),Nc(e,t,r.children,n),t.child}function cl(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),od|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(Ca(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Ii(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ii(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ll(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&wa(e)))}function ul(e,t,n){switch(t.tag){case 3:Ae(t,t.stateNode.containerInfo),ya(t,Ma,e.memoizedState.cache),pa();break;case 27:case 5:Me(t);break;case 4:Ae(t,t.stateNode.containerInfo);break;case 10:ya(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,No(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return Mo(t),t.flags|=128,null;r=Ca(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?Zc(e,t,n):(Mo(t),e=cl(e,t,n),e===null?null:e.sibling)}Mo(t);break;case 19:if(t.flags&128)return ol(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(Ca(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return ol(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Ro(t,Lo.current),r)break;return null;case 22:return t.lanes=0,Lc(e,t,n,t.pendingProps);case 24:ya(t,Ma,e.memoizedState.cache)}return cl(e,t,n)}function dl(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)Mc=!0;else{if(!ll(e,n)&&!(t.flags&128))return Mc=!1,ul(e,t,n);Mc=!!(e.flags&131072)}}else Mc=!1,z&&t.flags&1048576&&ta(t,Ji,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=eo(t.elementType),t.type=e,typeof e==`function`)Fi(e)?(r=xc(e,r),t.tag=1,t=Kc(null,t,e,r,n)):(t.tag=0,t=Wc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===se){t.tag=11,t=Pc(null,t,e,r,n);break a}if(a===le){t.tag=14,t=Fc(null,t,e,r,n);break a}if(a===O){t.tag=10,t.type=e,t=sl(null,t,n);break a}}throw t=ye(e)||e,Error(i(306,t,``))}}return t;case 0:return Wc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=xc(r,t.pendingProps),Kc(e,t,r,a,n);case 3:a:{if(Ae(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,ho(e,t),So(t,r,null,n);var s=t.memoizedState;if(r=s.cache,ya(t,Ma,r),r!==o.cache&&Sa(t,[Ma],n,!0),xo(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=qc(e,t,r,n);break a}if(r!==a){a=Wi(Error(i(424)),t),ha(a),t=qc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(R=lm(e.firstChild),aa=t,z=!0,oa=null,sa=!0,n=fo(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(pa(),r===a){t=cl(e,t,n);break a}Nc(e,t,r,n)}t=t.child}return t;case 26:return Uc(e,t),e===null?(n=Nm(t.type,null,t.pendingProps,null))?t.memoizedState=n:z||(t.stateNode=fp(t.type,t.pendingProps,Oe.current,t)):t.memoizedState=Nm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Me(t),e===null&&z&&(r=t.stateNode=hm(t.type,t.pendingProps,Oe.current),aa=t,sa=!0,a=R,Sp(t.type)?(um=a,R=lm(r.firstChild)):R=a),Nc(e,t,t.pendingProps.children,n),Uc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&z&&((a=r=R)&&(r=rm(r,t.type,t.pendingProps,sa),r===null?a=!1:(t.stateNode=r,aa=t,R=lm(r.firstChild),sa=!1,a=!0)),a||la(t)),Me(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,pp(a,o)?r=null:s!==null&&pp(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Zo(e,t,es,null,null,n),sh._currentValue=a),Uc(e,t),Nc(e,t,r,n),t.child;case 6:return e===null&&z&&((e=n=R)&&(n=im(n,t.pendingProps,sa),n===null?e=!1:(t.stateNode=n,aa=t,R=null,e=!0)),e||la(t)),null;case 13:return Zc(e,t,n);case 4:return Ae(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=uo(t,null,r,n):Nc(e,t,r,n),t.child;case 11:return Pc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,Uc(e,t),Nc(e,t,r,n),t.child;case 8:return Nc(e,t,t.pendingProps.children,n),t.child;case 12:return Nc(e,t,t.pendingProps.children,n),t.child;case 10:return sl(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,Ta(t),a=Ea(a),r=r(a),t.flags|=1,Nc(e,t,r,n),t.child;case 14:return Fc(e,t,t.type,t.pendingProps,n);case 15:return Ic(e,t,t.type,t.pendingProps,n);case 19:return ol(e,t,n);case 31:return Hc(e,t,n);case 22:return Lc(e,t,n,t.pendingProps);case 24:return Ta(t),r=Ea(Ma),e===null?(a=Ka(),a===null&&(a=$u,o=Na(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},mo(t),ya(t,Ma,a)):((e.lanes&n)!==0&&(ho(e,t),So(t,null,null,n),xo()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,ya(t,Ma,r),r!==a.cache&&Sa(t,[Ma],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),ya(t,Ma,r))),Nc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:z&&na(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:Uc(e,t),Nc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function fl(e){e.flags|=4}function pl(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Jm(t,r):Jm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Ud())e.flags|=8192;else throw to=Za,Ya}}else e.flags&=-16777217}function ml(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Ym(t)){if(Ud())e.flags|=8192;else throw to=Za,Ya}}function hl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:ht(),e.lanes|=t,ud|=t)}function gl(e,t){if(!z)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function G(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function _l(e,t,n){var r=t.pendingProps;switch(ra(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return G(t),null;case 1:return G(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),ba(Ma),je(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(fa(t)?fl(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,ma())),G(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(fl(t),o===null?(G(t),pl(t,a,null,r,n)):(G(t),ml(t,o))):o?o===e.memoizedState?(G(t),t.flags&=-16777217):(fl(t),G(t),ml(t,o)):(e=e.memoizedProps,e!==r&&fl(t),G(t),pl(t,a,e,r,n)),null;case 27:if(Ne(t),n=Oe.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&fl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return G(t),t.subtreeFlags&=-33554433,null}e=Ee.current,fa(t)?ua(t,e):(e=hm(a,r,n),t.stateNode=e,fl(t))}return G(t),t.subtreeFlags&=-33554433,null;case 5:if(Ne(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&fl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return G(t),t.subtreeFlags&=-33554433,null}if(o=Ee.current,fa(t))ua(t,o);else{var s=lp(Oe.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[Dt]=t,o[Ot]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(np(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&fl(t)}}return G(t),t.subtreeFlags&=-33554433,pl(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&fl(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=Oe.current,fa(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=aa,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[Dt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||ep(e.nodeValue,n)),e||la(t,!0)}else e=lp(e).createTextNode(r),e[Dt]=t,t.stateNode=e}return G(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=fa(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[Dt]=t}else pa(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;G(t),e=!1}else n=ma(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Io(t),t):(Io(t),null);if(t.flags&128)throw Error(i(558))}return G(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=fa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[Dt]=t}else pa(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;G(t),a=!1}else a=ma(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Io(t),t):(Io(t),null)}return Io(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),hl(t,t.updateQueue),G(t),null);case 4:return je(),e===null&&Wf(t.stateNode.containerInfo),t.flags|=67108864,G(t),null;case 10:return ba(t.type),G(t),null;case 19:if(zo(t),r=t.memoizedState,r===null)return G(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)gl(r,!1);else{if(ad!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Bo(e),o!==null){for(t.flags|=128,gl(r,!1),e=o.updateQueue,t.updateQueue=e,hl(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Li(n,e),n=n.sibling;return Ro(t,Lo.current&1|2),z&&ea(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ke()>gd&&(t.flags|=128,a=!0,gl(r,!1),t.lanes=4194304)}}else{if(!a){if(e=Bo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,hl(t,e),gl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!z)return G(t),null}else 2*Ke()-r.renderingStartTime>gd&&n!==536870912&&(t.flags|=128,a=!0,gl(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ke(),e.sibling=null,o=Lo.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||z?Ro(t,o):(n=o,M(Ao,t),M(Lo,n),jo===null&&(jo=t)),z&&ea(t,r.treeForkCount),e}return G(t),null;case 22:case 23:return Io(t),ko(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(G(t),t.subtreeFlags&6&&(t.flags|=8192)):G(t),n=t.updateQueue,n!==null&&hl(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&Te(B),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ba(Ma),G(t),null;case 25:return null;case 30:return t.flags|=33554432,G(t),null}throw Error(i(156,t.tag))}function vl(e,t){switch(ra(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ba(Ma),je(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Ne(t),null;case 31:if(t.memoizedState!==null){if(Io(t),t.alternate===null)throw Error(i(340));pa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Io(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));pa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return zo(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return je(),null;case 10:return ba(t.type),null;case 22:case 23:return Io(t),ko(),e!==null&&Te(B),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ba(Ma),null;case 25:return null;default:return null}}function yl(e,t){switch(ra(t),t.tag){case 3:ba(Ma),je();break;case 26:case 27:case 5:Ne(t);break;case 4:je();break;case 31:t.memoizedState!==null&&Io(t);break;case 13:Io(t);break;case 19:zo(t);break;case 10:ba(t.type);break;case 22:case 23:Io(t),ko(),e!==null&&Te(B);break;case 24:ba(Ma)}}function bl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function xl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Sl(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{wo(t,n)}catch(t){Z(e,e.return,t)}}}function Cl(e,t,n){n.props=xc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function wl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=yi(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Pp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new Fp(e);h(e.child,!1,Qp,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Tl(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}}function El(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)em(e.stateNode,t[n])}function Dl(e){for(var t=e.return;t!==null&&(Al(t)&&em(e.stateNode,t.stateNode),!kl(t));)t=t.return}function Ol(e){for(var t=e.return;t!==null&&(Al(t)&&tm(e.stateNode,t.stateNode),!kl(t));)t=t.return}function kl(e){return e.tag===5||e.tag===3||e.tag===27}function Al(e){return e&&e.tag===7&&e.stateNode!==null}function jl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Ml(e,t,n){try{var r=e.stateNode;ip(r,e.type,n,t),r[Ot]=t}catch(t){Z(e,e.return,t)}}function Nl(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Sp(e.type)||e.tag===4}function Pl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Nl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Sp(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Fl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Cn)),El(e,r),P=!0;else if(i!==4&&(i===27&&(El(e,r),r=null,Sp(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Fl(e,t,n,r),e=e.sibling;e!==null;)Fl(e,t,n,r),e=e.sibling}function Il(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),El(e,r),P=!0;else if(i!==4&&(i===27&&(El(e,r),r=null,Sp(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Il(e,t,n,r),e=e.sibling;e!==null;)Il(e,t,n,r),e=e.sibling}function Ll(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);np(t,r,n),t[Dt]=e,t[Ot]=n}catch(t){Z(e,e.return,t)}}var Rl=!1,zl=null;function Bl(e){(e.tag===30||e.subtreeFlags&33554432)&&(Rl=!0)}var Vl=null;function Hl(){var e=Vl;return Vl=null,e}var Ul=0;function Wl(e,t,n,r,i){return Ul=0,Gl(e.child,t,n,r,i)}function Gl(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Op(o);r.push(s),s.view&&(a=!0)}else a||Op(o).view&&(a=!0);Rl=!0,Tp(o,Ul===0?t:t+`_`+Ul,n),Ul++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&i||Gl(e.child,t,n,r,i)&&(a=!0));e=e.sibling}return a}function Kl(e,t){for(;e!==null;)e.tag===5?Ep(e.stateNode,e.memoizedProps):(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&t||Kl(e.child,t)),e=e.sibling}function ql(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(ql(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=xi(t.default,t.share),t!==`none`&&(Wl(e,n,t,null,!1)||Kl(e.child,!1))}e=e.sibling}}function Jl(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=yi(r,n),a=xi(r.default,n.paired?r.share:r.enter);a===`none`?ql(e):Wl(e,i,a,null,!1)?(ql(e),n.paired||t||Nd(e,r.onEnter)):Kl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Jl(e,t),e=e.sibling;else ql(e)}function Yl(e){if(zl!==null&&zl.size!==0){var t=zl;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=xi(n.default,n.share);if(a!==`none`&&(Wl(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Nd(e,n.onShare)):Kl(e.child,!1)),t.delete(r),t.size===0)break}}}Yl(e)}e=e.sibling}}}function Xl(e){if(e.tag===30){var t=e.memoizedProps,n=yi(t,e.stateNode),r=zl===null?void 0:zl.get(n),i=xi(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Wl(e,n,i,null,!1)?r===void 0?Nd(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,zl.delete(n),Nd(e,t.onShare)):Kl(e.child,!1)),zl!==null&&Yl(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Xl(e),e=e.sibling;else zl!==null&&Yl(e)}function Zl(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=yi(t,e.stateNode);t=xi(t.default,t.update),e.flags&=-5,t!==`none`&&Wl(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&Zl(e);e=e.sibling}}function Ql(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Kl(e.child,!1))}Ql(e)}e=e.sibling}}function $l(e){if(e.tag===30)e.stateNode.paired=null,Kl(e.child,!1),Ql(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)$l(e),e=e.sibling;else Ql(e)}function eu(e){for(e=e.child;e!==null;)e.tag===30?Kl(e.child,!1):e.subtreeFlags&33554432&&eu(e),e=e.sibling}function tu(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&Ul<a.length){var l=a[Ul],u=Op(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&Tp(c,Ul===0?n:n+`_`+Ul,i),s&&e.flags&4||(Vl===null&&(Vl=[]),Vl.push(c,Ul===0?r:r+`_`+Ul,t.memoizedProps)),Ul++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:tu(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function nu(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=yi(n,r),a=xi(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(kp)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;Ul=0,i=tu(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Nd(e,n.onUpdate))}else e.subtreeFlags&33554432&&nu(e,t);e=e.sibling}}var ru=!1,K=!1,iu=!1,au=!1,ou=typeof WeakSet==`function`?WeakSet:Set,su=null,cu=!1,lu=!1,uu=!1,du=!1;function fu(e,t,n){if(e=e.containerInfo,sp=gh,e=Yr(e),Xr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(cp={focusedElem:e,selectionRange:r},gh=!1,n=(n&335544064)===n,su=t,t=n?9270:1024;su!==null;){if(e=su,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&Xl(r[a]);if(e.alternate===null&&e.flags&2)n&&Bl(e),pu(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&Xl(r),pu(n);continue}if(r!==null&&r.memoizedState!==null){n&&Bl(e),pu(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,su=r):(n&&Zl(e),pu(n))}}zl=null}function pu(e){for(;su!==null;){var t=su,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=xc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){Z(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)nm(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:nm(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=yi(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=xi(a.default,a.update),a!==`none`&&Wl(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,su=r;break}su=t.return}}function mu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Pu(e,n),r&4&&bl(5,n);break;case 1:if(Pu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=xc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}}r&64&&Sl(n),r&512&&wl(n,n.return);break;case 3:if(Pu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{wo(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Ll(n);case 26:case 5:Pu(e,n),t===null&&r&4&&jl(n),r&512&&wl(n,n.return);break;case 12:Pu(e,n);break;case 31:Pu(e,n),r&4&&Cu(e,n);break;case 13:Pu(e,n),r&4&&wu(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=_f.bind(null,n),cm(e,n))));break;case 22:if(r=n.memoizedState!==null||ru,!r){var a=t!==null&&t.memoizedState!==null||K;t=ru,i=K,ru=r,(K=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),Iu(e,n,r)):Pu(e,n),ru=t,K=i}break;case 30:Pu(e,n),r&512&&wl(n,n.return);break;case 7:r&512&&wl(n,n.return);default:Pu(e,n)}}function hu(e,t){for(e=e.child;e!==null;)gu(e,t),e=e.sibling}function gu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){Z(e,e.return,t)}_u(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,P=!0}catch(t){Z(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?wp(s,!0):wp(e.stateNode,!1)}catch(t){Z(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&hu(e,t);break;default:hu(e,t)}}function _u(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:gu(n,r);break a;case 22:n.memoizedState===null&&_u(n,r);break a;default:_u(n,r)}}e=e.sibling}}function vu(e){var t=e.alternate;t!==null&&(e.alternate=null,vu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&It(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var yu=null,bu=!1;function xu(e,t,n){for(n=n.child;n!==null;)Su(e,t,n),n=n.sibling}function Su(e,t,n){if(nt&&typeof nt.onCommitFiberUnmount==`function`)try{nt.onCommitFiberUnmount(tt,n)}catch{}switch(n.tag){case 26:K||Tl(n,t),xu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!K&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:K||Tl(n,t),Ol(n);var r=yu,i=bu;Sp(n.type)&&(yu=n.stateNode,bu=!1),xu(e,t,n),gm(n.stateNode,n.type,n.memoizedProps),yu=r,bu=i;break;case 5:K||Tl(n,t),Ol(n);case 6:if(n.tag===6&&Ol(n),r=yu,i=bu,yu=null,xu(e,t,n),yu=r,bu=i,yu!==null){if(bu)try{(yu.nodeType===9?yu.body:yu.nodeName===`HTML`?yu.ownerDocument.body:yu).removeChild(n.stateNode),P=!0}catch(e){Z(n,t,e)}else try{yu.removeChild(n.stateNode),P=!0}catch(e){Z(n,t,e)}}break;case 18:yu!==null&&(bu?(e=yu,Cp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Hh(e)):Cp(yu,n.stateNode));break;case 4:r=yu,i=bu,yu=n.stateNode.containerInfo,bu=!0,xu(e,t,n),yu=r,bu=i;break;case 0:case 11:case 14:case 15:xl(2,n,t),K||xl(4,n,t),xu(e,t,n);break;case 1:K||(Tl(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Cl(n,t,r)),xu(e,t,n);break;case 21:xu(e,t,n);break;case 22:K=(r=K)||n.memoizedState!==null,xu(e,t,n),K=r;break;case 30:Tl(n,t),xu(e,t,n);break;case 7:K||Tl(n,t),xu(e,t,n);break;default:xu(e,t,n)}}function Cu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Hh(e)}catch(e){Z(t,t.return,e)}}}function wu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Hh(e)}catch(e){Z(t,t.return,e)}}function Tu(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ou),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ou),t;default:throw Error(i(435,e.tag))}}function Eu(e,t){var n=Tu(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=vf.bind(null,e,t);t.then(r,r)}})}function Du(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Sp(l.type)){yu=l.stateNode,bu=!1;break a}break;case 5:yu=l.stateNode,bu=!1;break a;case 3:case 4:yu=l.stateNode.containerInfo,bu=!0;break a}l=l.return}if(yu===null)throw Error(i(160));Su(s,c,o),yu=null,bu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)ku(t,e,n),t=t.sibling}var Ou=null;function ku(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}Du(t,e,n),Au(e),a&4&&(xl(3,e,e.return),bl(3,e),xl(5,e,e.return));break;case 1:Du(t,e,n),Au(e),a&512&&(K||r===null||Tl(r,r.return)),a&64&&ru&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=Ou,Du(t,e,n),Au(e),a&512&&(K||r===null||Tl(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(ru)e.stateNode=fp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[Pt]||r[Dt]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),np(r,t,n),r[Dt]=e,Vt(r),t=r;break a;case`link`:if(o=Gm(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Gm(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[Dt]=e,Vt(r),t=r}e.stateNode=t}}else ru||Km(o,e.type,e.stateNode)}else e.stateNode=Bm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&Ml(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||K||t.parentNode.removeChild(t)):a.count--,n===null?ru||Km(o,e.type,e.stateNode):Bm(o,n,e.memoizedProps))}break;case 27:Du(t,e,n),Au(e),a&512&&(K||r===null||Tl(r,r.return)),r!==null&&a&4&&Ml(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=iu,iu=!1,Du(t,e,n),iu=o,Au(e),a&512&&(K||r===null||Tl(r,r.return)),e.flags&32){t=e.stateNode;try{hn(t,``),P=!0}catch(t){Z(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Ml(e,t,r===null?t:r.memoizedProps)),a&1024&&(au=!0);break;case 6:if(Du(t,e,n),Au(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,P=!0}catch(t){Z(e,e.return,t)}}break;case 3:if(P=!1,Wm=null,o=Ou,Ou=bm(t.containerInfo),Du(t,e,n),Ou=o,Au(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Hh(t.containerInfo)}catch(t){Z(e,e.return,t)}au&&(au=!1,ju(e)),P=!1;break;case 4:a=iu,iu=ru,r=Zt(),o=Ou,Ou=bm(e.stateNode.containerInfo),Du(t,e,n),Au(e),Ou=o,P&&lu&&(uu=!0),P=r,iu=a;break;case 12:Du(t,e,n),Au(e);break;case 31:Du(t,e,n),Au(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Eu(e,t)));break;case 13:Du(t,e,n),Au(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(md=Ke()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Eu(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=ru,l=K,u=iu;ru=c||o,iu=u||o,K=l||s,Du(t,e,n),K=l,iu=u,ru=c,Au(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||ru||K||(t=s||K,n=ru,r=K,ru=o||ru,K=t,Fu(e,2),ru=n,K=r),!o&&iu||hu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Eu(e,n))));break;case 19:Du(t,e,n),Au(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Eu(e,t)));break;case 30:a&512&&(K||r===null||Tl(r,r.return)),a=Zt(),o=lu,s=(n&335544064)===n,c=e.memoizedProps,lu=s&&xi(c.default,c.update)!==`none`,Du(t,e,n),Au(e),s&&r!==null&&P&&(e.flags|=4),lu=o,P=a;break;case 21:break;case 7:a&512&&(K||r===null||Tl(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Du(t,e,n),Au(e)}}function Au(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Nl(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(Al(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(kl(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Il(e,Pl(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(hn(l,``),n.flags&=-33),Il(e,Pl(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;Fl(e,Pl(e),u,s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ju(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;ju(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,gh=!0,t.reset(),gh=!1),e=e.sibling}}function Mu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Nu(t,e),t=t.sibling;else nu(t,!1)}function Nu(e,t){var n=e.alternate;if(n===null)Jl(e,!1);else switch(e.tag){case 3:if(du=cu=!1,Hl(),Mu(t,e),!cu&&!uu){if(e=Vl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ep(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),du=!0}Vl=null;break;case 5:Mu(t,e);break;case 4:r=cu,cu=!1,Mu(t,e),cu&&(uu=!0),cu=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Mu(t,e):Jl(e,!1));break;case 30:r=cu,i=Hl(),cu=!1,Mu(t,e),cu&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=yi(a,o),o=yi(n.memoizedProps,o);var s=xi(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Ul=0,t=tu(e,n,t,o,s,a,!0),Ul!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Nd(e,e.memoizedProps.onUpdate),Vl=i):i!==null&&(i.push.apply(i,Vl),Vl=i),cu=e.flags&32?!0:r;break;default:Mu(t,e)}}function Pu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)mu(e,t.alternate,t),t=t.sibling}function Fu(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:xl(4,n,n.return),Fu(n,r);break;case 1:Tl(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&Cl(n,n.return,i),Fu(n,r);break;case 27:r&2&&gm(n.stateNode,n.type,n.memoizedProps);case 5:Tl(n,n.return),n.tag!==5&&n.tag!==27||Ol(n),Fu(n,r);break;case 6:Ol(n);break;case 26:Tl(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||K||i.parentNode.removeChild(i),Fu(n,r);break;case 22:n.memoizedState===null&&Fu(n,r);break;case 30:Tl(n,n.return),Fu(n,r);break;case 7:Tl(n,n.return);default:Fu(n,r)}e=e.sibling}}function Iu(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:Iu(i,a,n),bl(4,a);break;case 1:if(Iu(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)Co(l[i],c)}catch(e){Z(r,r.return,e)}}s&&o&64&&Sl(a),wl(a,a.return);break;case 27:n&2&&Ll(a);case 5:a.tag!==5&&a.tag!==27||Dl(a),Iu(i,a,n),s&&r===null&&o&4&&jl(a),wl(a,a.return);break;case 6:Dl(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||ru||Km(bm(c.ownerDocument),a.type,c),Iu(i,a,n),s&&r===null&&o&4&&jl(a),wl(a,a.return);break;case 12:Iu(i,a,n);break;case 31:Iu(i,a,n),s&&o&4&&Cu(i,a);break;case 13:Iu(i,a,n),s&&o&4&&wu(i,a);break;case 22:a.memoizedState===null&&Iu(i,a,n),wl(a,a.return);break;case 30:Iu(i,a,n),wl(a,a.return);break;case 7:wl(a,a.return);default:Iu(i,a,n)}t=t.sibling}}function Lu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Pa(n))}function Ru(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Pa(e))}function zu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Bu(e,t,n,r),t=t.sibling;else i&&eu(t)}function Bu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&$l(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:zu(e,t,n,r),a&2048&&bl(9,t);break;case 1:zu(e,t,n,r);break;case 3:zu(e,t,n,r),i&&du&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&Pa(a)));break;case 12:if(a&2048){zu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else zu(e,t,n,r);break;case 31:zu(e,t,n,r);break;case 13:zu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&$l(t),o._visibility&2?zu(e,t,n,r):(o._visibility|=2,Vu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&$l(s),o._visibility&2?zu(e,t,n,r):Hu(e,t)),a&2048&&Lu(s,t);break;case 24:zu(e,t,n,r),a&2048&&Ru(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Kl(a.child,!0),Kl(t.child,!0))),zu(e,t,n,r);break;default:zu(e,t,n,r)}}function Vu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Vu(a,o,s,c,i),bl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Vu(a,o,s,c,i)):u._visibility&2?Vu(a,o,s,c,i):Hu(a,o),i&&l&2048&&Lu(o.alternate,o);break;case 24:Vu(a,o,s,c,i),i&&l&2048&&Ru(o.alternate,o);break;default:Vu(a,o,s,c,i)}t=t.sibling}}function Hu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Hu(n,r),i&2048&&Lu(r.alternate,r);break;case 24:Hu(n,r),i&2048&&Ru(r.alternate,r);break;default:Hu(n,r)}t=t.sibling}}var Uu=8192;function Wu(e,t,n){if(e.subtreeFlags&Uu)for(e=e.child;e!==null;)Gu(e,t,n),e=e.sibling}function Gu(e,t,n){switch(e.tag){case 26:Wu(e,t,n),e.flags&Uu&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&Zm(n,e)):Qm(n,Ou,e.memoizedState,e.memoizedProps));break;case 5:Wu(e,t,n),e.flags&Uu&&(e=e.stateNode,(t&335544128)===t&&Zm(n,e));break;case 3:case 4:var r=Ou;Ou=bm(e.stateNode.containerInfo),Wu(e,t,n),Ou=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Uu,Uu=16777216,Wu(e,t,n),Uu=r):Wu(e,t,n));break;case 30:if((e.flags&Uu)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,zl===null&&(zl=new Map),zl.set(r,i)}Wu(e,t,n);break;default:Wu(e,t,n)}}function Ku(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function qu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];su=r,Xu(r,e)}Ku(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ju(e),e=e.sibling}function Ju(e){switch(e.tag){case 0:case 11:case 15:qu(e),e.flags&2048&&xl(9,e,e.return);break;case 3:qu(e);break;case 12:qu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Yu(e)):qu(e);break;default:qu(e)}}function Yu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];su=r,Xu(r,e)}Ku(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:xl(8,t,t.return),Yu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Yu(t));break;default:Yu(t)}e=e.sibling}}function Xu(e,t){for(;su!==null;){var n=su;switch(n.tag){case 0:case 11:case 15:xl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Pa(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,su=r;else a:for(n=e;su!==null;){r=su;var i=r.sibling,a=r.return;if(vu(r),r===n){su=null;break a}if(i!==null){i.return=a,su=i;break a}su=a}}}var Zu={getCacheForType:function(e){var t=Ea(Ma),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Ea(Ma).controller.signal}},Qu=typeof WeakMap==`function`?WeakMap:Map,q=0,$u=null,J=null,Y=0,X=0,ed=null,td=!1,nd=!1,rd=!1,id=0,ad=0,od=0,sd=0,cd=0,ld=0,ud=0,dd=null,fd=null,pd=!1,md=0,hd=0,gd=1/0,_d=null,vd=null,yd=0,bd=null,xd=null,Sd=0,Cd=0,wd=null,Td=null,Ed=null,Dd=null,Od=null,kd=0,Ad=null;function jd(){return q&2&&Y!==0?Y&-Y:A.T===null?wt():Pf()}function Md(){if(ld===0){if(!(Y&536870912)||z){var e=ct;ct<<=1,!(ct&3932160)&&(ct=262144),ld=e}else ld=536870912}return e=Ao.current,e!==null&&(e.flags|=32),ld}function Nd(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Pp(yi(e.memoizedProps,n))),Dd===null&&(Dd=[]),Dd.push(t.bind(null,r))}}function Pd(e,t,n){(e===$u&&(X===2||X===9)||e.cancelPendingCommit!==null)&&(Vd(e,0),Rd(e,Y,ld,!1)),_t(e,n),(!(q&2)||e!==$u)&&(e===$u&&(!(q&2)&&(sd|=n),ad===4&&Rd(e,Y,ld,!1)),Ef(e))}function Fd(e,t,n){if(q&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||ft(e,t),a=r?Yd(e,t):qd(e,t,!0),o=r;do{if(a===0){nd&&!r&&Rd(e,t,0,!1);break}if(n=e.current.alternate,o&&!Ld(n))a=qd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=dd;var l=c.current.memoizedState.isDehydrated;if(l&&(Vd(c,s).flags|=256),s=qd(c,s,!1),s!==2&&s!==6){if(rd&&!l){c.errorRecoveryDisabledLanes|=o,sd|=o,a=4;break a}o=fd,fd=a,o!==null&&(fd===null?fd=o:fd.push.apply(fd,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Vd(e,0),Rd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Rd(r,t,ld,!td);break a;case 2:fd=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=md+300-Ke(),10<a)){if(Rd(r,t,ld,!td),dt(r,0,!0)!==0)break a;Sd=t,r.timeoutHandle=gp(Id.bind(null,r,n,fd,_d,pd,t,ld,sd,ud,td,o,`Throttled`,-0,0),a);break a}Id(r,n,fd,_d,pd,t,ld,sd,ud,td,o,null,-0,0)}break}}while(1);Ef(e)}function Id(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Cn},zl=null,Gu(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=nh.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?md-Ke():(a&4194048)===a?hd-Ke():0,m=eh(d,m),m!==null)?(Sd=a,e.cancelPendingCommit=m(nf.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Rd(e,a,o,!l)):nf(e,t,a,n,r,i,o,s,c,l,u,d)}function Ld(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Ur(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Rd(e,t,n,r){t=pt(e,t),t&=~cd,t&=~sd,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-rt(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&yt(e,n,t)}function zd(){return q&6?!0:(Df(0,!1),!1)}function Bd(){if(J!==null){if(X===0)var e=J.return;else e=J,va=_a=null,rs(e),io=null,ao=0,e=J;for(;e!==null;)yl(e.alternate,e),e=e.return;J=null}}function Vd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,_p(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Sd=0,Bd(),$u=e,J=n=Ii(e.current,null),Y=t,X=0,ed=null,td=!1,nd=ft(e,t),rd=!1,ud=ld=cd=sd=od=ad=0,fd=dd=null,pd=!1,id=pt(e,t),Ei(),n}function Hd(e,t){H=null,A.H=pc,t===Ja||t===Xa?(t=no(),X=3):t===Ya?(t=no(),X=4):X=t===jc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,ed=t,J===null&&(ad=1,Tc(e,Wi(t,e.current)))}function Ud(){var e=Ao.current;return e===null?!0:(Y&4194048)===Y?jo===null:(Y&62914560)===Y||Y&536870912?e===jo:!1}function Wd(){var e=A.H;return A.H=pc,e===null?pc:e}function Gd(){var e=A.A;return A.A=Zu,e}function Kd(){ad=4,td||(Y&4194048)!==Y&&Ao.current!==null||(nd=!0),!(od&134217727)&&!(sd&134217727)||$u===null||Rd($u,Y,ld,!1)}function qd(e,t,n){var r=q;q|=2;var i=Wd(),a=Gd();($u!==e||Y!==t)&&(_d=null,Vd(e,t)),t=!1;var o=ad;a:do try{if(X!==0&&J!==null){var s=J,c=ed;switch(X){case 8:Bd(),o=6;break a;case 3:case 2:case 9:case 6:Ao.current===null&&(t=!0);var l=X;if(X=0,ed=null,$d(e,s,c,l),n&&nd){o=0;break a}break;default:l=X,X=0,ed=null,$d(e,s,c,l)}}Jd(),o=ad;break}catch(t){Hd(e,t)}while(1);return t&&e.shellSuspendCounter++,va=_a=null,q=r,A.H=i,A.A=a,J===null&&($u=null,Y=0,Ei()),o}function Jd(){for(;J!==null;)Zd(J)}function Yd(e,t){var n=q;q|=2;var r=Wd(),a=Gd();$u!==e||Y!==t?(_d=null,gd=Ke()+500,Vd(e,t)):nd=ft(e,t);a:do try{if(X!==0&&J!==null){t=J;var o=ed;b:switch(X){case 1:X=0,ed=null,$d(e,t,o,1);break;case 2:case 9:if(Qa(o)){X=0,ed=null,Qd(t);break}t=function(){X!==2&&X!==9||$u!==e||(X=7),Ef(e)},o.then(t,t);break a;case 3:X=7;break a;case 4:X=5;break a;case 7:Qa(o)?(X=0,ed=null,Qd(t)):(X=0,ed=null,$d(e,t,o,7));break;case 5:var s=null;switch(J.tag){case 26:s=J.memoizedState;case 5:case 27:var c=J;if(s?Ym(s):c.stateNode.complete){X=0,ed=null;var l=c.sibling;if(l!==null)J=l;else{var u=c.return;u===null?J=null:(J=u,ef(u))}break b}}X=0,ed=null,$d(e,t,o,5);break;case 6:X=0,ed=null,$d(e,t,o,6);break;case 8:Bd(),ad=6;break a;default:throw Error(i(462))}}Xd();break}catch(t){Hd(e,t)}while(1);return va=_a=null,A.H=r,A.A=a,q=n,J===null?($u=null,Y=0,Ei(),ad):0}function Xd(){for(;J!==null&&!We();)Zd(J)}function Zd(e){var t=dl(e.alternate,e,id);e.memoizedProps=e.pendingProps,t===null?ef(e):J=t}function Qd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Gc(n,t,t.pendingProps,t.type,void 0,Y);break;case 11:t=Gc(n,t,t.pendingProps,t.type.render,t.ref,Y);break;case 5:rs(t);var r=t;r===aa&&(z?(da(r),r.tag===5&&r.stateNode!=null&&(R=r.stateNode)):(da(r),z=!0));default:yl(n,t),t=J=Li(t,id),t=dl(n,t,id)}e.memoizedProps=e.pendingProps,t===null?ef(e):J=t}function $d(e,t,n,r){va=_a=null,rs(t),io=null,ao=0;var i=t.return;try{if(Ac(e,i,t,n,Y)){ad=1,Tc(e,Wi(n,e.current)),J=null;return}}catch(t){if(i!==null)throw J=i,t;ad=1,Tc(e,Wi(n,e.current)),J=null;return}t.flags&32768?(z||r===1?e=!0:nd||Y&536870912?e=!1:(td=e=!0,(r===2||r===9||r===3||r===6)&&(r=Ao.current,r!==null&&r.tag===13&&(r.flags|=16384))),tf(t,e)):ef(t)}function ef(e){var t=e;do{if(t.flags&32768){tf(t,td);return}e=t.return;var n=_l(t.alternate,t,id);if(n!==null){J=n;return}if(t=t.sibling,t!==null){J=t;return}J=t=e}while(t!==null);ad===0&&(ad=5)}function tf(e,t){do{var n=vl(e.alternate,e);if(n!==null){n.flags&=32767,J=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){J=e;return}J=e=n}while(e!==null);ad=6,J=null}function nf(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do df();while(yd!==0);if(q&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===$u&&(J=$u=null,Y=0),xd=t,bd=e,Sd=n,wd=a,Td=r,rf(e,t,n,s,c,l,f)}}function rf(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Cd=s,s|=Ti,vt(e,n,s,r,i,a),Dd=null,(n&335544064)===n?(Od=La(e),r=10262):(Od=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,yf(Xe,function(){return ff(),null})):(e.callbackNode=null,e.callbackPriority=0),Rl=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=A.T,A.T=null,i=j.p,j.p=2,a=q,q|=4;try{fu(e,t,n)}finally{q=a,j.p=i,A.T=r}}yd=1,Rl?Ed=Mp(o,e.containerInfo,Od,sf,cf,of,lf,ff,af,null,null):(sf(),cf(),lf())}function af(e){if(yd!==0){var t=bd.onRecoverableError;t(e,{componentStack:null})}}function of(){yd===3&&(yd=0,Nu(xd,bd),yd=4)}function sf(){if(yd===1){yd=0;var e=bd,t=xd,n=Sd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=A.T,A.T=null;var i=j.p;j.p=2;var a=q;q|=4;try{lu=uu=!1,ku(t,e,n),n=cp;var o=Yr(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&Jr(s.ownerDocument.documentElement,s)){if(c!==null&&Xr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=qr(s,h),v=qr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}gh=!!sp,cp=sp=null}finally{q=a,j.p=i,A.T=r}}e.current=t,yd=2}}function cf(){if(yd===2){yd=0;var e=bd,t=xd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=A.T,A.T=null;var r=j.p;j.p=2;var i=q;q|=4;try{mu(e,t.alternate,t)}finally{q=i,j.p=r,A.T=n}}yd=3}}function lf(){if(yd===4||yd===3){yd=0;var e=Ed;Ed=null,Ge();var t=bd,n=xd,r=Sd,i=Td,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?yd=5:(yd=0,xd=bd=null,uf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(vd=null),Ct(r),n=n.stateNode,nt&&typeof nt.onCommitFiberRoot==`function`)try{nt.onCommitFiberRoot(tt,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=A.T,a=j.p,j.p=2,A.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{A.T=n,j.p=a}}if(i=Dd,o=Od,Od=null,i!==null&&(Dd=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);Sd&3&&df(),Ef(t),a=t.pendingLanes,r&261930&&a&42?t===Ad?kd++:(kd=0,Ad=t):(kd=0,Ad=null),Df(0,!1)}}function uf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Pa(t)))}function df(){return Ed!==null&&(Ed.skipTransition(),Ed=null),sf(),cf(),lf(),ff()}function ff(){if(yd!==5)return!1;var e=bd,t=Cd;Cd=0;var n=Ct(Sd),r=A.T,a=j.p;try{j.p=32>n?32:n,A.T=null,n=wd,wd=null;var o=bd,s=Sd;if(yd=0,xd=bd=null,Sd=0,q&6)throw Error(i(331));var c=q;if(q|=4,Ju(o.current),Bu(o,o.current,s,n),q=c,Df(0,!1),nt&&typeof nt.onPostCommitFiberRoot==`function`)try{nt.onPostCommitFiberRoot(tt,o)}catch{}return!0}finally{j.p=a,A.T=r,uf(e,t)}}function pf(e,t,n){t=Wi(n,t),t=Dc(e.stateNode,t,2),e=_o(e,t,2),e!==null&&(_t(e,2),Ef(e))}function Z(e,t,n){if(e.tag===3)pf(e,e,n);else for(;t!==null;){if(t.tag===3){pf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(vd===null||!vd.has(r))){e=Wi(n,e),n=Oc(2),r=_o(t,n,2),r!==null&&(kc(n,r,t,e),_t(r,2),Ef(r));break}}t=t.return}}function mf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Qu;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(rd=!0,i.add(n),e=hf.bind(null,e,t,n),t.then(e,e))}function hf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,$u===e&&(Y&n)===n&&(ad===4||ad===3&&(Y&62914560)===Y&&300>Ke()-md?q&2?cd|=n:Vd(e,0):cd|=n,ud===Y&&(ud=0)),Ef(e)}function gf(e,t){t===0&&(t=ht()),e=ki(e,t),e!==null&&(_t(e,t),Ef(e))}function _f(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),gf(e,n)}function vf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),gf(e,n)}function yf(e,t){return He(e,t)}var bf=null,xf=null,Sf=!1,Cf=!1,wf=!1,Tf=0;function Ef(e){e!==xf&&e.next===null&&(xf===null?bf=xf=e:xf=xf.next=e),Cf=!0,Sf||(Sf=!0,Nf())}function Df(e,t){if(!wf&&Cf){wf=!0;do for(var n=!1,r=bf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-rt(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Mf(r,a))}else a=Y,a=dt(r,r===$u?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||ft(r,a)||(n=!0,Mf(r,a))}r=r.next}while(n);wf=!1}}function Of(){kf()}function kf(){Cf=Sf=!1;var e=0;Tf!==0&&hp()&&(e=Tf);for(var t=Ke(),n=null,r=bf;r!==null;){var i=r.next,a=Af(r,t);a===0?(r.next=null,n===null?bf=i:n.next=i,i===null&&(xf=n)):(n=r,(e!==0||a&3)&&(Cf=!0)),r=i}yd!==0&&yd!==5||Df(e,!1),Tf!==0&&(Tf=0)}function Af(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-rt(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=mt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=$u,n=Y,n=dt(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(X===2||X===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Ue(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||ft(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Ue(r),Ct(n)){case 2:case 8:n=Ye;break;case 32:n=Xe;break;case 268435456:n=Qe;break;default:n=Xe}return r=jf.bind(null,e),n=He(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Ue(r),e.callbackPriority=2,e.callbackNode=null,2}function jf(e,t){if(yd!==0&&yd!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(df()&&e.callbackNode!==n)return null;var r=Y;return r=dt(e,e===$u?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Fd(e,r,t),Af(e,Ke()),e.callbackNode!=null&&e.callbackNode===n?jf.bind(null,e):null)}function Mf(e,t){if(df())return null;Fd(e,t,!0)}function Nf(){bp(function(){q&6?He(Je,Of):kf()})}function Pf(){if(Tf===0){var e=Ba;e===0&&(e=st,st<<=1,!(st&261888)&&(st=256)),Tf=e}return Tf}function Ff(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:Sn(e)}function If(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Ff((i[Ot]||null).action),o=r.submitter;o&&(t=(t=o[Ot]||null)?Ff(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Un(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Tf!==0){var e=new FormData(i,o);$s(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),$s(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Lf=0;Lf<gi.length;Lf++){var Rf=gi[Lf];_i(Rf.toLowerCase(),`on`+(Rf[0].toUpperCase()+Rf.slice(1)))}_i(ci,`onAnimationEnd`),_i(li,`onAnimationIteration`),_i(ui,`onAnimationStart`),_i(`dblclick`,`onDoubleClick`),_i(`focusin`,`onFocus`),_i(`focusout`,`onBlur`),_i(di,`onTransitionRun`),_i(fi,`onTransitionStart`),_i(pi,`onTransitionCancel`),_i(mi,`onTransitionEnd`),Kt(`onMouseEnter`,[`mouseout`,`mouseover`]),Kt(`onMouseLeave`,[`mouseout`,`mouseover`]),Kt(`onPointerEnter`,[`pointerout`,`pointerover`]),Kt(`onPointerLeave`,[`pointerout`,`pointerover`]),Gt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Gt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Gt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Gt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Gt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Gt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var zf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Bf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(zf));function Vf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Si(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Si(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[At];n===void 0&&(n=t[At]=new Set);var r=e+`__bubble`;n.has(r)||(Gf(t,e,2,!1),n.add(r))}function Hf(e,t,n){var r=0;t&&(r|=4),Gf(n,e,r,t)}var Uf=`_reactListening`+Math.random().toString(36).slice(2);function Wf(e){if(!e[Uf]){e[Uf]=!0,Ut.forEach(function(t){t!==`selectionchange`&&(Bf.has(t)||Hf(t,!1,e),Hf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Uf]||(t[Uf]=!0,Hf(`selectionchange`,!1,t))}}function Gf(e,t,n,r){switch(Ch(t)){case 2:var i=_h;break;case 8:i=vh;break;default:i=yh}n=i.bind(null,t,n,e),i=void 0,!Nn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Kf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=Lt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}An(function(){var r=a,i=Tn(n),s=[];a:{var c=hi.get(e);if(c!==void 0){var l=Un,u=e;switch(e){case`keypress`:if(zn(n)===0)break a;case`keydown`:case`keyup`:l=or;break;case`focusin`:u=`focus`,l=Zn;break;case`focusout`:u=`blur`,l=Zn;break;case`beforeblur`:case`afterblur`:l=Zn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Yn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Xn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=lr;break;case ci:case li:case ui:l=Qn;break;case mi:l=ur;break;case`scroll`:case`scrollend`:l=Gn;break;case`wheel`:l=dr;break;case`copy`:case`cut`:case`paste`:l=$n;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=sr;break;case`submit`:l=cr;break;case`toggle`:case`beforetoggle`:l=fr}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=jn(m,p),g!=null&&d.push(qf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==wn&&(u=n.relatedTarget||n.fromElement)&&(Lt(u)||u[kt]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?Lt(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=Yn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=sr,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:zt(c),h=l==null?u:zt(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,Lt(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?E(c,l,Yf):null,c!==null&&Xf(s,u,c,d,!1),l!==null&&f!==null&&Xf(s,f,l,d,!0)))}a:{if(c=r?zt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=Mr;else if(Er(c)){if(Nr)_=Hr;else{_=Br;var v=zr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&yn(r.elementType)&&(_=Mr):_=Vr;if(_&&=_(e,r)){Dr(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?zt(r):window,e){case`focusin`:(Er(v)||v.contentEditable===`true`)&&(Qr=v,$r=r,ei=null);break;case`focusout`:ei=$r=Qr=null;break;case`mousedown`:ti=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:ti=!1,ni(s,n,i);break;case`selectionchange`:if(Zr)break;case`keydown`:case`keyup`:ni(s,n,i)}var y;if(mr)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else Sr?br(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(_r&&n.locale!==`ko`&&(Sr||b!==`onCompositionStart`?b===`onCompositionEnd`&&Sr&&(y=Rn()):(Fn=i,In=`value`in Fn?Fn.value:Fn.textContent,Sr=!0)),v=Jf(r,b),0<v.length&&(b=new er(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=xr(n),y!==null&&(b.data=y)))),(y=gr?Cr(e,n):wr(e,n))&&(b=Jf(r,`onBeforeInput`),0<b.length&&(v=new er(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),If(s,e,r,n,i)}Vf(s,t)})}function qf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Jf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=jn(e,n),i!=null&&r.unshift(qf(e,i,a)),i=jn(e,t),i!=null&&r.push(qf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Yf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Xf(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=jn(n,a),l!=null&&o.unshift(qf(n,l,c))):i||(l=jn(n,a),l!=null&&o.push(qf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Zf=/\r\n?/g,Qf=/\u0000|\uFFFD/g;function $f(e){return(typeof e==`string`?e:``+e).replace(Zf,`
`).replace(Qf,``)}function ep(e,t){return t=$f(t),$f(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||hn(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&hn(e,``+r);else return;break;case`className`:$t(e,`class`,r);break;case`tabIndex`:$t(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:$t(e,n,r);break;case`style`:vn(e,r,o);return;case`data`:if(t!==`object`){$t(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Sn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Sn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=Cn);return;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=Sn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Qt(e,`popover`,r);break;case`xlinkActuate`:en(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:en(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:en(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:en(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:en(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:en(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:en(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:en(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:en(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Qt(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=bn.get(n)||n,Qt(e,n,r);else return}P=!0}function tp(e,t,n,r,a,o){switch(n){case`style`:vn(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)hn(e,r);else if(typeof r==`number`||typeof r==`bigint`)hn(e,``+r);else return;break;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=Cn);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!Wt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[Ot]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}P=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):Qt(e,n,r)}return}P=!0}function np(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}un(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&fn(e,!!r,n,!0):fn(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}mn(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<zf.length;r++)Q(zf[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(yn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&tp(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}var rp={};function ip(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(P=!0),o=m;break;case`name`:m!==f&&(P=!0),a=m;break;case`checked`:m!==f&&(P=!0),u=m;break;case`defaultChecked`:m!==f&&(P=!0),d=m;break;case`value`:m!==f&&(P=!0),s=m;break;case`defaultValue`:m!==f&&(P=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}ln(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(P=!0),p=o;break;case`defaultValue`:o!==l&&(P=!0),c=o;break;case`multiple`:o!==l&&(P=!0),s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?fn(e,!!n,n?[]:``,!1):fn(e,!!n,t,!0)):fn(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(P=!0),p=a;break;case`defaultValue`:a!==o&&(P=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}pn(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(P=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(yn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&tp(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||tp(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function ap(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function op(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&ap(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&ap(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var sp=null,cp=null;function lp(e){return e.nodeType===9?e:e.ownerDocument}function up(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function dp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function fp(e,t,n,r){return n=lp(n).createElement(e),n[Dt]=r,n[Ot]=t,np(n,e,t),Vt(n),n}function pp(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var mp=null;function hp(){var e=window.event;return e&&e.type===`popstate`?e!==mp&&(mp=e,!0):(mp=null,!1)}var gp=typeof setTimeout==`function`?setTimeout:void 0,_p=typeof clearTimeout==`function`?clearTimeout:void 0,vp=typeof Promise==`function`?Promise:void 0,yp=typeof requestAnimationFrame==`function`?requestAnimationFrame:gp,bp=typeof queueMicrotask==`function`?queueMicrotask:vp===void 0?gp:function(e){return vp.resolve(null).then(e).catch(xp)};function xp(e){setTimeout(function(){throw e})}function Sp(e){return e===`head`}function Cp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Hh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)_m(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,_m(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Pt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&_m(e.ownerDocument.body)}n=i}while(n);Hh(t)}function wp(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function Tp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ep(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function Dp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Op(e){return Dp(e.getBoundingClientRect(),getComputedStyle(e),e)}function kp(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return Dp(t,n,e)}function Ap(e){return e.documentElement.clientHeight}function jp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Mp(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Ap(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Xm(f),u>$m){s.length=o;break}f=new Promise(jp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Np(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Np.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:D({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Np.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Np.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Pp(e){return{name:e,group:new Np(`group`,e),imagePair:new Np(`image-pair`,e),old:new Np(`old`,e),new:new Np(`new`,e)}}function Fp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Fp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Bp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Rp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),h(this._fragmentFiber.child,!1,Ip,e,s,r)}this._eventListeners=a}};function Ip(e,t,n,r){return b(e).addEventListener(t,n,r),!1}Fp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Bp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Rp(i.optionsOrUseCapture),h(this._fragmentFiber.child,!1,Lp,e,n,i),r.splice(t,1),a!==null&&a()}};function Lp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Rp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function zp(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Bp(e,t,n,r){if(e.length===0)return-1;r=zp(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&zp(a.optionsOrUseCapture)===r)return i}return-1}Fp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},Fp.prototype.focus=function(e){h(this._fragmentFiber.child,!0,Vp,e,void 0,void 0)};function Vp(e,t){return e.tag!==6&&(e=b(e),pm(e,t))}Fp.prototype.focusLast=function(e){var t=[];h(this._fragmentFiber.child,!0,Hp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Vp(t[n],e);n--);};function Hp(e,t){return t.push(e),!1}Fp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=lp(e).activeElement,e!==null&&h(this._fragmentFiber.child,!1,Up,e,void 0,void 0))};function Up(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Fp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),h(this._fragmentFiber.child,!1,Wp,e,void 0,void 0)};function Wp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}Fp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),h(this._fragmentFiber.child,!1,Gp,e,void 0,void 0);for(var n=t=0;n<Kp.length;n++){var r=Kp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Kp[t++]=r}Kp.length=t}};function Gp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Kp=[],qp=!1;function Jp(e,t,n){Kp.push({fragmentInstance:e,observer:t,instance:n}),qp||(qp=!0,mm(function(){qp=!1;var e=Kp;Kp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}Fp.prototype.getClientRects=function(){var e=[];return h(this._fragmentFiber.child,!1,Yp,e,void 0,void 0),e};function Yp(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}Fp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},Fp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];h(this._fragmentFiber.child,!1,Hp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||Xp(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function Xp(e,t,n,r,i){var a=Lt(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=E(n,a,T),t===null?t=!1:(h(t,!0,C,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=E(r,a,T),t===null?t=!1:(h(t,!0,w,a,r),a=x,S=x=null,t=a!==null)),t):!1}function Zp(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Fp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];h(this._fragmentFiber.child,!1,Hp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),Zp(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),Zp(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function Qp(e,t){return e=b(e),$p(e,t),!1}function $p(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function em(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Kp.length;i++){var a=Kp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Kp[r++]=a)}Kp.length=r,n.observe(e)}),$p(e,t))}function tm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Jp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function nm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:nm(n),It(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function rm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[Pt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=lm(e.nextSibling),e===null)break}return null}function im(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=lm(e.nextSibling),e===null))return null;return e}function am(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=lm(e.nextSibling),e===null))return null;return e}function om(e){return e.data===`$?`||e.data===`$~`}function sm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function cm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function lm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var um=null;function dm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return lm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function fm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function pm(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function mm(e){yp(function(){yp(function(t){return e(t)})})}function hm(e,t,n){switch(t=lp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function gm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&$(e,t,r,null,rp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===Cn&&(e.onclick=null),It(e)}function _m(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);It(e)}var vm=new Map,ym=new Set;function bm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var xm=j.d;j.d={f:Sm,r:Cm,D:Em,C:Dm,L:Om,m:km,X:jm,S:Am,M:Mm};function Sm(){var e=xm.f(),t=zd();return e||t}function Cm(e){var t=Rt(e);t!==null&&t.tag===5&&t.type===`form`?tc(t):xm.r(e)}var wm=typeof document>`u`?null:document;function Tm(e,t,n){var r=wm;if(r&&typeof t==`string`&&t){var i=cn(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),ym.has(i)||(ym.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),np(t,`link`,e),Vt(t),r.head.appendChild(t)))}}function Em(e){xm.D(e),Tm(`dns-prefetch`,e,null)}function Dm(e,t){xm.C(e,t),Tm(`preconnect`,e,t)}function Om(e,t,n){xm.L(e,t,n);var r=wm;if(r&&e&&t){var i=`link[rel="preload"][as="`+cn(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+cn(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+cn(n.imageSizes)+`"]`)):i+=`[href="`+cn(e)+`"]`;var a=i;switch(t){case`style`:a=Pm(e);break;case`script`:a=Rm(e)}if(!(vm.has(a)||(e=D({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),vm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Fm(a))||t===`script`&&r.querySelector(zm(a))))){var o=r.createElement(`link`);np(o,`link`,e),t===`style`&&(o[Ft]=!0,o.onload=o.onerror=function(){Ht(o)}),Vt(o),r.head.appendChild(o)}}}function km(e,t){xm.m(e,t);var n=wm;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+cn(r)+`"][href="`+cn(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Rm(e)}if(!vm.has(a)&&(e=D({rel:`modulepreload`,href:e},t),vm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(zm(a)))return}r=n.createElement(`link`),np(r,`link`,e),Vt(r),n.head.appendChild(r)}}}function Am(e,t,n){xm.S(e,t,n);var r=wm;if(r&&e){var i=Bt(r).hoistableStyles,a=Pm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Fm(a)))s.loading=5;else{e=D({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=vm.get(a))&&Hm(e,n);var c=o=r.createElement(`link`);Vt(c),np(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Vm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function jm(e,t){xm.X(e,t);var n=wm;if(n&&e){var r=Bt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=D({src:e,async:!0},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Vt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Mm(e,t){xm.M(e,t);var n=wm;if(n&&e){var r=Bt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=D({src:e,async:!0,type:`module`},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Vt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Nm(e,t,n,r){var a=(a=Oe.current)?bm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Pm(n.href),t=Bt(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Pm(n.href);var o=Bt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Fm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=vm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},vm.set(e,o)),Lm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Rm(n),t=Bt(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Pm(e){return`href="`+cn(e)+`"`}function Fm(e){return`link[rel="stylesheet"][`+e+`]`}function Im(e){return D({},e,{"data-precedence":e.precedence,precedence:null})}function Lm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[Ft]){r.loading=1;return}}else t=e.createElement(`link`),t[Ft]=!0,t.onload=t.onerror=Ht.bind(null,t),np(t,`link`,n),Vt(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Rm(e){return`[src="`+cn(e)+`"]`}function zm(e){return`script[async]`+e}function Bm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+cn(n.href)+`"]`);if(r)return t.instance=r,Vt(r),r;var a=D({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Vt(r),np(r,`style`,a),Vm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Pm(n.href);var o=e.querySelector(Fm(a));if(o)return t.state.loading|=4,t.instance=o,Vt(o),o;r=Im(n),(a=vm.get(a))&&Hm(r,a),o=(e.ownerDocument||e).createElement(`link`),Vt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),np(o,`link`,r),t.state.loading|=4,Vm(o,n.precedence,e),t.instance=o;case`script`:return o=Rm(n.src),(a=e.querySelector(zm(o)))?(t.instance=a,Vt(a),a):(r=n,(a=vm.get(o))&&(r=D({},n),Um(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Vt(a),np(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Vm(r,n.precedence,e));return t.instance}function Vm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Hm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Um(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Wm=null;function Gm(e,t,n){if(Wm===null){var r=new Map,i=Wm=new Map;i.set(n,r)}else i=Wm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Pt]||a[Dt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Km(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function qm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Jm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Ym(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Xm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function Zm(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Xm(t),e.suspenseyImages.push(t)),e=rh.bind(e),t.decode().then(e,e))}function Qm(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Pm(r.href),a=t.querySelector(Fm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=nh.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Vt(a);return}a=t.ownerDocument||t,r=Im(r),(i=vm.get(i))&&Hm(r,i),a=a.createElement(`link`),Vt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),np(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=nh.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var $m=0;function eh(e,t){return e.stylesheets&&e.count===0&&ah(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&$m===0&&($m=62500*op());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>$m?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function th(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)ah(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function nh(){this.count--,th(this)}function rh(){this.imgCount--,th(this)}var ih=null;function ah(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ih=new Map,t.forEach(oh,e),ih=null,nh.call(e))}function oh(e,t){if(!(t.state.loading&4)){var n=ih.get(e);if(n)var r=n.get(null);else{n=new Map,ih.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=nh.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var sh={$$typeof:O,Provider:null,Consumer:null,_currentValue:xe,_currentValue2:xe,_threadCount:0};function ch(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=gt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=gt(0),this.hiddenUpdates=gt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function lh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new ch(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=Pi(3,null,null,t),e.current=a,a.stateNode=e,t=Na(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},mo(a),e}function uh(e){return e?(e=Mi,e):Mi}function dh(e,t,n,r,i,a){i=uh(i),r.context===null?r.context=i:r.pendingContext=i,r=go(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=_o(e,r,t),n!==null&&(Pd(n,e,t),vo(n,e,t))}function fh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ph(e,t){fh(e,t),(e=e.alternate)&&fh(e,t)}function mh(e){if(e.tag===13||e.tag===31){var t=ki(e,67108864);t!==null&&Pd(t,e,67108864),ph(e,67108864)}}function hh(e){if(e.tag===13||e.tag===31){var t=jd();t=St(t);var n=ki(e,t);n!==null&&Pd(n,e,t),ph(e,t)}}var gh=!0;function _h(e,t,n,r){var i=A.T;A.T=null;var a=j.p;try{j.p=2,yh(e,t,n,r)}finally{j.p=a,A.T=i}}function vh(e,t,n,r){var i=A.T;A.T=null;var a=j.p;try{j.p=8,yh(e,t,n,r)}finally{j.p=a,A.T=i}}function yh(e,t,n,r){if(gh){var i=bh(r);if(i===null)Kf(e,t,r,xh,n),Mh(e,r);else if(Ph(i,e,t,n,r))r.stopPropagation();else if(Mh(e,r),t&4&&-1<jh.indexOf(e)){for(;i!==null;){var a=Rt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=ut(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-rt(o);s.entanglements[1]|=c,o&=~c}Ef(a),!(q&6)&&(gd=Ke()+500,Df(0,!1))}}break;case 31:case 13:s=ki(a,2),s!==null&&Pd(s,a,2),zd(),ph(a,2)}if(a=bh(r),a===null&&Kf(e,t,r,xh,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Kf(e,t,r,null,n)}}function bh(e){return e=Tn(e),Sh(e)}var xh=null;function Sh(e){if(xh=null,e=Lt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return xh=e,null}function Ch(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(qe()){case Je:return 2;case Ye:return 8;case Xe:case Ze:return 32;case Qe:return 268435456;default:return 32}default:return 32}}var wh=!1,Th=null,Eh=null,Dh=null,Oh=new Map,kh=new Map,Ah=[],jh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Mh(e,t){switch(e){case`focusin`:case`focusout`:Th=null;break;case`dragenter`:case`dragleave`:Eh=null;break;case`mouseover`:case`mouseout`:Dh=null;break;case`pointerover`:case`pointerout`:Oh.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:kh.delete(t.pointerId)}}function Nh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Rt(t),t!==null&&mh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ph(e,t,n,r,i){switch(t){case`focusin`:return Th=Nh(Th,e,t,n,r,i),!0;case`dragenter`:return Eh=Nh(Eh,e,t,n,r,i),!0;case`mouseover`:return Dh=Nh(Dh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Oh.set(a,Nh(Oh.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,kh.set(a,Nh(kh.get(a)||null,e,t,n,r,i)),!0}return!1}function Fh(e){var t=Lt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,Tt(e.priority,function(){hh(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,Tt(e.priority,function(){hh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ih(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);wn=r,n.target.dispatchEvent(r),wn=null}else return t=Rt(n),t!==null&&mh(t),e.blockedOn=n,!1;t.shift()}return!0}function Lh(e,t,n){Ih(e)&&n.delete(t)}function Rh(){wh=!1,Th!==null&&Ih(Th)&&(Th=null),Eh!==null&&Ih(Eh)&&(Eh=null),Dh!==null&&Ih(Dh)&&(Dh=null),Oh.forEach(Lh),kh.forEach(Lh)}function zh(e,n){e.blockedOn===n&&(e.blockedOn=null,wh||(wh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Rh)))}var Bh=null;function Vh(e){Bh!==e&&(Bh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Bh===e&&(Bh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Sh(r||n)===null)continue;break}var a=Rt(n);a!==null&&(e.splice(t,3),t-=3,$s(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Hh(e){function t(t){return zh(t,e)}Th!==null&&zh(Th,e),Eh!==null&&zh(Eh,e),Dh!==null&&zh(Dh,e),Oh.forEach(t),kh.forEach(t);for(var n=0;n<Ah.length;n++){var r=Ah[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Ah.length&&(n=Ah[0],n.blockedOn===null);)Fh(n),n.blockedOn===null&&Ah.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[Ot]||null;if(typeof a==`function`)o||Vh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[Ot]||null)s=o.formAction;else if(Sh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Vh(n)}}}function Uh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Wh(e){this._internalRoot=e}Gh.prototype.render=Wh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;dh(n,jd(),e,t,null,null)},Gh.prototype.unmount=Wh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;dh(e.current,2,null,e,null,null),zd(),t[kt]=null}};function Gh(e){this._internalRoot=e}Gh.prototype.unstable_scheduleHydration=function(e){if(e){var t=wt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ah.length&&t!==0&&t<Ah[n].priority;n++);Ah.splice(n,0,e),n===0&&Fh(e)}};var Kh=n.version;if(Kh!==`19.3.1`)throw Error(i(527,Kh,`19.3.1`));j.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var qh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:A,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Jh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jh.isDisabled&&Jh.supportsFiber)try{tt=Jh.inject(qh),nt=Jh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Sc,s=Cc,c=wc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=lh(e,1,!1,null,null,n,r,null,o,s,c,Uh),e[kt]=t.current,Wf(e),new Wh(t)}})),g=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=c(u()),v=g(),y=`-ms-`,b=`-moz-`,x=`-webkit-`,S=`comm`,C=`rule`,w=`decl`,T=`@import`,E=`@namespace`,D=`@keyframes`,ee=`@layer`,te=Math.abs,ne=String.fromCharCode,re=Object.assign;function ie(e,t){return k(e,0)^45?(((t<<2^k(e,0))<<2^k(e,1))<<2^k(e,2))<<2^k(e,3):0}function ae(e){return e.trim()}function oe(e,t){return(e=t.exec(e))?e[0]:e}function O(e,t,n){return e.replace(t,n)}function se(e,t,n){return e.indexOf(t,n)}function k(e,t){return e.charCodeAt(t)|0}function ce(e,t,n){return e.slice(t,n)}function le(e){return e.length}function ue(e){return e.length}function de(e,t){return t.push(e),e}function fe(e,t){return e.map(t).join(``)}function pe(e,t){return e.filter(function(e){return!oe(e,t)})}var me=1,he=1,ge=0,_e=0,ve=0,ye=``;function be(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:me,column:he,length:o,return:``,siblings:s}}function A(e,t){return re(be(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function j(e){for(;e.root;)e=A(e.root,{children:[e]});de(e,e.siblings)}function xe(){return ve}function Se(){return ve=_e>0?k(ye,--_e):0,he--,ve===10&&(he=1,me--),ve}function Ce(){return ve=_e<ge?k(ye,_e++):0,he++,ve===10&&(he=1,me++),ve}function we(){return k(ye,_e)}function Te(){return _e}function M(e,t){return ce(ye,e,t)}function Ee(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function De(e){return me=he=1,ge=le(ye=e),_e=0,[]}function Oe(e){return ye=``,e}function ke(e){return ae(M(_e-1,Me(e===91?e+2:e===40?e+1:e)))}function Ae(e){for(;(ve=we())&&ve<33;)Ce();return Ee(e)>2||Ee(ve)>3?``:` `}function je(e,t){for(;--t&&Ce()&&!(ve<48||ve>102||ve>57&&ve<65||ve>70&&ve<97););return M(e,Te()+(t<6&&we()==32&&Ce()==32))}function Me(e){for(;Ce();)switch(ve){case e:return _e;case 34:case 39:e!==34&&e!==39&&Me(ve);break;case 40:e===41&&Me(e);break;case 92:Ce()}return _e}function Ne(e,t){for(;Ce()&&e+ve!==57&&(e+ve!==84||we()!==47););return`/*`+M(t,_e-1)+`*`+ne(e===47?e:Ce())}function Pe(e){for(;!Ee(we());)Ce();return M(e,_e)}function Fe(e){return Oe(Ie(``,null,null,null,[``],e=De(e),0,[0],e))}function Ie(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=Ce()){case 40:if(m!=108&&k(C,d-1)==58){se(C+=O(ke(v),`&`,`&\f`),`&\f`,te(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=ke(v);break;case 9:case 10:case 13:case 32:C+=Ae(m);break;case 92:C+=je(Te()-1,7);continue;case 47:switch(we()){case 42:case 47:de(Re(Ne(Ce(),Te()),t,n,c),c),(Ee(m||1)==5||Ee(we()||1)==5)&&le(C)&&ce(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=le(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=O(C,/\f/g,``)),p>0&&(le(C)-d||h===0&&m===47)&&de(p>32?ze(C+`;`,r,n,d-1,c):ze(O(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(de(S=Le(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123){if(u===0)Ie(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(k(C,3)===110)break;case 108:if(k(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?Ie(e,S,S,r&&de(Le(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):Ie(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+le(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&Se()==125)continue}switch(C+=ne(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(le(C)-1)*_,_=1;break;case 64:we()===45&&(C+=ke(Ce())),f=we(),u=d=le(y=C+=Pe(Te())),v++;break;case 45:m===45&&le(C)==2&&(h=0)}}return a}function Le(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=ue(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=ce(e,f+1,f=te(g=o[h])),b=e;v<m;++v)(b=ae(g>0?p[v]+` `+y:O(y,/&\f/g,p[v])))&&(c[_++]=b);return be(e,t,n,i===0?C:s,c,l,u,d)}function Re(e,t,n,r){return be(e,t,n,S,ne(xe()),ce(e,2,-2),0,r)}function ze(e,t,n,r,i){return be(e,t,n,w,ce(e,0,r),ce(e,r+1,-1),r,i)}function Be(e,t,n){switch(ie(e,t)){case 5103:return x+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return x+e+e;case 4855:return x+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return b+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return x+e+b+e+y+e+e;case 5936:switch(k(e,t+11)){case 114:return x+e+y+O(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return x+e+y+O(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return x+e+y+O(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return x+e+y+e+e;case 6165:return x+e+y+`flex-`+e+e;case 5187:return x+e+O(e,/(\w+).+(:[^]+)/,x+`box-$1$2`+y+`flex-$1$2`)+e;case 5443:return x+e+y+`flex-item-`+O(e,/flex-|-self/g,``)+(oe(e,/flex-|baseline/)?``:y+`grid-row-`+O(e,/flex-|-self/g,``))+e;case 4675:return x+e+y+`flex-line-pack`+O(e,/align-content|flex-|-self/g,``)+e;case 5548:return x+e+y+O(e,`shrink`,`negative`)+e;case 5292:return x+e+y+O(e,`basis`,`preferred-size`)+e;case 6060:return x+`box-`+O(e,`-grow`,``)+x+e+y+O(e,`grow`,`positive`)+e;case 4554:return x+O(e,/([^-])(transform)/g,`$1`+x+`$2`)+e;case 6187:return O(O(O(e,/(zoom-|grab)/,x+`$1`),/(image-set)/,x+`$1`),e,``)+e;case 5495:case 3959:return O(e,/(image-set\([^]*)/,x+"$1$`$1");case 4968:return O(O(e,/(.+:)(flex-)?(.*)/,x+`box-pack:$3`+y+`flex-pack:$3`),/space-between/,`justify`)+x+e+e;case 4200:if(!oe(e,/flex-|baseline/))return y+`grid-column-align`+ce(e,t)+e;break;case 2592:case 3360:return y+O(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,oe(e.props,/grid-\w+-end/)})?~se(e+(n=n[t].value),`span`,0)?e:y+O(e,`-start`,``)+e+y+`grid-row-span:`+(~se(n,`span`,0)?oe(n,/\d+/):+oe(n,/\d+/)-oe(e,/\d+/))+`;`:y+O(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return oe(e.props,/grid-\w+-start/)})?e:y+O(O(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return O(e,/(.+)-inline(.+)/,x+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(le(e)-1-t>6)switch(k(e,t+1)){case 109:if(k(e,t+4)!==45)break;case 102:return O(e,/(.+:)(.+)-([^]+)/,`$1`+x+`$2-$3$1`+b+(k(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~se(e,`stretch`,0)?Be(O(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return O(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return y+n+`:`+r+s+(i?y+n+`-span:`+(a?o:+o-r)+s:``)+e});case 4949:if(k(e,t+6)===121)return O(e,`:`,`:`+x)+e;break;case 6444:switch(k(e,k(e,14)===45?18:11)){case 120:return O(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+x+(k(e,14)===45?`inline-`:``)+`box$3$1`+x+`$2$3$1`+y+`$2box$3`)+e;case 100:return O(e,`:`,`:`+y)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return O(e,`scroll-`,`scroll-snap-`)+e}return e}function Ve(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function He(e,t,n,r){switch(e.type){case ee:if(e.children.length)break;case T:case E:case w:return e.return=e.return||e.value;case S:return``;case D:return e.return=e.value+`{`+Ve(e.children,r)+`}`;case C:if(!le(e.value=e.props.join(`,`)))return``}return le(n=Ve(e.children,r))?e.return=e.value+`{`+n+`}`:``}function Ue(e){var t=ue(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function We(e){return function(t){t.root||(t=t.return)&&e(t)}}function Ge(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case w:e.return=Be(e.value,e.length,n);return;case D:return Ve([A(e,{value:O(e.value,`@`,`@`+x)})],r);case C:if(e.length)return fe(n=e.props,function(t){switch(oe(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:j(A(e,{props:[O(t,/:(read-\w+)/,`:`+b+`$1`)]})),j(A(e,{props:[t]})),re(e,{props:pe(n,r)});break;case`::placeholder`:j(A(e,{props:[O(t,/:(plac\w+)/,`:`+x+`input-$1`)]})),j(A(e,{props:[O(t,/:(plac\w+)/,`:`+b+`$1`)]})),j(A(e,{props:[O(t,/:(plac\w+)/,y+`input-$1`)]})),j(A(e,{props:[t]})),re(e,{props:pe(n,r)})}return``})}}function Ke(e,...t){return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var qe=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,Je=`active`,Ye=`data-styled-version`,Xe=`6.6.0`,Ze=`/*!sc*/
`,Qe=typeof window<`u`&&typeof document<`u`;if(!_.createContext)throw Ke(19);function $e(e){if(typeof process<`u`){let t={}[e];if(t!==void 0&&t!==``)return t!==`false`}}var et=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:$e(`REACT_APP_SC_DISABLE_SPEEDY`)??$e(`SC_DISABLE_SPEEDY`)??(typeof process<`u`&&!1)),tt=`sc-keyframes-`,nt=new Map,N=new Map,rt=1,it=e=>{if(nt.has(e))return nt.get(e);for(;N.has(rt);)rt++;let t=rt++;return nt.set(e,t),N.set(t,e),t},at=e=>N.get(e),ot=(e,t)=>{rt=t+1,nt.set(e,t),N.set(t,e)},st=Object.freeze([]),ct=Object.freeze({});function lt(e,t,n=ct){return e.theme!==n.theme&&e.theme||t||n.theme}var ut=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,dt=/(^-|-$)/g;function ft(e){return e.replace(ut,`-`).replace(dt,``)}var pt=/(a)(d)/gi,mt=e=>String.fromCharCode(e+(e>25?39:97));function ht(e){let t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=mt(t%52)+n;return(mt(t%52)+n).replace(pt,`$1-$2`)}var gt=5381,_t=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},vt=e=>_t(gt,e);function yt(e){return ht(vt(e)>>>0)}function bt(e){return e.displayName||e.name||`Component`}function xt(e){return typeof e==`string`&&!0}function St(e){return xt(e)?`styled.${e}`:`Styled(${bt(e)})`}var Ct=Symbol.for(`react.memo`),wt=Symbol.for(`react.forward_ref`),Tt={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},Et={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Dt={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Ot={[wt]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[Ct]:Dt};function kt(e){return(`type`in(t=e)&&t.type.$$typeof)===Ct?Dt:`$$typeof`in e?Ot[e.$$typeof]:Tt;var t}var At=Object.defineProperty,jt=Object.getOwnPropertyNames,Mt=Object.getOwnPropertySymbols,Nt=Object.getOwnPropertyDescriptor,Pt=Object.getPrototypeOf,Ft=Object.prototype;function It(e,t,n){if(typeof t!=`string`){let r=Pt(t);r&&r!==Ft&&It(e,r,n);let i=jt(t).concat(Mt(t)),a=kt(e),o=kt(t);for(let r=0;r<i.length;++r){let s=i[r];if(!(s in Et||n&&n[s]||o&&s in o||a&&s in a)){let n=Nt(t,s);try{At(e,s,n)}catch{}}}}return e}function Lt(e){return typeof e==`function`}var Rt=Symbol.for(`react.forward_ref`);function zt(e){return e!=null&&(typeof e==`object`||typeof e==`function`)&&e.$$typeof===Rt&&`styledComponentId`in e}function Bt(e,t){return e&&t?e+` `+t:e||t||``}function Vt(e,t){return e.join(t||``)}function Ht(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function Ut(e,t,n=!1){if(!n&&!Ht(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=Ut(e[n],t[n]);else if(Ht(t))for(let n in t)e[n]=Ut(e[n],t[n]);return e}function Wt(e,t){Object.defineProperty(e,"toString",{value:t})}var Gt=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){let t=this.groupSizes,n=t.length,r=n;for(;e>=r;)if(r<<=1,r<0)throw Ke(16,`${e}`);this.groupSizes=new Uint32Array(r),this.groupSizes.set(t),this.length=r;for(let e=n;e<r;e++)this.groupSizes[e]=0}let n=this.indexOfGroup(e+1),r=0;for(let i=0,a=t.length;i<a;i++)this.tag.insertRule(n,t[i])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){let t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let e=n;e<r;e++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t=``;if(e>=this.length||this.groupSizes[e]===0)return t;let n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n;for(let e=r;e<i;e++)t+=this.tag.getRule(e)+Ze;return t}},Kt=`style[${qe}][${Ye}="${Xe}"]`,qt=RegExp(`^${qe}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),Jt=e=>typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11,Yt=e=>{if(!e)return document;if(Jt(e))return e;if(`getRootNode`in e){let t=e.getRootNode();if(Jt(t))return t}return document},Xt=(e,t,n)=>{let r=n.split(`,`),i;for(let n=0,a=r.length;n<a;n++)(i=r[n])&&e.registerName(t,i)},P=(e,t)=>{let n=(t.textContent??``).split(Ze),r=[];for(let t=0,i=n.length;t<i;t++){let i=n[t].trim();if(!i)continue;let a=i.match(qt);if(a){let t=0|parseInt(a[1],10),n=a[2];t!==0&&(ot(n,t),Xt(e,n,a[3]),e.getTag().insertRules(t,r)),r.length=0}else r.push(i)}},Zt=e=>{let t=Yt(e.options.target).querySelectorAll(Kt);for(let n=0,r=t.length;n<r;n++){let r=t[n];r&&r.getAttribute(qe)!==Je&&(P(e,r),r.parentNode&&r.parentNode.removeChild(r))}},Qt=!1;function $t(){if(!1!==Qt)return Qt;if(typeof document<`u`){let e=document.head.querySelector(`meta[property="csp-nonce"]`);if(e)return Qt=e.nonce||e.getAttribute(`content`)||void 0;let t=document.head.querySelector(`meta[name="sc-nonce"]`);if(t)return Qt=t.getAttribute(`content`)||void 0}return Qt=typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}var en=(e,t)=>{if(typeof document>`u`)throw Ke(20);let n=document.head,r=e||n,i=document.createElement(`style`),a=(e=>{let t=Array.from(e.querySelectorAll(`style[${qe}]`));return t[t.length-1]})(r),o=a===void 0?null:a.nextSibling;i.setAttribute(qe,Je),i.setAttribute(Ye,Xe);let s=t||$t();return s&&i.setAttribute(`nonce`,s),r.insertBefore(i,o),i},tn=class{constructor(e,t){this.element=en(e,t),this.element.appendChild(document.createTextNode(``)),this.sheet=(e=>{if(e.sheet)return e.sheet;let t=e.getRootNode().styleSheets??document.styleSheets;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r.ownerNode===e)return r}throw Ke(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){let t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``}},nn=class{constructor(e,t){this.element=en(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){let n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:``}},rn=Qe,an={isServer:!Qe,useCSSOMInjection:!et},on=class e{static registerId(e){return it(e)}constructor(e=ct,t={},n){this.options=Object.assign(Object.assign({},an),e),this.gs=t,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Qe&&rn&&(rn=!1,Zt(this)),Wt(this,()=>(e=>{let t=e.getTag(),{length:n}=t,r=``;for(let i=0;i<n;i++){let n=at(i);if(n===void 0)continue;let a=e.names.get(n);if(a===void 0||!a.size)continue;let o=t.getGroup(i);if(o.length===0)continue;let s=qe+`.g`+i+`[id="`+n+`"]`,c=``;for(let e of a)e.length>0&&(c+=e+`,`);r+=o+s+`{content:"`+c+`"}/*!sc*/
`}return r})(this))}rehydrate(){!this.server&&Qe&&Zt(this)}reconstructWithOptions(t,n=!0){let r=new e(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&Qe&&t.target!==this.options.target&&Yt(this.options.target)!==Yt(t.target)&&Zt(r),r}allocateGSInstance(e){return this.gs[e]=(this.gs[e]||0)+1}getTag(){return this.tag||=(e=(({useCSSOMInjection:e,target:t,nonce:n})=>e?new tn(t,n):new nn(t,n))(this.options),new Gt(e));var e}hasNameForId(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n}registerName(e,t){it(e),e.startsWith(tt)&&this.keyframeIds.add(e);let n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))}insertRules(e,t,n){this.registerName(e,t),this.getTag().insertRules(it(e),n)}clearNames(e){this.names.has(e)&&this.names.get(e).clear()}clearRules(e){this.getTag().clearGroup(it(e)),this.clearNames(e)}clearTag(){this.tag=void 0}},sn=new WeakSet,cn={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function ln(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in cn||e.startsWith(`--`)?String(t).trim():t+`px`}var un=47;function dn(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t=``;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r>=65&&r<=90?`-`+String.fromCharCode(r+32):e[n]}return t.startsWith(`ms-`)?`-`+t:t}var fn=Symbol.for(`sc-keyframes`);function pn(e){return typeof e==`object`&&!!e&&fn in e}function mn(e){return Lt(e)&&!(e.prototype&&e.prototype.isReactComponent)}var hn=e=>e==null||!1===e||e===``,gn=Symbol.for(`react.client.reference`);function _n(e){return e.$$typeof===gn}function vn(e,t){for(let n in e){let r=e[n];e.hasOwnProperty(n)&&!hn(r)&&(Array.isArray(r)&&sn.has(r)||Lt(r)?t.push(dn(n)+`:`,r,`;`):Ht(r)?(t.push(n+` {`),vn(r,t),t.push(`}`)):t.push(dn(n)+`: `+ln(n,r)+`;`))}}function yn(e,t,n,r,i=[]){if(hn(e))return i;let a=typeof e;if(a===`string`)return i.push(e),i;if(a===`function`)return _n(e)?i:mn(e)&&t?yn(e(t),t,n,r,i):(i.push(e),i);if(Array.isArray(e)){for(let a=0;a<e.length;a++)yn(e[a],t,n,r,i);return i}return zt(e)?(i.push(`.${e.styledComponentId}`),i):pn(e)?(n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i):_n(e)?i:Ht(e)&&e.toString===Object.prototype.toString?(vn(e,i),i):(i.push(e.toString()),i)}var bn=vt(Xe),xn=class{constructor(e,t,n){this.rules=e,this.componentId=t,this.baseHash=_t(bn,t),this.baseStyle=n,on.registerId(t)}generateAndInjectStyles(e,t,n){let r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;{let i=``;for(let r=0;r<this.rules.length;r++){let a=this.rules[r];if(typeof a==`string`)i+=a;else if(a){if(mn(a)){let r=a(e);typeof r==`string`?i+=r:r!=null&&!1!==r&&(i+=Vt(yn(r,e,t,n)))}else i+=Vt(yn(a,e,t,n))}}if(i){this.dynamicNameCache||=new Map;let e=n.hash?n.hash+i:i,a=this.dynamicNameCache.get(e);if(!a){if(a=ht(_t(_t(this.baseHash,n.hash),i)>>>0),this.dynamicNameCache.size>=200){let e=this.dynamicNameCache.keys().next().value;e!==void 0&&this.dynamicNameCache.delete(e)}this.dynamicNameCache.set(e,a)}if(!t.hasNameForId(this.componentId,a)){let e=n(i,`.`+a,void 0,this.componentId);t.insertRules(this.componentId,a,e)}r=Bt(r,a)}}return r}},Sn=/&/g;function Cn(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function wn(e){let t=e.length,n=``,r=0,i=0,a=0,o=!1,s=!1;for(let c=0;c<t;c++){let l=e.charCodeAt(c);if(a!==0||o||l!==un||e.charCodeAt(c+1)!==42){if(o)l===42&&e.charCodeAt(c+1)===un&&(o=!1,c++);else if(l!==34&&l!==39||Cn(e,c)){if(a===0){if(l===123)i++;else if(l===125){if(i--,i<0){s=!0;let n=c+1;for(;n<t;){let t=e.charCodeAt(n);if(t===59||t===10)break;n++}n<t&&e.charCodeAt(n)===59&&n++,i=0,c=n-1,r=n;continue}i===0&&(n+=e.substring(r,c+1),r=c+1)}else l===59&&i===0&&(n+=e.substring(r,c+1),r=c+1)}}else a===0?a=l:a===l&&(a=0)}else o=!0,c++}return s||i!==0||a!==0?(r<t&&i===0&&a===0&&(n+=e.substring(r)),n):e}function Tn(e,t){let n=t+` `,r=`,`+n;for(let i=0;i<e.length;i++){let a=e[i];if(a.type===`rule`){a.value=(n+a.value).replaceAll(`,`,r);let e=a.props,t=[];for(let r=0;r<e.length;r++)t[r]=n+e[r];a.props=t}Array.isArray(a.children)&&a.type!==`@keyframes`&&Tn(a.children,t)}return e}function En({options:e=ct,plugins:t=st}=ct){let n,r,i,a=(e,t,i)=>i.startsWith(r)&&i.endsWith(r)&&i.replaceAll(r,``).length>0?`.${n}`:e,o=t.slice();o.push(e=>{e.type===`rule`&&e.value.includes(`&`)&&(i||=RegExp(`\\${r}\\b`,`g`),e.props[0]=e.props[0].replace(Sn,r).replace(i,a))}),e.prefix&&o.push(Ge),o.push(He);let s=[],c=Ue(o.concat(We(e=>s.push(e)))),l=(t,a=``,o=``,l=`&`)=>{n=l,r=a,i=void 0;let u=function(e){let t=e.indexOf(`//`)!==-1,n=e.indexOf(`}`)!==-1;if(!t&&!n)return e;if(!t)return wn(e);let r=e.length,i=``,a=0,o=0,s=0,c=0,l=0,u=!1;for(;o<r;){let t=e.charCodeAt(o);if(t!==34&&t!==39||Cn(e,o)){if(s===0){if(t===un&&o+1<r&&e.charCodeAt(o+1)===42){for(o+=2;o+1<r&&(e.charCodeAt(o)!==42||e.charCodeAt(o+1)!==un);)o++;o+=2}else if(t!==40){if(t!==41){if(c>0)o++;else if(t===42&&o+1<r&&e.charCodeAt(o+1)===un)i+=e.substring(a,o),o+=2,a=o,u=!0;else if(t===un&&o+1<r&&e.charCodeAt(o+1)===un){for(i+=e.substring(a,o);o<r&&e.charCodeAt(o)!==10;)o++;a=o,u=!0}else t===123?l++:t===125&&l--,o++}else c>0&&c--,o++}else c++,o++}else o++}else s===0?s=t:s===t&&(s=0),o++}return u?(a<r&&(i+=e.substring(a)),l===0?i:wn(i)):l===0?e:wn(e)}(t),d=Fe(o||a?o+` `+a+` { `+u+` }`:u);return e.namespace&&(d=Tn(d,e.namespace)),s=[],Ve(d,c),s},u=e,d=gt;for(let e=0;e<t.length;e++)t[e].name||Ke(15),d=_t(d,t[e].name);return u!=null&&u.namespace&&(d=_t(d,u.namespace)),u!=null&&u.prefix&&(d=_t(d,`p`)),l.hash=d===gt?``:d.toString(),l}var Dn=new on,On=En(),kn=_.createContext({shouldForwardProp:void 0,styleSheet:Dn,stylis:On,stylisPlugins:void 0});kn.Consumer;function An(){return _.useContext(kn)}var jn=_.createContext(void 0);jn.Consumer;var Mn={};function Nn(e,t){let n=typeof e==`string`?ft(e):`sc`;Mn[n]=(Mn[n]||0)+1;let r=n+`-`+yt(Xe+n+Mn[n]);return t?t+`-`+r:r}function Pn(e,t,n){let r=zt(e),i=e,a=!xt(e),{attrs:o=st,componentId:s=Nn(t.displayName,t.parentComponentId),displayName:c=St(e)}=t,l=t.displayName&&t.componentId?ft(t.displayName)+`-`+t.componentId:t.componentId||s,u=r&&i.attrs?i.attrs.concat(o).filter(Boolean):o,{shouldForwardProp:d}=t;if(r&&i.shouldForwardProp){let e=i.shouldForwardProp;if(t.shouldForwardProp){let n=t.shouldForwardProp;d=(t,r)=>e(t,r)&&n(t,r)}else d=e}let f=new xn(n,l,r?i.componentStyle:void 0);function p(e,t){return function(e,t,n){let{attrs:r,componentStyle:i,defaultProps:a,foldedComponentIds:o,styledComponentId:s,target:c}=e,l=_.useContext(jn),u=An(),d=e.shouldForwardProp||u.shouldForwardProp,f=lt(t,l,a)||ct,[p,m]=function(e,t,n){let r=Object.assign(Object.assign({},t),{className:void 0,theme:n}),i=null,a=e.length>1;for(let t=0;t<e.length;t++){let n=e[t],o=Lt(n)?n(a?Object.assign({},r):r):n;for(let e in o)e===`className`?r.className=Bt(r.className,o[e]):e===`style`?r.style=Object.assign(Object.assign({},r.style),o[e]):o[e]===void 0?e in r&&(r[e]!==void 0&&(i||=[]).push(e),r[e]=void 0):r[e]=o[e]}return`className`in t&&typeof t.className==`string`&&(r.className=Bt(r.className,t.className)),[r,i]}(r,t,f),h=i.generateAndInjectStyles(p,u.styleSheet,u.stylis),g=p.as||c,v=xt(g),y=function(e,t,n,r,i,a){let o={};for(let s in e)s[0]===`$`||s===`as`||s===`theme`&&e.theme===n||(s===`forwardedAs`?e.forwardedAs!==void 0&&(o.as=e.forwardedAs):e[s]===void 0?s===`className`||i||a!==null&&a.indexOf(s)!==-1||r&&!r(s,t)||(o[s]=void 0):r&&!r(s,t)||(o[s]=e[s]));return o}(p,g,f,d,v,m),b=Bt(o,s);return h&&(b+=` `+h),p.className&&(b+=` `+p.className),y[v&&g.includes(`-`)?`class`:`className`]=b,n&&(y.ref=n),(0,_.createElement)(g,y)}(m,e,t)}p.displayName=c;let m=_.forwardRef(p);return m.attrs=u,m.componentStyle=f,m.displayName=c,m.shouldForwardProp=d,m.foldedComponentIds=r?Bt(i.foldedComponentIds,i.styledComponentId):``,m.styledComponentId=l,m.target=r?i.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(e){this._foldedDefaultProps=r?function(e,...t){for(let n of t)Ut(e,n,!0);return e}({},i.defaultProps,e):e}}),Wt(m,()=>`.${m.styledComponentId}`),a&&It(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var Fn=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`));function In(e,t){let n=[e[0]];for(let r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var Ln=e=>(sn.add(e),e);function Rn(e,...t){if(Lt(e)||Ht(e))return Ln(yn(In(st,[e,...t])));let n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?yn(n):Ln(yn(In(n,t)))}function zn(e,t,n=ct){if(!t)throw Ke(1,t);let r=(r,...i)=>e(t,n,Rn(r,...i));return r.attrs=r=>zn(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)})),r.withConfig=r=>zn(e,t,Object.assign(Object.assign({},n),r)),r}var Bn=e=>zn(Pn,e),F=Bn;Fn.forEach(e=>{F[e]=Bn(e)});var Vn,Hn=class{constructor(e,t){this[Vn]=!0,this.inject=(e,t=On)=>{let n=this.getName(t);if(!e.hasNameForId(this.id,n)){let r=t(this.rules,n,`@keyframes`);e.insertRules(this.id,n,r)}},this.name=e,this.id=tt+e,this.rules=t,it(this.id),Wt(this,()=>{throw Ke(12,String(this.name))})}getName(e=On){return e.hash?this.name+ht(e.hash>>>0):this.name}};function Un(e,...t){let n=Vt(Rn(e,...t));return new Hn(yt(n),n)}Vn=fn,`${qe}`,`${qe}`,`${qe}`;var Wn=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),Gn=o(((e,t)=>{t.exports=Wn()})),I=Gn(),Kn=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,I.jsx)(`path`,{d:`M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71`}),(0,I.jsx)(`path`,{d:`M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71`})]}),qn=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 256 256`,role:`img`,"aria-label":`URLCheck`,...e,children:[(0,I.jsx)(`defs`,{children:(0,I.jsxs)(`linearGradient`,{id:`urlcheck-mark`,x1:0,y1:0,x2:1,y2:1,children:[(0,I.jsx)(`stop`,{offset:0,stopColor:`#3b82f6`}),(0,I.jsx)(`stop`,{offset:.5,stopColor:`#6366f1`}),(0,I.jsx)(`stop`,{offset:1,stopColor:`#8b5cf6`})]})}),(0,I.jsxs)(`g`,{transform:`translate(112.75 112.75) scale(6.8) translate(-12 -12)`,fill:`none`,stroke:`#ffffff`,strokeWidth:2.05,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,I.jsx)(`path`,{d:`M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71`}),(0,I.jsx)(`path`,{d:`M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71`})]}),(0,I.jsx)(`circle`,{cx:184.75,cy:184.75,r:33,fill:`#ffffff`}),(0,I.jsx)(`path`,{d:`M168.75 184.75l10 10 21-22`,fill:`none`,stroke:`url(#urlcheck-mark)`,strokeWidth:10,strokeLinecap:`round`,strokeLinejoin:`round`})]}),Jn=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,I.jsx)(`path`,{d:`M3 9.5 12 3l9 6.5`}),(0,I.jsx)(`path`,{d:`M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10`}),(0,I.jsx)(`path`,{d:`M9 21v-6h6v6`})]}),Yn=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,I.jsx)(`polygon`,{points:`12 2 2 7 12 12 22 7 12 2`}),(0,I.jsx)(`polyline`,{points:`2 17 12 22 22 17`}),(0,I.jsx)(`polyline`,{points:`2 12 12 17 22 12`})]}),Xn=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,I.jsx)(`circle`,{cx:12,cy:12,r:10}),(0,I.jsx)(`polyline`,{points:`12 6 12 12 16 14`})]}),Zn=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,I.jsx)(`circle`,{cx:12,cy:12,r:3}),(0,I.jsx)(`path`,{d:`M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z`})]}),Qn=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,I.jsx)(`path`,{d:`M22 11.08V12a10 10 0 1 1-5.93-9.14`}),(0,I.jsx)(`polyline`,{points:`22 4 12 14.01 9 11.01`})]}),$n=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,I.jsx)(`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z`}),(0,I.jsx)(`line`,{x1:12,y1:9,x2:12,y2:13}),(0,I.jsx)(`line`,{x1:12,y1:17,x2:12.01,y2:17})]}),er=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,I.jsx)(`circle`,{cx:12,cy:12,r:10}),(0,I.jsx)(`line`,{x1:15,y1:9,x2:9,y2:15}),(0,I.jsx)(`line`,{x1:9,y1:9,x2:15,y2:15})]}),tr=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,I.jsx)(`circle`,{cx:11,cy:11,r:8}),(0,I.jsx)(`line`,{x1:21,y1:21,x2:16.65,y2:16.65})]}),nr=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,I.jsx)(`path`,{d:`M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z`}),(0,I.jsx)(`path`,{d:`m9 12 2 2 4-4`})]}),rr=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,I.jsx)(`rect`,{x:3,y:11,width:18,height:11,rx:2,ry:2}),(0,I.jsx)(`path`,{d:`M7 11V7a5 5 0 0 1 10 0v4`})]}),ir=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,I.jsx)(`rect`,{width:14,height:14,x:8,y:8,rx:2,ry:2}),(0,I.jsx)(`path`,{d:`M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`})]}),ar=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,I.jsx)(`polyline`,{points:`15 14 20 9 15 4`}),(0,I.jsx)(`path`,{d:`M4 20v-7a4 4 0 0 1 4-4h12`})]}),or=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,I.jsx)(`line`,{x1:12,y1:5,x2:12,y2:19}),(0,I.jsx)(`line`,{x1:5,y1:12,x2:19,y2:12})]}),sr=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,I.jsx)(`path`,{d:`M3 6h18`}),(0,I.jsx)(`path`,{d:`M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6`}),(0,I.jsx)(`path`,{d:`M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2`})]}),cr=e=>(0,I.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`currentColor`,...e,children:(0,I.jsx)(`polygon`,{points:`5 3 19 12 5 21 5 3`})}),lr=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,I.jsx)(`path`,{d:`M22 2 11 13`}),(0,I.jsx)(`path`,{d:`M22 2 15 22 11 13 2 9 22 2z`})]}),ur=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,I.jsx)(`polyline`,{points:`16 18 22 12 16 6`}),(0,I.jsx)(`polyline`,{points:`8 6 2 12 8 18`})]}),dr=e=>(0,I.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,I.jsx)(`path`,{d:`M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`}),(0,I.jsx)(`polyline`,{points:`15 3 21 3 21 9`}),(0,I.jsx)(`line`,{x1:10,y1:14,x2:21,y2:3})]});function fr(e){let t=({size:t=20,...n})=>(0,I.jsx)(e,{width:t,height:t,...n});return t.displayName=e.displayName??`Icon`,t}var pr=fr(Kn),mr=fr(qn),hr=fr(Jn);fr(Yn);var gr=fr(Xn),_r=fr(Zn),vr=fr(ur),yr=fr(Qn),br=fr($n),xr=fr(er),Sr=fr(tr),Cr=fr(nr),wr=fr(rr),Tr=fr(ir);fr(ar);var Er=fr(or),Dr=fr(sr),Or=fr(cr),kr=fr(lr),Ar=fr(dr),jr=F.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    animation: pageEnter 0.32s cubic-bezier(0.22, 1, 0.36, 1);

    @keyframes pageEnter {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    ${e=>e.$maxWidth?`max-width: ${e.$maxWidth}px;`:``}
`,Mr=F.div`
    background: rgba(17, 24, 39, 0.75);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;

    &:hover {
        border-color: rgba(255, 255, 255, 0.14);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    }
`,Nr=F(Mr)`
    display: flex;
    flex-direction: column;
    gap: 18px;
`,Pr=F.h3`
    font-size: 1.05rem;
    font-weight: 700;
    color: #f9fafb;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 12px;
    margin-bottom: 4px;
`,Fr=15e3,Ir=new Set,Lr=new Map,Rr=!1,zr=0;function Br(){return typeof window<`u`&&typeof window.external?.sendMessage==`function`}function Vr(){Rr||(Rr=!0,typeof window<`u`&&typeof window.external?.receiveMessage==`function`&&window.external.receiveMessage(e=>Hr(e)))}function Hr(e){let t;try{t=JSON.parse(e)}catch(t){console.warn(`[Native] Received a non-JSON message:`,e,t);return}let n=typeof t.id==`string`?t.id:void 0,r=n?Lr.get(n):void 0;n&&r&&(Lr.delete(n),clearTimeout(r.timeoutId),t.ok===!1?r.reject(Error(typeof t.error==`string`?t.error:`Native request failed.`)):r.resolve(t.data)),Ir.forEach(e=>{try{e(t)}catch(e){console.error(`[Native] Message handler threw:`,e)}})}var L={get available(){return Br()},send(e){Br()?(Vr(),window.external.sendMessage(JSON.stringify(e))):console.debug(`[Native] Bridge unavailable, dropping message:`,e)},request(e,t,n=Fr){if(!Br())return Promise.reject(Error(`Native bridge is not available.`));Vr();let r=`req-${++zr}-${Date.now()}`;return new Promise((i,a)=>{let o=setTimeout(()=>{Lr.delete(r),a(Error(`Native request '${e}' timed out after ${n}ms.`))},n);Lr.set(r,{resolve:i,reject:a,timeoutId:o}),window.external.sendMessage(JSON.stringify({type:e,id:r,payload:t}))})},on(e){return Vr(),Ir.add(e),()=>Ir.delete(e)}};function Ur(e){return(t,n)=>{let r=e[t]??t;return n?r.replace(/\{(\w+)}/g,(e,t)=>t in n?String(n[t]):e):r}}async function Wr(e){return L.available?await L.request(`i18n.get`,e?{locale:e}:void 0):{locale:`en`,strings:{},available:[`en`]}}var Gr=(0,_.createContext)(Ur({})),Kr=(0,_.createContext)(`en`);function qr(){return(0,_.useContext)(Gr)}function Jr(){return(0,_.useContext)(Kr)}var Yr=({children:e})=>{let[t,n]=(0,_.useState)(()=>Ur({})),[r,i]=(0,_.useState)(`en`);return(0,_.useEffect)(()=>{let e=!1,t=async()=>{try{let t=await Wr();if(e)return;n(()=>Ur(t.strings)),i(t.locale)}catch{}};t();let r=L.on(e=>{e.type===`settings.changed`&&t()});return()=>{e=!0,r()}},[]),(0,_.useEffect)(()=>{document.documentElement.lang=r},[r]),(0,I.jsx)(Gr.Provider,{value:t,children:(0,I.jsx)(Kr.Provider,{value:r,children:e})})},Xr=e=>L.send({type:e});function Zr(){let[e,t]=(0,_.useState)(!1);return(0,_.useEffect)(()=>{if(L.available)return L.on(e=>{if(e.type!==`window.state`)return;let n=e.data;typeof n?.maximized==`boolean`&&t(n.maximized)})},[]),{maximized:e,minimize:()=>Xr(`window.minimize`),toggleMaximize:()=>Xr(`window.toggleMaximize`),close:()=>Xr(`window.close`)}}function Qr(){return{onMouseDown:()=>Xr(`window.drag`),onDoubleClick:()=>Xr(`window.toggleMaximize`)}}function $r(){let[e,t]=(0,_.useState)(!1),{maximized:n}=Zr();return(0,_.useEffect)(()=>{if(!L.available)return;let e=!1;return L.request(`app.info`).then(n=>{e||t(n.rounded===!0)}).catch(()=>void 0),()=>{e=!0}},[]),(0,_.useEffect)(()=>{document.documentElement.classList.toggle(`window-rounded`,e)},[e]),e&&!n}var ei=[[`top`,{top:0,left:8,right:8,height:5,cursor:`ns-resize`}],[`bottom`,{bottom:0,left:8,right:8,height:5,cursor:`ns-resize`}],[`left`,{top:8,bottom:8,left:0,width:5,cursor:`ew-resize`}],[`right`,{top:8,bottom:8,right:0,width:5,cursor:`ew-resize`}],[`topleft`,{top:0,left:0,width:10,height:10,cursor:`nwse-resize`}],[`topright`,{top:0,right:0,width:10,height:10,cursor:`nesw-resize`}],[`bottomleft`,{bottom:0,left:0,width:10,height:10,cursor:`nesw-resize`}],[`bottomright`,{bottom:0,right:0,width:10,height:10,cursor:`nwse-resize`}]];function ti(){return(0,I.jsx)(I.Fragment,{children:ei.map(([e,t])=>(0,I.jsx)(`div`,{onMouseDown:t=>{t.preventDefault(),L.send({type:`window.resize`,payload:{direction:e}})},style:{position:`fixed`,zIndex:1e3,...t}},e))})}async function ni(){return L.available?(await L.request(`history.list`)).entries??[]:[]}async function ri(){L.available&&await L.request(`history.clear`)}async function ii(e){L.available?await L.request(`popup.show`,{url:e}):window.open(e,`_blank`,`noopener,noreferrer`)}async function ai(){return L.available?(await L.request(`clipboard.read`)).text??null:null}function oi(){L.available?L.send({type:`popup.close`}):window.close()}function si(){L.send({type:`selection.hide`})}async function ci(){return await L.request(`app.registerProtocols`)}async function li(){return await L.request(`app.registerCustomScheme`)}async function ui(){await L.request(`app.unregisterProtocols`)}async function di(){return L.available?await L.request(`app.protocolStatus`):{isDefault:!1,customSchemeRegistered:!1,pathMatches:!1,registeredPath:null}}async function fi(){return L.available?await L.request(`app.startup`):{supported:!1,enabled:!1}}async function pi(e){return await L.request(`app.setStartup`,{enabled:e})}async function mi(){await L.request(`app.openDefaultApps`)}function hi(e){L.send({type:`popup.resize`,payload:{height:Math.round(e)}})}async function gi(){return L.available?await L.request(`app.info`):{version:`dev`,platform:`windows`,logDirectory:``,rounded:!1}}async function _i(){L.available&&await L.request(`app.openLogs`)}var vi=`https://github.com/T2PeNBiX99wcoxKv3A4g/URLCheck/releases/latest`;async function yi(){return L.available?await L.request(`app.updateStatus`)??null:null}async function bi(){return L.available?await L.request(`app.checkUpdate`):{current:`dev`,latest:`dev`,available:!1}}async function xi(){if(!L.available)return!1;let e=await L.request(`app.protocolStatus`);return e.isDefault&&e.pathMatches}var Si=F(Mr)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
`,Ci=F.div`
    position: relative;
    flex: 1;
    max-width: 400px;
    display: flex;
    align-items: center;

    svg {
        position: absolute;
        left: 14px;
        stroke: #9ca3af;
    }
`,wi=F.input`
    width: 100%;
    padding: 10px 14px 10px 42px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    background: rgba(15, 23, 42, 0.75);
    color: #f9fafb;
    font-size: 0.9rem;
    outline: none;
    font-family: inherit;
    transition: all 0.2s ease;

    &:focus {
        background: rgba(15, 23, 42, 0.95);
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
    }

    &::placeholder {
        color: #6b7280;
    }
`,Ti=F.button`
    padding: 10px 16px;
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.85rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
        background: rgba(239, 68, 68, 0.25);
        color: #fca5a5;
        border-color: rgba(239, 68, 68, 0.5);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`,Ei=F(Mr)`
    padding: 0;
    overflow: hidden;
`,Di=F.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;

    th {
        text-align: left;
        padding: 12px 18px;
        background: rgba(15, 23, 42, 0.7);
        color: #9ca3af;
        font-weight: 600;
        font-size: 0.8rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        text-transform: uppercase;
        letter-spacing: 0.03em;
    }

    td {
        padding: 14px 18px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        color: #e2e8f0;
        transition: background 0.2s ease, box-shadow 0.2s ease;
    }

    /* Starting value for the accent bar so it slides in instead of popping. */

    td:first-child {
        box-shadow: inset 0 0 0 0 rgba(96, 165, 250, 0);
    }

    tr:last-child td {
        border-bottom: none;
    }

    tr:hover td {
        background: rgba(59, 130, 246, 0.09);
    }

    tr:hover td:first-child {
        box-shadow: inset 3px 0 0 0 #60a5fa;
    }
`,Oi=F.td`
    word-break: break-all;
`,ki=F.button`
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    font-family: var(--font-mono);
    color: #60a5fa;
    text-align: left;
    word-break: break-all;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.15s ease;

    &:hover {
        color: #93c5fd;
    }
`,Ai=F.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 8px;
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #f87171;
    font-size: 0.85rem;
`;function ji(e,t){let n=new Date(e);return Number.isNaN(n.getTime())?String(e):n.toLocaleString(t)}var Mi=()=>{let e=qr(),t=Jr(),[n,r]=(0,_.useState)([]),[i,a]=(0,_.useState)(``),[o,s]=(0,_.useState)(!0),[c,l]=(0,_.useState)(null);(0,_.useEffect)(()=>{let e=!1;return(async()=>{try{let t=await ni();e||r(t)}catch(t){e||l(t instanceof Error?t.message:String(t))}finally{e||s(!1)}})(),()=>{e=!0}},[]);let u=n.filter(e=>e.url.toLowerCase().includes(i.toLowerCase()));(0,_.useEffect)(()=>{let e=!1,t,n=async()=>{try{let t=await ni();e||r(t)}catch{}},i=L.on(e=>{e.type===`history.changed`&&(window.clearTimeout(t),t=window.setTimeout(()=>{n()},150))});return()=>{e=!0,window.clearTimeout(t),i()}},[]);let d=async e=>{l(null);try{await ii(e)}catch(e){l(e instanceof Error?e.message:String(e))}};return(0,I.jsxs)(jr,{children:[c&&(0,I.jsxs)(Ai,{children:[(0,I.jsx)(br,{size:16}),(0,I.jsx)(`span`,{children:e(c)})]}),(0,I.jsxs)(Si,{children:[(0,I.jsxs)(Ci,{children:[(0,I.jsx)(Sr,{size:18}),(0,I.jsx)(wi,{type:`text`,placeholder:e(`history.searchPlaceholder`),value:i,onChange:e=>a(e.target.value)})]}),(0,I.jsxs)(Ti,{onClick:async()=>{l(null);try{await ri(),r([])}catch(e){l(e instanceof Error?e.message:String(e))}},disabled:n.length===0,children:[(0,I.jsx)(Dr,{size:15}),(0,I.jsx)(`span`,{children:e(`history.clearAll`)})]})]}),(0,I.jsx)(Ei,{children:(0,I.jsxs)(Di,{children:[(0,I.jsx)(`thead`,{children:(0,I.jsxs)(`tr`,{children:[(0,I.jsx)(`th`,{style:{width:`200px`},children:e(`history.timestamp`)}),(0,I.jsx)(`th`,{children:e(`history.url`)})]})}),(0,I.jsx)(`tbody`,{children:u.length>0?u.map(n=>(0,I.jsxs)(`tr`,{"data-history-url":n.url,children:[(0,I.jsx)(`td`,{style:{color:`#9ca3af`,fontSize:`0.85rem`},children:ji(n.timestamp,t)}),(0,I.jsx)(Oi,{children:(0,I.jsx)(ki,{onClick:()=>d(n.url),title:e(`history.openTooltip`),children:n.url})})]},n.id)):(0,I.jsx)(`tr`,{children:(0,I.jsx)(`td`,{colSpan:2,style:{textAlign:`center`,padding:`36px`,color:`#6b7280`},children:e(o?`history.loading`:`history.empty`)})})})]})})]})},Ni=(0,_.createContext)(()=>{});function Pi(){return(0,_.useContext)(Ni)}var Fi=F.h3`
    font-size: 1.05rem;
    font-weight: 700;
    color: #f9fafb;
    display: flex;
    align-items: center;
    gap: 8px;
`,Ii=F.p`
    font-size: 0.85rem;
    color: #9ca3af;
    line-height: 1.6;
`,Li=F.form`
    display: flex;
    gap: 12px;
`,Ri=F.div`
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;

    svg {
        position: absolute;
        left: 16px;
        stroke: #9ca3af;
    }
`,zi=F.input`
    width: 100%;
    padding: 14px 16px 14px 48px;
    font-size: 0.95rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    background: rgba(15, 23, 42, 0.75);
    color: #f9fafb;
    outline: none;
    font-family: inherit;
    transition: all 0.2s ease;

    &:focus {
        background: rgba(15, 23, 42, 0.95);
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
    }

    &::placeholder {
        color: #6b7280;
    }
`,Bi=F.button`
    padding: 0 24px;
    height: 50px;
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    transition: all 0.2s ease;
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.35);

    /* Gradients cannot be interpolated, so the hover motion lives in the glow and lift. */

    &:hover:not(:disabled) {
        background: linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%);
        box-shadow: 0 0 28px rgba(99, 102, 241, 0.55);
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
        box-shadow: none;
    }
`,Vi=F.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
`,Hi=F.span`
    font-size: 0.8rem;
    color: #9ca3af;
    font-weight: 500;
`,Ui=F.button`
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    padding: 4px 10px;
    font-size: 0.75rem;
    color: #9ca3af;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
        background: rgba(31, 41, 55, 0.85);
        color: #f9fafb;
        border-color: rgba(99, 102, 241, 0.35);
    }
`,Wi=F.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 20px;
    border-radius: 12px;
    border: 1px solid rgba(245, 158, 11, 0.35);
    background: rgba(245, 158, 11, 0.12);
    color: #fbbf24;
    transition: border-color 0.25s ease, background 0.25s ease;

    &:hover {
        border-color: rgba(245, 158, 11, 0.5);
        background: rgba(245, 158, 11, 0.16);
    }

    @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
    }
`,Gi=F.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`,Ki=F.span`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.95rem;
    font-weight: 700;
`,qi=F.span`
    font-size: 0.82rem;
    color: #d1d5db;
    line-height: 1.55;
`,Ji=F.button`
    flex-shrink: 0;
    padding: 10px 18px;
    border-radius: 8px;
    border: none;
    background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
    color: #1f2937;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    white-space: nowrap;
    transition: filter 0.2s ease, transform 0.15s ease;

    &:hover {
        filter: brightness(1.1);
    }

    &:active {
        transform: scale(0.97);
    }
`,Yi=[`http://www.google.com/?ref=referrer&foo=bar#tag`,`https://www.google.com/search?q=photino+net&utm_source=test&utm_medium=email`,`https://example.com/path/to/page?key=value&lang=en#section`],Xi=Yi[0],Zi=()=>{let e=qr(),t=Pi(),[n,r]=(0,_.useState)(Xi),[i,a]=(0,_.useState)(!1),[o,s]=(0,_.useState)(!0);return(0,_.useEffect)(()=>{xi().then(s).catch(()=>s(!0))},[]),(0,I.jsxs)(jr,{$maxWidth:820,children:[!o&&(0,I.jsxs)(Wi,{children:[(0,I.jsxs)(Gi,{children:[(0,I.jsxs)(Ki,{children:[(0,I.jsx)(br,{size:16}),(0,I.jsx)(`span`,{children:e(`home.bannerTitle`)})]}),(0,I.jsx)(qi,{children:e(`home.bannerBody`)})]}),(0,I.jsx)(Ji,{onClick:()=>t(`settings`),children:e(`home.openSettings`)})]}),(0,I.jsxs)(Nr,{children:[(0,I.jsxs)(Fi,{children:[(0,I.jsx)(pr,{size:18}),(0,I.jsx)(`span`,{children:e(`home.openTitle`)})]}),(0,I.jsx)(Ii,{children:e(`home.openDescription`)}),(0,I.jsxs)(Li,{onSubmit:async e=>{e.preventDefault();let t=n.trim();if(t){a(!0);try{await ii(t)}finally{a(!1)}}},children:[(0,I.jsxs)(Ri,{children:[(0,I.jsx)(Sr,{size:20}),(0,I.jsx)(zi,{type:`text`,placeholder:`https://example.com/path?key=value`,value:n,onChange:e=>r(e.target.value)})]}),(0,I.jsxs)(Bi,{type:`submit`,disabled:i,children:[(0,I.jsx)(Cr,{size:18}),(0,I.jsx)(`span`,{children:e(`home.open`)})]})]}),(0,I.jsxs)(Vi,{children:[(0,I.jsx)(Hi,{children:e(`home.samples`)}),Yi.map(e=>(0,I.jsx)(Ui,{type:`button`,onClick:()=>r(e),children:e},e))]})]})]})},Qi=Un`
    from {
        opacity: 0;
        transform: translateY(6px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`,$i=Un`
    from {
        opacity: 0;
        transform: translateY(-6px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`,ea=F.div`
    position: absolute;
    ${e=>e.$up?`bottom: calc(100% + 6px);`:`top: calc(100% + 5px);`}
    left: 0;
    ${e=>e.$stretch?`right: 0;`:`min-width: 200px;`}
    max-height: 260px;
    overflow-y: auto;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: #111827;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
    z-index: 30;
    transform-origin: ${e=>e.$up?`bottom`:`top`};
    animation: ${e=>e.$up?Qi:$i} 0.16s cubic-bezier(0.22, 1, 0.36, 1);
`,ta=F.button`
    display: block;
    width: 100%;
    text-align: left;
    padding: 7px 9px;
    border: none;
    border-radius: 6px;
    background: ${e=>e.$active?`rgba(59, 130, 246, 0.2)`:`transparent`};
    color: ${e=>e.$active?`#ffffff`:`#e2e8f0`};
    font-size: ${e=>e.$mono?`0.72rem`:`0.8rem`};
    font-family: ${e=>e.$mono?`var(--font-mono)`:`inherit`};
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: background 0.15s ease, color 0.15s ease;

    &:hover {
        background: rgba(59, 130, 246, 0.18);
        color: #ffffff;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`,na=F.div`
    position: relative;
    display: inline-flex;
`;function ra(e,t,n){let[r,i]=(0,_.useState)({});return(0,_.useEffect)(()=>{if(!e)return;let r=()=>{let e=n.current?.getBoundingClientRect();if(!e)return;let r=t?e.top:window.innerHeight-e.bottom;i({maxHeight:Math.max(120,Math.floor(r-10))})};return r(),window.addEventListener(`resize`,r),()=>window.removeEventListener(`resize`,r)},[e,t,n]),r}var ia=F.button`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    cursor: pointer;
    outline: none;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, box-shadow 0.2s ease;

    ${e=>e.$variant===`compact`?`
        height: 30px;
        max-width: 170px;
        padding: 0 8px;
        border-radius: 7px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
        color: #d1d5db;
        font-size: 0.76rem;
        line-height: 1;
    `:`
        min-width: 200px;
        padding: 8px 12px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(15, 23, 42, 0.75);
        color: #f9fafb;
        font-size: 0.875rem;
    `}
    &:hover:not(:disabled) {
        ${e=>e.$variant===`compact`?`background: rgba(255, 255, 255, 0.12); color: #f9fafb;`:`border-color: rgba(255, 255, 255, 0.24);`}
    }

    &:focus-visible {
        border-color: #3b82f6;
        ${e=>e.$variant===`form`?`box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);`:``}
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`,aa=F.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`,R=F.span`
    flex-shrink: 0;
    font-size: 0.7em;
    opacity: 0.75;
    transition: transform 0.18s ease;
    transform: rotate(${e=>e.$open?`180deg`:`0`});
`,z=({value:e,options:t,onChange:n,variant:r=`compact`,up:i,disabled:a,title:o})=>{let[s,c]=(0,_.useState)(!1),l=(0,_.useRef)(null),u=ra(s,i,l);(0,_.useEffect)(()=>{if(!s)return;let e=e=>{l.current?.contains(e.target)||c(!1)},t=e=>{e.key===`Escape`&&c(!1)};return document.addEventListener(`mousedown`,e),document.addEventListener(`keydown`,t),()=>{document.removeEventListener(`mousedown`,e),document.removeEventListener(`keydown`,t)}},[s]);let d=t.find(t=>t.value===e)?.label??e;return(0,I.jsxs)(na,{ref:l,children:[(0,I.jsxs)(ia,{type:`button`,$variant:r,disabled:a,title:o,"aria-haspopup":`listbox`,"aria-expanded":s,onClick:()=>c(e=>!e),children:[(0,I.jsx)(aa,{children:d}),(0,I.jsx)(R,{$open:s,children:`▾`})]}),s&&(0,I.jsx)(ea,{$up:i,role:`listbox`,style:u,children:t.map(t=>(0,I.jsx)(ta,{type:`button`,role:`option`,"aria-selected":t.value===e,$active:t.value===e,onClick:()=>{c(!1),n(t.value)},children:t.label},t.value))})]})},oa={requestTimeoutMs:5e3,userAgents:[],browsers:[],language:`en`,borderlessPopup:!0,autoStripTrackingParams:!0,autoRedirectHosts:[],hideOnLaunch:!1,showUrlButton:!0,selectedUserAgentId:`default`,deviceName:``,deviceId:``,forwardingEnabled:!1,forwardPort:45454,devices:[]},sa=`urlcheck.settings`;function ca(e,t,n){return Math.min(Math.max(e,t),n)}function la(e){let t=Array.isArray(e.userAgents)?e.userAgents:oa.userAgents;return{...e,requestTimeoutMs:ca(e.requestTimeoutMs,1e3,15e3),userAgents:t,selectedUserAgentId:t.some(t=>t.id===e.selectedUserAgentId)?e.selectedUserAgentId:t[0].id,browsers:(Array.isArray(e.browsers)?e.browsers:[]).map(e=>({...e,arguments:e.arguments??``,useCount:e.useCount??0})),language:e.language||oa.language,borderlessPopup:e.borderlessPopup??oa.borderlessPopup,autoStripTrackingParams:e.autoStripTrackingParams??oa.autoStripTrackingParams,autoRedirectHosts:(Array.isArray(e.autoRedirectHosts)?e.autoRedirectHosts:[]).map(e=>e.trim().toLowerCase()).filter(e=>e.length>0),hideOnLaunch:e.hideOnLaunch??oa.hideOnLaunch,showUrlButton:e.showUrlButton??oa.showUrlButton,deviceName:e.deviceName??oa.deviceName,deviceId:e.deviceId??oa.deviceId,forwardingEnabled:e.forwardingEnabled??oa.forwardingEnabled,forwardPort:e.forwardPort??oa.forwardPort,devices:(Array.isArray(e.devices)?e.devices:[]).map(e=>({...e,host:e.host??``,port:e.port??oa.forwardPort,publicKey:e.publicKey??``,addresses:Array.isArray(e.addresses)?e.addresses:[]}))}}function ua(){try{let e=window.localStorage.getItem(sa);if(e)return la({...oa,...JSON.parse(e)})}catch(e){console.warn(`[settings] Failed to read local settings:`,e)}return{...oa}}async function da(){return L.available?await L.request(`settings.get`):{settings:ua(),settingsFilePath:`(browser localStorage)`}}async function fa(e){let t=la(e);return L.available?await L.request(`settings.save`,t):(window.localStorage.setItem(sa,JSON.stringify(t)),{settings:t,settingsFilePath:`(browser localStorage)`})}async function pa(){return L.available?await L.request(`settings.reset`):(window.localStorage.removeItem(sa),{settings:{...oa},settingsFilePath:`(browser localStorage)`})}async function ma(e){L.available&&await L.request(`settings.addAutoRedirect`,{url:e})}async function ha(){return L.available?(await L.request(`browsers.detect`)).browsers??[]:[]}async function ga(e,t,n=!1){L.available?await L.request(`popup.open`,{url:e,browserId:t,private:n}):window.open(e,`_blank`,`noopener,noreferrer`)}async function _a(e){L.available?await L.request(`browsers.openDefault`,{url:e}):window.open(e,`_blank`,`noopener,noreferrer`)}var va={deviceId:``,deviceName:``,port:0,addresses:[],enabled:!1,listening:!1,publicKey:``};async function ya(){return L.available?await L.request(`forward.info`):va}async function ba(e,t){await L.request(`forward.send`,{url:e,deviceId:t})}async function xa(){if(!L.available)return new Set;let e=await L.request(`forward.presence`);return new Set(e.online??[])}function Sa(){L.send({type:`forward.discoverStart`})}function Ca(){L.send({type:`forward.discoverStop`})}function wa(e,t){L.send({type:`forward.pair`,payload:{host:e,port:t}})}function Ta(e,t){L.send({type:`forward.pairRespond`,payload:{requestId:e,accept:t}})}async function Ea(){return L.available?await L.request(`forward.pendingPairing`)??null:null}function Da(e){L.send({type:`forward.remove`,payload:{deviceId:e}})}async function Oa(e,t){await L.request(`forward.addAddress`,{deviceId:e,address:t})}function ka(e,t){L.send({type:`forward.removeAddress`,payload:{deviceId:e,address:t}})}var Aa={lists:[],builtinRuleCount:0};async function ja(){return L.available?await L.request(`filters.get`):Aa}async function Ma(e,t){return await L.request(`filters.add`,{name:e,url:t})}async function Na(e){return await L.request(`filters.remove`,{id:e})}async function Pa(e,t){return await L.request(`filters.setEnabled`,{id:e,enabled:t})}async function Fa(e){return await L.request(`filters.update`,{id:e??``})}async function Ia(){return L.available?(await L.request(`filters.rules`)).rules:[]}var La=[{name:`AdGuard URL Tracking Protection`,url:`https://raw.githubusercontent.com/AdguardTeam/FiltersRegistry/master/filters/filter_17_TrackParam/filter.txt`,descriptionKey:`filters.catalog.adguardUrlTracking`},{name:`uBlock Origin – AdGuard URL Tracking Protection`,url:`https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy-removeparam.txt`,descriptionKey:`filters.catalog.uboUrlTracking`},{name:`ClearURLs`,url:`https://rules1.clearurls.xyz/data.minify.json`,descriptionKey:`filters.catalog.clearUrls`},{name:`Firefox – Query Parameter Stripping`,url:`https://firefox.settings.services.mozilla.com/v1/buckets/main/collections/query-stripping/records`,descriptionKey:`filters.catalog.firefox`}],Ra=`modulepreload`,za=function(e){return`/`+e},Ba={},Va=function(e){return e.pathname.endsWith(`.css`)},Ha=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},Ua=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=za(t,n);let r=s(t),i=Va(r);return Ha(Ba,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Ra,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Wa=_.lazy(()=>Ua(()=>import(`./AttributionPage-BETPaoES.js`).then(e=>({default:e.AttributionPage})),[])),Ga=F.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`,B=F.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Ka=F.span`
  font-size: 0.925rem;
  font-weight: 600;
  color: #f9fafb;
`,V=F.span`
  font-size: 0.8rem;
  color: #9ca3af;
`,qa=F.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 220px;

  input {
    flex: 1;
    accent-color: #6366f1;
    cursor: pointer;
  }

  input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  span {
    font-size: 0.85rem;
    font-weight: 600;
    color: #60a5fa;
    min-width: 50px;
    text-align: right;
    font-family: var(--font-mono);
  }
`,Ja=F.div`
  display: flex;
  align-items: center;
  gap: 12px;
  /* On a narrow window (or a high display scale) the buttons wrap instead of being clipped. */
  flex-wrap: wrap;
`,Ya=F.button`
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  /* Keep the label on one line and let the row wrap rather than squeezing the button. */
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    box-shadow: none;
  }
`,Xa=F(Ya)`
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
  color: #ffffff;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.35);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%);
    box-shadow: 0 0 24px rgba(99, 102, 241, 0.5);
  }
`,Za=Rn`
  background: rgba(239, 68, 68, 0.12);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.35);

  &:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.24);
    color: #fca5a5;
    border-color: rgba(239, 68, 68, 0.5);
  }
`,Qa=F(Ya)`
  ${Za}
`,$a=F(Ya)`
  ${Za}
  overflow: hidden;
  transform-origin: left center;

  &:disabled {
    opacity: ${e=>e.$visible?.55:0};
  }

  max-width: ${e=>e.$visible?`240px`:`0`};
  padding: ${e=>e.$visible?`10px 24px`:`0`};
  border-width: ${e=>e.$visible?`1px`:`0`};
  /* Collapsed, the item still sits between two 12px gaps; cancel one so the pair looks like one. */
  margin-left: ${e=>e.$visible?`0`:`-12px`};
  opacity: ${e=>+!!e.$visible};
  transform: ${e=>e.$visible?`translateX(0)`:`translateX(-8px)`};
  pointer-events: ${e=>e.$visible?`auto`:`none`};
  transition: max-width 0.28s ease, padding 0.28s ease, border-width 0.28s ease,
    margin-left 0.28s ease, opacity 0.28s ease, transform 0.28s ease, background 0.15s ease,
    color 0.15s ease, border-color 0.15s ease;
`,eo=F.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #34d399;
  font-size: 0.85rem;
  font-weight: 500;
`,to=F.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #f87171;
  font-size: 0.85rem;
`,no=F.div`
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  border-radius: 10px;
  border: solid rgba(251, 191, 36, 0.35);
  background: rgba(30, 27, 17, 0.92);
  backdrop-filter: blur(16px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  color: #fbbf24;
  font-size: 0.85rem;
  font-weight: 600;
  transform-origin: top;
  transition: opacity 0.28s ease, transform 0.28s ease, max-height 0.28s ease,
    padding 0.28s ease, border-width 0.28s ease, margin-bottom 0.28s ease;

  max-height: ${e=>e.$visible?`120px`:`0`};
  opacity: ${e=>+!!e.$visible};
  transform: ${e=>e.$visible?`translateY(0)`:`translateY(-8px)`};
  padding: ${e=>e.$visible?`10px 16px`:`0 16px`};
  border-width: ${e=>e.$visible?`1px`:`0`};
  margin-bottom: ${e=>e.$visible?`0`:`-24px`};
  pointer-events: ${e=>e.$visible?`auto`:`none`};
`,ro=F.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`,io=F.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
  min-width: 0;
  max-width: 800px;
`,ao=F.nav`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 144px;
  flex-shrink: 0;
  padding-top: 2px;
  user-select: none;

  /* Too narrow to keep both columns readable: the list steps aside. */
  @media (max-width: 900px) {
    display: none;
  }
`,oo=F.button`
  padding: 6px 10px;
  border: 0;
  border-radius: 7px;
  background: ${e=>e.$active?`rgba(59, 130, 246, 0.16)`:`transparent`};
  color: ${e=>e.$active?`#93c5fd`:`#9ca3af`};
  font: inherit;
  font-size: 0.76rem;
  font-weight: ${e=>e.$active?`600`:`500`};
  line-height: 1.35;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #f9fafb;
  }
`,so=F(Nr)`
  scroll-margin-top: 28px;
`,co=F.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fbbf24;
  flex-shrink: 0;
  animation: unsavedPulse 1.8s ease-out infinite;

  @keyframes unsavedPulse {
    0% {
      box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.5);
    }
    70% {
      box-shadow: 0 0 0 8px rgba(251, 191, 36, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(251, 191, 36, 0);
    }
  }
`,lo=F.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.75rem;
  color: #6b7280;

  code {
    color: #9ca3af;
    font-family: var(--font-mono);
    word-break: break-all;
  }
`,uo=F.button`
  align-self: flex-start;
  padding: 0;
  border: none;
  background: none;
  color: #6b7280;
  font-size: 0.78rem;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.15s ease;

  &:hover {
    color: #9ca3af;
  }
`,fo=F.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,po=F.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,mo=F.input`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(15, 23, 42, 0.75);
  color: #f9fafb;
  font-size: 0.82rem;
  outline: none;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #3b82f6;
    background: rgba(15, 23, 42, 0.95);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  }

  &.name {
    width: 150px;
    flex-shrink: 0;
  }

  &.path {
    flex: 1;
    font-family: var(--font-mono);
  }

  &.args {
    flex: 0 0 160px;
    font-family: var(--font-mono);
  }

  &.port {
    width: 90px;
    flex-shrink: 0;
    font-family: var(--font-mono);
  }
`,ho=F.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: #d1d5db;
  font-weight: 500;
  font-size: 0.82rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.12);
    color: #f9fafb;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`,go=F(ho)`
  border-color: rgba(239, 68, 68, 0.35);
  background: rgba(239, 68, 68, 0.12);
  color: #f87171;

  &:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.24);
    color: #fca5a5;
  }
`,_o=F.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 6px;
  flex-shrink: 0;
  transition: color 0.15s ease, background 0.15s ease, transform 0.15s ease;

  &:hover {
    color: #f87171;
    background: rgba(239, 68, 68, 0.12);
    transform: scale(1.08);
  }

  &:active {
    transform: scale(0.94);
  }
`,vo=F.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`,yo=F.span`
  font-size: 0.78rem;
  color: #9ca3af;
`,bo=F.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  line-height: 1.4;
  color: #fbbf24;
`,xo=F.div`
  align-self: center;
  padding: 10px 22px;
  border-radius: 10px;
  border: 1px solid rgba(99, 102, 241, 0.35);
  background: rgba(99, 102, 241, 0.12);
  color: #c7d2fe;
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.18em;
`,So=F.input.attrs({type:`checkbox`})`
  /* A fixed size: as a flex item it would otherwise be squeezed by however long the label is. */
  flex: none;
  width: 18px;
  height: 18px;
  accent-color: #6366f1;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.2s ease;

  &:hover:not(:disabled) {
    transform: scale(1.12);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Co=F.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,wo=F.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.5);
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.16);
    background: rgba(15, 23, 42, 0.72);
  }
`,To=F.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`,Eo=F.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #f9fafb;
  word-break: break-word;
`,Do=F.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Oo=F.span`
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${e=>e.$online?`#22c55e`:`#374151`};
  box-shadow: ${e=>e.$online?`0 0 6px rgba(34, 197, 94, 0.7)`:`none`};
`,ko=F.span`
  font-size: 0.75rem;
  color: #6b7280;
  font-family: var(--font-mono);
  word-break: break-all;
`,Ao=F.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: #9ca3af;
  font-family: var(--font-mono);
  word-break: break-all;

  span {
    flex: 1;
    min-width: 0;
  }
`,jo=F.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
`,Mo=F.span`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.75rem;
  color: #9ca3af;
`,No=F.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: #f87171;
  word-break: break-word;
`,Po=F.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`,Fo=F.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  font-size: 0.8rem;
  font-weight: 600;
  color: #34d399;
`,Io=F.button`
  position: relative;
  width: 38px;
  height: 22px;
  padding: 0;
  flex-shrink: 0;
  border-radius: 999px;
  border: 1px solid ${e=>e.$on?`#6366f1`:`rgba(255, 255, 255, 0.15)`};
  background: ${e=>e.$on?`#6366f1`:`rgba(255, 255, 255, 0.06)`};
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: ${e=>e.$on?`18px`:`2px`};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${e=>e.$on?`#ffffff`:`#9ca3af`};
    transition: left 0.2s ease, background 0.2s ease;
  }

  &:hover:not(:disabled) {
    background: ${e=>e.$on?`#4f46e5`:`rgba(255, 255, 255, 0.12)`};
    border-color: ${e=>e.$on?`#4f46e5`:`rgba(255, 255, 255, 0.24)`};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Lo=F.div`
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(3, 7, 18, 0.72);
  backdrop-filter: blur(4px);
  animation: overlayIn 0.2s ease;

  @keyframes overlayIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`,Ro=F.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 560px;
  max-height: 100%;
  overflow-y: auto;
  padding: 22px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #111827;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
  animation: dialogIn 0.22s cubic-bezier(0.22, 1, 0.36, 1);

  @keyframes dialogIn {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`,zo=F.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: #f9fafb;
`,Bo=F.div`
  display: flex;
  gap: 6px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`,Vo=F.button`
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  background: ${e=>e.$active?`rgba(59, 130, 246, 0.18)`:`transparent`};
  color: ${e=>e.$active?`#93c5fd`:`#9ca3af`};
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: ${e=>e.$active?`rgba(59, 130, 246, 0.24)`:`rgba(255, 255, 255, 0.06)`};
    color: #f9fafb;
  }
`,H=F.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 320px;
  overflow-y: auto;
  padding-right: 4px;
`,U=F.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(15, 23, 42, 0.6);
`,Ho=F.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`,Uo=F.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #f9fafb;
`,Wo=F.span`
  font-size: 0.78rem;
  line-height: 1.5;
  color: #9ca3af;
`,Go=F.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  background: rgba(59, 130, 246, 0.08);
  font-size: 0.78rem;
  line-height: 1.55;
  color: #cbd5e1;

  strong {
    font-weight: 600;
    color: #93c5fd;
  }
`,Ko=F.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.8rem;
  color: #9ca3af;
`,qo=F(mo)`
  width: 100%;
`,Jo={en:`English`,"zh-TW":`繁體中文`,"zh-CN":`简体中文`,ja:`日本語`},Yo=[`settings.network`,`settings.userAgent`,`settings.browsers`,`settings.forwarding`,`settings.forwardDevices`,`settings.systemIntegration`,`settings.autoRedirect`,`settings.filterLists`,`settings.startup`,`settings.about`],W=e=>e.replace(`.`,`-`),Xo=()=>{let e=qr(),t=Jr(),[n,r]=(0,_.useState)(Yo[0]),[i,a]=(0,_.useState)(oa),[o,s]=(0,_.useState)(oa),[c,l]=(0,_.useState)(``),[u,d]=(0,_.useState)([]),[f,p]=(0,_.useState)(!0),[m,h]=(0,_.useState)(!1),[g,v]=(0,_.useState)(!1),[y,b]=(0,_.useState)(null),[x,S]=(0,_.useState)(!1),[C,w]=(0,_.useState)(!1),[T,E]=(0,_.useState)(null),[D,ee]=(0,_.useState)(null),[te,ne]=(0,_.useState)(`windows`),[re,ie]=(0,_.useState)(``),[ae,oe]=(0,_.useState)(``),[O,se]=(0,_.useState)(null),[k,ce]=(0,_.useState)(!1),[le,ue]=(0,_.useState)([]),[de,fe]=(0,_.useState)(0),[pe,me]=(0,_.useState)(!1),[he,ge]=(0,_.useState)(!1),[_e,ve]=(0,_.useState)(`catalog`),[ye,be]=(0,_.useState)(``),[A,j]=(0,_.useState)(``),[xe,Se]=(0,_.useState)(!1),[Ce,we]=(0,_.useState)(!1),[Te,M]=(0,_.useState)(null),[Ee,De]=(0,_.useState)(!1),[Oe,ke]=(0,_.useState)(null),[Ae,je]=(0,_.useState)([]),[Me,Ne]=(0,_.useState)(()=>new Set),[Pe,Fe]=(0,_.useState)(!1),[Ie,Le]=(0,_.useState)(null),[Re,ze]=(0,_.useState)(null),[Be,Ve]=(0,_.useState)(``),[He,Ue]=(0,_.useState)(oa.forwardPort),[We,Ge]=(0,_.useState)({}),[Ke,qe]=(0,_.useState)(``);(0,_.useEffect)(()=>{let e=Yo.map(e=>document.getElementById(W(e)));if(e.some(e=>e===null))return;let t=new IntersectionObserver(e=>{let t=e.filter(e=>e.isIntersecting).sort((e,t)=>e.boundingClientRect.top-t.boundingClientRect.top)[0];t&&r(t.target.id)},{rootMargin:`-8% 0px -70% 0px`});return e.forEach(e=>t.observe(e)),()=>t.disconnect()},[]);let Je=e=>{r(e),document.getElementById(e)?.scrollIntoView({behavior:`smooth`,block:`start`})};(0,_.useEffect)(()=>{di().then(ee).catch(()=>ee(null))},[]),(0,_.useEffect)(()=>{ya().then(ke).catch(()=>ke(null)),Ea().then(ze).catch(()=>void 0),xa().then(Ne).catch(()=>void 0)},[]),(0,_.useEffect)(()=>L.on(e=>{let t=e;if(t.type===`forward.discovered`)je(t.data?.devices??[]);else if(t.type===`forward.pairState`){let e=t.data;e.state===`code`?Le({name:e.device?.name||e.device?.host||``,code:e.code,error:null}):e.state===`accepted`?(Le({name:e.device?.name??``,code:null,error:null}),setTimeout(()=>Le(null),1500)):Le(t=>({name:t?.name??``,code:null,error:e.error??`error.forwardFailed`}))}else t.type===`forward.pairRequest`&&ze(t.data),t.type===`forward.presence`&&Ne(new Set(t.data?.online??[]))}),[]),(0,_.useEffect)(()=>{gi().then(e=>{ne(e.platform),ie(e.version),oe(e.logDirectory)}).catch(()=>void 0),yi().then(se).catch(()=>void 0)},[]),(0,_.useEffect)(()=>{fi().then(M).catch(()=>M(null))},[]),(0,_.useEffect)(()=>{Wr().then(e=>d(e.available)).catch(()=>d([]))},[]),(0,_.useEffect)(()=>{let e=!1;return ja().then(t=>{e||Ye(t)}).catch(()=>void 0),()=>{e=!0}},[]);let Ye=e=>{ue(e.lists),fe(e.builtinRuleCount)},Xe=e=>le.some(t=>t.url.trim().toLowerCase()===e.trim().toLowerCase()),Ze=e=>{a(e.settings),s(e.settings),l(e.settingsFilePath)};(0,_.useEffect)(()=>{let e=!1;return(async()=>{try{let t=await da();if(e)return;Ze(t),b(null)}catch(t){if(e)return;b(t instanceof Error?t.message:String(t))}finally{e||p(!1)}})(),()=>{e=!0}},[]),(0,_.useEffect)(()=>L.on(e=>{let t=e;t.type===`settings.changed`&&t.data&&Ze(t.data)}),[]);let Qe=e=>{a(t=>({...t,...e}))},$e=()=>{v(!0),setTimeout(()=>v(!1),2500)},et=async()=>{h(!0),b(null);try{let e=await fa(i);Ze(e),$e(),ya().then(ke).catch(()=>ke(null))}catch(e){b(e instanceof Error?e.message:String(e))}finally{h(!1)}},tt=()=>{a(o),b(null)},nt=async()=>{h(!0),b(null);try{let e=await pa();Ze(e),$e(),ya().then(ke).catch(()=>ke(null))}catch(e){b(e instanceof Error?e.message:String(e))}finally{h(!1)}},N=f||m,rt=(0,_.useMemo)(()=>!f&&JSON.stringify(i)!==JSON.stringify(o),[i,o,f]),it=e=>{let t=e.trim();if(!t)return``;try{return new URL(t).hostname.toLowerCase()}catch{return t.split(/[/?#]/)[0].replace(/:\d+$/,``).replace(/^\.+|\.+$/g,``).toLowerCase()}},at=()=>{let e=it(Ke);e&&(a(t=>({...t,autoRedirectHosts:t.autoRedirectHosts.includes(e)?t.autoRedirectHosts:[...t.autoRedirectHosts,e]})),qe(``))},ot=e=>{a(t=>({...t,autoRedirectHosts:t.autoRedirectHosts.filter(t=>t!==e)}))},st=(e,t)=>{a(n=>({...n,browsers:n.browsers.map(n=>n.id===e?{...n,...t}:n)}))},ct=()=>{let e=Math.random().toString(36).slice(2,10);a(t=>({...t,browsers:[...t.browsers,{id:e,name:``,executablePath:``,arguments:``,useCount:0}]}))},lt=e=>{a(t=>({...t,browsers:t.browsers.filter(t=>t.id!==e)}))},ut=(e,t)=>{a(n=>({...n,userAgents:n.userAgents.map(n=>n.id===e?{...n,...t}:n)}))},dt=()=>{let e=Math.random().toString(36).slice(2,10);a(t=>({...t,userAgents:[...t.userAgents,{id:e,name:`Custom`,value:``}]}))},ft=e=>{a(t=>({...t,userAgents:t.userAgents.filter(t=>t.id!==e)}))},pt=async()=>{S(!0),b(null);try{let e=await ha();a(t=>{let n=new Set(t.browsers.map(e=>e.executablePath.toLowerCase())),r=e.filter(e=>!n.has(e.executablePath.toLowerCase()));return{...t,browsers:[...t.browsers,...r]}}),e.length===0&&E({key:`settings.noBrowsersDetected`})}catch(e){b(e instanceof Error?e.message:String(e))}finally{S(!1)}},mt=async()=>{w(!0),E(null);try{let e=await ci();E({key:`settings.registeredHttp`,params:{path:e.executablePath}}),ee(await di())}catch(e){b(e instanceof Error?e.message:String(e))}finally{w(!1)}},ht=async()=>{w(!0),E(null);try{let e=await li();E({key:`settings.registeredUrlcheck`,params:{path:e.executablePath}}),ee(await di())}catch(e){b(e instanceof Error?e.message:String(e))}finally{w(!1)}},gt=async()=>{w(!0),E(null);try{await ui(),E({key:`settings.unregistered`}),ee(await di())}catch(e){b(e instanceof Error?e.message:String(e))}finally{w(!1)}},_t=async()=>{w(!0);try{await mi(),E({key:`settings.openedDefaultApps`})}catch(e){b(e instanceof Error?e.message:String(e))}finally{w(!1)}},vt=async()=>{try{await _i()}catch(e){b(e instanceof Error?e.message:String(e))}},yt=async()=>{ce(!0),se(null),b(null);try{se(await bi())}catch(e){b(e instanceof Error?e.message:String(e))}finally{ce(!1)}},bt=async()=>{try{await _a(vi)}catch(e){b(e instanceof Error?e.message:String(e))}},xt=async e=>{let t={...i,language:e};a(t),b(null);try{let e=await fa(t);Ze(e)}catch(e){b(e instanceof Error?e.message:String(e))}},St=async(e,t)=>{t(!0),b(null);try{return Ye(await e()),!0}catch(e){return b(e instanceof Error?e.message:String(e)),!1}finally{t(!1)}},Ct=async(e,t)=>{await St(()=>Ma(e,t),Se)&&(be(``),j(``))},wt=e=>St(()=>Na(e),me),Tt=(e,t)=>St(()=>Pa(e,t),me),Et=()=>St(()=>Fa(),me),Dt=async e=>{De(!0),b(null);try{M(await pi(e))}catch(e){b(e instanceof Error?e.message:String(e))}finally{De(!1)}},Ot=Oe?.enabled??!1,kt=()=>{je([]),Fe(!0),Sa()},At=()=>{Fe(!1),Ca()},jt=(e,t)=>{Le({name:e,code:null,error:null}),wa(e,t)},Mt=()=>{Be.trim()&&jt(Be.trim(),He)},Nt=e=>{Re&&(Ta(Re.requestId,e),ze(null))},Pt=e=>async()=>{let t=(We[e]??``).trim();if(t)try{await Oa(e,t),b(null),Ge(t=>({...t,[e]:``}))}catch(e){b(e instanceof Error?e.message:String(e))}};return(0,I.jsxs)(jr,{$maxWidth:964,children:[(0,I.jsxs)(ro,{children:[(0,I.jsxs)(io,{children:[(0,I.jsxs)(no,{$visible:rt,children:[(0,I.jsx)(co,{}),(0,I.jsx)(`span`,{children:e(`settings.unsaved`)})]}),y&&(0,I.jsxs)(to,{children:[(0,I.jsx)(br,{size:16}),(0,I.jsx)(`span`,{children:e(y)})]}),(0,I.jsxs)(so,{id:W(`settings.network`),children:[(0,I.jsx)(Pr,{children:e(`settings.network`)}),(0,I.jsxs)(Ga,{children:[(0,I.jsxs)(B,{children:[(0,I.jsx)(Ka,{children:e(`settings.requestTimeout`)}),(0,I.jsx)(V,{children:e(`settings.requestTimeoutDescription`)})]}),(0,I.jsxs)(qa,{children:[(0,I.jsx)(`input`,{type:`range`,min:`1000`,max:`15000`,step:`500`,disabled:N,value:i.requestTimeoutMs,onChange:e=>Qe({requestTimeoutMs:Number(e.target.value)})}),(0,I.jsxs)(`span`,{children:[i.requestTimeoutMs/1e3,`s`]})]})]}),(0,I.jsxs)(Ga,{children:[(0,I.jsxs)(B,{children:[(0,I.jsx)(Ka,{children:e(`settings.language`)}),(0,I.jsx)(V,{children:e(`settings.languageDescription`)})]}),(0,I.jsx)(z,{variant:`form`,disabled:N||u.length===0,value:i.language,options:u.map(e=>({value:e,label:Jo[e]??e})),onChange:xt})]}),(0,I.jsxs)(Ga,{children:[(0,I.jsxs)(B,{children:[(0,I.jsx)(Ka,{children:e(`settings.borderlessPopup`)}),(0,I.jsx)(V,{children:e(`settings.borderlessPopupDescription`)})]}),(0,I.jsx)(So,{disabled:N,checked:i.borderlessPopup,onChange:e=>Qe({borderlessPopup:e.target.checked})})]}),(0,I.jsxs)(Ga,{children:[(0,I.jsxs)(B,{children:[(0,I.jsx)(Ka,{children:e(`settings.autoStripTracking`)}),(0,I.jsx)(V,{children:e(`settings.autoStripTrackingDescription`)})]}),(0,I.jsx)(So,{disabled:N,checked:i.autoStripTrackingParams,onChange:e=>Qe({autoStripTrackingParams:e.target.checked})})]}),(0,I.jsxs)(Ga,{children:[(0,I.jsxs)(B,{children:[(0,I.jsx)(Ka,{children:e(`settings.showUrlButton`)}),(0,I.jsx)(V,{children:e(`settings.showUrlButtonDescription`)})]}),(0,I.jsx)(So,{disabled:N,checked:i.showUrlButton,onChange:e=>Qe({showUrlButton:e.target.checked})})]})]}),(0,I.jsxs)(so,{id:W(`settings.userAgent`),children:[(0,I.jsx)(Pr,{children:e(`settings.userAgent`)}),(0,I.jsx)(B,{children:(0,I.jsx)(V,{children:e(`settings.userAgentDescription`)})}),(0,I.jsxs)(Ga,{children:[(0,I.jsx)(B,{children:(0,I.jsx)(Ka,{children:e(`settings.userAgentDefault`)})}),(0,I.jsx)(z,{variant:`form`,disabled:N||i.userAgents.length===0,value:i.selectedUserAgentId,options:i.userAgents.map(e=>({value:e.id,label:e.name})),onChange:e=>Qe({selectedUserAgentId:e})})]}),(0,I.jsx)(fo,{children:i.userAgents.map(t=>(0,I.jsxs)(po,{children:[(0,I.jsx)(mo,{className:`name`,placeholder:e(`settings.browserNamePlaceholder`),disabled:N,value:t.name,onChange:e=>ut(t.id,{name:e.target.value})}),(0,I.jsx)(mo,{className:`path`,placeholder:e(`settings.userAgentValuePlaceholder`),disabled:N,value:t.value,onChange:e=>ut(t.id,{value:e.target.value})}),(0,I.jsx)(_o,{type:`button`,title:e(`settings.removeUserAgent`),onClick:()=>ft(t.id),children:(0,I.jsx)(Dr,{size:16})})]},t.id))}),(0,I.jsx)(vo,{children:(0,I.jsx)(ho,{type:`button`,onClick:dt,disabled:N,children:e(`settings.addUserAgent`)})})]}),(0,I.jsxs)(so,{id:W(`settings.browsers`),children:[(0,I.jsx)(Pr,{children:e(`settings.browsers`)}),(0,I.jsx)(B,{children:(0,I.jsx)(V,{children:e(`settings.browsersDescription`)})}),(0,I.jsx)(fo,{children:i.browsers.map(t=>(0,I.jsxs)(po,{children:[(0,I.jsx)(mo,{className:`name`,placeholder:e(`settings.browserNamePlaceholder`),disabled:N,value:t.name,onChange:e=>st(t.id,{name:e.target.value})}),(0,I.jsx)(mo,{className:`path`,placeholder:e(`settings.browserPathPlaceholder`),disabled:N,value:t.executablePath,onChange:e=>st(t.id,{executablePath:e.target.value})}),(0,I.jsx)(mo,{className:`args`,placeholder:e(`settings.browserArgsPlaceholder`),title:e(`settings.browserArgsTitle`),disabled:N,value:t.arguments,onChange:e=>st(t.id,{arguments:e.target.value})}),(0,I.jsx)(_o,{type:`button`,title:e(`settings.removeBrowser`),onClick:()=>lt(t.id),children:(0,I.jsx)(Dr,{size:16})})]},t.id))}),(0,I.jsxs)(vo,{children:[(0,I.jsx)(ho,{type:`button`,onClick:ct,disabled:N,children:e(`settings.addBrowser`)}),(0,I.jsx)(ho,{type:`button`,onClick:pt,disabled:N||x,children:e(x?`settings.detecting`:`settings.detectInstalled`)})]})]}),(0,I.jsxs)(so,{id:W(`settings.forwarding`),children:[(0,I.jsx)(Pr,{children:e(`settings.forwarding`)}),(0,I.jsx)(B,{children:(0,I.jsx)(V,{children:e(`settings.forwardingDescription`)})}),(0,I.jsxs)(Ga,{children:[(0,I.jsxs)(B,{children:[(0,I.jsx)(Ka,{children:e(`settings.forwardingEnabled`)}),(0,I.jsx)(V,{children:e(`settings.forwardingEnabledDescription`)})]}),(0,I.jsx)(So,{disabled:N,checked:i.forwardingEnabled,onChange:e=>Qe({forwardingEnabled:e.target.checked})})]}),i.forwardingEnabled&&(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(Ga,{children:[(0,I.jsxs)(B,{children:[(0,I.jsx)(Ka,{children:e(`settings.deviceName`)}),(0,I.jsx)(V,{children:e(`settings.deviceNameDescription`)})]}),(0,I.jsx)(mo,{className:`name`,disabled:N,value:i.deviceName,onChange:e=>Qe({deviceName:e.target.value})})]}),(0,I.jsxs)(Ga,{children:[(0,I.jsxs)(B,{children:[(0,I.jsx)(Ka,{children:e(`settings.forwardPort`)}),(0,I.jsx)(V,{children:e(`settings.forwardPortDescription`)})]}),(0,I.jsx)(mo,{className:`port`,type:`number`,disabled:N,value:String(i.forwardPort),onChange:e=>Qe({forwardPort:Number(e.target.value)||0})})]}),Oe&&Oe.addresses.length>0&&(0,I.jsx)(yo,{children:e(`settings.forwardAddresses`,{port:i.forwardPort,addresses:Oe.addresses.join(`, `)})}),Oe&&(0,I.jsx)(yo,{children:e(`settings.forwardKey`,{key:(e=>e?`${e.slice(0,16)}…`:`—`)(Oe.publicKey)})}),Oe?.enabled&&!Oe.listening&&(0,I.jsxs)(bo,{children:[(0,I.jsx)(br,{size:14}),(0,I.jsx)(`span`,{children:e(`settings.forwardNotListening`)})]})]}),i.forwardingEnabled!==Ot&&(0,I.jsx)(yo,{children:e(`settings.forwardSaveFirst`)})]}),(0,I.jsxs)(so,{id:W(`settings.forwardDevices`),children:[(0,I.jsx)(Pr,{children:e(`settings.forwardDevices`)}),(0,I.jsxs)(B,{children:[(0,I.jsx)(V,{children:e(`settings.forwardDevicesDescription`)}),(0,I.jsx)(V,{children:e(`settings.forwardAddressesHint`)})]}),i.devices.length===0?(0,I.jsx)(yo,{children:e(`settings.forwardDevicesEmpty`)}):(0,I.jsx)(Co,{children:i.devices.map(t=>(0,I.jsxs)(wo,{children:[(0,I.jsxs)(To,{children:[(0,I.jsxs)(Do,{children:[(0,I.jsx)(Oo,{$online:Me.has(t.id),title:e(Me.has(t.id)?`settings.deviceOnline`:`settings.deviceOffline`)}),(0,I.jsx)(Eo,{children:t.name||t.host})]}),(0,I.jsxs)(ko,{children:[t.host,`:`,t.port]}),(t.addresses??[]).map(n=>(0,I.jsxs)(Ao,{children:[(0,I.jsxs)(`span`,{children:[`+ `,n,`:`,t.port]}),(0,I.jsx)(_o,{type:`button`,title:e(`settings.removeAddress`),onClick:()=>ka(t.id,n),children:(0,I.jsx)(Dr,{size:14})})]},n)),(0,I.jsxs)(jo,{children:[(0,I.jsx)(mo,{className:`path`,placeholder:e(`settings.deviceAddressPlaceholder`),disabled:!Ot,value:We[t.id]??``,onChange:e=>Ge(n=>({...n,[t.id]:e.target.value}))}),(0,I.jsx)(ho,{type:`button`,disabled:!Ot||!(We[t.id]??``).trim(),onClick:Pt(t.id),children:e(`settings.addAddress`)})]})]}),(0,I.jsx)(Po,{children:(0,I.jsx)(_o,{type:`button`,title:e(`settings.removeDevice`),onClick:()=>Da(t.id),children:(0,I.jsx)(Dr,{size:16})})})]},t.id))}),(0,I.jsx)(vo,{children:(0,I.jsx)(ho,{type:`button`,disabled:!Ot,onClick:kt,children:e(`settings.forwardSearch`)})}),(0,I.jsxs)(Ga,{children:[(0,I.jsxs)(B,{children:[(0,I.jsx)(Ka,{children:e(`settings.forwardManual`)}),(0,I.jsx)(V,{children:e(`settings.forwardManualDescription`)})]}),(0,I.jsxs)(vo,{children:[(0,I.jsx)(mo,{className:`path`,placeholder:e(`settings.deviceHostPlaceholder`),disabled:!Ot,value:Be,onChange:e=>Ve(e.target.value)}),(0,I.jsx)(mo,{className:`port`,type:`number`,disabled:!Ot,value:String(He),onChange:e=>Ue(Number(e.target.value)||0)}),(0,I.jsx)(ho,{type:`button`,disabled:!Ot||!Be.trim(),onClick:Mt,children:e(`settings.forwardPair`)})]})]})]}),(0,I.jsxs)(so,{id:W(`settings.systemIntegration`),children:[(0,I.jsx)(Pr,{children:e(`settings.systemIntegration`)}),(0,I.jsx)(B,{children:(0,I.jsx)(V,{children:e(te===`windows`?`settings.systemIntegrationDescription`:`settings.systemIntegrationDescriptionLinux`)})}),(0,I.jsxs)(vo,{children:[(0,I.jsxs)(ho,{type:`button`,onClick:mt,disabled:C,children:[(0,I.jsx)(pr,{size:15}),e(`settings.registerHttp`)]}),(0,I.jsxs)(ho,{type:`button`,onClick:ht,disabled:C,children:[(0,I.jsx)(pr,{size:15}),e(`settings.registerUrlcheck`)]}),te===`windows`&&(0,I.jsx)(ho,{type:`button`,onClick:_t,disabled:C,children:e(`settings.openDefaultApps`)}),(0,I.jsxs)(go,{type:`button`,onClick:gt,disabled:C,children:[(0,I.jsx)(Dr,{size:15}),e(`settings.unregister`)]})]}),D&&(0,I.jsx)(yo,{children:e(`settings.protocolStatus`,{isDefault:D.isDefault&&D.pathMatches?e(`settings.yes`):e(`settings.no`),scheme:D.customSchemeRegistered?e(`settings.yes`):e(`settings.no`)})}),D?.isDefault&&!D.pathMatches&&(0,I.jsxs)(bo,{children:[(0,I.jsx)(br,{size:14}),(0,I.jsx)(`span`,{children:e(`settings.pathMismatch`,{path:D.registeredPath??`?`})})]}),T&&(0,I.jsx)(yo,{children:e(T.key,T.params)})]}),(0,I.jsxs)(so,{id:W(`settings.autoRedirect`),children:[(0,I.jsx)(Pr,{children:e(`settings.autoRedirect`)}),(0,I.jsx)(B,{children:(0,I.jsx)(V,{children:e(`settings.autoRedirectDescription`)})}),i.autoRedirectHosts.length===0?(0,I.jsx)(yo,{children:e(`settings.autoRedirectEmpty`)}):(0,I.jsx)(Co,{children:i.autoRedirectHosts.map(t=>(0,I.jsxs)(wo,{children:[(0,I.jsx)(To,{children:(0,I.jsx)(Eo,{children:t})}),(0,I.jsx)(Po,{children:(0,I.jsx)(_o,{type:`button`,disabled:N,title:e(`settings.removeAutoRedirect`),onClick:()=>ot(t),children:(0,I.jsx)(Dr,{size:16})})})]},t))}),(0,I.jsxs)(vo,{children:[(0,I.jsx)(mo,{className:`name`,disabled:N,placeholder:e(`settings.autoRedirectPlaceholder`),value:Ke,onChange:e=>qe(e.target.value),onKeyDown:e=>{e.key===`Enter`&&(e.preventDefault(),at())}}),(0,I.jsx)(ho,{type:`button`,disabled:N||Ke.trim().length===0,onClick:at,children:e(`settings.addAutoRedirect`)})]})]}),(0,I.jsxs)(so,{id:W(`settings.filterLists`),children:[(0,I.jsx)(Pr,{children:e(`settings.filterLists`)}),(0,I.jsx)(B,{children:(0,I.jsx)(V,{children:e(`settings.filterListsDescription`,{count:de})})}),le.length===0?(0,I.jsx)(yo,{children:e(`settings.filterListsEmpty`)}):(0,I.jsx)(Co,{children:le.map(n=>(0,I.jsxs)(wo,{children:[(0,I.jsxs)(To,{children:[(0,I.jsx)(Eo,{children:n.name}),(0,I.jsx)(ko,{children:n.url}),(0,I.jsxs)(Mo,{children:[(0,I.jsx)(`span`,{children:e(`settings.filterRules`,{count:n.ruleCount})}),(0,I.jsx)(`span`,{children:n.lastUpdated?e(`settings.filterUpdated`,{date:new Date(n.lastUpdated).toLocaleString(t)}):e(`settings.filterNeverUpdated`)})]}),n.error&&(0,I.jsxs)(No,{children:[(0,I.jsx)(br,{size:13}),(0,I.jsx)(`span`,{children:e(n.error)})]})]}),(0,I.jsxs)(Po,{children:[(0,I.jsx)(Io,{type:`button`,$on:n.enabled,disabled:pe,"aria-pressed":n.enabled,title:e(n.enabled?`settings.filterDisable`:`settings.filterEnable`),onClick:()=>Tt(n.id,!n.enabled)}),(0,I.jsx)(_o,{type:`button`,disabled:pe,title:e(`settings.removeFilterList`),onClick:()=>wt(n.id),children:(0,I.jsx)(Dr,{size:16})})]})]},n.id))}),(0,I.jsxs)(vo,{children:[(0,I.jsx)(ho,{type:`button`,disabled:pe,onClick:()=>ge(!0),children:e(`settings.addFilterList`)}),(0,I.jsx)(ho,{type:`button`,disabled:pe||le.length===0,onClick:Et,children:e(pe?`settings.filterUpdating`:`settings.checkFilterUpdates`)})]})]}),(0,I.jsxs)(so,{id:W(`settings.startup`),children:[(0,I.jsx)(Pr,{children:e(`settings.startup`)}),(0,I.jsx)(B,{children:(0,I.jsx)(V,{children:e(`settings.startupDescription`)})}),Te?.supported&&(0,I.jsxs)(Ga,{children:[(0,I.jsxs)(B,{children:[(0,I.jsx)(Ka,{children:e(`settings.startWithSession`)}),(0,I.jsx)(V,{children:e(`settings.startWithSessionDescription`)})]}),(0,I.jsx)(So,{disabled:Ee,checked:Te.enabled,onChange:e=>Dt(e.target.checked)})]}),(0,I.jsxs)(Ga,{children:[(0,I.jsxs)(B,{children:[(0,I.jsx)(Ka,{children:e(`settings.hideOnLaunch`)}),(0,I.jsx)(V,{children:e(`settings.hideOnLaunchDescription`)})]}),(0,I.jsx)(So,{disabled:N,checked:i.hideOnLaunch,onChange:e=>Qe({hideOnLaunch:e.target.checked})})]})]}),(0,I.jsxs)(so,{id:W(`settings.about`),children:[(0,I.jsx)(Pr,{children:e(`settings.about`)}),(0,I.jsx)(B,{children:(0,I.jsx)(V,{children:e(`settings.aboutDescription`,{version:re||`…`})})}),(0,I.jsxs)(vo,{children:[(0,I.jsx)(ho,{type:`button`,disabled:k,onClick:yt,children:e(k?`settings.updateChecking`:`settings.checkUpdates`)}),O?.available&&(0,I.jsx)(ho,{type:`button`,onClick:bt,children:e(`settings.openRelease`)}),(0,I.jsx)(ho,{type:`button`,onClick:vt,children:e(`settings.openLogs`)})]}),O&&(O.available?(0,I.jsxs)(bo,{children:[(0,I.jsx)(br,{size:14}),(0,I.jsx)(`span`,{children:e(`settings.updateAvailable`,{version:O.latest})})]}):(0,I.jsx)(yo,{children:e(`settings.updateCurrent`,{version:O.current})})),ae&&(0,I.jsxs)(lo,{children:[(0,I.jsx)(`span`,{children:e(`settings.logsLocation`)}),(0,I.jsx)(`code`,{children:ae})]})]})]}),(0,I.jsx)(ao,{children:Yo.map(t=>(0,I.jsx)(oo,{$active:n===W(t),onClick:()=>Je(W(t)),type:`button`,children:e(t)},t))})]}),(0,I.jsxs)(Ja,{children:[(0,I.jsx)(Xa,{onClick:et,disabled:N,children:e(f?`settings.loading`:m?`settings.saving`:`settings.save`)}),(0,I.jsx)($a,{$visible:rt,type:`button`,onClick:tt,disabled:N,children:e(`settings.discard`)}),(0,I.jsx)(Qa,{onClick:nt,disabled:N,children:e(`settings.reset`)}),g&&(0,I.jsxs)(eo,{children:[(0,I.jsx)(yr,{size:16}),(0,I.jsx)(`span`,{children:e(`settings.saved`)})]})]}),(0,I.jsxs)(lo,{children:[(0,I.jsx)(`span`,{children:e(`settings.fileInfo`)}),(0,I.jsx)(`code`,{children:c||`...`})]}),(0,I.jsx)(uo,{type:`button`,onClick:()=>we(!0),children:e(`attribution.title`)}),Ce&&(0,I.jsx)(_.Suspense,{fallback:null,children:(0,I.jsx)(Wa,{onClose:()=>we(!1)})}),he&&(0,I.jsx)(Lo,{onClick:()=>!xe&&ge(!1),children:(0,I.jsxs)(Ro,{onClick:e=>e.stopPropagation(),children:[(0,I.jsx)(zo,{children:e(`settings.filterAddTitle`)}),(0,I.jsxs)(Bo,{children:[(0,I.jsx)(Vo,{type:`button`,$active:_e===`catalog`,onClick:()=>ve(`catalog`),children:e(`settings.filterAddFromCatalog`)}),(0,I.jsx)(Vo,{type:`button`,$active:_e===`custom`,onClick:()=>ve(`custom`),children:e(`settings.filterAddCustom`)})]}),_e===`catalog`?(0,I.jsx)(H,{children:La.map(t=>(0,I.jsxs)(U,{children:[(0,I.jsxs)(Ho,{children:[(0,I.jsx)(Uo,{children:t.name}),Xe(t.url)?(0,I.jsxs)(Fo,{children:[(0,I.jsx)(yr,{size:14}),e(`settings.filterAdded`)]}):(0,I.jsx)(ho,{type:`button`,disabled:xe,onClick:()=>Ct(t.name,t.url),children:e(xe?`settings.filterAdding`:`settings.filterAdd`)})]}),(0,I.jsx)(Wo,{children:e(t.descriptionKey)}),(0,I.jsx)(ko,{children:t.url})]},t.url))}):(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(Ko,{children:[e(`settings.filterName`),(0,I.jsx)(qo,{value:ye,placeholder:e(`settings.filterNamePlaceholder`),onChange:e=>be(e.target.value)})]}),(0,I.jsxs)(Ko,{children:[e(`settings.filterUrl`),(0,I.jsx)(qo,{value:A,placeholder:e(`settings.filterUrlPlaceholder`),onChange:e=>j(e.target.value)})]}),(0,I.jsx)(vo,{children:Xe(A)?(0,I.jsxs)(Fo,{children:[(0,I.jsx)(yr,{size:14}),e(`settings.filterAdded`)]}):(0,I.jsx)(ho,{type:`button`,disabled:xe||!ye.trim()||!A.trim(),onClick:()=>Ct(ye,A),children:e(xe?`settings.filterAdding`:`settings.filterAdd`)})})]}),(0,I.jsxs)(Go,{children:[(0,I.jsx)(`strong`,{children:e(`settings.filterFormatTitle`)}),(0,I.jsx)(`span`,{children:e(`settings.filterFormatBody`)})]}),(0,I.jsx)(vo,{children:(0,I.jsx)(ho,{type:`button`,disabled:xe,onClick:()=>ge(!1),children:e(`settings.filterCancel`)})})]})}),Pe&&(0,I.jsx)(Lo,{onClick:At,children:(0,I.jsxs)(Ro,{onClick:e=>e.stopPropagation(),children:[(0,I.jsx)(zo,{children:e(`settings.forwardSearchTitle`)}),(0,I.jsx)(V,{children:e(`settings.forwardSearchDescription`)}),Ae.length===0?(0,I.jsx)(yo,{children:e(`settings.forwardSearching`)}):(0,I.jsx)(H,{children:Ae.map(t=>(0,I.jsxs)(U,{children:[(0,I.jsxs)(Ho,{children:[(0,I.jsx)(Uo,{children:t.name||t.host}),(0,I.jsx)(ho,{type:`button`,onClick:()=>jt(t.host,t.port),children:e(`settings.forwardPair`)})]}),(0,I.jsxs)(ko,{children:[t.host,`:`,t.port]})]},t.id))}),(0,I.jsx)(vo,{children:(0,I.jsx)(ho,{type:`button`,onClick:At,children:e(`settings.filterCancel`)})})]})}),Ie&&(0,I.jsx)(Lo,{children:(0,I.jsxs)(Ro,{children:[(0,I.jsx)(zo,{children:e(`settings.forwardPairingTitle`,{name:Ie.name})}),Ie.error?(0,I.jsxs)(to,{children:[(0,I.jsx)(br,{size:16}),(0,I.jsx)(`span`,{children:e(Ie.error)})]}):Ie.code?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(V,{children:e(`settings.forwardPairingCodeHint`)}),(0,I.jsx)(xo,{children:Ie.code}),(0,I.jsx)(yo,{children:e(`settings.forwardPairingWaiting`)})]}):(0,I.jsx)(yo,{children:e(`settings.forwardPairingDone`)}),(0,I.jsx)(vo,{children:(0,I.jsx)(ho,{type:`button`,onClick:()=>Le(null),children:e(`settings.filterCancel`)})})]})}),Re&&(0,I.jsx)(Lo,{children:(0,I.jsxs)(Ro,{children:[(0,I.jsx)(zo,{children:e(`settings.forwardIncomingTitle`)}),(0,I.jsx)(V,{children:e(`settings.forwardIncomingDescription`,{name:Re.deviceName})}),(0,I.jsx)(V,{children:e(`settings.forwardPairingCodeHint`)}),(0,I.jsx)(xo,{children:Re.code}),(0,I.jsxs)(vo,{children:[(0,I.jsx)(go,{type:`button`,onClick:()=>Nt(!1),children:e(`settings.forwardReject`)}),(0,I.jsx)(Xa,{type:`button`,onClick:()=>Nt(!0),children:e(`settings.forwardAccept`)})]})]})})]})},Zo=c(o(((e,t)=>{var n=function(e){var t=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,n=0,r={},i={manual:e.Prism&&e.Prism.manual,disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,util:{encode:function e(t){return t instanceof a?new a(t.type,e(t.content),t.alias):Array.isArray(t)?t.map(e):t.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/\u00a0/g,` `)},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function e(t,n){n||={};var r,a;switch(i.util.type(t)){case`Object`:if(a=i.util.objId(t),n[a])return n[a];for(var o in r={},n[a]=r,t)t.hasOwnProperty(o)&&(r[o]=e(t[o],n));return r;case`Array`:return a=i.util.objId(t),n[a]?n[a]:(r=[],n[a]=r,t.forEach(function(t,i){r[i]=e(t,n)}),r);default:return t}},getLanguage:function(e){for(;e;){var n=t.exec(e.className);if(n)return n[1].toLowerCase();e=e.parentElement}return`none`},setLanguage:function(e,n){e.className=e.className.replace(RegExp(t,`gi`),``),e.classList.add(`language-`+n)},currentScript:function(){if(typeof document>`u`)return null;if(document.currentScript&&document.currentScript.tagName===`SCRIPT`)return document.currentScript;try{throw Error()}catch(r){var e=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack)||[])[1];if(e){var t=document.getElementsByTagName(`script`);for(var n in t)if(t[n].src==e)return t[n]}return null}},isActive:function(e,t,n){for(var r=`no-`+t;e;){var i=e.classList;if(i.contains(t))return!0;if(i.contains(r))return!1;e=e.parentElement}return!!n}},languages:{plain:r,plaintext:r,text:r,txt:r,extend:function(e,t){var n=i.util.clone(i.languages[e]);for(var r in t)n[r]=t[r];return n},insertBefore:function(e,t,n,r){r||=i.languages;var a=r[e],o={};for(var s in a)if(a.hasOwnProperty(s)){if(s==t)for(var c in n)n.hasOwnProperty(c)&&(o[c]=n[c]);n.hasOwnProperty(s)||(o[s]=a[s])}var l=r[e];return r[e]=o,i.languages.DFS(i.languages,function(t,n){n===l&&t!=e&&(this[t]=o)}),o},DFS:function e(t,n,r,a){a||={};var o=i.util.objId;for(var s in t)if(t.hasOwnProperty(s)){n.call(t,s,t[s],r||s);var c=t[s],l=i.util.type(c);l===`Object`&&!a[o(c)]?(a[o(c)]=!0,e(c,n,null,a)):l===`Array`&&!a[o(c)]&&(a[o(c)]=!0,e(c,n,s,a))}}},plugins:{},highlightAll:function(e,t){i.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,n){var r={callback:n,container:e,selector:`code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code`};i.hooks.run(`before-highlightall`,r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),i.hooks.run(`before-all-elements-highlight`,r);for(var a=0,o;o=r.elements[a++];)i.highlightElement(o,t===!0,r.callback)},highlightElement:function(t,n,r){var a=i.util.getLanguage(t),o=i.languages[a];i.util.setLanguage(t,a);var s=t.parentElement;s&&s.nodeName.toLowerCase()===`pre`&&i.util.setLanguage(s,a);var c={element:t,language:a,grammar:o,code:t.textContent};function l(e){c.highlightedCode=e,i.hooks.run(`before-insert`,c),c.element.innerHTML=c.highlightedCode,i.hooks.run(`after-highlight`,c),i.hooks.run(`complete`,c),r&&r.call(c.element)}if(i.hooks.run(`before-sanity-check`,c),s=c.element.parentElement,s&&s.nodeName.toLowerCase()===`pre`&&!s.hasAttribute(`tabindex`)&&s.setAttribute(`tabindex`,`0`),!c.code)i.hooks.run(`complete`,c),r&&r.call(c.element);else if(i.hooks.run(`before-highlight`,c),!c.grammar)l(i.util.encode(c.code));else if(n&&e.Worker){var u=new Worker(i.filename);u.onmessage=function(e){l(e.data)},u.postMessage(JSON.stringify({language:c.language,code:c.code,immediateClose:!0}))}else l(i.highlight(c.code,c.grammar,c.language))},highlight:function(e,t,n){var r={code:e,grammar:t,language:n};if(i.hooks.run(`before-tokenize`,r),!r.grammar)throw Error(`The language "`+r.language+`" has no grammar.`);return r.tokens=i.tokenize(r.code,r.grammar),i.hooks.run(`after-tokenize`,r),a.stringify(i.util.encode(r.tokens),r.language)},tokenize:function(e,t){var n=t.rest;if(n){for(var r in n)t[r]=n[r];delete t.rest}var i=new c;return l(i,i.head,e),s(e,i,t,i.head,0),d(i)},hooks:{all:{},add:function(e,t){var n=i.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=i.hooks.all[e];if(n&&n.length)for(var r=0,a;a=n[r++];)a(t)}},Token:a};e.Prism=i;function a(e,t,n,r){this.type=e,this.content=t,this.alias=n,this.length=(r||``).length|0}a.stringify=function e(t,n){if(typeof t==`string`)return t;if(Array.isArray(t)){var r=``;return t.forEach(function(t){r+=e(t,n)}),r}var a={type:t.type,content:e(t.content,n),tag:`span`,classes:[`token`,t.type],attributes:{},language:n},o=t.alias;o&&(Array.isArray(o)?Array.prototype.push.apply(a.classes,o):a.classes.push(o)),i.hooks.run(`wrap`,a);var s=``;for(var c in a.attributes)s+=` `+c+`="`+(a.attributes[c]||``).replace(/"/g,`&quot;`)+`"`;return`<`+a.tag+` class="`+a.classes.join(` `)+`"`+s+`>`+a.content+`</`+a.tag+`>`};function o(e,t,n,r){e.lastIndex=t;var i=e.exec(n);if(i&&r&&i[1]){var a=i[1].length;i.index+=a,i[0]=i[0].slice(a)}return i}function s(e,t,n,r,c,d){for(var f in n)if(n.hasOwnProperty(f)&&n[f]){var p=n[f];p=Array.isArray(p)?p:[p];for(var m=0;m<p.length;++m){if(d&&d.cause==f+`,`+m)return;var h=p[m],g=h.inside,_=!!h.lookbehind,v=!!h.greedy,y=h.alias;if(v&&!h.pattern.global){var b=h.pattern.toString().match(/[imsuy]*$/)[0];h.pattern=RegExp(h.pattern.source,b+`g`)}for(var x=h.pattern||h,S=r.next,C=c;S!==t.tail&&!(d&&C>=d.reach);C+=S.value.length,S=S.next){var w=S.value;if(t.length>e.length)return;if(!(w instanceof a)){var T=1,E;if(v){if(E=o(x,C,e,_),!E||E.index>=e.length)break;var D=E.index,ee=E.index+E[0].length,te=C;for(te+=S.value.length;D>=te;)S=S.next,te+=S.value.length;if(te-=S.value.length,C=te,S.value instanceof a)continue;for(var ne=S;ne!==t.tail&&(te<ee||typeof ne.value==`string`);ne=ne.next)T++,te+=ne.value.length;T--,w=e.slice(C,te),E.index-=C}else if(E=o(x,0,w,_),!E)continue;var D=E.index,re=E[0],ie=w.slice(0,D),ae=w.slice(D+re.length),oe=C+w.length;d&&oe>d.reach&&(d.reach=oe);var O=S.prev;ie&&(O=l(t,O,ie),C+=ie.length),u(t,O,T);var se=new a(f,g?i.tokenize(re,g):re,y,re);if(S=l(t,O,se),ae&&l(t,S,ae),T>1){var k={cause:f+`,`+m,reach:oe};s(e,t,n,S.prev,C,k),d&&k.reach>d.reach&&(d.reach=k.reach)}}}}}}function c(){var e={value:null,prev:null,next:null},t={value:null,prev:e,next:null};e.next=t,this.head=e,this.tail=t,this.length=0}function l(e,t,n){var r=t.next,i={value:n,prev:t,next:r};return t.next=i,r.prev=i,e.length++,i}function u(e,t,n){for(var r=t.next,i=0;i<n&&r!==e.tail;i++)r=r.next;t.next=r,r.prev=t,e.length-=i}function d(e){for(var t=[],n=e.head.next;n!==e.tail;)t.push(n.value),n=n.next;return t}if(!e.document)return e.addEventListener&&(i.disableWorkerMessageHandler||e.addEventListener(`message`,function(t){var n=JSON.parse(t.data),r=n.language,a=n.code,o=n.immediateClose;e.postMessage(i.highlight(a,i.languages[r],r)),o&&e.close()},!1)),i;var f=i.util.currentScript();f&&(i.filename=f.src,f.hasAttribute(`data-manual`)&&(i.manual=!0));function p(){i.manual||i.highlightAll()}if(!i.manual){var m=document.readyState;m===`loading`||m===`interactive`&&f&&f.defer?document.addEventListener(`DOMContentLoaded`,p):window.requestAnimationFrame?window.requestAnimationFrame(p):window.setTimeout(p,16)}return i}(typeof window<`u`?window:typeof WorkerGlobalScope<`u`&&self instanceof WorkerGlobalScope?self:{});t!==void 0&&t.exports&&(t.exports=n),typeof global<`u`&&(global.Prism=n),n.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:`attr-equals`},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:`named-entity`},/&#x?[\da-f]{1,8};/i]},n.languages.markup.tag.inside[`attr-value`].inside.entity=n.languages.markup.entity,n.languages.markup.doctype.inside[`internal-subset`].inside=n.languages.markup,n.hooks.add(`wrap`,function(e){e.type===`entity`&&(e.attributes.title=e.content.replace(/&amp;/,`&`))}),Object.defineProperty(n.languages.markup.tag,"addInlined",{value:function(e,t){var r={};r[`language-`+t]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:n.languages[t]},r.cdata=/^<!\[CDATA\[|\]\]>$/i;var i={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:r}};i[`language-`+t]={pattern:/[\s\S]+/,inside:n.languages[t]};var a={};a[e]={pattern:RegExp(`(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[\\s\\S])*?(?=<\\/__>)`.replace(/__/g,function(){return e}),`i`),lookbehind:!0,greedy:!0,inside:i},n.languages.insertBefore(`markup`,`cdata`,a)}}),Object.defineProperty(n.languages.markup.tag,"addAttribute",{value:function(e,t){n.languages.markup.tag.inside[`special-attr`].push({pattern:RegExp(`(^|["'\\s])(?:`+e+`)\\s*=\\s*(?:"[^"]*"|'[^']*'|[^\\s'">=]+(?=[\\s>]))`,`i`),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[t,`language-`+t],inside:n.languages[t]},punctuation:[{pattern:/^=/,alias:`attr-equals`},/"|'/]}}}})}}),n.languages.html=n.languages.markup,n.languages.mathml=n.languages.markup,n.languages.svg=n.languages.markup,n.languages.xml=n.languages.extend(`markup`,{}),n.languages.ssml=n.languages.xml,n.languages.atom=n.languages.xml,n.languages.rss=n.languages.xml,(function(e){var t=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp(`@[\\w-](?:[^;{\\s"']|\\s+(?!\\s)|`+t.source+`)*?(?:;|(?=\\s*\\{))`),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:`selector`},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp(`\\burl\\((?:`+t.source+`|(?:[^\\\\\\r\\n()"']|\\\\[\\s\\S])*)\\)`,`i`),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp(`^`+t.source+`$`),alias:`url`}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+t.source+`)*(?=\\s*\\{)`),lookbehind:!0},string:{pattern:t,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css;var n=e.languages.markup;n&&(n.tag.addInlined(`style`,`css`),n.tag.addAttribute(`style`,`css`))})(n),n.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},n.languages.javascript=n.languages.extend(`clike`,{"class-name":[n.languages.clike[`class-name`],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(`(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])`),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),n.languages.javascript[`class-name`][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,n.languages.insertBefore(`javascript`,`keyword`,{regex:{pattern:RegExp(`((?:^|[^$\\w\\xA0-\\uFFFF."'\\])\\s]|\\b(?:return|yield))\\s*)\\/(?:(?:\\[(?:[^\\]\\\\\\r\\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\\r\\n])+\\/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\\r\\n]|\\\\.|\\[(?:[^[\\]\\\\\\r\\n]|\\\\.|\\[(?:[^[\\]\\\\\\r\\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\\r\\n])+\\/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|\\/\\*(?:[^*]|\\*(?!\\/))*\\*\\/)*(?:$|[\\r\\n,.;:})\\]]|\\/\\/))`),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:`language-regex`,inside:n.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:`function`},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:n.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:n.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:n.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:n.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),n.languages.insertBefore(`javascript`,`string`,{hashbang:{pattern:/^#!.*/,greedy:!0,alias:`comment`},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:`string`},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:`punctuation`},rest:n.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:`property`}}),n.languages.insertBefore(`javascript`,`operator`,{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:`property`}}),n.languages.markup&&(n.languages.markup.tag.addInlined(`script`,`javascript`),n.languages.markup.tag.addAttribute(`on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)`,`javascript`)),n.languages.js=n.languages.javascript,(function(){if(n===void 0||typeof document>`u`)return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var e=`Loading…`,t=function(e,t){return`✖ Error `+e+` while fetching file: `+t},r=`✖ Error: File does not exist or is empty`,i={js:`javascript`,py:`python`,rb:`ruby`,ps1:`powershell`,psm1:`powershell`,sh:`bash`,bat:`batch`,h:`c`,tex:`latex`},a=`data-src-status`,o=`loading`,s=`loaded`,c=`failed`,l=`pre[data-src]:not([`+a+`="`+s+`"]):not([`+a+`="`+o+`"])`;function u(e,n,i){var a=new XMLHttpRequest;a.open(`GET`,e,!0),a.onreadystatechange=function(){a.readyState==4&&(a.status<400&&a.responseText?n(a.responseText):a.status>=400?i(t(a.status,a.statusText)):i(r))},a.send(null)}function d(e){var t=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(e||``);if(t){var n=Number(t[1]),r=t[2],i=t[3];return r?i?[n,Number(i)]:[n,void 0]:[n,n]}}n.hooks.add(`before-highlightall`,function(e){e.selector+=`, `+l}),n.hooks.add(`before-sanity-check`,function(t){var r=t.element;if(r.matches(l)){t.code=``,r.setAttribute(a,o);var f=r.appendChild(document.createElement(`CODE`));f.textContent=e;var p=r.getAttribute(`data-src`),m=t.language;if(m===`none`){var h=(/\.(\w+)$/.exec(p)||[,`none`])[1];m=i[h]||h}n.util.setLanguage(f,m),n.util.setLanguage(r,m);var g=n.plugins.autoloader;g&&g.loadLanguages(m),u(p,function(e){r.setAttribute(a,s);var t=d(r.getAttribute(`data-range`));if(t){var i=e.split(/\r\n?|\n/g),o=t[0],c=t[1]==null?i.length:t[1];o<0&&(o+=i.length),o=Math.max(0,Math.min(o-1,i.length)),c<0&&(c+=i.length),c=Math.max(0,Math.min(c,i.length)),e=i.slice(o,c).join(`
`),r.hasAttribute(`data-start`)||r.setAttribute(`data-start`,String(o+1))}f.textContent=e,n.highlightElement(f)},function(e){r.setAttribute(a,c),f.textContent=e})}}),n.plugins.fileHighlight={highlight:function(e){for(var t=(e||document).querySelectorAll(l),r=0,i;i=t[r++];)n.highlightElement(i)}};var f=!1;n.fileHighlight=function(){f||=(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),!0),n.plugins.fileHighlight.highlight.apply(this,arguments)}})()}))(),1);Prism.languages.lua={comment:/^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,string:{pattern:/(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[^z]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,greedy:!0},number:/\b0x[a-f\d]+(?:\.[a-f\d]*)?(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|(?:\.\d*)?(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,keyword:/\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,function:/(?!\d)\w+(?=\s*(?:[({]))/,operator:[/[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,{pattern:/(^|[^.])\.\.(?!\.)/,lookbehind:!0}],punctuation:/[\[\](){},;]|\.+|:+/};var Qo=F.div`
    position: relative;
    flex: 1;
    min-height: 0;
    overflow: hidden;
`,$o=Rn`
    position: absolute;
    inset: 0;
    margin: 0;
    padding: 16px;
    border: 0;
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.55;
    letter-spacing: normal;
    tab-size: 4;
    white-space: pre;
    word-break: normal;
    overflow-wrap: normal;
`,es=F.pre`
    ${$o};
    overflow: hidden;
    pointer-events: none;
    color: #e2e8f0;

    .token.comment {
        color: #6b7280;
        font-style: italic;
    }

    .token.keyword {
        color: #c792ea;
    }

    .token.string {
        color: #a5d6a7;
    }

    .token.number {
        color: #f9a825;
    }

    .token.boolean {
        color: #f9a825;
    }

    .token.function {
        color: #82aaff;
    }

    .token.operator {
        color: #89ddff;
    }

    .token.punctuation {
        color: #9ca3af;
    }

    .token.property {
        color: #93c5fd;
    }
`,ts=F.textarea`
    ${$o};
    resize: none;
    overflow: auto;
    background: transparent;
    color: transparent;
    caret-color: #93c5fd;
    outline: none;

    &::selection {
        background: rgba(96, 165, 250, 0.3);
    }
`,ns=({value:e,onChange:t})=>{let n=(0,_.useRef)(null),r=(0,_.useMemo)(()=>`${Zo.default.highlight(e,Zo.default.languages.lua,`lua`)}\n`,[e]);return(0,I.jsxs)(Qo,{children:[(0,I.jsx)(es,{"aria-hidden":!0,dangerouslySetInnerHTML:{__html:r},ref:n}),(0,I.jsx)(ts,{autoComplete:`off`,autoCorrect:`off`,onChange:e=>t(e.target.value),onKeyDown:n=>{if(n.key!==`Tab`)return;n.preventDefault();let r=n.currentTarget,i=r.selectionStart,a=r.selectionEnd;t(`${e.slice(0,i)}    ${e.slice(a)}`),requestAnimationFrame(()=>r.setSelectionRange(i+4,i+4))},onScroll:e=>{let t=n.current;t&&(t.scrollTop=e.currentTarget.scrollTop,t.scrollLeft=e.currentTarget.scrollLeft)},spellCheck:!1,value:e,wrap:`off`})]})};async function rs(e,t){try{let n=await L.request(e,t);return n.ok?null:n.error??`error.unknown`}catch(e){return e instanceof Error?e.message:String(e)}}async function is(){return L.available?await L.request(`scripts.list`):{scripts:[],directory:``}}async function as(e){return(await L.request(`scripts.read`,{name:e})).content}async function os(e,t){return await rs(`scripts.save`,{name:e,content:t})}async function ss(e){return await rs(`scripts.create`,{name:e})}async function cs(e){return await rs(`scripts.delete`,{name:e})}async function ls(){return await rs(`scripts.import`)}async function us(e){return await rs(`scripts.download`,{url:e})}async function ds(e){return await rs(`scripts.open`,{name:e})}async function fs(e,t,n){let r=await L.request(`scripts.test`,{name:e,url:t,content:n});return{url:r.url??t,error:r.error??null}}async function ps(){return L.available?(await L.request(`scripts.logs`)).entries:[]}async function ms(){await rs(`scripts.clearLogs`)}var hs=e=>/\.lua$/i.test(e)?e:`${e}.lua`,gs=()=>{let e=qr(),[t,n]=(0,_.useState)([]),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(null),[s,c]=(0,_.useState)(``),[l,u]=(0,_.useState)(``),[d,f]=(0,_.useState)(null),[p,m]=(0,_.useState)(!1),[h,g]=(0,_.useState)(`idle`),[v,y]=(0,_.useState)(``),[b,x]=(0,_.useState)(!1),[S,C]=(0,_.useState)([]),[w,T]=(0,_.useState)(``),[E,D]=(0,_.useState)(null),[ee,te]=(0,_.useState)(!1),ne=(0,_.useRef)(null),re=(0,_.useRef)(async()=>void 0),ie=s!==l,ae=()=>{o(null),c(``),u(``),x(!1),D(null)},oe=async e=>{f(null),x(!1),D(null);try{let t=await as(e);o(e),c(t),u(t)}catch(e){f(e instanceof Error?e.message:String(e))}},O=async e=>{let t=await is();n(t.scripts),i(t.directory);let r=e??a,o=t.scripts.find(e=>e.name===r)?.name??t.scripts[0]?.name;o?o!==a&&await oe(o):ae()};(0,_.useEffect)(()=>(O(),ps().then(C).catch(()=>C([])),L.on(e=>{if(e.type!==`scripts.log`)return;let t=e.data;t&&C(e=>[...e.slice(-199),t])})),[]),(0,_.useEffect)(()=>{let e=ne.current;e&&(e.scrollTop=e.scrollHeight)},[S.length]);let se=async()=>{if(!a)return;m(!0),f(null);let e=await os(a,s);m(!1),e?f(e):(u(s),await O())},k=async()=>{let e=v.trim();if(e.length===0)return;let t=hs(e);m(!0),f(null);let n=await ss(t);m(!1),n?f(n):(g(`idle`),y(``),await O(t))},ce=async()=>{let e=v.trim();if(e.length===0)return;m(!0),f(null);let t=await us(e);m(!1),t?f(t):(g(`idle`),y(``),await O())},le=async()=>{if(!a)return;if(!b){x(!0);return}m(!0);let e=await cs(a);m(!1),e?f(e):(ae(),await O())},ue=async()=>{m(!0),f(null);let e=await ls();m(!1),e&&f(e),await O()},de=()=>void(h===`new`?k():ce()),fe=async()=>{if(!a)return;let e=await ds(a);e&&f(e)},pe=async()=>{if(!a)return;let e=w.trim();if(e.length!==0){te(!0),f(null);try{D(await fs(a,e,s))}catch(e){f(e instanceof Error?e.message:String(e))}finally{te(!1)}}};return(0,_.useEffect)(()=>{re.current=se}),(0,_.useEffect)(()=>{let e=e=>{(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()===`s`&&(e.preventDefault(),re.current())};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[]),(0,I.jsxs)(_s,{$maxWidth:1180,children:[d&&(0,I.jsxs)(Hs,{children:[(0,I.jsx)(br,{size:16}),(0,I.jsx)(`span`,{children:e(d)})]}),(0,I.jsxs)(vs,{children:[(0,I.jsxs)(ys,{children:[(0,I.jsxs)(bs,{children:[(0,I.jsx)(`span`,{children:e(`tabs.scripts.label`)}),(0,I.jsx)(xs,{children:t.length}),(0,I.jsx)(Ss,{}),(0,I.jsx)(Cs,{title:r,children:r.split(/[\\/]/).pop()})]}),(0,I.jsxs)(ws,{children:[t.length===0&&(0,I.jsx)(Ys,{children:e(`scripts.empty`)}),t.map(t=>(0,I.jsxs)(Ts,{$active:t.name===a,onClick:()=>void oe(t.name),title:t.name,type:`button`,children:[(0,I.jsx)(`span`,{children:t.name}),t.error&&(0,I.jsx)(Es,{title:e(t.error),children:(0,I.jsx)(br,{size:14})})]},t.name))]}),(0,I.jsx)(Ds,{children:h===`idle`?(0,I.jsxs)(Os,{children:[(0,I.jsxs)(Xs,{disabled:p,onClick:()=>{g(`new`),y(``),f(null)},type:`button`,children:[(0,I.jsx)(Er,{size:16}),e(`scripts.new`)]}),(0,I.jsxs)(ks,{children:[(0,I.jsx)(Qs,{disabled:p,onClick:()=>void ue(),type:`button`,children:e(`scripts.import`)}),(0,I.jsx)(Qs,{disabled:p,onClick:()=>{g(`download`),y(``),f(null)},type:`button`,children:e(`scripts.download`)})]})]}):(0,I.jsxs)(Os,{children:[(0,I.jsx)(Us,{autoFocus:!0,onChange:e=>y(e.target.value),onKeyDown:e=>{e.key===`Enter`&&de(),e.key===`Escape`&&g(`idle`)},placeholder:e(h===`new`?`scripts.namePlaceholder`:`scripts.downloadPlaceholder`),value:v}),(0,I.jsxs)(ks,{children:[(0,I.jsx)(Xs,{disabled:p||v.trim().length===0,onClick:de,type:`button`,children:e(h===`new`?`scripts.create`:`scripts.download`)}),(0,I.jsx)(Zs,{onClick:()=>g(`idle`),type:`button`,children:e(`scripts.cancel`)})]})]})})]}),(0,I.jsxs)(As,{children:[(0,I.jsx)(js,{children:a?(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(Ms,{children:[(0,I.jsx)(vr,{size:16}),(0,I.jsx)(Ns,{children:a}),ie&&(0,I.jsx)(Ps,{title:e(`settings.unsaved`)}),(0,I.jsx)(Zs,{disabled:p,onClick:()=>void fe(),title:e(`scripts.openExternal`),type:`button`,children:(0,I.jsx)(Ar,{size:15})}),(0,I.jsx)(Zs,{disabled:!ie||p,onClick:()=>void se(),title:`Ctrl+S`,type:`button`,children:e(ie?`scripts.save`:`scripts.saved`)}),(0,I.jsx)($s,{$armed:b,disabled:p,onClick:()=>void le(),type:`button`,children:b?e(`scripts.deleteConfirm`):(0,I.jsx)(Dr,{size:15})})]}),(0,I.jsxs)(Fs,{children:[(0,I.jsx)(Is,{onChange:e=>T(e.target.value),onKeyDown:e=>{e.key===`Enter`&&pe()},placeholder:e(`scripts.testPlaceholder`),spellCheck:!1,value:w}),(0,I.jsxs)(Xs,{disabled:ee||p||w.trim().length===0,onClick:()=>void pe(),type:`button`,children:[(0,I.jsx)(Or,{size:14}),e(`scripts.test`)]})]}),E&&(0,I.jsx)(Ls,{$error:E.error!==null,children:E.error===null?(0,I.jsxs)(Rs,{children:[(0,I.jsx)(zs,{children:e(`scripts.testFinalUrl`)}),(0,I.jsx)(Bs,{children:E.url})]}):(0,I.jsx)(Bs,{$error:!0,children:E.error})}),(0,I.jsx)(ns,{onChange:c,value:s})]}):(0,I.jsxs)(Vs,{children:[(0,I.jsx)(vr,{size:30}),(0,I.jsx)(`span`,{children:e(`scripts.noScript`)})]})}),(0,I.jsxs)(Ws,{children:[(0,I.jsxs)(Gs,{children:[(0,I.jsx)(`span`,{children:e(`scripts.logs`)}),(0,I.jsx)(Zs,{onClick:()=>void ms().then(()=>C([])),type:`button`,children:e(`scripts.clearLogs`)})]}),(0,I.jsxs)(Ks,{ref:ne,children:[S.length===0&&(0,I.jsx)(Ys,{children:e(`scripts.logsEmpty`)}),S.map((e,t)=>(0,I.jsxs)(Js,{$error:e.level===`error`,children:[(0,I.jsx)(`time`,{children:e.time}),(0,I.jsx)(qs,{children:e.script}),(0,I.jsx)(`span`,{children:e.message})]},`${e.time}-${t}`))]})]})]})]})]})},_s=F(jr)`
    height: 100%;
    min-height: 420px;
    gap: 16px;
`,vs=F.div`
    display: flex;
    flex: 1;
    gap: 16px;
    min-height: 0;
`,ys=F.section`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 280px;
    flex-shrink: 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.75);
    overflow: hidden;
`,bs=F.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: #9ca3af;
    flex-shrink: 0;
`,xs=F.span`
    padding: 1px 7px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    font-size: 0.7rem;
    color: #9ca3af;
`,Ss=F.div`
    flex: 1;
`,Cs=F.span`
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0;
    color: #6b7280;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 110px;
`,ws=F.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    min-height: 0;
    padding: 10px 10px 118px;
    overflow-y: auto;
`,Ts=F.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 9px 12px;
    border: 1px solid ${e=>e.$active?`rgba(99, 102, 241, 0.35)`:`transparent`};
    border-radius: 8px;
    background: ${e=>e.$active?`rgba(59, 130, 246, 0.15)`:`transparent`};
    color: ${e=>e.$active?`#93c5fd`:`#9ca3af`};
    font: inherit;
    font-size: 0.85rem;
    text-align: left;
    cursor: pointer;
    overflow: hidden;

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.06);
        color: #f9fafb;
    }
`,Es=F.span`
    display: grid;
    place-items: center;
    color: #fbbf24;
    flex-shrink: 0;
`,Ds=F.div`
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.94);
    backdrop-filter: blur(14px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
`,Os=F.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`,ks=F.div`
    display: flex;
    gap: 8px;
`,As=F.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 12px;
    min-width: 0;
    min-height: 0;
`,js=F.section`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.75);
    overflow: hidden;
`,Ms=F.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    color: #9ca3af;
    flex-shrink: 0;
`,Ns=F.strong`
    flex: 1;
    font-size: 0.85rem;
    color: #f9fafb;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`,Ps=F.span`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #fbbf24;
    flex-shrink: 0;
`,Fs=F.div`
    display: flex;
    gap: 8px;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    flex-shrink: 0;
`,Is=F.input`
    flex: 1;
    min-width: 0;
    padding: 7px 10px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(15, 23, 42, 0.9);
    color: #f9fafb;
    font-family: var(--font-mono);
    font-size: 0.78rem;

    &:focus {
        outline: none;
        border-color: rgba(99, 102, 241, 0.6);
    }

    &::placeholder {
        color: #6b7280;
    }
`,Ls=F.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 8px 14px;
    max-height: 120px;
    overflow-y: auto;
    flex-shrink: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background: ${e=>e.$error?`rgba(239, 68, 68, 0.1)`:`rgba(15, 23, 42, 0.55)`};
    font-family: var(--font-mono);
    font-size: 0.75rem;
`,Rs=F.div`
    display: flex;
    gap: 8px;
    align-items: baseline;
`,zs=F.span`
    color: #6b7280;
    flex-shrink: 0;
`,Bs=F.span`
    color: ${e=>e.$error?`#f87171`:`#93c5fd`};
    overflow-wrap: anywhere;
`,Vs=F.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    flex: 1;
    padding: 32px;
    color: #6b7280;
    font-size: 0.85rem;
    text-align: center;
`,Hs=F.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 8px;
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #f87171;
    font-size: 0.85rem;
    flex-shrink: 0;
`,Us=F.input`
    width: 100%;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(15, 23, 42, 0.9);
    color: #f9fafb;
    font-family: var(--font-mono);
    font-size: 0.8rem;

    &:focus {
        outline: none;
        border-color: rgba(99, 102, 241, 0.6);
    }

    &::placeholder {
        color: #6b7280;
    }
`,Ws=F.section`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.75);
    overflow: hidden;
`,Gs=F.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 0.8rem;
    font-weight: 600;
    color: #f9fafb;
`,Ks=F.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 8px 0;
    height: 132px;
    overflow-y: auto;
    font-family: var(--font-mono);
    font-size: 0.76rem;
`,qs=F.span``,Js=F.div`
    display: flex;
    gap: 10px;
    padding: 2px 14px;
    color: ${e=>e.$error?`#f87171`:`#9ca3af`};

    time {
        color: #6b7280;
        flex-shrink: 0;
    }

    ${qs} {
        color: #93c5fd;
        flex-shrink: 0;
    }

    span {
        overflow-wrap: anywhere;
    }
`,Ys=F.p`
    padding: 16px;
    color: #6b7280;
    font-size: 0.82rem;
`,Xs=F.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 9px 14px;
    border-radius: 8px;
    border: 1px solid rgba(99, 102, 241, 0.45);
    background: rgba(59, 130, 246, 0.18);
    color: #bfdbfe;
    font: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;

    &:hover:not(:disabled) {
        background: rgba(59, 130, 246, 0.3);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`,Zs=F.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 7px 12px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: transparent;
    color: #9ca3af;
    font: inherit;
    font-size: 0.8rem;
    cursor: pointer;

    &:hover:not(:disabled) {
        color: #f9fafb;
        border-color: rgba(255, 255, 255, 0.25);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`,Qs=F(Zs)`
    flex: 1;
`,$s=F(Zs)`
    display: grid;
    place-items: center;
    min-width: 34px;
    color: ${e=>e.$armed?`#fecaca`:`#9ca3af`};
    border-color: ${e=>e.$armed?`rgba(239, 68, 68, 0.6)`:`rgba(255, 255, 255, 0.12)`};
    background: ${e=>e.$armed?`rgba(239, 68, 68, 0.18)`:`transparent`};
`,ec=[{id:`home`,labelKey:`tabs.home.label`,titleKey:`tabs.home.title`,subtitleKey:`tabs.home.subtitle`,icon:hr,page:Zi},{id:`history`,labelKey:`tabs.history.label`,titleKey:`tabs.history.title`,subtitleKey:`tabs.history.subtitle`,icon:gr,page:Mi},{id:`scripts`,labelKey:`tabs.scripts.label`,titleKey:`tabs.scripts.title`,subtitleKey:`tabs.scripts.subtitle`,icon:vr,page:gs},{id:`settings`,labelKey:`tabs.settings.label`,titleKey:`tabs.settings.title`,subtitleKey:`tabs.settings.subtitle`,icon:_r,page:Xo}],tc=ec[0].id;function nc(e){return ec.find(t=>t.id===e)??ec[0]}var rc=F.aside`
    width: 260px;
    background: rgba(17, 24, 39, 0.85);
    backdrop-filter: blur(16px);
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-shrink: 0;
    user-select: none;
`,ic=F.nav`
    padding: 18px 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
`,ac=F.button`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid ${e=>e.$active?`rgba(99, 102, 241, 0.35)`:`transparent`};
    background: ${e=>e.$active?`rgba(59, 130, 246, 0.15)`:`transparent`};
    color: ${e=>e.$active?`#60a5fa`:`#9ca3af`};
    font-weight: ${e=>e.$active?`600`:`500`};
    font-size: 0.925rem;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    text-align: left;

    &:hover {
        background: ${e=>e.$active?`rgba(59, 130, 246, 0.2)`:`rgba(255, 255, 255, 0.05)`};
        color: ${e=>e.$active?`#93c5fd`:`#f9fafb`};
        border-color: ${e=>e.$active?`rgba(99, 102, 241, 0.5)`:`rgba(255, 255, 255, 0.05)`};
    }

    svg {
        stroke: ${e=>e.$active?`#60a5fa`:`#9ca3af`};
        transition: stroke 0.2s ease;
    }

    &:hover svg {
        stroke: ${e=>e.$active?`#93c5fd`:`#f9fafb`};
    }
`,oc=F.div`
    padding: 16px 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    align-items: center;
    gap: 8px;
`,sc=F.span`
    font-size: 0.75rem;
    color: #6b7280;
    font-family: var(--font-mono);
`,cc=Un`
    0%, 100% {
        box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.5);
    }
    50% {
        box-shadow: 0 0 0 4px rgba(251, 191, 36, 0);
    }
`,lc=F.button`
    width: 8px;
    height: 8px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: #fbbf24;
    cursor: pointer;
    animation: ${cc} 2s ease-in-out infinite;
    transition: background 0.15s ease;

    &:hover {
        background: #fcd34d;
    }
`,uc=({currentTab:e,onSelectTab:t})=>{let n=qr(),[r,i]=(0,_.useState)(null),[a,o]=(0,_.useState)(null);return(0,_.useEffect)(()=>{gi().then(e=>i(e.version)).catch(()=>i(null))},[]),(0,_.useEffect)(()=>(yi().then(o).catch(()=>o(null)),L.on(e=>{let t=e;t.type===`app.update`&&t.data&&o(t.data)})),[]),(0,I.jsxs)(rc,{children:[(0,I.jsx)(ic,{children:ec.map(r=>{let i=r.icon;return(0,I.jsxs)(ac,{$active:e===r.id,onClick:()=>t(r.id),children:[(0,I.jsx)(i,{size:18}),(0,I.jsx)(`span`,{children:n(r.labelKey)})]},r.id)})}),(0,I.jsxs)(oc,{children:[(0,I.jsx)(sc,{children:r?`v${r}`:`…`}),a?.available&&(0,I.jsx)(lc,{type:`button`,title:n(`app.updateAvailable`,{version:a.latest}),onClick:()=>void _a(`https://github.com/T2PeNBiX99wcoxKv3A4g/URLCheck/releases/latest`).catch(()=>void 0)})]})]})},dc=F.header`
    height: 64px;
    background: rgba(17, 24, 39, 0.75);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    flex-shrink: 0;
`,fc=F.div`
    display: flex;
    flex-direction: column;
    animation: headerEnter 0.32s cubic-bezier(0.22, 1, 0.36, 1);

    @keyframes headerEnter {
        from {
            opacity: 0;
            transform: translateY(-6px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`,pc=F.h1`
    font-size: 1.25rem;
    font-weight: 700;
    color: #f9fafb;
    letter-spacing: -0.01em;
`,mc=F.span`
    font-size: 0.8rem;
    color: #9ca3af;
`,hc=({currentTab:e})=>{let t=qr(),n=nc(e);return(0,I.jsx)(dc,{children:(0,I.jsxs)(fc,{children:[(0,I.jsx)(pc,{children:t(n.titleKey)}),(0,I.jsx)(mc,{children:t(n.subtitleKey)})]},e)})},gc=()=>{let e=qr(),t=Zr(),n=Qr();return(0,I.jsxs)(_c,{children:[(0,I.jsxs)(vc,{...n,children:[(0,I.jsx)(yc,{children:(0,I.jsx)(mr,{size:17})}),(0,I.jsx)(bc,{children:`URLCheck`}),(0,I.jsx)(xc,{children:e(`app.tagline`)})]}),(0,I.jsx)(Sc,{...n}),(0,I.jsxs)(Cc,{children:[(0,I.jsx)(wc,{onClick:t.minimize,title:e(`window.minimize`),type:`button`,children:(0,I.jsx)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:(0,I.jsx)(`path`,{d:`M2 5h6`})})}),(0,I.jsx)(wc,{onClick:t.toggleMaximize,title:e(t.maximized?`window.restore`:`window.maximize`),type:`button`,children:t.maximized?(0,I.jsxs)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:[(0,I.jsx)(`rect`,{height:`6`,width:`6`,x:`3`,y:`1`}),(0,I.jsx)(`rect`,{height:`6`,width:`6`,x:`1`,y:`3`})]}):(0,I.jsx)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:(0,I.jsx)(`rect`,{height:`6`,width:`6`,x:`2`,y:`2`})})}),(0,I.jsx)(Tc,{onClick:t.close,title:e(`window.close`),type:`button`,children:(0,I.jsx)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:(0,I.jsx)(`path`,{d:`m2 2 6 6M8 2 2 8`})})})]})]})},_c=F.header`
    display: flex;
    align-items: stretch;
    height: 40px;
    flex-shrink: 0;
    background: rgba(17, 24, 39, 0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    user-select: none;
    -webkit-user-select: none;
`,vc=F.div`
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 0 14px 0 12px;
    flex-shrink: 0;
`,yc=F.span`
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    border-radius: 7px;
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
    color: #ffffff;
    box-shadow: 0 0 12px rgba(99, 102, 241, 0.35);
`,bc=F.strong`
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #f9fafb;
`,xc=F.span`
    font-size: 0.7rem;
    color: #6b7280;

    /* The first thing to go when the window gets narrow. */
    @media (max-width: 640px) {
        display: none;
    }
`,Sc=F.div`
    flex: 1;
    min-width: 24px;
`,Cc=F.div`
    display: flex;
    flex-shrink: 0;
`,wc=F.button`
    display: grid;
    place-items: center;
    width: 46px;
    height: 100%;
    border: 0;
    background: transparent;
    color: #9ca3af;
    cursor: pointer;
    transition: background 120ms ease, color 120ms ease;

    svg {
        width: 10px;
        height: 10px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.2;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.08);
        color: #f9fafb;
    }

    &:focus-visible {
        outline: 2px solid rgba(59, 130, 246, 0.6);
        outline-offset: -2px;
    }
`,Tc=F(wc)`
    &:hover {
        background: #e81123;
        color: #ffffff;
    }
`,Ec=F.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 48px 24px;
    border: 1px solid rgba(239, 68, 68, 0.25);
    border-radius: 12px;
    background: rgba(239, 68, 68, 0.08);
    color: #f87171;
    font-size: 0.9rem;
`,Dc=()=>{let e=qr();return(0,I.jsxs)(Ec,{children:[(0,I.jsx)(br,{size:28}),(0,I.jsx)(`span`,{children:e(`error.unknown`)})]})},Oc=class extends _.Component{state={failed:!1};static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(e){console.error(`Page crashed`,e)}render(){return this.state.failed?(0,I.jsx)(Dc,{}):this.props.children}},kc=F.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #0b0f19;
    background-image: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.12), transparent 70%);
    color: #f9fafb;

    /* GTK gives an undecorated window no frame at all, so the corners and the border are drawn
       here; the window itself is transparent behind them. */
    border-radius: ${e=>e.$rounded?`10px`:`0`};
    box-shadow: ${e=>e.$rounded?`inset 0 0 0 1px rgba(255, 255, 255, 0.1)`:`none`};
`,Ac=F.div`
    display: flex;
    flex: 1;
    min-height: 0;
    overflow: hidden;
`,jc=F.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    overflow: hidden;
`,Mc=F.main`
    flex: 1;
    padding: 28px 32px 40px;
    overflow-y: auto;
`;function Nc(){let[e,t]=(0,_.useState)(tc),n=$r();(0,_.useEffect)(()=>L.on(e=>{let n=e;n.type===`app.navigate`&&n.data?.tab&&t(n.data.tab)}),[]),(0,_.useEffect)(()=>{let e=window.setTimeout(()=>L.send({type:`app.ready`}),250);return()=>window.clearTimeout(e)},[]);let r=nc(e).page;return(0,I.jsxs)(kc,{$rounded:n,children:[(0,I.jsx)(gc,{}),(0,I.jsxs)(Ac,{children:[(0,I.jsx)(uc,{currentTab:e,onSelectTab:t}),(0,I.jsxs)(jc,{children:[(0,I.jsx)(hc,{currentTab:e}),(0,I.jsx)(Mc,{children:(0,I.jsx)(Ni.Provider,{value:t,children:(0,I.jsx)(Oc,{children:(0,I.jsx)(r,{})},e)})})]})]}),(0,I.jsx)(ti,{})]})}var Pc=new Set([`button`,`checkbox`,`color`,`file`,`hidden`,`image`,`radio`,`range`,`reset`,`submit`]),Fc=F.div`
    position: fixed;
    z-index: 2000;
    min-width: 200px;
    padding: 4px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(15, 23, 42, 0.98);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(12px);
`,Ic=F.button`
    display: block;
    width: 100%;
    padding: 8px 10px;
    border: none;
    border-radius: 7px;
    background: none;
    color: #e2e8f0;
    font-size: 0.85rem;
    text-align: left;
    cursor: pointer;
    font-family: inherit;

    &:hover {
        background: rgba(59, 130, 246, 0.18);
        color: #f9fafb;
    }
`,Lc=F.div`
    position: fixed;
    left: 50%;
    bottom: 24px;
    z-index: 2001;
    transform: translateX(-50%);
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid rgba(16, 185, 129, 0.3);
    background: rgba(6, 78, 59, 0.95);
    color: #6ee7b7;
    font-size: 0.8rem;
    pointer-events: none;
`;function Rc(e){return e?e instanceof HTMLTextAreaElement?!0:e instanceof HTMLInputElement?!Pc.has(e.type):e instanceof HTMLElement&&e.isContentEditable:!1}function zc(e){for(let t=e;t;t=t.parentElement)if(Rc(t))return t;return null}function Bc(e,t){let n=e instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(n,`value`)?.set?.call(e,t)}function Vc(e,t){if(e.focus(),e.isContentEditable){document.execCommand(`insertText`,!1,t);return}let n=e,r=n.selectionStart??n.value.length,i=n.selectionEnd??r;Bc(n,n.value.slice(0,r)+t+n.value.slice(i)),n.dispatchEvent(new Event(`input`,{bubbles:!0})),n.setSelectionRange(r+t.length,r+t.length)}var Hc=()=>{let e=qr(),[t,n]=(0,_.useState)(null),[r,i]=(0,_.useState)(null),a=(0,_.useRef)(void 0),o=e=>{i(e),window.clearTimeout(a.current),a.current=window.setTimeout(()=>i(null),1800)};(0,_.useEffect)(()=>{let e=e=>{let t=e.target instanceof Element?e.target:null,r=window.getSelection()?.toString().trim()??``,i=t?.closest(`[data-history-url]`)?.dataset.historyUrl??null,a=zc(t)??zc(document.activeElement instanceof Element?document.activeElement:null);!r&&!i&&!a?n(null):(e.preventDefault(),n({x:Math.max(8,Math.min(e.clientX,window.innerWidth-220)),y:Math.max(8,Math.min(e.clientY,window.innerHeight-240)),selection:r,url:i,editable:a}))};return document.addEventListener(`contextmenu`,e),()=>document.removeEventListener(`contextmenu`,e)},[]),(0,_.useEffect)(()=>{if(!t)return;let e=()=>n(null),r=e=>{e.key===`Escape`&&n(null)};return window.addEventListener(`click`,e),window.addEventListener(`scroll`,e,!0),window.addEventListener(`resize`,e),window.addEventListener(`keydown`,r),()=>{window.removeEventListener(`click`,e),window.removeEventListener(`scroll`,e,!0),window.removeEventListener(`resize`,e),window.removeEventListener(`keydown`,r)}},[t]),(0,_.useEffect)(()=>()=>window.clearTimeout(a.current),[]);let s=async t=>{n(null);try{await navigator.clipboard.writeText(t),o(e(`popup.copied`))}catch{}},c=async e=>{n(null);try{let t=await ai();t&&Vc(e,t)}catch{}},l=async t=>{n(null);try{await ma(t),o(e(`history.autoRedirectAdded`))}catch{}};return(0,I.jsxs)(I.Fragment,{children:[t&&(0,I.jsxs)(Fc,{style:{left:t.x,top:t.y},children:[t.selection&&(0,I.jsx)(Ic,{type:`button`,onClick:()=>s(t.selection),children:e(`popup.copy`)}),t.url&&(0,I.jsx)(Ic,{type:`button`,onClick:()=>s(t.url),children:e(`context.copyUrl`)}),t.editable&&(0,I.jsx)(Ic,{type:`button`,onClick:()=>c(t.editable),children:e(`context.paste`)}),t.url&&(0,I.jsx)(Ic,{type:`button`,onClick:()=>l(t.url),children:e(`history.addAutoRedirect`)})]}),r&&(0,I.jsx)(Lc,{children:r})]})};async function Uc(e,t){return await L.request(`inspect.status`,{url:e,userAgentId:t})}function Wc(e){return e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}function Gc(e){let t=Wc(e.toLowerCase()).replace(/\\\*/g,`.*`);return RegExp(`(^|\\.)${t}$`)}function Kc(e){let t={globalLiterals:new Set,globalRegex:[],scopes:[]};for(let n of e)if(!n.urlPattern&&!n.include?.length&&!n.exclude?.length&&!n.urlExceptions?.length)n.regex?t.globalRegex.push(new RegExp(n.pattern,`i`)):t.globalLiterals.add(n.pattern.toLowerCase());else for(let e of n.include?.length?n.include:[null])t.scopes.push({host:e?Gc(e):null,url:n.urlPattern?new RegExp(n.urlPattern,`i`):null,exclude:n.exclude?.map(Gc)??null,urlExceptions:n.urlExceptions?.map(e=>new RegExp(e,`i`))??null,literals:n.regex?new Set:new Set([n.pattern.toLowerCase()]),regex:n.regex?[new RegExp(n.pattern,`i`)]:[]});return t}function qc(e,t,n,r){let i=e.toLowerCase();if(t.globalLiterals.has(i)||t.globalRegex.some(t=>t.test(e)))return!0;for(let a of t.scopes)if((!a.host||a.host.test(n))&&(!a.url||a.url.test(r))&&!a.exclude?.some(e=>e.test(n))&&!a.urlExceptions?.some(e=>e.test(r))&&(a.literals.has(i)||a.regex.some(t=>t.test(e))))return!0;return!1}function Jc(e){try{return new URL(e)}catch{return null}}function Yc(e,t){let n=Jc(e);return n?[...n.searchParams.keys()].filter(r=>qc(r,t,n.hostname,e)):[]}function Xc(e,t){let n=Jc(e);if(!n)return e;for(let r of[...n.searchParams.keys()])qc(r,t,n.hostname,e)&&n.searchParams.delete(r);return n.toString()}function Zc(e,t){if(e.entries[e.index]===t)return{...e,editing:!1};let n=[...e.entries.slice(0,e.index+1),t];return{entries:n,index:n.length-1,editing:!1}}function Qc(e,t){switch(t.type){case`edit`:if(e.editing){let n=[...e.entries];return n[e.index]=t.value,{...e,entries:n}}return{...Zc(e,t.value),editing:!0};case`commit`:return Zc(e,t.value);case`jump`:return{...e,index:Math.max(0,Math.min(t.index,e.entries.length-1)),editing:!1}}}function $c(){let e=window.location.hash,t=e.indexOf(`?`);return t<0?``:new URLSearchParams(e.slice(t+1)).get(`url`)??``}function el(e){let t=window.location.hash,n=t.indexOf(`?`);return n<0||new URLSearchParams(t.slice(n+1)).get(e)!==`0`}function tl(e){try{return decodeURIComponent(e)}catch{return e}}function nl(e){let t=window.location.hash,n=t.indexOf(`?`);if(n<0)return null;let r=new URLSearchParams(t.slice(n+1)).get(e);return r?tl(r):null}function rl(e){return e?tl(e.pathname).replace(/^\//,``):``}var il=Un`
    from {
        opacity: 0;
        transform: translateY(-4px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`,al=F.div`
    min-height: 100vh;
    background-color: #0b0f19;
    background-image: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.12), transparent 70%);
    color: #f9fafb;
    border-radius: ${e=>e.$borderless?`8px`:`0`};
    box-shadow: ${e=>e.$borderless?`inset 0 0 0 1px rgba(255, 255, 255, 0.12)`:`none`};
    overflow: hidden;
    animation: ${il} 0.24s cubic-bezier(0.22, 1, 0.36, 1);
`,ol=F.div`
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 2px 0 6px;
`,sl=F.button`
    width: 24px;
    height: 20px;
    border-radius: 6px;
    border: none;
    background: transparent;
    color: #6b7280;
    cursor: pointer;
    font-size: 0.85rem;
    line-height: 1;
    transition: background 0.15s ease, color 0.15s ease;

    &:hover {
        background: rgba(239, 68, 68, 0.15);
        color: #f87171;
    }
`,cl=F.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 12px 12px;
`,ll=F.input`
    width: 100%;
    height: 34px;
    padding: 0 11px;
    border-radius: 8px;
    border: 1px solid ${e=>e.$warn?`rgba(245, 158, 11, 0.6)`:`rgba(255, 255, 255, 0.12)`};
    background: ${e=>e.$warn?`rgba(245, 158, 11, 0.1)`:`rgba(15, 23, 42, 0.8)`};
    color: #f9fafb;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

    &:focus {
        border-color: ${e=>e.$warn?`#f59e0b`:`#3b82f6`};
        box-shadow: 0 0 0 3px ${e=>e.$warn?`rgba(245, 158, 11, 0.25)`:`rgba(59, 130, 246, 0.25)`};
    }
`,ul=F.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: -4px;
    color: #fbbf24;
    font-size: 0.74rem;
    animation: ${il} 0.15s ease;
`,dl=F.div`
    display: flex;
    align-items: flex-start;
    gap: 6px;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid rgba(239, 68, 68, 0.35);
    background: rgba(239, 68, 68, 0.12);
    color: #fca5a5;
    font-size: 0.74rem;
    line-height: 1.35;
    animation: ${il} 0.15s ease;

    span {
        flex: 1;
        overflow-wrap: anywhere;
    }

    button {
        border: 0;
        background: transparent;
        color: inherit;
        font: inherit;
        cursor: pointer;
        padding: 0 2px;
    }
`,fl=F.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`,pl=F.button`
    min-width: 28px;
    height: 24px;
    padding: 0 6px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: #cbd5e1;
    font-size: 0.72rem;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, transform 0.1s ease;

    &:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.12);
        color: #f9fafb;
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
    }
`,ml=F.button`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    height: 30px;
    padding: 0 10px;
    border-radius: 7px;
    cursor: pointer;
    font-size: 0.76rem;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    transition: filter 0.15s ease, transform 0.1s ease;

    &:hover:not(:disabled) {
        filter: brightness(1.35);
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    border: 1px solid ${e=>e.$tone===`ok`?`rgba(16, 185, 129, 0.3)`:e.$tone===`info`?`rgba(59, 130, 246, 0.3)`:e.$tone===`error`?`rgba(239, 68, 68, 0.3)`:`rgba(255, 255, 255, 0.1)`};
    background: ${e=>e.$tone===`ok`?`rgba(16, 185, 129, 0.12)`:e.$tone===`info`?`rgba(59, 130, 246, 0.12)`:e.$tone===`error`?`rgba(239, 68, 68, 0.12)`:`rgba(255, 255, 255, 0.04)`};
    color: ${e=>e.$tone===`ok`?`#34d399`:e.$tone===`info`?`#60a5fa`:e.$tone===`error`?`#f87171`:`#9ca3af`};
`,hl=F.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 6px;
`,gl=F.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    /* Fixed height so every action keeps the same height as the status pill, whatever the language. */
    height: 30px;
    box-sizing: border-box;
    padding: 0 11px;
    border-radius: 7px;
    border: 1px solid ${e=>e.$accent?`rgba(245, 158, 11, 0.4)`:`rgba(255, 255, 255, 0.1)`};
    background: ${e=>e.$accent?`rgba(245, 158, 11, 0.14)`:`rgba(255, 255, 255, 0.05)`};
    color: ${e=>e.$accent?`#fbbf24`:`#d1d5db`};
    font-size: 0.76rem;
    font-weight: 500;
    line-height: 1;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, transform 0.1s ease;

    &:hover:not(:disabled) {
        background: ${e=>e.$accent?`rgba(245, 158, 11, 0.26)`:`rgba(255, 255, 255, 0.12)`};
        color: #f9fafb;
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`,G=F.div`
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    overflow: hidden;
    background: rgba(15, 23, 42, 0.5);
`,_l=F.div`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 6px 4px 10px;
`,vl=F.button`
    display: flex;
    align-items: center;
    gap: 7px;
    flex: 1;
    min-width: 0;
    padding: 2px 0;
    border: none;
    background: transparent;
    color: #9ca3af;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    text-align: left;
    transition: color 0.15s ease;

    &:hover {
        color: #f9fafb;
    }
`,yl=F.button`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    padding: 3px;
    border: none;
    border-radius: 5px;
    background: none;
    color: #6b7280;
    cursor: pointer;
    transition: color 0.15s ease, background 0.15s ease;

    &:hover:not(:disabled) {
        color: #60a5fa;
        background: rgba(255, 255, 255, 0.08);
    }

    &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
    }
`,bl=F(yl)`
    &:hover:not(:disabled) {
        color: #f87171;
        background: rgba(239, 68, 68, 0.12);
    }
`,xl=F.span`
    display: inline-block;
    transition: transform 0.15s ease;
    transform: rotate(${e=>e.$open?`90deg`:`0deg`});
    font-size: 0.65rem;
`,Sl=F.span`
    background: rgba(255, 255, 255, 0.08);
    color: #cbd5e1;
    border-radius: 9999px;
    padding: 0 7px;
    font-size: 0.68rem;
    font-weight: 600;
    flex-shrink: 0;
`,Cl=F.span`
    padding: 6px 2px;
    color: #6b7280;
    font-size: 0.76rem;
`,wl=F.div`
    display: flex;
    flex-direction: column;
    padding: 0 10px 7px;
    animation: ${il} 0.15s ease;
`,Tl=F.div`
    display: flex;
    gap: 10px;
    padding: 4px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    font-family: var(--font-mono);
    font-size: 0.75rem;
`,El=F.span`
    color: #60a5fa;
    flex-shrink: 0;
    min-width: 78px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`,Dl=F.span`
    color: #cbd5e1;
    flex: 1;
    word-break: break-all;
`,Ol=F.button`
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    color: #60a5fa;
    text-decoration: underline;
    text-underline-offset: 2px;
    cursor: pointer;
    word-break: break-all;
    transition: color 0.15s ease;

    &:hover {
        color: #93c5fd;
    }
`,kl=F.input`
    background: transparent;
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 2px 5px;
    font-family: inherit;
    font-size: inherit;
    outline: none;
    transition: background 0.15s ease, border-color 0.15s ease;

    &.key {
        color: #60a5fa;
        flex: 0 0 40%;
        min-width: 0;
    }

    &.value {
        color: #cbd5e1;
        flex: 1;
        min-width: 0;
    }

    &:hover {
        border-color: rgba(255, 255, 255, 0.12);
    }

    &:focus {
        border-color: #3b82f6;
        background: rgba(15, 23, 42, 0.9);
    }
`,Al=F.button`
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 0 2px;
    flex-shrink: 0;
    transition: color 0.15s ease, background 0.15s ease;

    &:hover {
        color: #f87171;
    }
`,jl=F.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    margin-top: 2px;
`,Ml=F.div`
    position: relative;
    display: flex;
`,Nl=F.div`
    position: relative;
    display: flex;
`,Pl=F.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    /* Fixed height keeps the primary button aligned with the ghost buttons in every language. */
    height: 32px;
    box-sizing: border-box;
    padding: 0 14px;
    border: none;
    border-radius: 8px 0 0 8px;
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
    color: #ffffff;
    font-weight: 600;
    font-size: 0.82rem;
    cursor: pointer;
    box-shadow: 0 0 16px rgba(99, 102, 241, 0.3);
    transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease;

    &:hover:not(:disabled) {
        background: linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%);
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
        box-shadow: none;
    }
`,Fl=F.button`
    width: 30px;
    border: none;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0 8px 8px 0;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: #ffffff;
    cursor: pointer;
    transition: filter 0.15s ease;

    &:hover:not(:disabled) {
        filter: brightness(1.15);
    }

    &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }
`,Il=F(gl)`
    height: 32px;
    border-color: ${e=>e.$active?`rgba(99, 102, 241, 0.5)`:`rgba(255, 255, 255, 0.1)`};
    background: ${e=>e.$active?`rgba(99, 102, 241, 0.22)`:`rgba(255, 255, 255, 0.05)`};
    color: ${e=>e.$active?`#c7d2fe`:`#d1d5db`};

    /* ActionButton's hover rule knows nothing about $active, so it would flatten the active
       background back to the plain white wash. Keep the two states distinguishable. */

    &:hover:not(:disabled) {
        border-color: ${e=>e.$active?`rgba(99, 102, 241, 0.7)`:`rgba(255, 255, 255, 0.1)`};
        background: ${e=>e.$active?`rgba(99, 102, 241, 0.34)`:`rgba(255, 255, 255, 0.12)`};
        color: ${e=>e.$active?`#e0e7ff`:`#f9fafb`};
    }
`,Ll=F.div`
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 7px 10px;
    border-radius: 7px;
    font-size: 0.76rem;
    background: ${e=>e.$tone===`error`?`rgba(239, 68, 68, 0.12)`:`rgba(16, 185, 129, 0.12)`};
    border: 1px solid ${e=>e.$tone===`error`?`rgba(239, 68, 68, 0.3)`:`rgba(16, 185, 129, 0.3)`};
    color: ${e=>e.$tone===`error`?`#f87171`:`#34d399`};
`,Rl=()=>{let e=qr(),t=(0,_.useMemo)($c,[]),[n,r]=(0,_.useReducer)(Qc,{entries:[t],index:0,editing:!1}),i=n.entries[n.index],[a,o]=(0,_.useState)([]),[s,c]=(0,_.useState)([]),[l,u]=(0,_.useState)([]),[d,f]=(0,_.useState)(()=>new Set),[p,m]=(0,_.useState)(``),[h,g]=(0,_.useState)(null),[v,y]=(0,_.useState)(!1),[b,x]=(0,_.useState)(!1),[S,C]=(0,_.useState)(!1),[w,T]=(0,_.useState)(!1),[E,D]=(0,_.useState)(null),[ee,te]=(0,_.useState)(!1),[ne,re]=(0,_.useState)(!1),[ie]=(0,_.useState)(()=>el(`borderless`)),[ae]=(0,_.useState)(()=>el(`strip`)),[oe,O]=(0,_.useState)(()=>nl(`scriptError`)),[se,k]=(0,_.useState)(null),ce=e=>ae&&se&&Yc(e,se).length>0?Xc(e,se):e,[le,ue]=(0,_.useState)(null),[de,fe]=(0,_.useState)({domain:!1,parameters:!1,fragment:!1}),pe=(0,_.useRef)(null),me=(0,_.useRef)(0),he=(0,_.useRef)(void 0),ge=(0,_.useRef)(null),_e=(0,_.useRef)(null),ve=(0,_.useRef)(null),ye=ra(S,!1,ge),be=ra(b,!0,_e),A=ra(w,!0,ve),j=(0,_.useMemo)(()=>{try{return new URL(i)}catch{return null}},[i]),[xe,Se]=(0,_.useState)(()=>rl(j));(0,_.useEffect)(()=>{Se(rl(j))},[j]);let Ce=(0,_.useMemo)(()=>j?[...j.searchParams.entries()].map(([e,t])=>({key:e,value:t})):[],[j]),we=tl(j?.hash.replace(/^#/,``)??``),Te=j?.protocol===`http:`,M=a[0],Ee=!!j&&a.length>0,De=se?Yc(i,se).length:0;(0,_.useEffect)(()=>{let e=!1;return(async()=>{try{let t=await da();if(e)return;o(t.settings.browsers),c(t.settings.userAgents),m(t.settings.selectedUserAgentId),u(t.settings.devices??[])}catch{}})(),()=>{e=!0}},[]),(0,_.useEffect)(()=>{let e=!1;return Ia().then(t=>{e||k(Kc(t))}).catch(()=>void 0),()=>{e=!0}},[]),(0,_.useEffect)(()=>(document.documentElement.classList.toggle(`popup-transparent`,ie),()=>document.documentElement.classList.remove(`popup-transparent`)),[ie]),(0,_.useEffect)(()=>L.on(e=>{let t=e;t.type===`popup.navigate`&&t.data?.url&&(r({type:`commit`,value:t.data.url}),g(null),ue(null),O(t.data.scriptError??null))}),[]),(0,_.useEffect)(()=>{L.send({type:`popup.ready`})},[]),(0,_.useEffect)(()=>L.on(e=>{let t=e;t.type===`settings.changed`&&t.data?.settings&&u(t.data.settings.devices??[])}),[]),(0,_.useEffect)(()=>{let e=!1;xa().then(t=>{e||f(t)}).catch(()=>void 0);let t=L.on(e=>{let t=e;t.type===`forward.presence`&&f(new Set(t.data?.online??[]))});return()=>{e=!0,t()}},[]);let Oe=l.filter(e=>d.has(e.id));(0,_.useEffect)(()=>{Oe.length===0&&T(!1)},[Oe.length]),(0,_.useEffect)(()=>{let e=ce(t);e!==t&&r({type:`commit`,value:e})},[t,ae,se]),(0,_.useEffect)(()=>{let e=pe.current;if(!e)return;let t=()=>{window.clearTimeout(he.current),he.current=window.setTimeout(()=>{let t=Math.ceil(e.offsetHeight)+24;Math.abs(t-me.current)<2||(me.current=t,hi(t))},60)},n=new ResizeObserver(t);return n.observe(e),window.addEventListener(`resize`,t),()=>{window.clearTimeout(he.current),n.disconnect(),window.removeEventListener(`resize`,t)}},[]);let ke=e=>{r({type:`commit`,value:e}),g(null)},Ae=e=>{r({type:`edit`,value:e}),g(null)},je=e=>{e.key===`Enter`&&e.currentTarget.blur()},Me=()=>{if(!j)return;let e=new URL(i);e.pathname=`/${xe}`;let t=e.toString();ke(t),Se(rl(new URL(t)))},Ne=(e,t)=>{if(!j)return;let n=[...j.searchParams.entries()].map(([n,r],i)=>i===e?{key:t.key??n,value:t.value??r}:{key:n,value:r}),r=new URL(i);r.search=``;for(let e of n)r.searchParams.append(e.key,e.value);Ae(r.toString())},Pe=e=>{if(!j)return;let t=new URL(i);t.hash=e,Ae(t.toString())},Fe=()=>{if(!j)return;let e=new URL(i);e.searchParams.append(``,``),ke(e.toString())},Ie=()=>{if(!j)return;let e=new URL(i);e.hash=``,ke(e.toString())},Le=()=>{j&&ke(`${j.origin}/`)},Re=async()=>{y(!0),ue(null);try{let e=await Uc(i,p);if(e.location){r({type:`commit`,value:e.location});let t=ce(e.location);t!==e.location&&r({type:`commit`,value:t})}g(e)}catch(e){ue(e instanceof Error?e.message:String(e))}finally{y(!1)}},ze=async e=>{x(!1),ue(null);try{await ga(i,e,ee),oi()}catch(e){ue(e instanceof Error?e.message:String(e))}},Be=async()=>{ue(null);try{await navigator.clipboard.writeText(i),re(!0),setTimeout(()=>re(!1),1500)}catch(e){ue(e instanceof Error?e.message:String(e))}},Ve=async e=>{T(!1),ue(null);try{await ba(i,e),D(e),setTimeout(()=>D(null),1500)}catch(e){ue(e instanceof Error?e.message:String(e))}},He=(e,t)=>{if(!j)return;let n=new URL(i),r=[...n.searchParams.entries()];n.search=``;for(let[i,a]of r)(i!==e||a!==t)&&n.searchParams.append(i,a);ke(n.toString())},Ue=()=>{if(!j)return;let e=new URL(i);e.search=``,ke(e.toString())},We=()=>{if(!j)return;let e=new URL(i);e.protocol=`https:`,ke(e.toString())},Ge=e=>fe(t=>({...t,[e]:!t[e]})),Ke=h?h.ok?`ok`:h.statusCode>=300&&h.statusCode<400?`info`:`error`:`idle`,qe=h?.location?e(`popup.redirected`):h?.statusText===`error.timeout`?e(`error.timeout`):h?.statusText,Je=v?e(`popup.checking`):h?`${h.statusCode||`!`} ${qe??``}`.trim():e(`popup.checkStatus`),Ye=Ke===`ok`?yr:Ke===`error`?xr:br;return(0,I.jsxs)(al,{$borderless:ie,children:[(0,I.jsx)(ol,{children:(0,I.jsx)(sl,{onClick:oi,title:e(`popup.close`),children:`✕`})}),oe&&(0,I.jsxs)(dl,{children:[(0,I.jsx)(br,{size:13}),(0,I.jsx)(`span`,{children:e(`popup.scriptError`,{error:oe})}),(0,I.jsx)(`button`,{onClick:()=>O(null),title:e(`popup.close`),type:`button`,children:`×`})]}),(0,I.jsxs)(cl,{ref:pe,children:[(0,I.jsx)(ll,{type:`text`,value:i,spellCheck:!1,$warn:Te,onChange:e=>Ae(e.target.value),onBlur:()=>r({type:`commit`,value:i}),placeholder:`https://example.com/path?key=value`}),Te&&(0,I.jsxs)(ul,{children:[(0,I.jsx)(br,{size:13}),(0,I.jsx)(`span`,{children:e(`popup.httpWarning`)})]}),n.entries.length>1&&(0,I.jsxs)(fl,{ref:ge,children:[(0,I.jsx)(pl,{onClick:()=>r({type:`jump`,index:0}),disabled:n.index===0,title:e(`popup.first`),children:`|◀`}),(0,I.jsx)(pl,{onClick:()=>r({type:`jump`,index:n.index-1}),disabled:n.index===0,title:e(`popup.back`),children:`◀`}),(0,I.jsx)(pl,{onClick:()=>C(e=>!e),title:e(`popup.history`),children:`▾`}),(0,I.jsx)(pl,{onClick:()=>r({type:`jump`,index:n.index+1}),disabled:n.index>=n.entries.length-1,title:e(`popup.forward`),children:`▶`}),(0,I.jsx)(pl,{onClick:()=>r({type:`jump`,index:n.entries.length-1}),disabled:n.index>=n.entries.length-1,title:e(`popup.last`),children:`▶|`}),S&&(0,I.jsx)(ea,{$stretch:!0,style:ye,children:n.entries.map((e,t)=>(0,I.jsx)(ta,{$mono:!0,$active:t===n.index,onClick:()=>{r({type:`jump`,index:t}),C(!1)},children:e},`${t}-${e}`))})]}),(0,I.jsxs)(hl,{children:[s.length>0&&(0,I.jsx)(z,{value:p,disabled:v,options:s.map(e=>({value:e.id,label:e.name})),onChange:m,title:e(`popup.userAgentTooltip`)}),(0,I.jsxs)(ml,{$tone:Ke,onClick:Re,disabled:v,title:e(`popup.checkStatus`),children:[(0,I.jsx)(Ye,{size:13}),(0,I.jsx)(`span`,{children:Je})]}),(0,I.jsxs)(gl,{onClick:()=>se&&ke(Xc(i,se)),disabled:!j||!se,title:e(`popup.removeTrackingTooltip`),children:[(0,I.jsx)(Dr,{size:13}),e(`popup.tracking`),De>0?` (${De})`:``]}),Te&&(0,I.jsx)(gl,{$accent:!0,onClick:We,children:e(`popup.useHttps`)})]}),(0,I.jsxs)(G,{children:[(0,I.jsx)(_l,{children:(0,I.jsxs)(vl,{onClick:()=>Ge(`domain`),children:[(0,I.jsx)(xl,{$open:de.domain,children:`▶`}),(0,I.jsx)(`span`,{children:e(`popup.domain`)})]})}),de.domain&&(0,I.jsxs)(wl,{children:[(0,I.jsxs)(Tl,{children:[(0,I.jsx)(El,{children:e(`popup.scheme`)}),(0,I.jsx)(Dl,{children:j?.protocol.replace(/:$/,``)??`(none)`})]}),(0,I.jsxs)(Tl,{children:[(0,I.jsx)(El,{children:e(`popup.host`)}),(0,I.jsx)(Dl,{children:j?(0,I.jsx)(Ol,{onClick:Le,title:e(`popup.hostTooltip`),children:tl(j.host)}):`(none)`})]}),(0,I.jsxs)(Tl,{children:[(0,I.jsx)(El,{children:e(`popup.path`)}),(0,I.jsx)(kl,{className:`value`,spellCheck:!1,placeholder:e(`popup.empty`),value:xe,disabled:!j,onChange:e=>Se(e.target.value),onBlur:Me,onKeyDown:je})]})]})]}),(0,I.jsxs)(G,{children:[(0,I.jsxs)(_l,{children:[(0,I.jsxs)(vl,{onClick:()=>Ge(`parameters`),children:[(0,I.jsx)(xl,{$open:de.parameters,children:`▶`}),(0,I.jsx)(`span`,{children:e(`popup.parameters`)})]}),(0,I.jsx)(Sl,{children:Ce.length}),(0,I.jsx)(yl,{title:e(`popup.addParameter`),onClick:Fe,disabled:!j,children:(0,I.jsx)(Er,{size:14})}),(0,I.jsx)(bl,{title:e(`popup.removeAllParameters`),onClick:Ue,disabled:!j||Ce.length===0,children:(0,I.jsx)(Dr,{size:13})})]}),de.parameters&&(0,I.jsxs)(wl,{children:[Ce.length===0&&(0,I.jsx)(Cl,{children:e(`popup.noParameters`)}),Ce.map((t,n)=>(0,I.jsxs)(Tl,{children:[(0,I.jsx)(kl,{className:`key`,title:e(`popup.parameterName`),value:t.key,onChange:e=>Ne(n,{key:e.target.value})}),(0,I.jsx)(kl,{className:`value`,title:e(`popup.parameterValue`),placeholder:e(`popup.empty`),value:t.value,onChange:e=>Ne(n,{value:e.target.value})}),(0,I.jsx)(Al,{title:e(`popup.removeParameter`),onClick:()=>He(t.key,t.value),children:(0,I.jsx)(Dr,{size:12})})]},n))]})]}),(0,I.jsxs)(G,{children:[(0,I.jsxs)(_l,{children:[(0,I.jsxs)(vl,{onClick:()=>Ge(`fragment`),children:[(0,I.jsx)(xl,{$open:de.fragment,children:`▶`}),(0,I.jsx)(`span`,{children:e(`popup.fragment`)})]}),(0,I.jsx)(bl,{title:e(`popup.removeFragment`),onClick:Ie,disabled:!j||we.length===0,children:(0,I.jsx)(Dr,{size:13})})]}),de.fragment&&(0,I.jsx)(wl,{children:(0,I.jsxs)(Tl,{children:[(0,I.jsx)(El,{children:`#`}),(0,I.jsx)(kl,{className:`value`,title:e(`popup.fragmentTooltip`),placeholder:e(`popup.empty`),value:we,onChange:e=>Pe(e.target.value)})]})})]}),le&&(0,I.jsxs)(Ll,{$tone:`error`,children:[(0,I.jsx)(br,{size:13}),(0,I.jsx)(`span`,{children:e(le)})]}),(0,I.jsxs)(jl,{children:[(0,I.jsxs)(Ml,{ref:_e,children:[(0,I.jsxs)(Pl,{disabled:!Ee,onClick:()=>ze(),children:[(0,I.jsx)(Cr,{size:14}),(0,I.jsx)(`span`,{children:e(`popup.open`,{browser:M?.name??e(`popup.openFallback`)})})]}),(0,I.jsx)(Fl,{disabled:a.length===0,onClick:()=>x(e=>!e),title:e(`popup.chooseBrowser`),children:`▾`}),b&&(0,I.jsx)(ea,{$up:!0,style:be,children:a.map(e=>(0,I.jsx)(ta,{onClick:()=>ze(e.id),children:e.name},e.id))})]}),(0,I.jsxs)(Il,{$active:ee,onClick:()=>te(e=>!e),title:e(`popup.privateTooltip`),children:[(0,I.jsx)(wr,{size:13}),e(`popup.private`)]}),Oe.length>0&&(0,I.jsxs)(Nl,{ref:ve,children:[(0,I.jsxs)(Il,{onClick:()=>T(e=>!e),disabled:!j,title:e(`popup.sendToTooltip`),children:[(0,I.jsx)(kr,{size:13}),e(`popup.sendTo`),(0,I.jsx)(R,{$open:w,children:`▾`})]}),w&&(0,I.jsx)(ea,{$up:!0,style:{...A,left:`auto`,right:0,maxWidth:280},children:Oe.map(t=>(0,I.jsx)(ta,{onClick:()=>Ve(t.id),children:E===t.id?e(`popup.sent`):t.name||t.host},t.id))})]}),(0,I.jsxs)(Il,{onClick:Be,disabled:!j,children:[(0,I.jsx)(Tr,{size:13}),e(ne?`popup.copied`:`popup.copy`)]})]})]})]})},zl=Un`
    from {
        opacity: 0;
        transform: scale(0.85);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`,Bl=F.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: transparent;
`,Vl=F.button`
    display: flex;
    box-sizing: border-box;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    animation: ${zl} 0.16s cubic-bezier(0.22, 1, 0.36, 1);
    transition: filter 0.15s ease;

    &:hover {
        filter: brightness(1.15);
    }
`;function Hl(){let e=window.location.hash.indexOf(`?`);return e<0?``:new URLSearchParams(window.location.hash.slice(e+1)).get(`url`)??``}var Ul=()=>{let e=qr(),[t,n]=(0,_.useState)(()=>Hl()||null);return(0,_.useEffect)(()=>L.on(e=>{let t=e,r=t.data?.url;t.type===`selection.show`&&r&&n(r)}),[]),(0,_.useEffect)(()=>{L.send({type:`selection.ready`})},[]),(0,_.useEffect)(()=>(document.documentElement.classList.add(`selection-transparent`),()=>document.documentElement.classList.remove(`selection-transparent`)),[]),t?(0,I.jsx)(Bl,{children:(0,I.jsx)(Vl,{type:`button`,title:e(`selection.open`),onMouseDown:()=>{ii(t),si(),n(null)},children:(0,I.jsx)(mr,{size:26})})}):null},Wl=document.getElementById(`root`);if(Wl){let e=window.location.hash,t=e.startsWith(`#popup`)?(0,I.jsx)(Rl,{}):e.startsWith(`#selection`)?(0,I.jsx)(Ul,{}):(0,I.jsx)(Nc,{});(0,v.createRoot)(Wl).render((0,I.jsx)(_.StrictMode,{children:(0,I.jsxs)(Yr,{children:[t,(0,I.jsx)(Hc,{})]})}))}export{c as a,u as i,Gn as n,F as r,qr as t};