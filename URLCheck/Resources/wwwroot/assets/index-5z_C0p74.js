var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var C=Array.isArray;function ee(){}var w={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function E(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function te(e,t){return E(e.type,t,e.props)}function ne(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function re(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var D=/\/+/g;function ie(e,t){return typeof e==`object`&&e&&e.key!=null?re(``+e.key):t.toString(36)}function ae(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(ee,ee):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function oe(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,oe(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+ie(e,0):a,C(o)?(i=``,c!=null&&(i=c.replace(D,`$&/`)+`/`),oe(o,r,i,``,function(e){return e})):o!=null&&(ne(o)&&(o=te(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(D,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(C(e))for(var u=0;u<e.length;u++)a=e[u],s=l+ie(a,u),c+=oe(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+ie(a,u++),c+=oe(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return oe(ae(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function O(e,t,n){if(e==null)return e;var r=[],i=0;return oe(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function se(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var k=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function ce(e){var t=w.T,n={};n.types=t===null?null:t.types,w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(ee,k)}catch(e){k(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}}function le(e){var t=w.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else ce(le.bind(null,e))}var ue={map:O,forEach:function(e,t,n){O(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return O(e,function(){t++}),t},toArray:function(e){return O(e,function(e){return e})||[]},only:function(e){if(!ne(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=ue,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.addTransitionType=le,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!T.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return E(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)T.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return E(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=ne,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:se}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=ce,e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.3.1`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,te());else{var t=n(l);t!==null&&D(x,t.startTime-e)}}}var S=!1,C=-1,ee=5,w=-1;function T(){return g?!0:!(e.unstable_now()-w<ee)}function E(){if(g=!1,S){var t=e.unstable_now();w=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&T());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&D(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?te():S=!1}}}var te;if(typeof y==`function`)te=function(){y(E)};else if(typeof MessageChannel<`u`){var ne=new MessageChannel,re=ne.port2;ne.port1.onmessage=E,te=function(){re.postMessage(null)}}else te=function(){_(E,0)};function D(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):ee=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,D(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,te()))),r},e.unstable_shouldYield=T,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=d(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=d(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),m=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}function h(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&h(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var x=null,S=null;function C(e,t,n){return e===n||e===t&&(x=e,!0)}function ee(e,t,n){return e===n?(S=e,!1):e===t&&(S!==null&&(x=e),!0)}function w(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function T(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var E=Object.assign,te=Symbol.for(`react.element`),ne=Symbol.for(`react.transitional.element`),re=Symbol.for(`react.portal`),D=Symbol.for(`react.fragment`),ie=Symbol.for(`react.strict_mode`),ae=Symbol.for(`react.profiler`),oe=Symbol.for(`react.consumer`),O=Symbol.for(`react.context`),se=Symbol.for(`react.forward_ref`),k=Symbol.for(`react.suspense`),ce=Symbol.for(`react.suspense_list`),le=Symbol.for(`react.memo`),ue=Symbol.for(`react.lazy`),de=Symbol.for(`react.activity`),fe=Symbol.for(`react.legacy_hidden`),pe=Symbol.for(`react.memo_cache_sentinel`),me=Symbol.for(`react.view_transition`),he=Symbol.for(`react.recoverable`),ge=Symbol.iterator;function _e(e){return typeof e!=`object`||!e?null:(e=ge&&e[ge]||e[`@@iterator`],typeof e==`function`?e:null)}var A=Symbol.for(`react.client.reference`);function ve(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===A?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case D:return`Fragment`;case ae:return`Profiler`;case ie:return`StrictMode`;case k:return`Suspense`;case ce:return`SuspenseList`;case de:return`Activity`;case me:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case re:return`Portal`;case O:return e.displayName||`Context`;case oe:return(e._context.displayName||`Context`)+`.Consumer`;case se:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case le:return t=e.displayName||null,t===null?ve(e.type)||`Memo`:t;case ue:t=e._payload,e=e._init;try{return ve(e(t))}catch{}}return null}var ye=Array.isArray,j=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,M=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,be={pending:!1,data:null,method:null,action:null},xe=[],Se=-1;function Ce(e){return{current:e}}function we(e){0>Se||(e.current=xe[Se],xe[Se]=null,Se--)}function N(e,t){Se++,xe[Se]=e.current,e.current=t}var Te=Ce(null),Ee=Ce(null),De=Ce(null),Oe=Ce(null);function ke(e,t){switch(N(De,t),N(Ee,e),N(Te,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?up(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=up(t),e=dp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}we(Te),N(Te,e)}function Ae(){we(Te),we(Ee),we(De)}function je(e){var t=e.memoizedState;t!==null&&(sh._currentValue=t.memoizedState,N(Oe,e)),t=Te.current;var n=dp(t,e.type);t!==n&&(N(Ee,e),N(Te,n))}function Me(e){Ee.current===e&&(we(Te),we(Ee)),Oe.current===e&&(we(Oe),sh._currentValue=be)}var Ne,Pe;function Fe(e){if(Ne===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Ne=t&&t[1]||``,Pe=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Ne+e+Pe}var Ie=!1;function Le(e,t){if(!e||Ie)return``;Ie=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Ie=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Fe(n):``}function Re(e,t){switch(e.tag){case 26:case 27:case 5:return Fe(e.type);case 16:return Fe(`Lazy`);case 13:return e.child!==t&&t!==null?Fe(`Suspense Fallback`):Fe(`Suspense`);case 19:return Fe(`SuspenseList`);case 0:case 15:return Le(e.type,!1);case 11:return Le(e.type.render,!1);case 1:return Le(e.type,!0);case 31:return Fe(`Activity`);case 30:return Fe(`ViewTransition`);default:return``}}function ze(e){try{var t=``,n=null;do t+=Re(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Be=Object.prototype.hasOwnProperty,Ve=t.unstable_scheduleCallback,He=t.unstable_cancelCallback,Ue=t.unstable_shouldYield,We=t.unstable_requestPaint,Ge=t.unstable_now,Ke=t.unstable_getCurrentPriorityLevel,qe=t.unstable_ImmediatePriority,Je=t.unstable_UserBlockingPriority,Ye=t.unstable_NormalPriority,Xe=t.unstable_LowPriority,Ze=t.unstable_IdlePriority,Qe=t.log,$e=t.unstable_setDisableYieldValue,et=null,tt=null;function nt(e){if(typeof Qe==`function`&&$e(e),tt&&typeof tt.setStrictMode==`function`)try{tt.setStrictMode(et,e)}catch{}}var rt=Math.clz32?Math.clz32:at,P=Math.log,it=Math.LN2;function at(e){return e>>>=0,e===0?32:31-(P(e)/it|0)|0}var ot=256,st=262144,ct=4194304;function lt(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ut(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=lt(n))):i=lt(o):i=lt(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=lt(n))):i=lt(o)):i=lt(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function dt(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function ft(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-rt(n),i=1<<r;t|=e[r],n&=~i}return t}function pt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function mt(){var e=ct;return ct<<=1,!(ct&62914560)&&(ct=4194304),e}function ht(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function gt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function _t(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-rt(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&vt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function vt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-rt(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function yt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-rt(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function bt(e,t){var n=t&-t;return n=n&42?1:xt(n),(n&(e.suspendedLanes|t))===0?n:0}function xt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function St(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function Ct(){var e=M.p;return e===0?(e=window.event,e===void 0?32:Ch(e.type)):e}function wt(e,t){var n=M.p;try{return M.p=e,t()}finally{M.p=n}}var Tt=Math.random().toString(36).slice(2),Et=`__reactFiber$`+Tt,Dt=`__reactProps$`+Tt,Ot=`__reactContainer$`+Tt,kt=`__reactEvents$`+Tt,At=`__reactListeners$`+Tt,jt=`__reactHandles$`+Tt,Mt=`__reactResources$`+Tt,Nt=`__reactMarker$`+Tt,Pt=`__reactLoad$`+Tt;function Ft(e){delete e[Et],delete e[Dt],delete e[At],delete e[jt]}function It(e){var t;if(t=e[Et])return t;for(var n=e.parentNode;n;){if(t=n[Ot]||n[Et]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=fm(e);e!==null;){if(n=e[Et])return n;e=fm(e)}return t}e=n,n=e.parentNode}return null}function Lt(e){if(e=e[Et]||e[Ot]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Rt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function zt(e){var t=e[Mt];return t||=e[Mt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Bt(e){e[Nt]=!0}function Vt(e){e[Pt]=void 0}var Ht=new Set,Ut={};function Wt(e,t){Gt(e,t),Gt(e+`Capture`,t)}function Gt(e,t){for(Ut[e]=t,e=0;e<t.length;e++)Ht.add(t[e])}var Kt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),qt={},Jt={};function Yt(e){return Be.call(Jt,e)?!0:Be.call(qt,e)?!1:Kt.test(e)?Jt[e]=!0:(qt[e]=!0,!1)}var F=!1;function Xt(){var e=F;return F=!1,e}function Zt(e,t,n){if(Yt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function Qt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function $t(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function en(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function tn(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function nn(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function rn(e){if(!e._valueTracker){var t=tn(e)?`checked`:`value`;e._valueTracker=nn(e,t,``+e[t])}}function an(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=tn(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var on=/[\n"\\]/g;function sn(e){return e.replace(on,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function cn(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+en(t)):e.value!==``+en(t)&&(e.value=``+en(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):un(e,en(n)):o===`number`&&e.value==t?un(e,en(e.value)):un(e,en(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+en(s):e.removeAttribute(`name`)}function ln(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){rn(e);return}n=n==null?``:``+en(n),t=t==null?n:``+en(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),rn(e)}function un(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function dn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+en(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function fn(e,t,n){t!=null&&(t=``+en(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+en(n)}function pn(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(ye(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=en(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),rn(e)}function mn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var hn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function gn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||hn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function _n(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,F=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(gn(e,a,r),F=!0)}else for(var o in t)t.hasOwnProperty(o)&&gn(e,o,t[o])}function vn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var yn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),bn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function xn(e){return bn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function Sn(){}var Cn=null;function wn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Tn=null,En=null;function Dn(e){var t=Lt(e);if(t&&(e=t.stateNode)){var n=e[Dt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(cn(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+sn(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[Dt]||null;if(!a)throw Error(i(90));cn(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&an(r)}break a;case`textarea`:fn(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&dn(e,!!n.multiple,t,!1)}}}var On=!1;function kn(e,t,n){if(On)return e(t,n);On=!0;try{return e(t)}finally{if(On=!1,(Tn!==null||En!==null)&&(zd(),Tn&&(t=Tn,e=En,En=Tn=null,Dn(t),e)))for(t=0;t<e.length;t++)Dn(e[t])}}function An(e,t){var n=e.stateNode;if(n===null)return null;var r=n[Dt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var jn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Mn=!1;if(jn)try{var Nn={};Object.defineProperty(Nn,"passive",{get:function(){Mn=!0}}),window.addEventListener(`test`,Nn,Nn),window.removeEventListener(`test`,Nn,Nn)}catch{Mn=!1}var Pn=null,Fn=null,In=null;function Ln(){if(In)return In;var e,t=Fn,n=t.length,r,i=`value`in Pn?Pn.value:Pn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return In=i.slice(e,1<r?1-r:void 0)}function Rn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function zn(){return!0}function I(){return!1}function Bn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?zn:I,this.isPropagationStopped=I,this}return E(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=zn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=zn)},persist:function(){},isPersistent:zn}),t}var Vn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Hn=Bn(Vn),Un=E({},Vn,{view:0,detail:0}),Wn=Bn(Un),L,Gn,Kn,qn=E({},Un,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ir,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Kn&&(Kn&&e.type===`mousemove`?(L=e.screenX-Kn.screenX,Gn=e.screenY-Kn.screenY):Gn=L=0,Kn=e),L)},movementY:function(e){return`movementY`in e?e.movementY:Gn}}),Jn=Bn(qn),Yn=Bn(E({},qn,{dataTransfer:0})),Xn=Bn(E({},Un,{relatedTarget:0})),Zn=Bn(E({},Vn,{animationName:0,elapsedTime:0,pseudoElement:0})),Qn=Bn(E({},Vn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),$n=Bn(E({},Vn,{data:0})),er={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},tr={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},nr={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function rr(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=nr[e])?!!t[e]:!1}function ir(){return rr}var ar=Bn(E({},Un,{key:function(e){if(e.key){var t=er[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Rn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?tr[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ir,charCode:function(e){return e.type===`keypress`?Rn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Rn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),or=Bn(E({},qn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),sr=Bn(E({},Vn,{submitter:0})),cr=Bn(E({},Un,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ir})),lr=Bn(E({},Vn,{propertyName:0,elapsedTime:0,pseudoElement:0})),ur=Bn(E({},qn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),dr=Bn(E({},Vn,{newState:0,oldState:0,source:0})),fr=[9,13,27,32],pr=jn&&`CompositionEvent`in window,mr=null;jn&&`documentMode`in document&&(mr=document.documentMode);var hr=jn&&`TextEvent`in window&&!mr,gr=jn&&(!pr||mr&&8<mr&&11>=mr),_r=` `,vr=!1;function yr(e,t){switch(e){case`keyup`:return fr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function br(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var xr=!1;function Sr(e,t){switch(e){case`compositionend`:return br(t);case`keypress`:return t.which===32?(vr=!0,_r):null;case`textInput`:return e=t.data,e===_r&&vr?null:e;default:return null}}function Cr(e,t){if(xr)return e===`compositionend`||!pr&&yr(e,t)?(e=Ln(),In=Fn=Pn=null,xr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return gr&&t.locale!==`ko`?null:t.data;default:return null}}var wr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Tr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!wr[e.type]:t===`textarea`}function Er(e,t,n,r){Tn?En?En.push(r):En=[r]:Tn=r,t=Jf(t,`onChange`),0<t.length&&(n=new Hn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var Dr=null,Or=null;function kr(e){Vf(e,0)}function Ar(e){if(an(Rt(e)))return e}function jr(e,t){if(e===`change`)return t}var Mr=!1;if(jn){var Nr;if(jn){var Pr=`oninput`in document;if(!Pr){var Fr=document.createElement(`div`);Fr.setAttribute(`oninput`,`return;`),Pr=typeof Fr.oninput==`function`}Nr=Pr}else Nr=!1;Mr=Nr&&(!document.documentMode||9<document.documentMode)}function Ir(){Dr&&(Dr.detachEvent(`onpropertychange`,Lr),Or=Dr=null)}function Lr(e){if(e.propertyName===`value`&&Ar(Or)){var t=[];Er(t,Or,e,wn(e)),kn(kr,t)}}function Rr(e,t,n){e===`focusin`?(Ir(),Dr=t,Or=n,Dr.attachEvent(`onpropertychange`,Lr)):e===`focusout`&&Ir()}function zr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return Ar(Or)}function Br(e,t){if(e===`click`)return Ar(t)}function Vr(e,t){if(e===`input`||e===`change`)return Ar(t)}function Hr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Ur=typeof Object.is==`function`?Object.is:Hr;function R(e,t){if(Ur(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Be.call(t,i)||!Ur(e[i],t[i]))return!1}return!0}function Wr(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Gr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Kr(e,t){var n=Gr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Gr(n)}}function qr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?qr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Jr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Wr(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Wr(e.document)}return t}function Yr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Xr=jn&&`documentMode`in document&&11>=document.documentMode,Zr=null,Qr=null,$r=null,ei=!1;function ti(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ei||Zr==null||Zr!==Wr(r)||(r=Zr,`selectionStart`in r&&Yr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),$r&&R($r,r)||($r=r,r=Jf(Qr,`onSelect`),0<r.length&&(t=new Hn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Zr)))}function ni(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var ri={animationend:ni(`Animation`,`AnimationEnd`),animationiteration:ni(`Animation`,`AnimationIteration`),animationstart:ni(`Animation`,`AnimationStart`),transitionrun:ni(`Transition`,`TransitionRun`),transitionstart:ni(`Transition`,`TransitionStart`),transitioncancel:ni(`Transition`,`TransitionCancel`),transitionend:ni(`Transition`,`TransitionEnd`)},ii={},ai={};jn&&(ai=document.createElement(`div`).style,`AnimationEvent`in window||(delete ri.animationend.animation,delete ri.animationiteration.animation,delete ri.animationstart.animation),`TransitionEvent`in window||delete ri.transitionend.transition);function oi(e){if(ii[e])return ii[e];if(!ri[e])return e;var t=ri[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ai)return ii[e]=t[n];return e}var si=oi(`animationend`),ci=oi(`animationiteration`),li=oi(`animationstart`),ui=oi(`transitionrun`),di=oi(`transitionstart`),fi=oi(`transitioncancel`),pi=oi(`transitionend`),mi=new Map,hi=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);hi.push(`scrollEnd`);function gi(e,t){mi.set(e,t),Wt(t,[e])}var _i=0;function vi(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=bd.identifierPrefix;var n=_i++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function yi(e){if(e==null||typeof e==`string`)return e;var t=null,n=Od;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function bi(e,t){return e=yi(e),t=yi(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var xi=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},Si=[],Ci=0,wi=0;function Ti(){for(var e=Ci,t=wi=Ci=0;t<e;){var n=Si[t];Si[t++]=null;var r=Si[t];Si[t++]=null;var i=Si[t];Si[t++]=null;var a=Si[t];if(Si[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ki(n,i,a)}}function Ei(e,t,n,r){Si[Ci++]=e,Si[Ci++]=t,Si[Ci++]=n,Si[Ci++]=r,wi|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Di(e,t,n,r){return Ei(e,t,n,r),Ai(e)}function Oi(e,t){return Ei(e,null,null,t),Ai(e)}function ki(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-rt(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function Ai(e){if(50<kd)throw kd=0,Ad=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ji={};function Mi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ni(e,t,n,r){return new Mi(e,t,n,r)}function Pi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Fi(e,t){var n=e.alternate;return n===null?(n=Ni(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Ii(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Li(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)Pi(r)&&(s=1);else if(typeof r==`string`)s=qm(e,n,Te.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case de:return e=Ni(31,n,t,a),e.elementType=de,e.lanes=o,e;case D:return Ri(n.children,a,o,t);case ie:s=8,a|=24;break;case ae:return e=Ni(12,n,t,a|2),e.elementType=ae,e.lanes=o,e;case k:return e=Ni(13,n,t,a),e.elementType=k,e.lanes=o,e;case ce:return e=Ni(19,n,t,a),e.elementType=ce,e.lanes=o,e;case fe:case me:return e=a|32,e=Ni(30,n,t,e),e.elementType=me,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case O:s=10;break a;case oe:s=9;break a;case se:s=11;break a;case le:s=14;break a;case ue:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=Ni(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Ri(e,t,n,r){return e=Ni(7,e,r,t),e.lanes=n,e}function zi(e,t,n){return e=Ni(6,e,null,t),e.lanes=n,e}function Bi(e){var t=Ni(18,null,null,0);return t.stateNode=e,t}function Vi(e,t,n){return t=Ni(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Hi=new WeakMap;function Ui(e,t){if(typeof e==`object`&&e){var n=Hi.get(e);return n===void 0?(t={value:e,source:t,stack:ze(t)},Hi.set(e,t),t):n}return{value:e,source:t,stack:ze(t)}}var Wi=[],Gi=0,Ki=null,qi=0,Ji=[],Yi=0,Xi=null,Zi=1,Qi=``;function $i(e,t){Wi[Gi++]=qi,Wi[Gi++]=Ki,Ki=e,qi=t}function ea(e,t,n){Ji[Yi++]=Zi,Ji[Yi++]=Qi,Ji[Yi++]=Xi,Xi=e;var r=Zi;e=Qi;var i=32-rt(r)-1;r&=~(1<<i),n+=1;var a=32-rt(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Zi=1<<32-rt(t)+i|n<<i|r,Qi=a+e}else Zi=1<<a|n<<i|r,Qi=e}function ta(e){e.return!==null&&($i(e,1),ea(e,1,0))}function na(e){for(;e===Ki;)Ki=Wi[--Gi],Wi[Gi]=null,qi=Wi[--Gi],Wi[Gi]=null;for(;e===Xi;)Xi=Ji[--Yi],Ji[Yi]=null,Qi=Ji[--Yi],Ji[Yi]=null,Zi=Ji[--Yi],Ji[Yi]=null}function ra(e,t){Ji[Yi++]=Zi,Ji[Yi++]=Qi,Ji[Yi++]=Xi,Zi=t.id,Qi=t.overflow,Xi=e}var ia=null,aa=null,z=!1,oa=null,B=!1,sa=Error(i(519));function ca(e){throw ma(Ui(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),sa}function la(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[Et]=e,t[Dt]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<zf.length;n++)Q(zf[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),ln(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),pn(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||ep(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=Sn),t=!0):t=!1,t||ca(e,!0)}function ua(e){for(ia=e.return;ia;)switch(ia.tag){case 5:case 31:case 13:B=!1;return;case 27:case 3:B=!0;return;default:ia=ia.return}}function da(e){if(e!==ia)return!1;if(!z)return ua(e),z=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||pp(e.type,e.memoizedProps)),n=!n),n&&aa&&ca(e),ua(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));aa=dm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));aa=dm(e)}else t===27?(t=aa,Sp(e.type)?(e=um,um=null,aa=e):aa=t):aa=ia?lm(e.stateNode.nextSibling):null;return!0}function fa(){aa=ia=null,z=!1}function pa(){var e=oa;return e!==null&&(fd===null?fd=e:fd.push.apply(fd,e),oa=null),e}function ma(e){oa===null?oa=[e]:oa.push(e)}var ha=Ce(null),ga=null,_a=null;function va(e,t,n){N(ha,t._currentValue),t._currentValue=n}function ya(e){e._currentValue=ha.current,we(ha)}function ba(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function xa(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),ba(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),ba(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),ba(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Sa(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Ur(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===Oe.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[sh]:e.push(sh))}a=a.return}return e!==null&&xa(t,e,n,r),t.flags|=262144,e!==null}function Ca(e){for(e=e.firstContext;e!==null;){if(!Ur(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function wa(e){ga=e,_a=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ta(e){return Da(ga,e)}function Ea(e,t){return ga===null&&wa(e),Da(e,t)}function Da(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},_a===null){if(e===null)throw Error(i(308));_a=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else _a=_a.next=t;return n}var Oa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},ka=t.unstable_scheduleCallback,Aa=t.unstable_NormalPriority,ja={$$typeof:O,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ma(){return{controller:new Oa,data:new Map,refCount:0}}function Na(e){e.refCount--,e.refCount===0&&ka(Aa,function(){e.controller.abort()})}function Pa(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var Fa=null;function Ia(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var La=null,Ra=0,za=0,Ba=null;function Va(e,t){if(La===null){var n=La=[];Ra=0,za=Pf(),Ba={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Ra++,t.then(Ha,Ha),t}function Ha(){if(--Ra===0&&(Fa=null,La!==null)){Ba!==null&&(Ba.status=`fulfilled`);var e=La;La=null,za=0,Ba=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Ua(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Wa=j.S;j.S=function(e,t){if(hd=Ge(),typeof t==`object`&&t&&typeof t.then==`function`&&Va(e,t),Fa!==null)for(var n=bf;n!==null;)Pa(n,Fa),n=n.next;if(n=e.types,n!==null){for(var r=bf;r!==null;)Pa(r,n),r=r.next;if(za!==0){r=Fa,r===null&&(r=Fa=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Wa!==null&&Wa(e,t)};var Ga=Ce(null);function Ka(){var e=Ga.current;return e===null?$u.pooledCache:e}function qa(e,t){t===null?N(Ga,Ga.current):N(Ga,t.pool)}function Ja(){var e=Ka();return e===null?null:{parent:ja._currentValue,pool:e}}var V=Error(i(460)),Ya=Error(i(474)),Xa=Error(i(542)),Za={then:function(){}};function Qa(e){return e=e.status,e===`fulfilled`||e===`rejected`}function $a(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Sn,Sn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ro(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(Sn,Sn);else{if(e=$u,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ro(e),e}throw to=t,V}}function eo(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(to=e,V):e}}var to=null;function no(){if(to===null)throw Error(i(459));var e=to;return to=null,e}function ro(e){if(e===V||e===Xa)throw Error(i(483))}var io=null,ao=0;function oo(e){var t=ao;return ao+=1,io===null&&(io=[]),$a(io,e,t)}function so(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function co(e,t){throw t.$$typeof===te?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function lo(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Fi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=zi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===D?(e=d(e,t,n.props.children,r,n.key),so(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===ue&&eo(i)===t.type)?(t=a(t,n.props),so(t,n),t.return=e,t):(t=Li(n.type,n.key,n.props,null,e.mode,r),so(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Vi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Ri(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=zi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case ne:return n=Li(t.type,t.key,t.props,null,e.mode,n),so(n,t),n.return=e,n;case re:return t=Vi(t,e.mode,n),t.return=e,t;case ue:return t=eo(t),f(e,t,n)}if(ye(t)||_e(t))return t=Ri(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,oo(t),n);if(t.$$typeof===O)return f(e,Ea(e,t),n);co(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case ne:return n.key===i?l(e,t,n,r):null;case re:return n.key===i?u(e,t,n,r):null;case ue:return n=eo(n),p(e,t,n,r)}if(ye(n)||_e(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,oo(n),r);if(n.$$typeof===O)return p(e,t,Ea(e,n),r);co(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case ne:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case re:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ue:return r=eo(r),m(e,t,n,r,i)}if(ye(r)||_e(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,oo(r),i);if(r.$$typeof===O)return m(e,t,n,Ea(t,r),i);co(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),z&&$i(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return z&&$i(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),z&&$i(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),z&&$i(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return z&&$i(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),z&&$i(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===D&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case ne:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===D){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),so(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===ue&&eo(l)===r.type){n(e,r.sibling),c=a(r,o.props),so(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===D?(c=Ri(o.props.children,e.mode,c,o.key),so(c,o),c.return=e,e=c):(c=Li(o.type,o.key,o.props,null,e.mode,c),so(c,o),c.return=e,e=c)}return s(e);case re:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Vi(o,e.mode,c),c.return=e,e=c}return s(e);case ue:return o=eo(o),_(e,r,o,c)}if(ye(o))return h(e,r,o,c);if(_e(o)){if(l=_e(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,oo(o),c);if(o.$$typeof===O)return _(e,r,Ea(e,o),c);co(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=zi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{ao=0;var i=_(e,t,n,r);return io=null,i}catch(t){if(t===V||t===Xa)throw t;var a=Ni(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var uo=lo(!0),fo=lo(!1),po=!1;function mo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ho(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function go(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function H(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,q&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Ai(e),ki(e,null,n),t}return Ei(e,r,t,n),Ai(e)}function _o(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,yt(e,n)}}function vo(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var yo=!1;function bo(){if(yo){var e=Ba;if(e!==null)throw e}}function xo(e,t,n,r){yo=!1;var i=e.updateQueue;po=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Y&f)===f:(r&f)===f){f!==0&&f===za&&(yo=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=E({},d,f);break a;case 2:po=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),od|=o,e.lanes=o,e.memoizedState=d}}function So(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Co(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)So(n[e],t)}var wo=Ce(null),To=Ce(0);function Eo(e,t){e=id,N(To,e),N(wo,t),id=e|t.baseLanes}function Do(){N(To,id),N(wo,wo.current)}function Oo(){id=To.current,we(wo),we(To)}var ko=Ce(null),Ao=null;function jo(e){var t=e.alternate;N(Io,Io.current&1),N(ko,e),Ao===null&&(t===null||wo.current!==null||t.memoizedState!==null)&&(Ao=e)}function Mo(e){N(Io,Io.current),N(ko,e),Ao===null&&(Ao=e)}function No(e){e.tag===22?(N(Io,Io.current),N(ko,e),Ao===null&&(Ao=e)):Po()}function Po(){N(Io,Io.current),N(ko,ko.current)}function Fo(e){we(ko),Ao===e&&(Ao=null),we(Io)}var Io=Ce(0);function Lo(e,t){N(ko,ko.current),N(Io,t)}function Ro(e){we(Io),we(ko),Ao===e&&(Ao=null)}function zo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||om(n)||sm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Bo=0,U=null,W=null,Vo=null,Ho=!1,Uo=!1,Wo=!1,Go=0,Ko=0,qo=null,Jo=0;function Yo(){throw Error(i(321))}function Xo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ur(e[n],t[n]))return!1;return!0}function Zo(e,t,n,r,i,a){return Bo=a,U=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,j.H=e===null||e.memoizedState===null?pc:mc,Wo=!1,a=n(r,i),Wo=!1,Uo&&(a=$o(t,n,r,i)),Qo(e),a}function Qo(e){j.H=fc;var t=W!==null&&W.next!==null;if(Bo=0,Vo=W=U=null,Ho=!1,Ko=0,qo=null,t)throw Error(i(300));e===null||jc||(e=e.dependencies,e!==null&&Ca(e)&&(jc=!0))}function $o(e,t,n,r){U=e;var a=0;do{if(Uo&&(qo=null),Ko=0,Uo=!1,25<=a)throw Error(i(301));if(a+=1,Vo=W=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}j.H=hc,o=t(n,r)}while(Uo);return o}function es(){var e=j.H,t=e.useState()[0];return t=typeof t.then==`function`?os(t):t,e=e.useState()[0],(W===null?null:W.memoizedState)!==e&&(U.flags|=1024),t}function ts(){var e=Go!==0;return Go=0,e}function ns(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function rs(e){if(Ho){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ho=!1}Bo=0,Vo=W=U=null,Uo=!1,Ko=Go=0,qo=null}function is(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Vo===null?U.memoizedState=Vo=e:Vo=Vo.next=e,Vo}function G(){if(W===null){var e=U.alternate;e=e===null?null:e.memoizedState}else e=W.next;var t=Vo===null?U.memoizedState:Vo.next;if(t!==null)Vo=t,W=e;else{if(e===null)throw U.alternate===null?Error(i(467)):Error(i(310));W=e,e={memoizedState:W.memoizedState,baseState:W.baseState,baseQueue:W.baseQueue,queue:W.queue,next:null},Vo===null?U.memoizedState=Vo=e:Vo=Vo.next=e}return Vo}function as(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function os(e){var t=Ko;return Ko+=1,qo===null&&(qo=[]),e=$a(qo,e,t),t=U,(Vo===null?t.memoizedState:Vo.next)===null&&(t=t.alternate,j.H=t===null||t.memoizedState===null?pc:mc),e}function ss(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return os(e);if(e.$$typeof===he)return;if(e.$$typeof===O)return Ta(e)}throw Error(i(438,String(e)))}function cs(e){var t=null,n=U.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=U.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=as(),U.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=pe;return t.index++,n}function ls(e,t){return typeof t==`function`?t(e):t}function us(e){return ds(G(),W,e)}function ds(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Bo&f)===f:(Y&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===za&&(d=!0);else if((Bo&p)===p){u=u.next,p===za&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,U.lanes|=p,od|=p;f=u.action,Wo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,U.lanes|=f,od|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Ur(o,e.memoizedState)&&(jc=!0,d&&(n=Ba,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function fs(e){var t=G(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Ur(o,t.memoizedState)||(jc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function ps(e,t,n){var r=U,a=G(),o=z;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Ur((W||a).memoizedState,n);if(s&&(a.memoizedState=n,jc=!0),a=a.queue,Rs(gs.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||Vo!==null&&!!(Vo.memoizedState.tag&1),Ns(e?9:8,{destroy:void 0},hs.bind(null,r,a,n,t),null),e){if(r.flags|=2048,$u===null)throw Error(i(349));o||Bo&127||ms(r,t,n)}return n}function ms(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=U.updateQueue,t===null?(t=as(),U.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function hs(e,t,n,r){t.value=n,t.getSnapshot=r,_s(t)&&vs(e)}function gs(e,t,n){return n(function(){_s(t)&&vs(e)})}function _s(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ur(e,n)}catch{return!0}}function vs(e){var t=Oi(e,2);t!==null&&Pd(t,e,2)}function ys(e){var t=is();if(typeof e==`function`){var n=e;if(e=n(),Wo){nt(!0);try{n()}finally{nt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ls,lastRenderedState:e},t}function bs(e,t,n,r){return e.baseState=n,ds(e,W,typeof r==`function`?r:ls)}function xs(e,t,n,r,a){if(lc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};j.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Ss(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Ss(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=j.T,o={};o.types=a===null?null:a.types,j.T=o;try{var s=n(i,r),c=j.S;c!==null&&c(o,s),Cs(e,t,s)}catch(n){Ts(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),j.T=a}}else try{a=n(i,r),Cs(e,t,a)}catch(n){Ts(e,t,n)}}function Cs(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){ws(e,t,n)},function(n){return Ts(e,t,n)}):ws(e,t,n)}function ws(e,t,n){t.status=`fulfilled`,t.value=n,Es(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Ss(e,n)))}function Ts(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Es(t),t=t.next;while(t!==r)}e.action=null}function Es(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Ds(e,t){return t}function Os(e,t){if(z){var n=$u.formState;if(n!==null){a:{var r=U;if(z){if(aa){b:{for(var i=aa,a=B;i.nodeType!==8;)if(!a||(i=lm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){aa=lm(i.nextSibling),r=i.data===`F!`;break a}}ca(r)}r=!1}r&&(t=n[0])}}return n=is(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ds,lastRenderedState:t},n.queue=r,n=oc.bind(null,U,r),r.dispatch=n,r=ys(!1),a=cc.bind(null,U,!1,r.queue),r=is(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=xs.bind(null,U,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function ks(e){return As(G(),W,e)}function As(e,t,n){if(t=ds(e,t,Ds)[0],e=us(ls)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=os(t)}catch(e){throw e===V?Xa:e}else r=t;t=G();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(U.flags|=2048,Ns(9,{destroy:void 0},js.bind(null,i,n),null)),[r,a,e]}function js(e,t){e.action=t}function Ms(e){var t=G(),n=W;if(n!==null)return As(t,n,e);G(),t=t.memoizedState,n=G();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Ns(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=U.updateQueue,t===null&&(t=as(),U.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Ps(){return G().memoizedState}function Fs(e,t,n,r){var i=is();U.flags|=e,i.memoizedState=Ns(1|t,{destroy:void 0},n,r===void 0?null:r)}function Is(e,t,n,r){var i=G();r=r===void 0?null:r;var a=i.memoizedState.inst;W!==null&&r!==null&&Xo(r,W.memoizedState.deps)?i.memoizedState=Ns(t,a,n,r):(U.flags|=e,i.memoizedState=Ns(1|t,a,n,r))}function Ls(e,t){Fs(8390656,8,e,t)}function Rs(e,t){Is(2048,8,e,t)}function zs(e){U.flags|=4;var t=U.updateQueue;if(t===null)t=as(),U.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Bs(e){var t=G().memoizedState;return zs({ref:t,nextImpl:e}),function(){if(q&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Vs(e,t){return Is(4,2,e,t)}function Hs(e,t){return Is(4,4,e,t)}function Us(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ws(e,t,n){n=n==null?null:n.concat([e]),Is(4,4,Us.bind(null,t,e),n)}function Gs(){}function Ks(e,t){var n=G();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Xo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function qs(e,t){var n=G();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Xo(t,r[1]))return r[0];if(r=e(),Wo){nt(!0);try{e()}finally{nt(!1)}}return n.memoizedState=[r,t],r}function Js(e,t,n){return n===void 0||Bo&1073741824&&!(Y&261930)?e.memoizedState=t:(e.memoizedState=n,e=Md(),U.lanes|=e,od|=e,n)}function Ys(e,t,n,r){return Ur(n,t)?n:wo.current===null?!(Bo&106)||Bo&1073741824&&!(Y&261930)?(jc=!0,e.memoizedState=n):(e=Md(),U.lanes|=e,od|=e,t):(e=Js(e,n,r),Ur(e,t)||(jc=!0),e)}function Xs(e,t,n,r,i){var a=M.p;M.p=a!==0&&8>a?a:8;var o=j.T,s={};s.types=o===null?null:o.types,j.T=s,cc(e,!1,t,n);try{var c=i(),l=j.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?sc(e,t,Ua(c,r),jd(e)):sc(e,t,r,jd(e))}catch(n){sc(e,t,{then:function(){},status:`rejected`,reason:n},jd())}finally{M.p=a,o!==null&&s.types!==null&&(o.types=s.types),j.T=o}}function Zs(){}function Qs(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=$s(e).queue;Xs(e,a,t,be,n===null?Zs:function(){return ec(e),n(r)})}function $s(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:be,baseState:be,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ls,lastRenderedState:be},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ls,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ec(e){var t=$s(e);t.next===null&&(t=e.alternate.memoizedState),sc(e,t.next.queue,{},jd())}function tc(){return Ta(sh)}function nc(){return G().memoizedState}function rc(){return G().memoizedState}function ic(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=jd();e=go(n);var r=H(t,e,n);r!==null&&(Pd(r,t,n),_o(r,t,n)),t={cache:Ma()},e.payload=t;return}t=t.return}}function ac(e,t,n){var r=jd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},lc(e)?uc(t,n):(n=Di(e,t,n,r),n!==null&&(Pd(n,e,r),dc(n,t,r)))}function oc(e,t,n){sc(e,t,n,jd())}function sc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(lc(e))uc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Ur(s,o))return Ei(e,t,i,0),$u===null&&Ti(),!1}catch{}if(n=Di(e,t,i,r),n!==null)return Pd(n,e,r),dc(n,t,r),!0}return!1}function cc(e,t,n,r){if(r={lane:2,revertLane:Pf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},lc(e)){if(t)throw Error(i(479))}else t=Di(e,n,r,2),t!==null&&Pd(t,e,2)}function lc(e){var t=e.alternate;return e===U||t!==null&&t===U}function uc(e,t){Uo=Ho=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function dc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,yt(e,n)}}var fc={readContext:Ta,use:ss,useCallback:Yo,useContext:Yo,useEffect:Yo,useImperativeHandle:Yo,useLayoutEffect:Yo,useInsertionEffect:Yo,useMemo:Yo,useReducer:Yo,useRef:Yo,useState:Yo,useDebugValue:Yo,useDeferredValue:Yo,useTransition:Yo,useSyncExternalStore:Yo,useId:Yo,useHostTransitionStatus:Yo,useFormState:Yo,useActionState:Yo,useOptimistic:Yo,useMemoCache:Yo,useCacheRefresh:Yo,useEffectEvent:Yo},pc={readContext:Ta,use:ss,useCallback:function(e,t){return is().memoizedState=[e,t===void 0?null:t],e},useContext:Ta,useEffect:Ls,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Fs(4194308,4,Us.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Fs(4194308,4,e,t)},useInsertionEffect:function(e,t){Fs(4,2,e,t)},useMemo:function(e,t){var n=is();t=t===void 0?null:t;var r=e();if(Wo){nt(!0);try{e()}finally{nt(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=is();if(n!==void 0){var i=n(t);if(Wo){nt(!0);try{n(t)}finally{nt(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=ac.bind(null,U,e),[r.memoizedState,e]},useRef:function(e){var t=is();return e={current:e},t.memoizedState=e},useState:function(e){e=ys(e);var t=e.queue,n=oc.bind(null,U,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Gs,useDeferredValue:function(e,t){return Js(is(),e,t)},useTransition:function(){var e=ys(!1);return e=Xs.bind(null,U,e.queue,!0,!1),is().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=U,a=is();if(z){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),$u===null)throw Error(i(349));Y&127||ms(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Ls(gs.bind(null,r,o,e),[e]),r.flags|=2048,Ns(9,{destroy:void 0},hs.bind(null,r,o,n,t),null),n},useId:function(){var e=is(),t=$u.identifierPrefix;if(z){var n=Qi,r=Zi;n=(r&~(1<<32-rt(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Go++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Jo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:tc,useFormState:Os,useActionState:Os,useOptimistic:function(e){var t=is();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=cc.bind(null,U,!0,n),n.dispatch=t,[e,t]},useMemoCache:cs,useCacheRefresh:function(){return is().memoizedState=ic.bind(null,U)},useEffectEvent:function(e){var t=is(),n={impl:e};return t.memoizedState=n,function(){if(q&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},mc={readContext:Ta,use:ss,useCallback:Ks,useContext:Ta,useEffect:Rs,useImperativeHandle:Ws,useInsertionEffect:Vs,useLayoutEffect:Hs,useMemo:qs,useReducer:us,useRef:Ps,useState:function(){return us(ls)},useDebugValue:Gs,useDeferredValue:function(e,t){return Ys(G(),W.memoizedState,e,t)},useTransition:function(){var e=us(ls)[0],t=G().memoizedState;return[typeof e==`boolean`?e:os(e),t]},useSyncExternalStore:ps,useId:nc,useHostTransitionStatus:tc,useFormState:ks,useActionState:ks,useOptimistic:function(e,t){return bs(G(),W,e,t)},useMemoCache:cs,useCacheRefresh:rc,useEffectEvent:Bs},hc={readContext:Ta,use:ss,useCallback:Ks,useContext:Ta,useEffect:Rs,useImperativeHandle:Ws,useInsertionEffect:Vs,useLayoutEffect:Hs,useMemo:qs,useReducer:fs,useRef:Ps,useState:function(){return fs(ls)},useDebugValue:Gs,useDeferredValue:function(e,t){var n=G();return W===null?Js(n,e,t):Ys(n,W.memoizedState,e,t)},useTransition:function(){var e=fs(ls)[0],t=G().memoizedState;return[typeof e==`boolean`?e:os(e),t]},useSyncExternalStore:ps,useId:nc,useHostTransitionStatus:tc,useFormState:Ms,useActionState:Ms,useOptimistic:function(e,t){var n=G();return W===null?(n.baseState=e,[e,n.queue.dispatch]):bs(n,W,e,t)},useMemoCache:cs,useCacheRefresh:rc,useEffectEvent:Bs};function gc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:E({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var _c={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=jd(),i=go(r);i.payload=t,n!=null&&(i.callback=n),t=H(e,i,r),t!==null&&(Pd(t,e,r),_o(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=jd(),i=go(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=H(e,i,r),t!==null&&(Pd(t,e,r),_o(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=jd(),r=go(n);r.tag=2,t!=null&&(r.callback=t),t=H(e,r,n),t!==null&&(Pd(t,e,n),_o(t,e,n))}};function vc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!R(n,r)||!R(i,a):!0}function yc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&_c.enqueueReplaceState(t,t.state,null)}function bc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=E({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function xc(e){xi(e)}function Sc(e){console.error(e)}function Cc(e){xi(e)}function wc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Tc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Ec(e,t,n){return n=go(n),n.tag=3,n.payload={element:null},n.callback=function(){wc(e,t)},n}function Dc(e){return e=go(e),e.tag=3,e}function Oc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Tc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Tc(t,n,r),typeof i!=`function`&&(vd===null?vd=new Set([this]):vd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function kc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Sa(t,n,a,!0),n=ko.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Ao===null?Kd():n.alternate===null&&ad===0&&(ad=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Za?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),mf(e,r,a)),!1;case 22:return n.flags|=65536,r===Za?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),mf(e,r,a)),!1}throw Error(i(435,n.tag))}return mf(e,r,a),Kd(),!1}if(z)return t=ko.current,t===null?(r!==sa&&(t=Error(i(423),{cause:r}),ma(Ui(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Ui(r,n),a=Ec(e.stateNode,r,a),vo(e,a),ad!==4&&(ad=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==sa&&(e=Error(i(422),{cause:r}),ma(Ui(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Ui(o,n),dd===null?dd=[o]:dd.push(o),ad!==4&&(ad=2),t===null)return!0;r=Ui(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Ec(n.stateNode,r,e),vo(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(vd===null||!vd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Dc(a),Oc(a,e,n,r),vo(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Ac=Error(i(461)),jc=!1;function Mc(e,t,n,r){t.child=e===null?fo(t,null,n,r):uo(t,e.child,n,r)}function Nc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return wa(t),r=Zo(e,t,n,o,a,i),s=ts(),e!==null&&!jc?(ns(e,t,i),sl(e,t,i)):(z&&s&&ta(t),t.flags|=1,Mc(e,t,r,i),t.child)}function Pc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!Pi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Fc(e,t,a,r,i)):(e=Li(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!cl(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?R:n,n(o,r)&&e.ref===t.ref)return sl(e,t,i)}return t.flags|=1,e=Fi(a,r),e.ref=t.ref,e.return=t,t.child=e}function Fc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(R(a,r)&&e.ref===t.ref){if(jc=!1,t.pendingProps=r=a,cl(e,i))e.flags&131072&&(jc=!0);else return t.lanes=e.lanes,sl(e,t,i)}}return Uc(e,t,n,r,i)}function Ic(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Rc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&qa(t,a===null?null:a.cachePool),a===null?Do():Eo(t,a),No(t);else return r=t.lanes=536870912,Rc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&qa(t,null),Do(),Po()):(qa(t,a.cachePool),Eo(t,a),Po(),t.memoizedState=null);return Mc(e,t,i,n),t.child}function Lc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Rc(e,t,n,r,i){var a=Ka();return a=a===null?null:{parent:ja._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&qa(t,null),Do(),No(t),e!==null&&Sa(e,t,r,!0),t.childLanes=i,null}function zc(e,t){return t=Qc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Bc(e,t,n){return uo(t,e.child,null,n),e=zc(t,t.pendingProps),e.flags|=2,Fo(t),t.memoizedState=null,e}function Vc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(z){if(r.mode===`hidden`)return e=zc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Lc(null,e);if(Mo(t),(e=aa)?(e=am(e,B),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Xi===null?null:{id:Zi,overflow:Qi},retryLane:536870912,hydrationErrors:null},n=Bi(e),n.return=t,t.child=n,ia=t,aa=null)):e=null,e===null)throw ca(t);return t.lanes=536870912,null}return zc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Mo(t),a){if(t.flags&256)t.flags&=-257,t=Bc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(jc||Sa(e,t,n,!1),a=(n&e.childLanes)!==0,jc||a){if(wo.current===null){if(r=$u,r!==null&&(s=bt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Oi(e,s),Pd(r,e,s),Ac;Kd()}t=Bc(e,t,n)}else e=o.treeContext,aa=lm(s.nextSibling),ia=t,z=!0,oa=null,B=!1,e!==null&&ra(t,e),t=zc(t,r),t.flags|=134221824;return t}return e=Fi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Hc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Uc(e,t,n,r,i){return wa(t),n=Zo(e,t,n,r,void 0,i),r=ts(),e!==null&&!jc?(ns(e,t,i),sl(e,t,i)):(z&&r&&ta(t),t.flags|=1,Mc(e,t,n,i),t.child)}function Wc(e,t,n,r,i,a){return wa(t),t.updateQueue=null,n=$o(t,r,n,i),Qo(e),r=ts(),e!==null&&!jc?(ns(e,t,a),sl(e,t,a)):(z&&r&&ta(t),t.flags|=1,Mc(e,t,n,a),t.child)}function Gc(e,t,n,r,i){if(wa(t),t.stateNode===null){var a=ji,o=n.contextType;typeof o==`object`&&o&&(a=Ta(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=_c,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},mo(t),o=n.contextType,a.context=typeof o==`object`&&o?Ta(o):ji,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(gc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&_c.enqueueReplaceState(a,a.state,null),xo(t,r,a,i),bo(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=bc(n,s);a.props=c;var l=a.context,u=n.contextType;o=ji,typeof u==`object`&&u&&(o=Ta(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&yc(t,a,r,o),po=!1;var f=t.memoizedState;a.state=f,xo(t,r,a,i),bo(),l=t.memoizedState,s||f!==l||po?(typeof d==`function`&&(gc(t,n,d,r),l=t.memoizedState),(c=po||vc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,ho(e,t),o=t.memoizedProps,u=bc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ji,typeof l==`object`&&l&&(c=Ta(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&yc(t,a,r,c),po=!1,f=t.memoizedState,a.state=f,xo(t,r,a,i),bo();var p=t.memoizedState;o!==d||f!==p||po||e!==null&&e.dependencies!==null&&Ca(e.dependencies)?(typeof s==`function`&&(gc(t,n,s,r),p=t.memoizedState),(u=po||vc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Ca(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,Hc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=uo(t,e.child,null,i),t.child=uo(t,null,n,i)):Mc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=sl(e,t,i),e}function Kc(e,t,n,r){return fa(),t.flags|=256,Mc(e,t,n,r),t.child}var qc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Jc(e){return{baseLanes:e,cachePool:Ja()}}function Yc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=ld),e}function Xc(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Io.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(z){if(i?jo(t):Po(),(e=aa)?(e=am(e,B),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Xi===null?null:{id:Zi,overflow:Qi},retryLane:536870912,hydrationErrors:null},n=Bi(e),n.return=t,t.child=n,ia=t,aa=null)):e=null,e===null)throw ca(t);return t.lanes=sm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(Po(),i=t.mode,a=Qc({mode:`hidden`,children:a},i),r=Ri(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=Jc(n),r.childLanes=Yc(e,o,n),t.memoizedState=qc,Lc(null,r)):(jo(t),Zc(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return el(e,t,a,o,r,c,s,n)}return i?(Po(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Fi(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Ri(i,a,n,null),i.flags|=2):i=Fi(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Lc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=Jc(n):(a=i.cachePool,a===null?a=Ja():(s=ja._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=Yc(e,o,n),t.memoizedState=qc,Lc(e.child,r)):(jo(t),n=e.child,e=n.sibling,n=Fi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Zc(e,t){return t=Qc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Qc(e,t){return e=Ni(22,e,null,t),e.lanes=0,e}function $c(e,t,n){return uo(t,e.child,null,n),e=Zc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function el(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(jo(t),t.flags&=-257,$c(e,t,c)):t.memoizedState===null?(Po(),o=a.fallback,s=t.mode,a=Qc({mode:`visible`,children:a.children},s),o=Ri(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,uo(t,e.child,null,c),a=t.child,a.memoizedState=Jc(c),a.childLanes=Yc(e,r,c),t.memoizedState=qc,Lc(null,a)):(Po(),t.child=e.child,t.flags|=128,null);if(jo(t),sm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,ma({value:a,source:null,stack:null})),$c(e,t,c)}if(jc||Sa(e,t,c,!1),r=(c&e.childLanes)!==0,jc||r){if(wo.current!==null)return $c(e,t,c);if(r=$u,r!==null&&(a=bt(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,Oi(e,a),Pd(r,e,a),Ac;return om(o)||Kd(),$c(e,t,c)}return om(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,aa=lm(o.nextSibling),ia=t,z=!0,oa=null,B=!1,e!==null&&ra(t,e),t=Zc(t,a.children),t.flags|=134221824,t)}function tl(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ba(e.return,t,n)}function nl(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&zo(n)===null&&(t=e),e=e.sibling}return t}function rl(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function il(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function al(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Io.current;if(t.flags&128)return Lo(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Lo(t,o),i===`backwards`&&e!==null?(il(e),Mc(e,t,r,n),il(e)):Mc(e,t,r,n),r=z?qi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&tl(e,n,t);else if(e.tag===19)tl(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=nl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,il(t)),rl(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&zo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}rl(t,!0,n,null,a,r);break;case`together`:rl(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=nl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),rl(t,!1,i,n,a,r)}return t.child}function ol(e,t,n){var r=t.pendingProps;return va(t,t.type,r.value),Mc(e,t,r.children,n),t.child}function sl(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),od|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(Sa(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Fi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Fi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function cl(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&Ca(e)))}function ll(e,t,n){switch(t.tag){case 3:ke(t,t.stateNode.containerInfo),va(t,ja,e.memoizedState.cache),fa();break;case 27:case 5:je(t);break;case 4:ke(t,t.stateNode.containerInfo);break;case 10:va(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Mo(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return jo(t),t.flags|=128,null;r=Sa(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?Xc(e,t,n):(jo(t),e=sl(e,t,n),e===null?null:e.sibling)}jo(t);break;case 19:if(t.flags&128)return al(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(Sa(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return al(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Lo(t,Io.current),r)break;return null;case 22:return t.lanes=0,Ic(e,t,n,t.pendingProps);case 24:va(t,ja,e.memoizedState.cache)}return sl(e,t,n)}function ul(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)jc=!0;else{if(!cl(e,n)&&!(t.flags&128))return jc=!1,ll(e,t,n);jc=!!(e.flags&131072)}}else jc=!1,z&&t.flags&1048576&&ea(t,qi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=eo(t.elementType),t.type=e,typeof e==`function`)Pi(e)?(r=bc(e,r),t.tag=1,t=Gc(null,t,e,r,n)):(t.tag=0,t=Uc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===se){t.tag=11,t=Nc(null,t,e,r,n);break a}if(a===le){t.tag=14,t=Pc(null,t,e,r,n);break a}if(a===O){t.tag=10,t.type=e,t=ol(null,t,n);break a}}throw t=ve(e)||e,Error(i(306,t,``))}}return t;case 0:return Uc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=bc(r,t.pendingProps),Gc(e,t,r,a,n);case 3:a:{if(ke(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,ho(e,t),xo(t,r,null,n);var s=t.memoizedState;if(r=s.cache,va(t,ja,r),r!==o.cache&&xa(t,[ja],n,!0),bo(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Kc(e,t,r,n);break a}if(r!==a){a=Ui(Error(i(424)),t),ma(a),t=Kc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(aa=lm(e.firstChild),ia=t,z=!0,oa=null,B=!0,n=fo(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(fa(),r===a){t=sl(e,t,n);break a}Mc(e,t,r,n)}t=t.child}return t;case 26:return Hc(e,t),e===null?(n=Nm(t.type,null,t.pendingProps,null))?t.memoizedState=n:z||(t.stateNode=fp(t.type,t.pendingProps,De.current,t)):t.memoizedState=Nm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return je(t),e===null&&z&&(r=t.stateNode=hm(t.type,t.pendingProps,De.current),ia=t,B=!0,a=aa,Sp(t.type)?(um=a,aa=lm(r.firstChild)):aa=a),Mc(e,t,t.pendingProps.children,n),Hc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&z&&((a=r=aa)&&(r=rm(r,t.type,t.pendingProps,B),r===null?a=!1:(t.stateNode=r,ia=t,aa=lm(r.firstChild),B=!1,a=!0)),a||ca(t)),je(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,pp(a,o)?r=null:s!==null&&pp(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Zo(e,t,es,null,null,n),sh._currentValue=a),Hc(e,t),Mc(e,t,r,n),t.child;case 6:return e===null&&z&&((e=n=aa)&&(n=im(n,t.pendingProps,B),n===null?e=!1:(t.stateNode=n,ia=t,aa=null,e=!0)),e||ca(t)),null;case 13:return Xc(e,t,n);case 4:return ke(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=uo(t,null,r,n):Mc(e,t,r,n),t.child;case 11:return Nc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,Hc(e,t),Mc(e,t,r,n),t.child;case 8:return Mc(e,t,t.pendingProps.children,n),t.child;case 12:return Mc(e,t,t.pendingProps.children,n),t.child;case 10:return ol(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,wa(t),a=Ta(a),r=r(a),t.flags|=1,Mc(e,t,r,n),t.child;case 14:return Pc(e,t,t.type,t.pendingProps,n);case 15:return Fc(e,t,t.type,t.pendingProps,n);case 19:return al(e,t,n);case 31:return Vc(e,t,n);case 22:return Ic(e,t,n,t.pendingProps);case 24:return wa(t),r=Ta(ja),e===null?(a=Ka(),a===null&&(a=$u,o=Ma(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},mo(t),va(t,ja,a)):((e.lanes&n)!==0&&(ho(e,t),xo(t,null,null,n),bo()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,va(t,ja,r),r!==a.cache&&xa(t,[ja],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),va(t,ja,r))),Mc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:z&&ta(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:Hc(e,t),Mc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function dl(e){e.flags|=4}function fl(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Jm(t,r):Jm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Ud())e.flags|=8192;else throw to=Za,Ya}}else e.flags&=-16777217}function pl(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Ym(t)){if(Ud())e.flags|=8192;else throw to=Za,Ya}}function ml(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:mt(),e.lanes|=t,ud|=t)}function hl(e,t){if(!z)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function gl(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function _l(e,t,n){var r=t.pendingProps;switch(na(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return gl(t),null;case 1:return gl(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),ya(ja),Ae(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(da(t)?dl(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,pa())),gl(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(dl(t),o===null?(gl(t),fl(t,a,null,r,n)):(gl(t),pl(t,o))):o?o===e.memoizedState?(gl(t),t.flags&=-16777217):(dl(t),gl(t),pl(t,o)):(e=e.memoizedProps,e!==r&&dl(t),gl(t),fl(t,a,e,r,n)),null;case 27:if(Me(t),n=De.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&dl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return gl(t),t.subtreeFlags&=-33554433,null}e=Te.current,da(t)?la(t,e):(e=hm(a,r,n),t.stateNode=e,dl(t))}return gl(t),t.subtreeFlags&=-33554433,null;case 5:if(Me(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&dl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return gl(t),t.subtreeFlags&=-33554433,null}if(o=Te.current,da(t))la(t,o);else{var s=lp(De.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[Et]=t,o[Dt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(np(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&dl(t)}}return gl(t),t.subtreeFlags&=-33554433,fl(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&dl(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=De.current,da(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=ia,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[Et]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||ep(e.nodeValue,n)),e||ca(t,!0)}else e=lp(e).createTextNode(r),e[Et]=t,t.stateNode=e}return gl(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=da(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[Et]=t}else fa(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;gl(t),e=!1}else n=pa(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Fo(t),t):(Fo(t),null);if(t.flags&128)throw Error(i(558))}return gl(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=da(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[Et]=t}else fa(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;gl(t),a=!1}else a=pa(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Fo(t),t):(Fo(t),null)}return Fo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),ml(t,t.updateQueue),gl(t),null);case 4:return Ae(),e===null&&Wf(t.stateNode.containerInfo),t.flags|=67108864,gl(t),null;case 10:return ya(t.type),gl(t),null;case 19:if(Ro(t),r=t.memoizedState,r===null)return gl(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)hl(r,!1);else{if(ad!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=zo(e),o!==null){for(t.flags|=128,hl(r,!1),e=o.updateQueue,t.updateQueue=e,ml(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Ii(n,e),n=n.sibling;return Lo(t,Io.current&1|2),z&&$i(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ge()>gd&&(t.flags|=128,a=!0,hl(r,!1),t.lanes=4194304)}}else{if(!a){if(e=zo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,ml(t,e),hl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!z)return gl(t),null}else 2*Ge()-r.renderingStartTime>gd&&n!==536870912&&(t.flags|=128,a=!0,hl(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ge(),e.sibling=null,o=Io.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||z?Lo(t,o):(n=o,N(ko,t),N(Io,n),Ao===null&&(Ao=t)),z&&$i(t,r.treeForkCount),e}return gl(t),null;case 22:case 23:return Fo(t),Oo(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(gl(t),t.subtreeFlags&6&&(t.flags|=8192)):gl(t),n=t.updateQueue,n!==null&&ml(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&we(Ga),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ya(ja),gl(t),null;case 25:return null;case 30:return t.flags|=33554432,gl(t),null}throw Error(i(156,t.tag))}function vl(e,t){switch(na(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ya(ja),Ae(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Me(t),null;case 31:if(t.memoizedState!==null){if(Fo(t),t.alternate===null)throw Error(i(340));fa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Fo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));fa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ro(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Ae(),null;case 10:return ya(t.type),null;case 22:case 23:return Fo(t),Oo(),e!==null&&we(Ga),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ya(ja),null;case 25:return null;default:return null}}function yl(e,t){switch(na(t),t.tag){case 3:ya(ja),Ae();break;case 26:case 27:case 5:Me(t);break;case 4:Ae();break;case 31:t.memoizedState!==null&&Fo(t);break;case 13:Fo(t);break;case 19:Ro(t);break;case 10:ya(t.type);break;case 22:case 23:Fo(t),Oo(),e!==null&&we(Ga);break;case 24:ya(ja)}}function bl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function xl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Sl(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Co(t,n)}catch(t){Z(e,e.return,t)}}}function Cl(e,t,n){n.props=bc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function wl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=vi(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Pp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new Fp(e);h(e.child,!1,Qp,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Tl(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}}function El(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)em(e.stateNode,t[n])}function Dl(e){for(var t=e.return;t!==null&&(Al(t)&&em(e.stateNode,t.stateNode),!kl(t));)t=t.return}function Ol(e){for(var t=e.return;t!==null&&(Al(t)&&tm(e.stateNode,t.stateNode),!kl(t));)t=t.return}function kl(e){return e.tag===5||e.tag===3||e.tag===27}function Al(e){return e&&e.tag===7&&e.stateNode!==null}function jl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Ml(e,t,n){try{var r=e.stateNode;ip(r,e.type,n,t),r[Dt]=t}catch(t){Z(e,e.return,t)}}function Nl(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Sp(e.type)||e.tag===4}function Pl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Nl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Sp(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Fl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Sn)),El(e,r),F=!0;else if(i!==4&&(i===27&&(El(e,r),r=null,Sp(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Fl(e,t,n,r),e=e.sibling;e!==null;)Fl(e,t,n,r),e=e.sibling}function Il(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),El(e,r),F=!0;else if(i!==4&&(i===27&&(El(e,r),r=null,Sp(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Il(e,t,n,r),e=e.sibling;e!==null;)Il(e,t,n,r),e=e.sibling}function Ll(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);np(t,r,n),t[Et]=e,t[Dt]=n}catch(t){Z(e,e.return,t)}}var Rl=!1,zl=null;function Bl(e){(e.tag===30||e.subtreeFlags&33554432)&&(Rl=!0)}var Vl=null;function Hl(){var e=Vl;return Vl=null,e}var Ul=0;function Wl(e,t,n,r,i){return Ul=0,Gl(e.child,t,n,r,i)}function Gl(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Op(o);r.push(s),s.view&&(a=!0)}else a||Op(o).view&&(a=!0);Rl=!0,Tp(o,Ul===0?t:t+`_`+Ul,n),Ul++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&i||Gl(e.child,t,n,r,i)&&(a=!0));e=e.sibling}return a}function Kl(e,t){for(;e!==null;)e.tag===5?Ep(e.stateNode,e.memoizedProps):(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&t||Kl(e.child,t)),e=e.sibling}function ql(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(ql(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=bi(t.default,t.share),t!==`none`&&(Wl(e,n,t,null,!1)||Kl(e.child,!1))}e=e.sibling}}function Jl(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=vi(r,n),a=bi(r.default,n.paired?r.share:r.enter);a===`none`?ql(e):Wl(e,i,a,null,!1)?(ql(e),n.paired||t||Nd(e,r.onEnter)):Kl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Jl(e,t),e=e.sibling;else ql(e)}function Yl(e){if(zl!==null&&zl.size!==0){var t=zl;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=bi(n.default,n.share);if(a!==`none`&&(Wl(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Nd(e,n.onShare)):Kl(e.child,!1)),t.delete(r),t.size===0)break}}}Yl(e)}e=e.sibling}}}function Xl(e){if(e.tag===30){var t=e.memoizedProps,n=vi(t,e.stateNode),r=zl===null?void 0:zl.get(n),i=bi(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Wl(e,n,i,null,!1)?r===void 0?Nd(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,zl.delete(n),Nd(e,t.onShare)):Kl(e.child,!1)),zl!==null&&Yl(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Xl(e),e=e.sibling;else zl!==null&&Yl(e)}function Zl(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=vi(t,e.stateNode);t=bi(t.default,t.update),e.flags&=-5,t!==`none`&&Wl(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&Zl(e);e=e.sibling}}function Ql(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Kl(e.child,!1))}Ql(e)}e=e.sibling}}function $l(e){if(e.tag===30)e.stateNode.paired=null,Kl(e.child,!1),Ql(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)$l(e),e=e.sibling;else Ql(e)}function eu(e){for(e=e.child;e!==null;)e.tag===30?Kl(e.child,!1):e.subtreeFlags&33554432&&eu(e),e=e.sibling}function tu(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&Ul<a.length){var l=a[Ul],u=Op(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&Tp(c,Ul===0?n:n+`_`+Ul,i),s&&e.flags&4||(Vl===null&&(Vl=[]),Vl.push(c,Ul===0?r:r+`_`+Ul,t.memoizedProps)),Ul++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:tu(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function nu(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=vi(n,r),a=bi(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(kp)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;Ul=0,i=tu(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Nd(e,n.onUpdate))}else e.subtreeFlags&33554432&&nu(e,t);e=e.sibling}}var ru=!1,K=!1,iu=!1,au=!1,ou=typeof WeakSet==`function`?WeakSet:Set,su=null,cu=!1,lu=!1,uu=!1,du=!1;function fu(e,t,n){if(e=e.containerInfo,sp=gh,e=Jr(e),Yr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(cp={focusedElem:e,selectionRange:r},gh=!1,n=(n&335544064)===n,su=t,t=n?9270:1024;su!==null;){if(e=su,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&Xl(r[a]);if(e.alternate===null&&e.flags&2)n&&Bl(e),pu(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&Xl(r),pu(n);continue}if(r!==null&&r.memoizedState!==null){n&&Bl(e),pu(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,su=r):(n&&Zl(e),pu(n))}}zl=null}function pu(e){for(;su!==null;){var t=su,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=bc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){Z(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)nm(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:nm(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=vi(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=bi(a.default,a.update),a!==`none`&&Wl(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,su=r;break}su=t.return}}function mu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Pu(e,n),r&4&&bl(5,n);break;case 1:if(Pu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=bc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}}r&64&&Sl(n),r&512&&wl(n,n.return);break;case 3:if(Pu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Co(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Ll(n);case 26:case 5:Pu(e,n),t===null&&r&4&&jl(n),r&512&&wl(n,n.return);break;case 12:Pu(e,n);break;case 31:Pu(e,n),r&4&&Cu(e,n);break;case 13:Pu(e,n),r&4&&wu(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=_f.bind(null,n),cm(e,n))));break;case 22:if(r=n.memoizedState!==null||ru,!r){var a=t!==null&&t.memoizedState!==null||K;t=ru,i=K,ru=r,(K=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),Iu(e,n,r)):Pu(e,n),ru=t,K=i}break;case 30:Pu(e,n),r&512&&wl(n,n.return);break;case 7:r&512&&wl(n,n.return);default:Pu(e,n)}}function hu(e,t){for(e=e.child;e!==null;)gu(e,t),e=e.sibling}function gu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){Z(e,e.return,t)}_u(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,F=!0}catch(t){Z(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?wp(s,!0):wp(e.stateNode,!1)}catch(t){Z(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&hu(e,t);break;default:hu(e,t)}}function _u(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:gu(n,r);break a;case 22:n.memoizedState===null&&_u(n,r);break a;default:_u(n,r)}}e=e.sibling}}function vu(e){var t=e.alternate;t!==null&&(e.alternate=null,vu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Ft(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var yu=null,bu=!1;function xu(e,t,n){for(n=n.child;n!==null;)Su(e,t,n),n=n.sibling}function Su(e,t,n){if(tt&&typeof tt.onCommitFiberUnmount==`function`)try{tt.onCommitFiberUnmount(et,n)}catch{}switch(n.tag){case 26:K||Tl(n,t),xu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!K&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:K||Tl(n,t),Ol(n);var r=yu,i=bu;Sp(n.type)&&(yu=n.stateNode,bu=!1),xu(e,t,n),gm(n.stateNode,n.type,n.memoizedProps),yu=r,bu=i;break;case 5:K||Tl(n,t),Ol(n);case 6:if(n.tag===6&&Ol(n),r=yu,i=bu,yu=null,xu(e,t,n),yu=r,bu=i,yu!==null){if(bu)try{(yu.nodeType===9?yu.body:yu.nodeName===`HTML`?yu.ownerDocument.body:yu).removeChild(n.stateNode),F=!0}catch(e){Z(n,t,e)}else try{yu.removeChild(n.stateNode),F=!0}catch(e){Z(n,t,e)}}break;case 18:yu!==null&&(bu?(e=yu,Cp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Hh(e)):Cp(yu,n.stateNode));break;case 4:r=yu,i=bu,yu=n.stateNode.containerInfo,bu=!0,xu(e,t,n),yu=r,bu=i;break;case 0:case 11:case 14:case 15:xl(2,n,t),K||xl(4,n,t),xu(e,t,n);break;case 1:K||(Tl(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Cl(n,t,r)),xu(e,t,n);break;case 21:xu(e,t,n);break;case 22:K=(r=K)||n.memoizedState!==null,xu(e,t,n),K=r;break;case 30:Tl(n,t),xu(e,t,n);break;case 7:K||Tl(n,t),xu(e,t,n);break;default:xu(e,t,n)}}function Cu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Hh(e)}catch(e){Z(t,t.return,e)}}}function wu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Hh(e)}catch(e){Z(t,t.return,e)}}function Tu(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ou),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ou),t;default:throw Error(i(435,e.tag))}}function Eu(e,t){var n=Tu(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=vf.bind(null,e,t);t.then(r,r)}})}function Du(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Sp(l.type)){yu=l.stateNode,bu=!1;break a}break;case 5:yu=l.stateNode,bu=!1;break a;case 3:case 4:yu=l.stateNode.containerInfo,bu=!0;break a}l=l.return}if(yu===null)throw Error(i(160));Su(s,c,o),yu=null,bu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)ku(t,e,n),t=t.sibling}var Ou=null;function ku(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}Du(t,e,n),Au(e),a&4&&(xl(3,e,e.return),bl(3,e),xl(5,e,e.return));break;case 1:Du(t,e,n),Au(e),a&512&&(K||r===null||Tl(r,r.return)),a&64&&ru&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=Ou,Du(t,e,n),Au(e),a&512&&(K||r===null||Tl(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(ru)e.stateNode=fp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[Nt]||r[Et]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),np(r,t,n),r[Et]=e,Bt(r),t=r;break a;case`link`:if(o=Gm(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Gm(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[Et]=e,Bt(r),t=r}e.stateNode=t}}else ru||Km(o,e.type,e.stateNode)}else e.stateNode=Bm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&Ml(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||K||t.parentNode.removeChild(t)):a.count--,n===null?ru||Km(o,e.type,e.stateNode):Bm(o,n,e.memoizedProps))}break;case 27:Du(t,e,n),Au(e),a&512&&(K||r===null||Tl(r,r.return)),r!==null&&a&4&&Ml(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=iu,iu=!1,Du(t,e,n),iu=o,Au(e),a&512&&(K||r===null||Tl(r,r.return)),e.flags&32){t=e.stateNode;try{mn(t,``),F=!0}catch(t){Z(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Ml(e,t,r===null?t:r.memoizedProps)),a&1024&&(au=!0);break;case 6:if(Du(t,e,n),Au(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,F=!0}catch(t){Z(e,e.return,t)}}break;case 3:if(F=!1,Wm=null,o=Ou,Ou=bm(t.containerInfo),Du(t,e,n),Ou=o,Au(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Hh(t.containerInfo)}catch(t){Z(e,e.return,t)}au&&(au=!1,ju(e)),F=!1;break;case 4:a=iu,iu=ru,r=Xt(),o=Ou,Ou=bm(e.stateNode.containerInfo),Du(t,e,n),Au(e),Ou=o,F&&lu&&(uu=!0),F=r,iu=a;break;case 12:Du(t,e,n),Au(e);break;case 31:Du(t,e,n),Au(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Eu(e,t)));break;case 13:Du(t,e,n),Au(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(md=Ge()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Eu(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=ru,l=K,u=iu;ru=c||o,iu=u||o,K=l||s,Du(t,e,n),K=l,iu=u,ru=c,Au(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||ru||K||(t=s||K,n=ru,r=K,ru=o||ru,K=t,Fu(e,2),ru=n,K=r),!o&&iu||hu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Eu(e,n))));break;case 19:Du(t,e,n),Au(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Eu(e,t)));break;case 30:a&512&&(K||r===null||Tl(r,r.return)),a=Xt(),o=lu,s=(n&335544064)===n,c=e.memoizedProps,lu=s&&bi(c.default,c.update)!==`none`,Du(t,e,n),Au(e),s&&r!==null&&F&&(e.flags|=4),lu=o,F=a;break;case 21:break;case 7:a&512&&(K||r===null||Tl(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Du(t,e,n),Au(e)}}function Au(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Nl(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(Al(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(kl(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Il(e,Pl(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(mn(l,``),n.flags&=-33),Il(e,Pl(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;Fl(e,Pl(e),u,s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ju(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;ju(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,gh=!0,t.reset(),gh=!1),e=e.sibling}}function Mu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Nu(t,e),t=t.sibling;else nu(t,!1)}function Nu(e,t){var n=e.alternate;if(n===null)Jl(e,!1);else switch(e.tag){case 3:if(du=cu=!1,Hl(),Mu(t,e),!cu&&!uu){if(e=Vl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ep(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),du=!0}Vl=null;break;case 5:Mu(t,e);break;case 4:r=cu,cu=!1,Mu(t,e),cu&&(uu=!0),cu=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Mu(t,e):Jl(e,!1));break;case 30:r=cu,i=Hl(),cu=!1,Mu(t,e),cu&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=vi(a,o),o=vi(n.memoizedProps,o);var s=bi(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Ul=0,t=tu(e,n,t,o,s,a,!0),Ul!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Nd(e,e.memoizedProps.onUpdate),Vl=i):i!==null&&(i.push.apply(i,Vl),Vl=i),cu=e.flags&32?!0:r;break;default:Mu(t,e)}}function Pu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)mu(e,t.alternate,t),t=t.sibling}function Fu(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:xl(4,n,n.return),Fu(n,r);break;case 1:Tl(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&Cl(n,n.return,i),Fu(n,r);break;case 27:r&2&&gm(n.stateNode,n.type,n.memoizedProps);case 5:Tl(n,n.return),n.tag!==5&&n.tag!==27||Ol(n),Fu(n,r);break;case 6:Ol(n);break;case 26:Tl(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||K||i.parentNode.removeChild(i),Fu(n,r);break;case 22:n.memoizedState===null&&Fu(n,r);break;case 30:Tl(n,n.return),Fu(n,r);break;case 7:Tl(n,n.return);default:Fu(n,r)}e=e.sibling}}function Iu(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:Iu(i,a,n),bl(4,a);break;case 1:if(Iu(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)So(l[i],c)}catch(e){Z(r,r.return,e)}}s&&o&64&&Sl(a),wl(a,a.return);break;case 27:n&2&&Ll(a);case 5:a.tag!==5&&a.tag!==27||Dl(a),Iu(i,a,n),s&&r===null&&o&4&&jl(a),wl(a,a.return);break;case 6:Dl(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||ru||Km(bm(c.ownerDocument),a.type,c),Iu(i,a,n),s&&r===null&&o&4&&jl(a),wl(a,a.return);break;case 12:Iu(i,a,n);break;case 31:Iu(i,a,n),s&&o&4&&Cu(i,a);break;case 13:Iu(i,a,n),s&&o&4&&wu(i,a);break;case 22:a.memoizedState===null&&Iu(i,a,n),wl(a,a.return);break;case 30:Iu(i,a,n),wl(a,a.return);break;case 7:wl(a,a.return);default:Iu(i,a,n)}t=t.sibling}}function Lu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Na(n))}function Ru(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Na(e))}function zu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Bu(e,t,n,r),t=t.sibling;else i&&eu(t)}function Bu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&$l(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:zu(e,t,n,r),a&2048&&bl(9,t);break;case 1:zu(e,t,n,r);break;case 3:zu(e,t,n,r),i&&du&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&Na(a)));break;case 12:if(a&2048){zu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else zu(e,t,n,r);break;case 31:zu(e,t,n,r);break;case 13:zu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&$l(t),o._visibility&2?zu(e,t,n,r):(o._visibility|=2,Vu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&$l(s),o._visibility&2?zu(e,t,n,r):Hu(e,t)),a&2048&&Lu(s,t);break;case 24:zu(e,t,n,r),a&2048&&Ru(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Kl(a.child,!0),Kl(t.child,!0))),zu(e,t,n,r);break;default:zu(e,t,n,r)}}function Vu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Vu(a,o,s,c,i),bl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Vu(a,o,s,c,i)):u._visibility&2?Vu(a,o,s,c,i):Hu(a,o),i&&l&2048&&Lu(o.alternate,o);break;case 24:Vu(a,o,s,c,i),i&&l&2048&&Ru(o.alternate,o);break;default:Vu(a,o,s,c,i)}t=t.sibling}}function Hu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Hu(n,r),i&2048&&Lu(r.alternate,r);break;case 24:Hu(n,r),i&2048&&Ru(r.alternate,r);break;default:Hu(n,r)}t=t.sibling}}var Uu=8192;function Wu(e,t,n){if(e.subtreeFlags&Uu)for(e=e.child;e!==null;)Gu(e,t,n),e=e.sibling}function Gu(e,t,n){switch(e.tag){case 26:Wu(e,t,n),e.flags&Uu&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&Zm(n,e)):Qm(n,Ou,e.memoizedState,e.memoizedProps));break;case 5:Wu(e,t,n),e.flags&Uu&&(e=e.stateNode,(t&335544128)===t&&Zm(n,e));break;case 3:case 4:var r=Ou;Ou=bm(e.stateNode.containerInfo),Wu(e,t,n),Ou=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Uu,Uu=16777216,Wu(e,t,n),Uu=r):Wu(e,t,n));break;case 30:if((e.flags&Uu)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,zl===null&&(zl=new Map),zl.set(r,i)}Wu(e,t,n);break;default:Wu(e,t,n)}}function Ku(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function qu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];su=r,Xu(r,e)}Ku(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ju(e),e=e.sibling}function Ju(e){switch(e.tag){case 0:case 11:case 15:qu(e),e.flags&2048&&xl(9,e,e.return);break;case 3:qu(e);break;case 12:qu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Yu(e)):qu(e);break;default:qu(e)}}function Yu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];su=r,Xu(r,e)}Ku(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:xl(8,t,t.return),Yu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Yu(t));break;default:Yu(t)}e=e.sibling}}function Xu(e,t){for(;su!==null;){var n=su;switch(n.tag){case 0:case 11:case 15:xl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Na(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,su=r;else a:for(n=e;su!==null;){r=su;var i=r.sibling,a=r.return;if(vu(r),r===n){su=null;break a}if(i!==null){i.return=a,su=i;break a}su=a}}}var Zu={getCacheForType:function(e){var t=Ta(ja),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Ta(ja).controller.signal}},Qu=typeof WeakMap==`function`?WeakMap:Map,q=0,$u=null,J=null,Y=0,X=0,ed=null,td=!1,nd=!1,rd=!1,id=0,ad=0,od=0,sd=0,cd=0,ld=0,ud=0,dd=null,fd=null,pd=!1,md=0,hd=0,gd=1/0,_d=null,vd=null,yd=0,bd=null,xd=null,Sd=0,Cd=0,wd=null,Td=null,Ed=null,Dd=null,Od=null,kd=0,Ad=null;function jd(){return q&2&&Y!==0?Y&-Y:j.T===null?Ct():Pf()}function Md(){if(ld===0){if(!(Y&536870912)||z){var e=st;st<<=1,!(st&3932160)&&(st=262144),ld=e}else ld=536870912}return e=ko.current,e!==null&&(e.flags|=32),ld}function Nd(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Pp(vi(e.memoizedProps,n))),Dd===null&&(Dd=[]),Dd.push(t.bind(null,r))}}function Pd(e,t,n){(e===$u&&(X===2||X===9)||e.cancelPendingCommit!==null)&&(Vd(e,0),Rd(e,Y,ld,!1)),gt(e,n),(!(q&2)||e!==$u)&&(e===$u&&(!(q&2)&&(sd|=n),ad===4&&Rd(e,Y,ld,!1)),Ef(e))}function Fd(e,t,n){if(q&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||dt(e,t),a=r?Yd(e,t):qd(e,t,!0),o=r;do{if(a===0){nd&&!r&&Rd(e,t,0,!1);break}if(n=e.current.alternate,o&&!Ld(n))a=qd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=dd;var l=c.current.memoizedState.isDehydrated;if(l&&(Vd(c,s).flags|=256),s=qd(c,s,!1),s!==2&&s!==6){if(rd&&!l){c.errorRecoveryDisabledLanes|=o,sd|=o,a=4;break a}o=fd,fd=a,o!==null&&(fd===null?fd=o:fd.push.apply(fd,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Vd(e,0),Rd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Rd(r,t,ld,!td);break a;case 2:fd=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=md+300-Ge(),10<a)){if(Rd(r,t,ld,!td),ut(r,0,!0)!==0)break a;Sd=t,r.timeoutHandle=gp(Id.bind(null,r,n,fd,_d,pd,t,ld,sd,ud,td,o,`Throttled`,-0,0),a);break a}Id(r,n,fd,_d,pd,t,ld,sd,ud,td,o,null,-0,0)}break}}while(1);Ef(e)}function Id(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Sn},zl=null,Gu(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=nh.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?md-Ge():(a&4194048)===a?hd-Ge():0,m=eh(d,m),m!==null)?(Sd=a,e.cancelPendingCommit=m(nf.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Rd(e,a,o,!l)):nf(e,t,a,n,r,i,o,s,c,l,u,d)}function Ld(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Ur(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Rd(e,t,n,r){t=ft(e,t),t&=~cd,t&=~sd,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-rt(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&vt(e,n,t)}function zd(){return q&6?!0:(Df(0,!1),!1)}function Bd(){if(J!==null){if(X===0)var e=J.return;else e=J,_a=ga=null,rs(e),io=null,ao=0,e=J;for(;e!==null;)yl(e.alternate,e),e=e.return;J=null}}function Vd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,_p(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Sd=0,Bd(),$u=e,J=n=Fi(e.current,null),Y=t,X=0,ed=null,td=!1,nd=dt(e,t),rd=!1,ud=ld=cd=sd=od=ad=0,fd=dd=null,pd=!1,id=ft(e,t),Ti(),n}function Hd(e,t){U=null,j.H=fc,t===V||t===Xa?(t=no(),X=3):t===Ya?(t=no(),X=4):X=t===Ac?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,ed=t,J===null&&(ad=1,wc(e,Ui(t,e.current)))}function Ud(){var e=ko.current;return e===null?!0:(Y&4194048)===Y?Ao===null:(Y&62914560)===Y||Y&536870912?e===Ao:!1}function Wd(){var e=j.H;return j.H=fc,e===null?fc:e}function Gd(){var e=j.A;return j.A=Zu,e}function Kd(){ad=4,td||(Y&4194048)!==Y&&ko.current!==null||(nd=!0),!(od&134217727)&&!(sd&134217727)||$u===null||Rd($u,Y,ld,!1)}function qd(e,t,n){var r=q;q|=2;var i=Wd(),a=Gd();($u!==e||Y!==t)&&(_d=null,Vd(e,t)),t=!1;var o=ad;a:do try{if(X!==0&&J!==null){var s=J,c=ed;switch(X){case 8:Bd(),o=6;break a;case 3:case 2:case 9:case 6:ko.current===null&&(t=!0);var l=X;if(X=0,ed=null,$d(e,s,c,l),n&&nd){o=0;break a}break;default:l=X,X=0,ed=null,$d(e,s,c,l)}}Jd(),o=ad;break}catch(t){Hd(e,t)}while(1);return t&&e.shellSuspendCounter++,_a=ga=null,q=r,j.H=i,j.A=a,J===null&&($u=null,Y=0,Ti()),o}function Jd(){for(;J!==null;)Zd(J)}function Yd(e,t){var n=q;q|=2;var r=Wd(),a=Gd();$u!==e||Y!==t?(_d=null,gd=Ge()+500,Vd(e,t)):nd=dt(e,t);a:do try{if(X!==0&&J!==null){t=J;var o=ed;b:switch(X){case 1:X=0,ed=null,$d(e,t,o,1);break;case 2:case 9:if(Qa(o)){X=0,ed=null,Qd(t);break}t=function(){X!==2&&X!==9||$u!==e||(X=7),Ef(e)},o.then(t,t);break a;case 3:X=7;break a;case 4:X=5;break a;case 7:Qa(o)?(X=0,ed=null,Qd(t)):(X=0,ed=null,$d(e,t,o,7));break;case 5:var s=null;switch(J.tag){case 26:s=J.memoizedState;case 5:case 27:var c=J;if(s?Ym(s):c.stateNode.complete){X=0,ed=null;var l=c.sibling;if(l!==null)J=l;else{var u=c.return;u===null?J=null:(J=u,ef(u))}break b}}X=0,ed=null,$d(e,t,o,5);break;case 6:X=0,ed=null,$d(e,t,o,6);break;case 8:Bd(),ad=6;break a;default:throw Error(i(462))}}Xd();break}catch(t){Hd(e,t)}while(1);return _a=ga=null,j.H=r,j.A=a,q=n,J===null?($u=null,Y=0,Ti(),ad):0}function Xd(){for(;J!==null&&!Ue();)Zd(J)}function Zd(e){var t=ul(e.alternate,e,id);e.memoizedProps=e.pendingProps,t===null?ef(e):J=t}function Qd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Wc(n,t,t.pendingProps,t.type,void 0,Y);break;case 11:t=Wc(n,t,t.pendingProps,t.type.render,t.ref,Y);break;case 5:rs(t);var r=t;r===ia&&(z?(ua(r),r.tag===5&&r.stateNode!=null&&(aa=r.stateNode)):(ua(r),z=!0));default:yl(n,t),t=J=Ii(t,id),t=ul(n,t,id)}e.memoizedProps=e.pendingProps,t===null?ef(e):J=t}function $d(e,t,n,r){_a=ga=null,rs(t),io=null,ao=0;var i=t.return;try{if(kc(e,i,t,n,Y)){ad=1,wc(e,Ui(n,e.current)),J=null;return}}catch(t){if(i!==null)throw J=i,t;ad=1,wc(e,Ui(n,e.current)),J=null;return}t.flags&32768?(z||r===1?e=!0:nd||Y&536870912?e=!1:(td=e=!0,(r===2||r===9||r===3||r===6)&&(r=ko.current,r!==null&&r.tag===13&&(r.flags|=16384))),tf(t,e)):ef(t)}function ef(e){var t=e;do{if(t.flags&32768){tf(t,td);return}e=t.return;var n=_l(t.alternate,t,id);if(n!==null){J=n;return}if(t=t.sibling,t!==null){J=t;return}J=t=e}while(t!==null);ad===0&&(ad=5)}function tf(e,t){do{var n=vl(e.alternate,e);if(n!==null){n.flags&=32767,J=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){J=e;return}J=e=n}while(e!==null);ad=6,J=null}function nf(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do df();while(yd!==0);if(q&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===$u&&(J=$u=null,Y=0),xd=t,bd=e,Sd=n,wd=a,Td=r,rf(e,t,n,s,c,l,f)}}function rf(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Cd=s,s|=wi,_t(e,n,s,r,i,a),Dd=null,(n&335544064)===n?(Od=Ia(e),r=10262):(Od=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,yf(Ye,function(){return ff(),null})):(e.callbackNode=null,e.callbackPriority=0),Rl=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=j.T,j.T=null,i=M.p,M.p=2,a=q,q|=4;try{fu(e,t,n)}finally{q=a,M.p=i,j.T=r}}yd=1,Rl?Ed=Mp(o,e.containerInfo,Od,sf,cf,of,lf,ff,af,null,null):(sf(),cf(),lf())}function af(e){if(yd!==0){var t=bd.onRecoverableError;t(e,{componentStack:null})}}function of(){yd===3&&(yd=0,Nu(xd,bd),yd=4)}function sf(){if(yd===1){yd=0;var e=bd,t=xd,n=Sd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=j.T,j.T=null;var i=M.p;M.p=2;var a=q;q|=4;try{lu=uu=!1,ku(t,e,n),n=cp;var o=Jr(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&qr(s.ownerDocument.documentElement,s)){if(c!==null&&Yr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Kr(s,h),v=Kr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}gh=!!sp,cp=sp=null}finally{q=a,M.p=i,j.T=r}}e.current=t,yd=2}}function cf(){if(yd===2){yd=0;var e=bd,t=xd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=j.T,j.T=null;var r=M.p;M.p=2;var i=q;q|=4;try{mu(e,t.alternate,t)}finally{q=i,M.p=r,j.T=n}}yd=3}}function lf(){if(yd===4||yd===3){yd=0;var e=Ed;Ed=null,We();var t=bd,n=xd,r=Sd,i=Td,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?yd=5:(yd=0,xd=bd=null,uf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(vd=null),St(r),n=n.stateNode,tt&&typeof tt.onCommitFiberRoot==`function`)try{tt.onCommitFiberRoot(et,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=j.T,a=M.p,M.p=2,j.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{j.T=n,M.p=a}}if(i=Dd,o=Od,Od=null,i!==null&&(Dd=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);Sd&3&&df(),Ef(t),a=t.pendingLanes,r&261930&&a&42?t===Ad?kd++:(kd=0,Ad=t):(kd=0,Ad=null),Df(0,!1)}}function uf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Na(t)))}function df(){return Ed!==null&&(Ed.skipTransition(),Ed=null),sf(),cf(),lf(),ff()}function ff(){if(yd!==5)return!1;var e=bd,t=Cd;Cd=0;var n=St(Sd),r=j.T,a=M.p;try{M.p=32>n?32:n,j.T=null,n=wd,wd=null;var o=bd,s=Sd;if(yd=0,xd=bd=null,Sd=0,q&6)throw Error(i(331));var c=q;if(q|=4,Ju(o.current),Bu(o,o.current,s,n),q=c,Df(0,!1),tt&&typeof tt.onPostCommitFiberRoot==`function`)try{tt.onPostCommitFiberRoot(et,o)}catch{}return!0}finally{M.p=a,j.T=r,uf(e,t)}}function pf(e,t,n){t=Ui(n,t),t=Ec(e.stateNode,t,2),e=H(e,t,2),e!==null&&(gt(e,2),Ef(e))}function Z(e,t,n){if(e.tag===3)pf(e,e,n);else for(;t!==null;){if(t.tag===3){pf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(vd===null||!vd.has(r))){e=Ui(n,e),n=Dc(2),r=H(t,n,2),r!==null&&(Oc(n,r,t,e),gt(r,2),Ef(r));break}}t=t.return}}function mf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Qu;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(rd=!0,i.add(n),e=hf.bind(null,e,t,n),t.then(e,e))}function hf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,$u===e&&(Y&n)===n&&(ad===4||ad===3&&(Y&62914560)===Y&&300>Ge()-md?q&2?cd|=n:Vd(e,0):cd|=n,ud===Y&&(ud=0)),Ef(e)}function gf(e,t){t===0&&(t=mt()),e=Oi(e,t),e!==null&&(gt(e,t),Ef(e))}function _f(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),gf(e,n)}function vf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),gf(e,n)}function yf(e,t){return Ve(e,t)}var bf=null,xf=null,Sf=!1,Cf=!1,wf=!1,Tf=0;function Ef(e){e!==xf&&e.next===null&&(xf===null?bf=xf=e:xf=xf.next=e),Cf=!0,Sf||(Sf=!0,Nf())}function Df(e,t){if(!wf&&Cf){wf=!0;do for(var n=!1,r=bf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-rt(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Mf(r,a))}else a=Y,a=ut(r,r===$u?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||dt(r,a)||(n=!0,Mf(r,a))}r=r.next}while(n);wf=!1}}function Of(){kf()}function kf(){Cf=Sf=!1;var e=0;Tf!==0&&hp()&&(e=Tf);for(var t=Ge(),n=null,r=bf;r!==null;){var i=r.next,a=Af(r,t);a===0?(r.next=null,n===null?bf=i:n.next=i,i===null&&(xf=n)):(n=r,(e!==0||a&3)&&(Cf=!0)),r=i}yd!==0&&yd!==5||Df(e,!1),Tf!==0&&(Tf=0)}function Af(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-rt(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=pt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=$u,n=Y,n=ut(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(X===2||X===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&He(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||dt(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&He(r),St(n)){case 2:case 8:n=Je;break;case 32:n=Ye;break;case 268435456:n=Ze;break;default:n=Ye}return r=jf.bind(null,e),n=Ve(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&He(r),e.callbackPriority=2,e.callbackNode=null,2}function jf(e,t){if(yd!==0&&yd!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(df()&&e.callbackNode!==n)return null;var r=Y;return r=ut(e,e===$u?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Fd(e,r,t),Af(e,Ge()),e.callbackNode!=null&&e.callbackNode===n?jf.bind(null,e):null)}function Mf(e,t){if(df())return null;Fd(e,t,!0)}function Nf(){bp(function(){q&6?Ve(qe,Of):kf()})}function Pf(){if(Tf===0){var e=za;e===0&&(e=ot,ot<<=1,!(ot&261888)&&(ot=256)),Tf=e}return Tf}function Ff(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:xn(e)}function If(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Ff((i[Dt]||null).action),o=r.submitter;o&&(t=(t=o[Dt]||null)?Ff(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Hn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Tf!==0){var e=new FormData(i,o);Qs(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),Qs(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Lf=0;Lf<hi.length;Lf++){var Rf=hi[Lf];gi(Rf.toLowerCase(),`on`+(Rf[0].toUpperCase()+Rf.slice(1)))}gi(si,`onAnimationEnd`),gi(ci,`onAnimationIteration`),gi(li,`onAnimationStart`),gi(`dblclick`,`onDoubleClick`),gi(`focusin`,`onFocus`),gi(`focusout`,`onBlur`),gi(ui,`onTransitionRun`),gi(di,`onTransitionStart`),gi(fi,`onTransitionCancel`),gi(pi,`onTransitionEnd`),Gt(`onMouseEnter`,[`mouseout`,`mouseover`]),Gt(`onMouseLeave`,[`mouseout`,`mouseover`]),Gt(`onPointerEnter`,[`pointerout`,`pointerover`]),Gt(`onPointerLeave`,[`pointerout`,`pointerover`]),Wt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Wt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Wt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Wt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Wt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Wt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var zf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Bf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(zf));function Vf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){xi(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){xi(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[kt];n===void 0&&(n=t[kt]=new Set);var r=e+`__bubble`;n.has(r)||(Gf(t,e,2,!1),n.add(r))}function Hf(e,t,n){var r=0;t&&(r|=4),Gf(n,e,r,t)}var Uf=`_reactListening`+Math.random().toString(36).slice(2);function Wf(e){if(!e[Uf]){e[Uf]=!0,Ht.forEach(function(t){t!==`selectionchange`&&(Bf.has(t)||Hf(t,!1,e),Hf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Uf]||(t[Uf]=!0,Hf(`selectionchange`,!1,t))}}function Gf(e,t,n,r){switch(Ch(t)){case 2:var i=_h;break;case 8:i=vh;break;default:i=yh}n=i.bind(null,t,n,e),i=void 0,!Mn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Kf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=It(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}kn(function(){var r=a,i=wn(n),s=[];a:{var c=mi.get(e);if(c!==void 0){var l=Hn,u=e;switch(e){case`keypress`:if(Rn(n)===0)break a;case`keydown`:case`keyup`:l=ar;break;case`focusin`:u=`focus`,l=Xn;break;case`focusout`:u=`blur`,l=Xn;break;case`beforeblur`:case`afterblur`:l=Xn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Jn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Yn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=cr;break;case si:case ci:case li:l=Zn;break;case pi:l=lr;break;case`scroll`:case`scrollend`:l=Wn;break;case`wheel`:l=ur;break;case`copy`:case`cut`:case`paste`:l=Qn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=or;break;case`submit`:l=sr;break;case`toggle`:case`beforetoggle`:l=dr}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=An(m,p),g!=null&&d.push(qf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==Cn&&(u=n.relatedTarget||n.fromElement)&&(It(u)||u[Ot]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?It(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=Jn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=or,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:Rt(c),h=l==null?u:Rt(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,It(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?T(c,l,Yf):null,c!==null&&Xf(s,u,c,d,!1),l!==null&&f!==null&&Xf(s,f,l,d,!0)))}a:{if(c=r?Rt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=jr;else if(Tr(c)){if(Mr)_=Vr;else{_=zr;var v=Rr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&vn(r.elementType)&&(_=jr):_=Br;if(_&&=_(e,r)){Er(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?Rt(r):window,e){case`focusin`:(Tr(v)||v.contentEditable===`true`)&&(Zr=v,Qr=r,$r=null);break;case`focusout`:$r=Qr=Zr=null;break;case`mousedown`:ei=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:ei=!1,ti(s,n,i);break;case`selectionchange`:if(Xr)break;case`keydown`:case`keyup`:ti(s,n,i)}var y;if(pr)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else xr?yr(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(gr&&n.locale!==`ko`&&(xr||b!==`onCompositionStart`?b===`onCompositionEnd`&&xr&&(y=Ln()):(Pn=i,Fn=`value`in Pn?Pn.value:Pn.textContent,xr=!0)),v=Jf(r,b),0<v.length&&(b=new $n(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=br(n),y!==null&&(b.data=y)))),(y=hr?Sr(e,n):Cr(e,n))&&(b=Jf(r,`onBeforeInput`),0<b.length&&(v=new $n(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),If(s,e,r,n,i)}Vf(s,t)})}function qf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Jf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=An(e,n),i!=null&&r.unshift(qf(e,i,a)),i=An(e,t),i!=null&&r.push(qf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Yf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Xf(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=An(n,a),l!=null&&o.unshift(qf(n,l,c))):i||(l=An(n,a),l!=null&&o.push(qf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Zf=/\r\n?/g,Qf=/\u0000|\uFFFD/g;function $f(e){return(typeof e==`string`?e:``+e).replace(Zf,`
`).replace(Qf,``)}function ep(e,t){return t=$f(t),$f(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||mn(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&mn(e,``+r);else return;break;case`className`:Qt(e,`class`,r);break;case`tabIndex`:Qt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Qt(e,n,r);break;case`style`:_n(e,r,o);return;case`data`:if(t!==`object`){Qt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=xn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=xn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=Sn);return;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=xn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Zt(e,`popover`,r);break;case`xlinkActuate`:$t(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:$t(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:$t(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:$t(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:$t(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:$t(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:$t(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:$t(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:$t(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Zt(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=yn.get(n)||n,Zt(e,n,r);else return}F=!0}function tp(e,t,n,r,a,o){switch(n){case`style`:_n(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)mn(e,r);else if(typeof r==`number`||typeof r==`bigint`)mn(e,``+r);else return;break;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=Sn);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!Ut.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[Dt]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}F=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):Zt(e,n,r)}return}F=!0}function np(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}ln(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&dn(e,!!r,n,!0):dn(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}pn(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<zf.length;r++)Q(zf[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(vn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&tp(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}var rp={};function ip(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(F=!0),o=m;break;case`name`:m!==f&&(F=!0),a=m;break;case`checked`:m!==f&&(F=!0),u=m;break;case`defaultChecked`:m!==f&&(F=!0),d=m;break;case`value`:m!==f&&(F=!0),s=m;break;case`defaultValue`:m!==f&&(F=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}cn(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(F=!0),p=o;break;case`defaultValue`:o!==l&&(F=!0),c=o;break;case`multiple`:o!==l&&(F=!0),s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?dn(e,!!n,n?[]:``,!1):dn(e,!!n,t,!0)):dn(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(F=!0),p=a;break;case`defaultValue`:a!==o&&(F=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}fn(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(F=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(vn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&tp(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||tp(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function ap(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function op(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&ap(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&ap(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var sp=null,cp=null;function lp(e){return e.nodeType===9?e:e.ownerDocument}function up(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function dp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function fp(e,t,n,r){return n=lp(n).createElement(e),n[Et]=r,n[Dt]=t,np(n,e,t),Bt(n),n}function pp(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var mp=null;function hp(){var e=window.event;return e&&e.type===`popstate`?e!==mp&&(mp=e,!0):(mp=null,!1)}var gp=typeof setTimeout==`function`?setTimeout:void 0,_p=typeof clearTimeout==`function`?clearTimeout:void 0,vp=typeof Promise==`function`?Promise:void 0,yp=typeof requestAnimationFrame==`function`?requestAnimationFrame:gp,bp=typeof queueMicrotask==`function`?queueMicrotask:vp===void 0?gp:function(e){return vp.resolve(null).then(e).catch(xp)};function xp(e){setTimeout(function(){throw e})}function Sp(e){return e===`head`}function Cp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Hh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)_m(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,_m(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Nt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&_m(e.ownerDocument.body)}n=i}while(n);Hh(t)}function wp(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function Tp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ep(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function Dp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Op(e){return Dp(e.getBoundingClientRect(),getComputedStyle(e),e)}function kp(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return Dp(t,n,e)}function Ap(e){return e.documentElement.clientHeight}function jp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Mp(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Ap(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Xm(f),u>$m){s.length=o;break}f=new Promise(jp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Np(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Np.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:E({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Np.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Np.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Pp(e){return{name:e,group:new Np(`group`,e),imagePair:new Np(`image-pair`,e),old:new Np(`old`,e),new:new Np(`new`,e)}}function Fp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Fp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Bp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Rp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),h(this._fragmentFiber.child,!1,Ip,e,s,r)}this._eventListeners=a}};function Ip(e,t,n,r){return b(e).addEventListener(t,n,r),!1}Fp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Bp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Rp(i.optionsOrUseCapture),h(this._fragmentFiber.child,!1,Lp,e,n,i),r.splice(t,1),a!==null&&a()}};function Lp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Rp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function zp(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Bp(e,t,n,r){if(e.length===0)return-1;r=zp(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&zp(a.optionsOrUseCapture)===r)return i}return-1}Fp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},Fp.prototype.focus=function(e){h(this._fragmentFiber.child,!0,Vp,e,void 0,void 0)};function Vp(e,t){return e.tag!==6&&(e=b(e),pm(e,t))}Fp.prototype.focusLast=function(e){var t=[];h(this._fragmentFiber.child,!0,Hp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Vp(t[n],e);n--);};function Hp(e,t){return t.push(e),!1}Fp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=lp(e).activeElement,e!==null&&h(this._fragmentFiber.child,!1,Up,e,void 0,void 0))};function Up(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Fp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),h(this._fragmentFiber.child,!1,Wp,e,void 0,void 0)};function Wp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}Fp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),h(this._fragmentFiber.child,!1,Gp,e,void 0,void 0);for(var n=t=0;n<Kp.length;n++){var r=Kp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Kp[t++]=r}Kp.length=t}};function Gp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Kp=[],qp=!1;function Jp(e,t,n){Kp.push({fragmentInstance:e,observer:t,instance:n}),qp||(qp=!0,mm(function(){qp=!1;var e=Kp;Kp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}Fp.prototype.getClientRects=function(){var e=[];return h(this._fragmentFiber.child,!1,Yp,e,void 0,void 0),e};function Yp(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}Fp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},Fp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];h(this._fragmentFiber.child,!1,Hp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||Xp(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function Xp(e,t,n,r,i){var a=It(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=T(n,a,w),t===null?t=!1:(h(t,!0,C,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=T(r,a,w),t===null?t=!1:(h(t,!0,ee,a,r),a=x,S=x=null,t=a!==null)),t):!1}function Zp(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Fp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];h(this._fragmentFiber.child,!1,Hp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),Zp(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),Zp(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function Qp(e,t){return e=b(e),$p(e,t),!1}function $p(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function em(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Kp.length;i++){var a=Kp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Kp[r++]=a)}Kp.length=r,n.observe(e)}),$p(e,t))}function tm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Jp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function nm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:nm(n),Ft(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function rm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[Nt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=lm(e.nextSibling),e===null)break}return null}function im(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=lm(e.nextSibling),e===null))return null;return e}function am(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=lm(e.nextSibling),e===null))return null;return e}function om(e){return e.data===`$?`||e.data===`$~`}function sm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function cm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function lm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var um=null;function dm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return lm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function fm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function pm(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function mm(e){yp(function(){yp(function(t){return e(t)})})}function hm(e,t,n){switch(t=lp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function gm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&$(e,t,r,null,rp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===Sn&&(e.onclick=null),Ft(e)}function _m(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Ft(e)}var vm=new Map,ym=new Set;function bm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var xm=M.d;M.d={f:Sm,r:Cm,D:Em,C:Dm,L:Om,m:km,X:jm,S:Am,M:Mm};function Sm(){var e=xm.f(),t=zd();return e||t}function Cm(e){var t=Lt(e);t!==null&&t.tag===5&&t.type===`form`?ec(t):xm.r(e)}var wm=typeof document>`u`?null:document;function Tm(e,t,n){var r=wm;if(r&&typeof t==`string`&&t){var i=sn(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),ym.has(i)||(ym.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),np(t,`link`,e),Bt(t),r.head.appendChild(t)))}}function Em(e){xm.D(e),Tm(`dns-prefetch`,e,null)}function Dm(e,t){xm.C(e,t),Tm(`preconnect`,e,t)}function Om(e,t,n){xm.L(e,t,n);var r=wm;if(r&&e&&t){var i=`link[rel="preload"][as="`+sn(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+sn(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+sn(n.imageSizes)+`"]`)):i+=`[href="`+sn(e)+`"]`;var a=i;switch(t){case`style`:a=Pm(e);break;case`script`:a=Rm(e)}if(!(vm.has(a)||(e=E({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),vm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Fm(a))||t===`script`&&r.querySelector(zm(a))))){var o=r.createElement(`link`);np(o,`link`,e),t===`style`&&(o[Pt]=!0,o.onload=o.onerror=function(){Vt(o)}),Bt(o),r.head.appendChild(o)}}}function km(e,t){xm.m(e,t);var n=wm;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+sn(r)+`"][href="`+sn(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Rm(e)}if(!vm.has(a)&&(e=E({rel:`modulepreload`,href:e},t),vm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(zm(a)))return}r=n.createElement(`link`),np(r,`link`,e),Bt(r),n.head.appendChild(r)}}}function Am(e,t,n){xm.S(e,t,n);var r=wm;if(r&&e){var i=zt(r).hoistableStyles,a=Pm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Fm(a)))s.loading=5;else{e=E({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=vm.get(a))&&Hm(e,n);var c=o=r.createElement(`link`);Bt(c),np(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Vm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function jm(e,t){xm.X(e,t);var n=wm;if(n&&e){var r=zt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=E({src:e,async:!0},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Bt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Mm(e,t){xm.M(e,t);var n=wm;if(n&&e){var r=zt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=E({src:e,async:!0,type:`module`},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Bt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Nm(e,t,n,r){var a=(a=De.current)?bm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Pm(n.href),t=zt(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Pm(n.href);var o=zt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Fm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=vm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},vm.set(e,o)),Lm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Rm(n),t=zt(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Pm(e){return`href="`+sn(e)+`"`}function Fm(e){return`link[rel="stylesheet"][`+e+`]`}function Im(e){return E({},e,{"data-precedence":e.precedence,precedence:null})}function Lm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[Pt]){r.loading=1;return}}else t=e.createElement(`link`),t[Pt]=!0,t.onload=t.onerror=Vt.bind(null,t),np(t,`link`,n),Bt(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Rm(e){return`[src="`+sn(e)+`"]`}function zm(e){return`script[async]`+e}function Bm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+sn(n.href)+`"]`);if(r)return t.instance=r,Bt(r),r;var a=E({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Bt(r),np(r,`style`,a),Vm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Pm(n.href);var o=e.querySelector(Fm(a));if(o)return t.state.loading|=4,t.instance=o,Bt(o),o;r=Im(n),(a=vm.get(a))&&Hm(r,a),o=(e.ownerDocument||e).createElement(`link`),Bt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),np(o,`link`,r),t.state.loading|=4,Vm(o,n.precedence,e),t.instance=o;case`script`:return o=Rm(n.src),(a=e.querySelector(zm(o)))?(t.instance=a,Bt(a),a):(r=n,(a=vm.get(o))&&(r=E({},n),Um(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Bt(a),np(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Vm(r,n.precedence,e));return t.instance}function Vm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Hm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Um(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Wm=null;function Gm(e,t,n){if(Wm===null){var r=new Map,i=Wm=new Map;i.set(n,r)}else i=Wm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Nt]||a[Et]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Km(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function qm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Jm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Ym(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Xm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function Zm(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Xm(t),e.suspenseyImages.push(t)),e=rh.bind(e),t.decode().then(e,e))}function Qm(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Pm(r.href),a=t.querySelector(Fm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=nh.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Bt(a);return}a=t.ownerDocument||t,r=Im(r),(i=vm.get(i))&&Hm(r,i),a=a.createElement(`link`),Bt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),np(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=nh.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var $m=0;function eh(e,t){return e.stylesheets&&e.count===0&&ah(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&$m===0&&($m=62500*op());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>$m?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function th(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)ah(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function nh(){this.count--,th(this)}function rh(){this.imgCount--,th(this)}var ih=null;function ah(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ih=new Map,t.forEach(oh,e),ih=null,nh.call(e))}function oh(e,t){if(!(t.state.loading&4)){var n=ih.get(e);if(n)var r=n.get(null);else{n=new Map,ih.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=nh.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var sh={$$typeof:O,Provider:null,Consumer:null,_currentValue:be,_currentValue2:be,_threadCount:0};function ch(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ht(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ht(0),this.hiddenUpdates=ht(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function lh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new ch(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=Ni(3,null,null,t),e.current=a,a.stateNode=e,t=Ma(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},mo(a),e}function uh(e){return e?(e=ji,e):ji}function dh(e,t,n,r,i,a){i=uh(i),r.context===null?r.context=i:r.pendingContext=i,r=go(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=H(e,r,t),n!==null&&(Pd(n,e,t),_o(n,e,t))}function fh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ph(e,t){fh(e,t),(e=e.alternate)&&fh(e,t)}function mh(e){if(e.tag===13||e.tag===31){var t=Oi(e,67108864);t!==null&&Pd(t,e,67108864),ph(e,67108864)}}function hh(e){if(e.tag===13||e.tag===31){var t=jd();t=xt(t);var n=Oi(e,t);n!==null&&Pd(n,e,t),ph(e,t)}}var gh=!0;function _h(e,t,n,r){var i=j.T;j.T=null;var a=M.p;try{M.p=2,yh(e,t,n,r)}finally{M.p=a,j.T=i}}function vh(e,t,n,r){var i=j.T;j.T=null;var a=M.p;try{M.p=8,yh(e,t,n,r)}finally{M.p=a,j.T=i}}function yh(e,t,n,r){if(gh){var i=bh(r);if(i===null)Kf(e,t,r,xh,n),Mh(e,r);else if(Ph(i,e,t,n,r))r.stopPropagation();else if(Mh(e,r),t&4&&-1<jh.indexOf(e)){for(;i!==null;){var a=Lt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=lt(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-rt(o);s.entanglements[1]|=c,o&=~c}Ef(a),!(q&6)&&(gd=Ge()+500,Df(0,!1))}}break;case 31:case 13:s=Oi(a,2),s!==null&&Pd(s,a,2),zd(),ph(a,2)}if(a=bh(r),a===null&&Kf(e,t,r,xh,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Kf(e,t,r,null,n)}}function bh(e){return e=wn(e),Sh(e)}var xh=null;function Sh(e){if(xh=null,e=It(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return xh=e,null}function Ch(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ke()){case qe:return 2;case Je:return 8;case Ye:case Xe:return 32;case Ze:return 268435456;default:return 32}default:return 32}}var wh=!1,Th=null,Eh=null,Dh=null,Oh=new Map,kh=new Map,Ah=[],jh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Mh(e,t){switch(e){case`focusin`:case`focusout`:Th=null;break;case`dragenter`:case`dragleave`:Eh=null;break;case`mouseover`:case`mouseout`:Dh=null;break;case`pointerover`:case`pointerout`:Oh.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:kh.delete(t.pointerId)}}function Nh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Lt(t),t!==null&&mh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ph(e,t,n,r,i){switch(t){case`focusin`:return Th=Nh(Th,e,t,n,r,i),!0;case`dragenter`:return Eh=Nh(Eh,e,t,n,r,i),!0;case`mouseover`:return Dh=Nh(Dh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Oh.set(a,Nh(Oh.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,kh.set(a,Nh(kh.get(a)||null,e,t,n,r,i)),!0}return!1}function Fh(e){var t=It(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,wt(e.priority,function(){hh(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,wt(e.priority,function(){hh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ih(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Cn=r,n.target.dispatchEvent(r),Cn=null}else return t=Lt(n),t!==null&&mh(t),e.blockedOn=n,!1;t.shift()}return!0}function Lh(e,t,n){Ih(e)&&n.delete(t)}function Rh(){wh=!1,Th!==null&&Ih(Th)&&(Th=null),Eh!==null&&Ih(Eh)&&(Eh=null),Dh!==null&&Ih(Dh)&&(Dh=null),Oh.forEach(Lh),kh.forEach(Lh)}function zh(e,n){e.blockedOn===n&&(e.blockedOn=null,wh||(wh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Rh)))}var Bh=null;function Vh(e){Bh!==e&&(Bh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Bh===e&&(Bh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Sh(r||n)===null)continue;break}var a=Lt(n);a!==null&&(e.splice(t,3),t-=3,Qs(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Hh(e){function t(t){return zh(t,e)}Th!==null&&zh(Th,e),Eh!==null&&zh(Eh,e),Dh!==null&&zh(Dh,e),Oh.forEach(t),kh.forEach(t);for(var n=0;n<Ah.length;n++){var r=Ah[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Ah.length&&(n=Ah[0],n.blockedOn===null);)Fh(n),n.blockedOn===null&&Ah.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[Dt]||null;if(typeof a==`function`)o||Vh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[Dt]||null)s=o.formAction;else if(Sh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Vh(n)}}}function Uh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Wh(e){this._internalRoot=e}Gh.prototype.render=Wh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;dh(n,jd(),e,t,null,null)},Gh.prototype.unmount=Wh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;dh(e.current,2,null,e,null,null),zd(),t[Ot]=null}};function Gh(e){this._internalRoot=e}Gh.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ct();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ah.length&&t!==0&&t<Ah[n].priority;n++);Ah.splice(n,0,e),n===0&&Fh(e)}};var Kh=n.version;if(Kh!==`19.3.1`)throw Error(i(527,Kh,`19.3.1`));M.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var qh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:j,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Jh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jh.isDisabled&&Jh.supportsFiber)try{et=Jh.inject(qh),tt=Jh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=xc,s=Sc,c=Cc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=lh(e,1,!1,null,null,n,r,null,o,s,c,Uh),e[Ot]=t.current,Wf(e),new Wh(t)}})),g=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=c(u()),v=g(),y=`-ms-`,b=`-moz-`,x=`-webkit-`,S=`comm`,C=`rule`,ee=`decl`,w=`@import`,T=`@namespace`,E=`@keyframes`,te=`@layer`,ne=Math.abs,re=String.fromCharCode,D=Object.assign;function ie(e,t){return k(e,0)^45?(((t<<2^k(e,0))<<2^k(e,1))<<2^k(e,2))<<2^k(e,3):0}function ae(e){return e.trim()}function oe(e,t){return(e=t.exec(e))?e[0]:e}function O(e,t,n){return e.replace(t,n)}function se(e,t,n){return e.indexOf(t,n)}function k(e,t){return e.charCodeAt(t)|0}function ce(e,t,n){return e.slice(t,n)}function le(e){return e.length}function ue(e){return e.length}function de(e,t){return t.push(e),e}function fe(e,t){return e.map(t).join(``)}function pe(e,t){return e.filter(function(e){return!oe(e,t)})}var me=1,he=1,ge=0,_e=0,A=0,ve=``;function ye(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:me,column:he,length:o,return:``,siblings:s}}function j(e,t){return D(ye(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function M(e){for(;e.root;)e=j(e.root,{children:[e]});de(e,e.siblings)}function be(){return A}function xe(){return A=_e>0?k(ve,--_e):0,he--,A===10&&(he=1,me--),A}function Se(){return A=_e<ge?k(ve,_e++):0,he++,A===10&&(he=1,me++),A}function Ce(){return k(ve,_e)}function we(){return _e}function N(e,t){return ce(ve,e,t)}function Te(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Ee(e){return me=he=1,ge=le(ve=e),_e=0,[]}function De(e){return ve=``,e}function Oe(e){return ae(N(_e-1,je(e===91?e+2:e===40?e+1:e)))}function ke(e){for(;(A=Ce())&&A<33;)Se();return Te(e)>2||Te(A)>3?``:` `}function Ae(e,t){for(;--t&&Se()&&!(A<48||A>102||A>57&&A<65||A>70&&A<97););return N(e,we()+(t<6&&Ce()==32&&Se()==32))}function je(e){for(;Se();)switch(A){case e:return _e;case 34:case 39:e!==34&&e!==39&&je(A);break;case 40:e===41&&je(e);break;case 92:Se()}return _e}function Me(e,t){for(;Se()&&e+A!==57&&(e+A!==84||Ce()!==47););return`/*`+N(t,_e-1)+`*`+re(e===47?e:Se())}function Ne(e){for(;!Te(Ce());)Se();return N(e,_e)}function Pe(e){return De(Fe(``,null,null,null,[``],e=Ee(e),0,[0],e))}function Fe(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=Se()){case 40:if(m!=108&&k(C,d-1)==58){se(C+=O(Oe(v),`&`,`&\f`),`&\f`,ne(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=Oe(v);break;case 9:case 10:case 13:case 32:C+=ke(m);break;case 92:C+=Ae(we()-1,7);continue;case 47:switch(Ce()){case 42:case 47:de(Le(Me(Se(),we()),t,n,c),c),(Te(m||1)==5||Te(Ce()||1)==5)&&le(C)&&ce(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=le(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=O(C,/\f/g,``)),p>0&&(le(C)-d||h===0&&m===47)&&de(p>32?Re(C+`;`,r,n,d-1,c):Re(O(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(de(S=Ie(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123){if(u===0)Fe(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(k(C,3)===110)break;case 108:if(k(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?Fe(e,S,S,r&&de(Ie(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):Fe(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+le(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&xe()==125)continue}switch(C+=re(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(le(C)-1)*_,_=1;break;case 64:Ce()===45&&(C+=Oe(Se())),f=Ce(),u=d=le(y=C+=Ne(we())),v++;break;case 45:m===45&&le(C)==2&&(h=0)}}return a}function Ie(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=ue(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=ce(e,f+1,f=ne(g=o[h])),b=e;v<m;++v)(b=ae(g>0?p[v]+` `+y:O(y,/&\f/g,p[v])))&&(c[_++]=b);return ye(e,t,n,i===0?C:s,c,l,u,d)}function Le(e,t,n,r){return ye(e,t,n,S,re(be()),ce(e,2,-2),0,r)}function Re(e,t,n,r,i){return ye(e,t,n,ee,ce(e,0,r),ce(e,r+1,-1),r,i)}function ze(e,t,n){switch(ie(e,t)){case 5103:return x+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return x+e+e;case 4855:return x+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return b+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return x+e+b+e+y+e+e;case 5936:switch(k(e,t+11)){case 114:return x+e+y+O(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return x+e+y+O(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return x+e+y+O(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return x+e+y+e+e;case 6165:return x+e+y+`flex-`+e+e;case 5187:return x+e+O(e,/(\w+).+(:[^]+)/,x+`box-$1$2`+y+`flex-$1$2`)+e;case 5443:return x+e+y+`flex-item-`+O(e,/flex-|-self/g,``)+(oe(e,/flex-|baseline/)?``:y+`grid-row-`+O(e,/flex-|-self/g,``))+e;case 4675:return x+e+y+`flex-line-pack`+O(e,/align-content|flex-|-self/g,``)+e;case 5548:return x+e+y+O(e,`shrink`,`negative`)+e;case 5292:return x+e+y+O(e,`basis`,`preferred-size`)+e;case 6060:return x+`box-`+O(e,`-grow`,``)+x+e+y+O(e,`grow`,`positive`)+e;case 4554:return x+O(e,/([^-])(transform)/g,`$1`+x+`$2`)+e;case 6187:return O(O(O(e,/(zoom-|grab)/,x+`$1`),/(image-set)/,x+`$1`),e,``)+e;case 5495:case 3959:return O(e,/(image-set\([^]*)/,x+"$1$`$1");case 4968:return O(O(e,/(.+:)(flex-)?(.*)/,x+`box-pack:$3`+y+`flex-pack:$3`),/space-between/,`justify`)+x+e+e;case 4200:if(!oe(e,/flex-|baseline/))return y+`grid-column-align`+ce(e,t)+e;break;case 2592:case 3360:return y+O(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,oe(e.props,/grid-\w+-end/)})?~se(e+(n=n[t].value),`span`,0)?e:y+O(e,`-start`,``)+e+y+`grid-row-span:`+(~se(n,`span`,0)?oe(n,/\d+/):+oe(n,/\d+/)-oe(e,/\d+/))+`;`:y+O(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return oe(e.props,/grid-\w+-start/)})?e:y+O(O(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return O(e,/(.+)-inline(.+)/,x+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(le(e)-1-t>6)switch(k(e,t+1)){case 109:if(k(e,t+4)!==45)break;case 102:return O(e,/(.+:)(.+)-([^]+)/,`$1`+x+`$2-$3$1`+b+(k(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~se(e,`stretch`,0)?ze(O(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return O(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return y+n+`:`+r+s+(i?y+n+`-span:`+(a?o:+o-r)+s:``)+e});case 4949:if(k(e,t+6)===121)return O(e,`:`,`:`+x)+e;break;case 6444:switch(k(e,k(e,14)===45?18:11)){case 120:return O(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+x+(k(e,14)===45?`inline-`:``)+`box$3$1`+x+`$2$3$1`+y+`$2box$3`)+e;case 100:return O(e,`:`,`:`+y)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return O(e,`scroll-`,`scroll-snap-`)+e}return e}function Be(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function Ve(e,t,n,r){switch(e.type){case te:if(e.children.length)break;case w:case T:case ee:return e.return=e.return||e.value;case S:return``;case E:return e.return=e.value+`{`+Be(e.children,r)+`}`;case C:if(!le(e.value=e.props.join(`,`)))return``}return le(n=Be(e.children,r))?e.return=e.value+`{`+n+`}`:``}function He(e){var t=ue(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function Ue(e){return function(t){t.root||(t=t.return)&&e(t)}}function We(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case ee:e.return=ze(e.value,e.length,n);return;case E:return Be([j(e,{value:O(e.value,`@`,`@`+x)})],r);case C:if(e.length)return fe(n=e.props,function(t){switch(oe(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:M(j(e,{props:[O(t,/:(read-\w+)/,`:`+b+`$1`)]})),M(j(e,{props:[t]})),D(e,{props:pe(n,r)});break;case`::placeholder`:M(j(e,{props:[O(t,/:(plac\w+)/,`:`+x+`input-$1`)]})),M(j(e,{props:[O(t,/:(plac\w+)/,`:`+b+`$1`)]})),M(j(e,{props:[O(t,/:(plac\w+)/,y+`input-$1`)]})),M(j(e,{props:[t]})),D(e,{props:pe(n,r)})}return``})}}function Ge(e,...t){return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var Ke=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,qe=`active`,Je=`data-styled-version`,Ye=`6.6.0`,Xe=`/*!sc*/
`,Ze=typeof window<`u`&&typeof document<`u`;if(!_.createContext)throw Ge(19);function Qe(e){if(typeof process<`u`){let t={}[e];if(t!==void 0&&t!==``)return t!==`false`}}var $e=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:Qe(`REACT_APP_SC_DISABLE_SPEEDY`)??Qe(`SC_DISABLE_SPEEDY`)??(typeof process<`u`&&!1)),et=`sc-keyframes-`,tt=new Map,nt=new Map,rt=1,P=e=>{if(tt.has(e))return tt.get(e);for(;nt.has(rt);)rt++;let t=rt++;return tt.set(e,t),nt.set(t,e),t},it=e=>nt.get(e),at=(e,t)=>{rt=t+1,tt.set(e,t),nt.set(t,e)},ot=Object.freeze([]),st=Object.freeze({});function ct(e,t,n=st){return e.theme!==n.theme&&e.theme||t||n.theme}var lt=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ut=/(^-|-$)/g;function dt(e){return e.replace(lt,`-`).replace(ut,``)}var ft=/(a)(d)/gi,pt=e=>String.fromCharCode(e+(e>25?39:97));function mt(e){let t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=pt(t%52)+n;return(pt(t%52)+n).replace(ft,`$1-$2`)}var ht=5381,gt=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},_t=e=>gt(ht,e);function vt(e){return mt(_t(e)>>>0)}function yt(e){return e.displayName||e.name||`Component`}function bt(e){return typeof e==`string`&&!0}function xt(e){return bt(e)?`styled.${e}`:`Styled(${yt(e)})`}var St=Symbol.for(`react.memo`),Ct=Symbol.for(`react.forward_ref`),wt={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},Tt={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Et={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Dt={[Ct]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[St]:Et};function Ot(e){return(`type`in(t=e)&&t.type.$$typeof)===St?Et:`$$typeof`in e?Dt[e.$$typeof]:wt;var t}var kt=Object.defineProperty,At=Object.getOwnPropertyNames,jt=Object.getOwnPropertySymbols,Mt=Object.getOwnPropertyDescriptor,Nt=Object.getPrototypeOf,Pt=Object.prototype;function Ft(e,t,n){if(typeof t!=`string`){let r=Nt(t);r&&r!==Pt&&Ft(e,r,n);let i=At(t).concat(jt(t)),a=Ot(e),o=Ot(t);for(let r=0;r<i.length;++r){let s=i[r];if(!(s in Tt||n&&n[s]||o&&s in o||a&&s in a)){let n=Mt(t,s);try{kt(e,s,n)}catch{}}}}return e}function It(e){return typeof e==`function`}var Lt=Symbol.for(`react.forward_ref`);function Rt(e){return e!=null&&(typeof e==`object`||typeof e==`function`)&&e.$$typeof===Lt&&`styledComponentId`in e}function zt(e,t){return e&&t?e+` `+t:e||t||``}function Bt(e,t){return e.join(t||``)}function Vt(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function Ht(e,t,n=!1){if(!n&&!Vt(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=Ht(e[n],t[n]);else if(Vt(t))for(let n in t)e[n]=Ht(e[n],t[n]);return e}function Ut(e,t){Object.defineProperty(e,"toString",{value:t})}var Wt=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){let t=this.groupSizes,n=t.length,r=n;for(;e>=r;)if(r<<=1,r<0)throw Ge(16,`${e}`);this.groupSizes=new Uint32Array(r),this.groupSizes.set(t),this.length=r;for(let e=n;e<r;e++)this.groupSizes[e]=0}let n=this.indexOfGroup(e+1),r=0;for(let i=0,a=t.length;i<a;i++)this.tag.insertRule(n,t[i])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){let t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let e=n;e<r;e++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t=``;if(e>=this.length||this.groupSizes[e]===0)return t;let n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n;for(let e=r;e<i;e++)t+=this.tag.getRule(e)+Xe;return t}},Gt=`style[${Ke}][${Je}="${Ye}"]`,Kt=RegExp(`^${Ke}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),qt=e=>typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11,Jt=e=>{if(!e)return document;if(qt(e))return e;if(`getRootNode`in e){let t=e.getRootNode();if(qt(t))return t}return document},Yt=(e,t,n)=>{let r=n.split(`,`),i;for(let n=0,a=r.length;n<a;n++)(i=r[n])&&e.registerName(t,i)},F=(e,t)=>{let n=(t.textContent??``).split(Xe),r=[];for(let t=0,i=n.length;t<i;t++){let i=n[t].trim();if(!i)continue;let a=i.match(Kt);if(a){let t=0|parseInt(a[1],10),n=a[2];t!==0&&(at(n,t),Yt(e,n,a[3]),e.getTag().insertRules(t,r)),r.length=0}else r.push(i)}},Xt=e=>{let t=Jt(e.options.target).querySelectorAll(Gt);for(let n=0,r=t.length;n<r;n++){let r=t[n];r&&r.getAttribute(Ke)!==qe&&(F(e,r),r.parentNode&&r.parentNode.removeChild(r))}},Zt=!1;function Qt(){if(!1!==Zt)return Zt;if(typeof document<`u`){let e=document.head.querySelector(`meta[property="csp-nonce"]`);if(e)return Zt=e.nonce||e.getAttribute(`content`)||void 0;let t=document.head.querySelector(`meta[name="sc-nonce"]`);if(t)return Zt=t.getAttribute(`content`)||void 0}return Zt=typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}var $t=(e,t)=>{if(typeof document>`u`)throw Ge(20);let n=document.head,r=e||n,i=document.createElement(`style`),a=(e=>{let t=Array.from(e.querySelectorAll(`style[${Ke}]`));return t[t.length-1]})(r),o=a===void 0?null:a.nextSibling;i.setAttribute(Ke,qe),i.setAttribute(Je,Ye);let s=t||Qt();return s&&i.setAttribute(`nonce`,s),r.insertBefore(i,o),i},en=class{constructor(e,t){this.element=$t(e,t),this.element.appendChild(document.createTextNode(``)),this.sheet=(e=>{if(e.sheet)return e.sheet;let t=e.getRootNode().styleSheets??document.styleSheets;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r.ownerNode===e)return r}throw Ge(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){let t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``}},tn=class{constructor(e,t){this.element=$t(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){let n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:``}},nn=Ze,rn={isServer:!Ze,useCSSOMInjection:!$e},an=class e{static registerId(e){return P(e)}constructor(e=st,t={},n){this.options=Object.assign(Object.assign({},rn),e),this.gs=t,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Ze&&nn&&(nn=!1,Xt(this)),Ut(this,()=>(e=>{let t=e.getTag(),{length:n}=t,r=``;for(let i=0;i<n;i++){let n=it(i);if(n===void 0)continue;let a=e.names.get(n);if(a===void 0||!a.size)continue;let o=t.getGroup(i);if(o.length===0)continue;let s=Ke+`.g`+i+`[id="`+n+`"]`,c=``;for(let e of a)e.length>0&&(c+=e+`,`);r+=o+s+`{content:"`+c+`"}/*!sc*/
`}return r})(this))}rehydrate(){!this.server&&Ze&&Xt(this)}reconstructWithOptions(t,n=!0){let r=new e(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&Ze&&t.target!==this.options.target&&Jt(this.options.target)!==Jt(t.target)&&Xt(r),r}allocateGSInstance(e){return this.gs[e]=(this.gs[e]||0)+1}getTag(){return this.tag||=(e=(({useCSSOMInjection:e,target:t,nonce:n})=>e?new en(t,n):new tn(t,n))(this.options),new Wt(e));var e}hasNameForId(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n}registerName(e,t){P(e),e.startsWith(et)&&this.keyframeIds.add(e);let n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))}insertRules(e,t,n){this.registerName(e,t),this.getTag().insertRules(P(e),n)}clearNames(e){this.names.has(e)&&this.names.get(e).clear()}clearRules(e){this.getTag().clearGroup(P(e)),this.clearNames(e)}clearTag(){this.tag=void 0}},on=new WeakSet,sn={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function cn(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in sn||e.startsWith(`--`)?String(t).trim():t+`px`}var ln=47;function un(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t=``;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r>=65&&r<=90?`-`+String.fromCharCode(r+32):e[n]}return t.startsWith(`ms-`)?`-`+t:t}var dn=Symbol.for(`sc-keyframes`);function fn(e){return typeof e==`object`&&!!e&&dn in e}function pn(e){return It(e)&&!(e.prototype&&e.prototype.isReactComponent)}var mn=e=>e==null||!1===e||e===``,hn=Symbol.for(`react.client.reference`);function gn(e){return e.$$typeof===hn}function _n(e,t){for(let n in e){let r=e[n];e.hasOwnProperty(n)&&!mn(r)&&(Array.isArray(r)&&on.has(r)||It(r)?t.push(un(n)+`:`,r,`;`):Vt(r)?(t.push(n+` {`),_n(r,t),t.push(`}`)):t.push(un(n)+`: `+cn(n,r)+`;`))}}function vn(e,t,n,r,i=[]){if(mn(e))return i;let a=typeof e;if(a===`string`)return i.push(e),i;if(a===`function`)return gn(e)?i:pn(e)&&t?vn(e(t),t,n,r,i):(i.push(e),i);if(Array.isArray(e)){for(let a=0;a<e.length;a++)vn(e[a],t,n,r,i);return i}return Rt(e)?(i.push(`.${e.styledComponentId}`),i):fn(e)?(n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i):gn(e)?i:Vt(e)&&e.toString===Object.prototype.toString?(_n(e,i),i):(i.push(e.toString()),i)}var yn=_t(Ye),bn=class{constructor(e,t,n){this.rules=e,this.componentId=t,this.baseHash=gt(yn,t),this.baseStyle=n,an.registerId(t)}generateAndInjectStyles(e,t,n){let r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;{let i=``;for(let r=0;r<this.rules.length;r++){let a=this.rules[r];if(typeof a==`string`)i+=a;else if(a){if(pn(a)){let r=a(e);typeof r==`string`?i+=r:r!=null&&!1!==r&&(i+=Bt(vn(r,e,t,n)))}else i+=Bt(vn(a,e,t,n))}}if(i){this.dynamicNameCache||=new Map;let e=n.hash?n.hash+i:i,a=this.dynamicNameCache.get(e);if(!a){if(a=mt(gt(gt(this.baseHash,n.hash),i)>>>0),this.dynamicNameCache.size>=200){let e=this.dynamicNameCache.keys().next().value;e!==void 0&&this.dynamicNameCache.delete(e)}this.dynamicNameCache.set(e,a)}if(!t.hasNameForId(this.componentId,a)){let e=n(i,`.`+a,void 0,this.componentId);t.insertRules(this.componentId,a,e)}r=zt(r,a)}}return r}},xn=/&/g;function Sn(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function Cn(e){let t=e.length,n=``,r=0,i=0,a=0,o=!1,s=!1;for(let c=0;c<t;c++){let l=e.charCodeAt(c);if(a!==0||o||l!==ln||e.charCodeAt(c+1)!==42){if(o)l===42&&e.charCodeAt(c+1)===ln&&(o=!1,c++);else if(l!==34&&l!==39||Sn(e,c)){if(a===0){if(l===123)i++;else if(l===125){if(i--,i<0){s=!0;let n=c+1;for(;n<t;){let t=e.charCodeAt(n);if(t===59||t===10)break;n++}n<t&&e.charCodeAt(n)===59&&n++,i=0,c=n-1,r=n;continue}i===0&&(n+=e.substring(r,c+1),r=c+1)}else l===59&&i===0&&(n+=e.substring(r,c+1),r=c+1)}}else a===0?a=l:a===l&&(a=0)}else o=!0,c++}return s||i!==0||a!==0?(r<t&&i===0&&a===0&&(n+=e.substring(r)),n):e}function wn(e,t){let n=t+` `,r=`,`+n;for(let i=0;i<e.length;i++){let a=e[i];if(a.type===`rule`){a.value=(n+a.value).replaceAll(`,`,r);let e=a.props,t=[];for(let r=0;r<e.length;r++)t[r]=n+e[r];a.props=t}Array.isArray(a.children)&&a.type!==`@keyframes`&&wn(a.children,t)}return e}function Tn({options:e=st,plugins:t=ot}=st){let n,r,i,a=(e,t,i)=>i.startsWith(r)&&i.endsWith(r)&&i.replaceAll(r,``).length>0?`.${n}`:e,o=t.slice();o.push(e=>{e.type===`rule`&&e.value.includes(`&`)&&(i||=RegExp(`\\${r}\\b`,`g`),e.props[0]=e.props[0].replace(xn,r).replace(i,a))}),e.prefix&&o.push(We),o.push(Ve);let s=[],c=He(o.concat(Ue(e=>s.push(e)))),l=(t,a=``,o=``,l=`&`)=>{n=l,r=a,i=void 0;let u=function(e){let t=e.indexOf(`//`)!==-1,n=e.indexOf(`}`)!==-1;if(!t&&!n)return e;if(!t)return Cn(e);let r=e.length,i=``,a=0,o=0,s=0,c=0,l=0,u=!1;for(;o<r;){let t=e.charCodeAt(o);if(t!==34&&t!==39||Sn(e,o)){if(s===0){if(t===ln&&o+1<r&&e.charCodeAt(o+1)===42){for(o+=2;o+1<r&&(e.charCodeAt(o)!==42||e.charCodeAt(o+1)!==ln);)o++;o+=2}else if(t!==40){if(t!==41){if(c>0)o++;else if(t===42&&o+1<r&&e.charCodeAt(o+1)===ln)i+=e.substring(a,o),o+=2,a=o,u=!0;else if(t===ln&&o+1<r&&e.charCodeAt(o+1)===ln){for(i+=e.substring(a,o);o<r&&e.charCodeAt(o)!==10;)o++;a=o,u=!0}else t===123?l++:t===125&&l--,o++}else c>0&&c--,o++}else c++,o++}else o++}else s===0?s=t:s===t&&(s=0),o++}return u?(a<r&&(i+=e.substring(a)),l===0?i:Cn(i)):l===0?e:Cn(e)}(t),d=Pe(o||a?o+` `+a+` { `+u+` }`:u);return e.namespace&&(d=wn(d,e.namespace)),s=[],Be(d,c),s},u=e,d=ht;for(let e=0;e<t.length;e++)t[e].name||Ge(15),d=gt(d,t[e].name);return u!=null&&u.namespace&&(d=gt(d,u.namespace)),u!=null&&u.prefix&&(d=gt(d,`p`)),l.hash=d===ht?``:d.toString(),l}var En=new an,Dn=Tn(),On=_.createContext({shouldForwardProp:void 0,styleSheet:En,stylis:Dn,stylisPlugins:void 0});On.Consumer;function kn(){return _.useContext(On)}var An=_.createContext(void 0);An.Consumer;var jn={};function Mn(e,t){let n=typeof e==`string`?dt(e):`sc`;jn[n]=(jn[n]||0)+1;let r=n+`-`+vt(Ye+n+jn[n]);return t?t+`-`+r:r}function Nn(e,t,n){let r=Rt(e),i=e,a=!bt(e),{attrs:o=ot,componentId:s=Mn(t.displayName,t.parentComponentId),displayName:c=xt(e)}=t,l=t.displayName&&t.componentId?dt(t.displayName)+`-`+t.componentId:t.componentId||s,u=r&&i.attrs?i.attrs.concat(o).filter(Boolean):o,{shouldForwardProp:d}=t;if(r&&i.shouldForwardProp){let e=i.shouldForwardProp;if(t.shouldForwardProp){let n=t.shouldForwardProp;d=(t,r)=>e(t,r)&&n(t,r)}else d=e}let f=new bn(n,l,r?i.componentStyle:void 0);function p(e,t){return function(e,t,n){let{attrs:r,componentStyle:i,defaultProps:a,foldedComponentIds:o,styledComponentId:s,target:c}=e,l=_.useContext(An),u=kn(),d=e.shouldForwardProp||u.shouldForwardProp,f=ct(t,l,a)||st,[p,m]=function(e,t,n){let r=Object.assign(Object.assign({},t),{className:void 0,theme:n}),i=null,a=e.length>1;for(let t=0;t<e.length;t++){let n=e[t],o=It(n)?n(a?Object.assign({},r):r):n;for(let e in o)e===`className`?r.className=zt(r.className,o[e]):e===`style`?r.style=Object.assign(Object.assign({},r.style),o[e]):o[e]===void 0?e in r&&(r[e]!==void 0&&(i||=[]).push(e),r[e]=void 0):r[e]=o[e]}return`className`in t&&typeof t.className==`string`&&(r.className=zt(r.className,t.className)),[r,i]}(r,t,f),h=i.generateAndInjectStyles(p,u.styleSheet,u.stylis),g=p.as||c,v=bt(g),y=function(e,t,n,r,i,a){let o={};for(let s in e)s[0]===`$`||s===`as`||s===`theme`&&e.theme===n||(s===`forwardedAs`?e.forwardedAs!==void 0&&(o.as=e.forwardedAs):e[s]===void 0?s===`className`||i||a!==null&&a.indexOf(s)!==-1||r&&!r(s,t)||(o[s]=void 0):r&&!r(s,t)||(o[s]=e[s]));return o}(p,g,f,d,v,m),b=zt(o,s);return h&&(b+=` `+h),p.className&&(b+=` `+p.className),y[v&&g.includes(`-`)?`class`:`className`]=b,n&&(y.ref=n),(0,_.createElement)(g,y)}(m,e,t)}p.displayName=c;let m=_.forwardRef(p);return m.attrs=u,m.componentStyle=f,m.displayName=c,m.shouldForwardProp=d,m.foldedComponentIds=r?zt(i.foldedComponentIds,i.styledComponentId):``,m.styledComponentId=l,m.target=r?i.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(e){this._foldedDefaultProps=r?function(e,...t){for(let n of t)Ht(e,n,!0);return e}({},i.defaultProps,e):e}}),Ut(m,()=>`.${m.styledComponentId}`),a&&Ft(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var Pn=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`));function Fn(e,t){let n=[e[0]];for(let r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var In=e=>(on.add(e),e);function Ln(e,...t){if(It(e)||Vt(e))return In(vn(Fn(ot,[e,...t])));let n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?vn(n):In(vn(Fn(n,t)))}function Rn(e,t,n=st){if(!t)throw Ge(1,t);let r=(r,...i)=>e(t,n,Ln(r,...i));return r.attrs=r=>Rn(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)})),r.withConfig=r=>Rn(e,t,Object.assign(Object.assign({},n),r)),r}var zn=e=>Rn(Nn,e),I=zn;Pn.forEach(e=>{I[e]=zn(e)});var Bn,Vn=class{constructor(e,t){this[Bn]=!0,this.inject=(e,t=Dn)=>{let n=this.getName(t);if(!e.hasNameForId(this.id,n)){let r=t(this.rules,n,`@keyframes`);e.insertRules(this.id,n,r)}},this.name=e,this.id=et+e,this.rules=t,P(this.id),Ut(this,()=>{throw Ge(12,String(this.name))})}getName(e=Dn){return e.hash?this.name+mt(e.hash>>>0):this.name}};function Hn(e,...t){let n=Bt(Ln(e,...t));return new Vn(vt(n),n)}Bn=dn,`${Ke}`,`${Ke}`,`${Ke}`;var Un=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),Wn=o(((e,t)=>{t.exports=Un()})),L=Wn(),Gn=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`path`,{d:`M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71`}),(0,L.jsx)(`path`,{d:`M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71`})]}),Kn=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 256 256`,role:`img`,"aria-label":`URLCheck`,...e,children:[(0,L.jsx)(`defs`,{children:(0,L.jsxs)(`linearGradient`,{id:`urlcheck-mark`,x1:0,y1:0,x2:1,y2:1,children:[(0,L.jsx)(`stop`,{offset:0,stopColor:`#3b82f6`}),(0,L.jsx)(`stop`,{offset:.5,stopColor:`#6366f1`}),(0,L.jsx)(`stop`,{offset:1,stopColor:`#8b5cf6`})]})}),(0,L.jsxs)(`g`,{transform:`translate(112.75 112.75) scale(6.8) translate(-12 -12)`,fill:`none`,stroke:`#ffffff`,strokeWidth:2.05,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,L.jsx)(`path`,{d:`M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71`}),(0,L.jsx)(`path`,{d:`M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71`})]}),(0,L.jsx)(`circle`,{cx:184.75,cy:184.75,r:33,fill:`#ffffff`}),(0,L.jsx)(`path`,{d:`M168.75 184.75l10 10 21-22`,fill:`none`,stroke:`url(#urlcheck-mark)`,strokeWidth:10,strokeLinecap:`round`,strokeLinejoin:`round`})]}),qn=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`path`,{d:`M3 9.5 12 3l9 6.5`}),(0,L.jsx)(`path`,{d:`M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10`}),(0,L.jsx)(`path`,{d:`M9 21v-6h6v6`})]}),Jn=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`polygon`,{points:`12 2 2 7 12 12 22 7 12 2`}),(0,L.jsx)(`polyline`,{points:`2 17 12 22 22 17`}),(0,L.jsx)(`polyline`,{points:`2 12 12 17 22 12`})]}),Yn=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`circle`,{cx:12,cy:12,r:10}),(0,L.jsx)(`polyline`,{points:`12 6 12 12 16 14`})]}),Xn=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`circle`,{cx:12,cy:12,r:3}),(0,L.jsx)(`path`,{d:`M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z`})]}),Zn=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`path`,{d:`M22 11.08V12a10 10 0 1 1-5.93-9.14`}),(0,L.jsx)(`polyline`,{points:`22 4 12 14.01 9 11.01`})]}),Qn=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z`}),(0,L.jsx)(`line`,{x1:12,y1:9,x2:12,y2:13}),(0,L.jsx)(`line`,{x1:12,y1:17,x2:12.01,y2:17})]}),$n=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`circle`,{cx:12,cy:12,r:10}),(0,L.jsx)(`line`,{x1:15,y1:9,x2:9,y2:15}),(0,L.jsx)(`line`,{x1:9,y1:9,x2:15,y2:15})]}),er=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`circle`,{cx:11,cy:11,r:8}),(0,L.jsx)(`line`,{x1:21,y1:21,x2:16.65,y2:16.65})]}),tr=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`path`,{d:`M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z`}),(0,L.jsx)(`path`,{d:`m9 12 2 2 4-4`})]}),nr=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`rect`,{x:3,y:11,width:18,height:11,rx:2,ry:2}),(0,L.jsx)(`path`,{d:`M7 11V7a5 5 0 0 1 10 0v4`})]}),rr=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`rect`,{width:14,height:14,x:8,y:8,rx:2,ry:2}),(0,L.jsx)(`path`,{d:`M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`})]}),ir=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`polyline`,{points:`15 14 20 9 15 4`}),(0,L.jsx)(`path`,{d:`M4 20v-7a4 4 0 0 1 4-4h12`})]}),ar=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`line`,{x1:12,y1:5,x2:12,y2:19}),(0,L.jsx)(`line`,{x1:5,y1:12,x2:19,y2:12})]}),or=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`path`,{d:`M3 6h18`}),(0,L.jsx)(`path`,{d:`M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6`}),(0,L.jsx)(`path`,{d:`M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2`})]}),sr=e=>(0,L.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`currentColor`,...e,children:(0,L.jsx)(`polygon`,{points:`5 3 19 12 5 21 5 3`})}),cr=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`path`,{d:`M22 2 11 13`}),(0,L.jsx)(`path`,{d:`M22 2 15 22 11 13 2 9 22 2z`})]}),lr=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`polyline`,{points:`16 18 22 12 16 6`}),(0,L.jsx)(`polyline`,{points:`8 6 2 12 8 18`})]}),ur=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`path`,{d:`M12 20h9`}),(0,L.jsx)(`path`,{d:`M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z`})]}),dr=e=>(0,L.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,L.jsx)(`path`,{d:`M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`}),(0,L.jsx)(`polyline`,{points:`15 3 21 3 21 9`}),(0,L.jsx)(`line`,{x1:10,y1:14,x2:21,y2:3})]});function fr(e){let t=({size:t=20,...n})=>(0,L.jsx)(e,{width:t,height:t,...n});return t.displayName=e.displayName??`Icon`,t}var pr=fr(Gn),mr=fr(Kn),hr=fr(qn);fr(Jn);var gr=fr(Yn),_r=fr(Xn),vr=fr(lr),yr=fr(Zn),br=fr(Qn),xr=fr($n),Sr=fr(er),Cr=fr(tr),wr=fr(nr),Tr=fr(rr);fr(ir);var Er=fr(ar),Dr=fr(or),Or=fr(sr),kr=fr(cr),Ar=fr(dr),jr=fr(ur),Mr=I.div`
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
`,Nr=I.div`
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
`,Pr=I(Nr)`
    display: flex;
    flex-direction: column;
    gap: 18px;
`,Fr=I.h3`
    font-size: 1.05rem;
    font-weight: 700;
    color: #f9fafb;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 12px;
    margin-bottom: 4px;
`,Ir=15e3,Lr=new Set,Rr=new Map,zr=!1,Br=0;function Vr(){return typeof window<`u`&&typeof window.external?.sendMessage==`function`}function Hr(){zr||(zr=!0,typeof window<`u`&&typeof window.external?.receiveMessage==`function`&&window.external.receiveMessage(e=>Ur(e)))}function Ur(e){let t;try{t=JSON.parse(e)}catch(t){console.warn(`[Native] Received a non-JSON message:`,e,t);return}let n=typeof t.id==`string`?t.id:void 0,r=n?Rr.get(n):void 0;n&&r&&(Rr.delete(n),clearTimeout(r.timeoutId),t.ok===!1?r.reject(Error(typeof t.error==`string`?t.error:`Native request failed.`)):r.resolve(t.data)),Lr.forEach(e=>{try{e(t)}catch(e){console.error(`[Native] Message handler threw:`,e)}})}var R={get available(){return Vr()},send(e){Vr()?(Hr(),window.external.sendMessage(JSON.stringify(e))):console.debug(`[Native] Bridge unavailable, dropping message:`,e)},request(e,t,n=Ir){if(!Vr())return Promise.reject(Error(`Native bridge is not available.`));Hr();let r=`req-${++Br}-${Date.now()}`;return new Promise((i,a)=>{let o=setTimeout(()=>{Rr.delete(r),a(Error(`Native request '${e}' timed out after ${n}ms.`))},n);Rr.set(r,{resolve:i,reject:a,timeoutId:o}),window.external.sendMessage(JSON.stringify({type:e,id:r,payload:t}))})},on(e){return Hr(),Lr.add(e),()=>Lr.delete(e)}};function Wr(e){return(t,n)=>{let r=e[t]??t;return n?r.replace(/\{(\w+)}/g,(e,t)=>t in n?String(n[t]):e):r}}async function Gr(e){return R.available?await R.request(`i18n.get`,e?{locale:e}:void 0):{locale:`en`,strings:{},available:[`en`]}}var Kr=(0,_.createContext)(Wr({})),qr=(0,_.createContext)(`en`);function Jr(){return(0,_.useContext)(Kr)}function Yr(){return(0,_.useContext)(qr)}var Xr=({children:e})=>{let[t,n]=(0,_.useState)(()=>Wr({})),[r,i]=(0,_.useState)(`en`);return(0,_.useEffect)(()=>{let e=!1,t=async()=>{try{let t=await Gr();if(e)return;n(()=>Wr(t.strings)),i(t.locale)}catch{}};t();let r=R.on(e=>{e.type===`settings.changed`&&t()});return()=>{e=!0,r()}},[]),(0,_.useEffect)(()=>{document.documentElement.lang=r},[r]),(0,L.jsx)(Kr.Provider,{value:t,children:(0,L.jsx)(qr.Provider,{value:r,children:e})})},Zr=e=>R.send({type:e});function Qr(){let[e,t]=(0,_.useState)(!1);return(0,_.useEffect)(()=>{if(R.available)return R.on(e=>{if(e.type!==`window.state`)return;let n=e.data;typeof n?.maximized==`boolean`&&t(n.maximized)})},[]),{maximized:e,minimize:()=>Zr(`window.minimize`),toggleMaximize:()=>Zr(`window.toggleMaximize`),close:()=>Zr(`window.close`)}}function $r(){return{onMouseDown:()=>Zr(`window.drag`),onDoubleClick:()=>Zr(`window.toggleMaximize`)}}function ei(){let[e,t]=(0,_.useState)(!1),{maximized:n}=Qr();return(0,_.useEffect)(()=>{if(!R.available)return;let e=!1;return R.request(`app.info`).then(n=>{e||t(n.rounded===!0)}).catch(()=>void 0),()=>{e=!0}},[]),(0,_.useEffect)(()=>{document.documentElement.classList.toggle(`window-rounded`,e)},[e]),e&&!n}var ti=[[`top`,{top:0,left:8,right:8,height:5,cursor:`ns-resize`}],[`bottom`,{bottom:0,left:8,right:8,height:5,cursor:`ns-resize`}],[`left`,{top:8,bottom:8,left:0,width:5,cursor:`ew-resize`}],[`right`,{top:8,bottom:8,right:0,width:5,cursor:`ew-resize`}],[`topleft`,{top:0,left:0,width:10,height:10,cursor:`nwse-resize`}],[`topright`,{top:0,right:0,width:10,height:10,cursor:`nesw-resize`}],[`bottomleft`,{bottom:0,left:0,width:10,height:10,cursor:`nesw-resize`}],[`bottomright`,{bottom:0,right:0,width:10,height:10,cursor:`nwse-resize`}]];function ni(){return(0,L.jsx)(L.Fragment,{children:ti.map(([e,t])=>(0,L.jsx)(`div`,{onMouseDown:t=>{t.preventDefault(),R.send({type:`window.resize`,payload:{direction:e}})},style:{position:`fixed`,zIndex:1e3,...t}},e))})}async function ri(){return R.available?(await R.request(`history.list`)).entries??[]:[]}async function ii(){R.available&&await R.request(`history.clear`)}async function ai(e){R.available?await R.request(`popup.show`,{url:e}):window.open(e,`_blank`,`noopener,noreferrer`)}async function oi(){return R.available?(await R.request(`clipboard.read`)).text??null:null}function si(){R.available?R.send({type:`popup.close`}):window.close()}function ci(){R.send({type:`selection.hide`})}async function li(){return await R.request(`app.registerProtocols`)}async function ui(){await R.request(`app.unregisterProtocols`)}async function di(){return R.available?await R.request(`app.protocolStatus`):{isDefault:!1,customSchemeRegistered:!1,pathMatches:!1,registeredPath:null}}async function fi(){return R.available?await R.request(`app.startup`):{supported:!1,enabled:!1}}async function pi(e){return await R.request(`app.setStartup`,{enabled:e})}async function mi(){await R.request(`app.openDefaultApps`)}function hi(e){R.send({type:`popup.resize`,payload:{height:Math.round(e)}})}async function gi(){return R.available?await R.request(`app.info`):{version:`dev`,platform:`windows`,logDirectory:``,rounded:!1}}async function _i(){R.available&&await R.request(`app.openLogs`)}var vi=`https://github.com/T2PeNBiX99wcoxKv3A4g/URLCheck/releases/latest`;async function yi(){return R.available?await R.request(`app.updateStatus`)??null:null}async function bi(){return R.available?await R.request(`app.checkUpdate`):{current:`dev`,latest:`dev`,available:!1}}async function xi(){if(!R.available)return!1;let e=await R.request(`app.protocolStatus`);return e.isDefault&&e.pathMatches}var Si=I(Nr)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
`,Ci=I.div`
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
`,wi=I.input`
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
`,Ti=I.button`
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
`,Ei=I(Nr)`
    padding: 0;
    overflow: hidden;
`,Di=I.table`
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
`,Oi=I.td`
    word-break: break-all;
`,ki=I.button`
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
`,Ai=I.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 8px;
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #f87171;
    font-size: 0.85rem;
`;function ji(e,t){let n=new Date(e);return Number.isNaN(n.getTime())?String(e):n.toLocaleString(t)}var Mi=()=>{let e=Jr(),t=Yr(),[n,r]=(0,_.useState)([]),[i,a]=(0,_.useState)(``),[o,s]=(0,_.useState)(!0),[c,l]=(0,_.useState)(null);(0,_.useEffect)(()=>{let e=!1;return(async()=>{try{let t=await ri();e||r(t)}catch(t){e||l(t instanceof Error?t.message:String(t))}finally{e||s(!1)}})(),()=>{e=!0}},[]);let u=n.filter(e=>e.url.toLowerCase().includes(i.toLowerCase()));(0,_.useEffect)(()=>{let e=!1,t,n=async()=>{try{let t=await ri();e||r(t)}catch{}},i=R.on(e=>{e.type===`history.changed`&&(window.clearTimeout(t),t=window.setTimeout(()=>{n()},150))});return()=>{e=!0,window.clearTimeout(t),i()}},[]);let d=async e=>{l(null);try{await ai(e)}catch(e){l(e instanceof Error?e.message:String(e))}};return(0,L.jsxs)(Mr,{children:[c&&(0,L.jsxs)(Ai,{children:[(0,L.jsx)(br,{size:16}),(0,L.jsx)(`span`,{children:e(c)})]}),(0,L.jsxs)(Si,{children:[(0,L.jsxs)(Ci,{children:[(0,L.jsx)(Sr,{size:18}),(0,L.jsx)(wi,{type:`text`,placeholder:e(`history.searchPlaceholder`),value:i,onChange:e=>a(e.target.value)})]}),(0,L.jsxs)(Ti,{onClick:async()=>{l(null);try{await ii(),r([])}catch(e){l(e instanceof Error?e.message:String(e))}},disabled:n.length===0,children:[(0,L.jsx)(Dr,{size:15}),(0,L.jsx)(`span`,{children:e(`history.clearAll`)})]})]}),(0,L.jsx)(Ei,{children:(0,L.jsxs)(Di,{children:[(0,L.jsx)(`thead`,{children:(0,L.jsxs)(`tr`,{children:[(0,L.jsx)(`th`,{style:{width:`200px`},children:e(`history.timestamp`)}),(0,L.jsx)(`th`,{children:e(`history.url`)})]})}),(0,L.jsx)(`tbody`,{children:u.length>0?u.map(n=>(0,L.jsxs)(`tr`,{"data-history-url":n.url,children:[(0,L.jsx)(`td`,{style:{color:`#9ca3af`,fontSize:`0.85rem`},children:ji(n.timestamp,t)}),(0,L.jsx)(Oi,{children:(0,L.jsx)(ki,{onClick:()=>d(n.url),title:e(`history.openTooltip`),children:n.url})})]},n.id)):(0,L.jsx)(`tr`,{children:(0,L.jsx)(`td`,{colSpan:2,style:{textAlign:`center`,padding:`36px`,color:`#6b7280`},children:e(o?`history.loading`:`history.empty`)})})})]})})]})},Ni=(0,_.createContext)(()=>{});function Pi(){return(0,_.useContext)(Ni)}var Fi=I.h3`
    font-size: 1.05rem;
    font-weight: 700;
    color: #f9fafb;
    display: flex;
    align-items: center;
    gap: 8px;
`,Ii=I.p`
    font-size: 0.85rem;
    color: #9ca3af;
    line-height: 1.6;
`,Li=I.form`
    display: flex;
    gap: 12px;
`,Ri=I.div`
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;

    svg {
        position: absolute;
        left: 16px;
        stroke: #9ca3af;
    }
`,zi=I.input`
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
`,Bi=I.button`
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
`,Vi=I.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
`,Hi=I.span`
    font-size: 0.8rem;
    color: #9ca3af;
    font-weight: 500;
`,Ui=I.button`
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
`,Wi=I.div`
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
`,Gi=I.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`,Ki=I.span`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.95rem;
    font-weight: 700;
`,qi=I.span`
    font-size: 0.82rem;
    color: #d1d5db;
    line-height: 1.55;
`,Ji=I.button`
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
`,Yi=[`http://www.google.com/?ref=referrer&foo=bar#tag`,`https://www.google.com/search?q=photino+net&utm_source=test&utm_medium=email`,`https://example.com/path/to/page?key=value&lang=en#section`],Xi=Yi[0],Zi=()=>{let e=Jr(),t=Pi(),[n,r]=(0,_.useState)(Xi),[i,a]=(0,_.useState)(!1),[o,s]=(0,_.useState)(!0);return(0,_.useEffect)(()=>{xi().then(s).catch(()=>s(!0))},[]),(0,L.jsxs)(Mr,{$maxWidth:820,children:[!o&&(0,L.jsxs)(Wi,{children:[(0,L.jsxs)(Gi,{children:[(0,L.jsxs)(Ki,{children:[(0,L.jsx)(br,{size:16}),(0,L.jsx)(`span`,{children:e(`home.bannerTitle`)})]}),(0,L.jsx)(qi,{children:e(`home.bannerBody`)})]}),(0,L.jsx)(Ji,{onClick:()=>t(`settings`),children:e(`home.openSettings`)})]}),(0,L.jsxs)(Pr,{children:[(0,L.jsxs)(Fi,{children:[(0,L.jsx)(pr,{size:18}),(0,L.jsx)(`span`,{children:e(`home.openTitle`)})]}),(0,L.jsx)(Ii,{children:e(`home.openDescription`)}),(0,L.jsxs)(Li,{onSubmit:async e=>{e.preventDefault();let t=n.trim();if(t){a(!0);try{await ai(t)}finally{a(!1)}}},children:[(0,L.jsxs)(Ri,{children:[(0,L.jsx)(Sr,{size:20}),(0,L.jsx)(zi,{type:`text`,placeholder:`https://example.com/path?key=value`,value:n,onChange:e=>r(e.target.value)})]}),(0,L.jsxs)(Bi,{type:`submit`,disabled:i,children:[(0,L.jsx)(Cr,{size:18}),(0,L.jsx)(`span`,{children:e(`home.open`)})]})]}),(0,L.jsxs)(Vi,{children:[(0,L.jsx)(Hi,{children:e(`home.samples`)}),Yi.map(e=>(0,L.jsx)(Ui,{type:`button`,onClick:()=>r(e),children:e},e))]})]})]})},Qi=Hn`
    from {
        opacity: 0;
        transform: translateY(6px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`,$i=Hn`
    from {
        opacity: 0;
        transform: translateY(-6px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`,ea=I.div`
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
`,ta=I.button`
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
`,na=I.div`
    position: relative;
    display: inline-flex;
`;function ra(e,t,n){let[r,i]=(0,_.useState)({});return(0,_.useEffect)(()=>{if(!e)return;let r=()=>{let e=n.current?.getBoundingClientRect();if(!e)return;let r=t?e.top:window.innerHeight-e.bottom;i({maxHeight:Math.max(120,Math.floor(r-10))})};return r(),window.addEventListener(`resize`,r),()=>window.removeEventListener(`resize`,r)},[e,t,n]),r}var ia=I.button`
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
`,aa=I.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`,z=I.span`
    flex-shrink: 0;
    font-size: 0.7em;
    opacity: 0.75;
    transition: transform 0.18s ease;
    transform: rotate(${e=>e.$open?`180deg`:`0`});
`,oa=({value:e,options:t,onChange:n,variant:r=`compact`,up:i,disabled:a,title:o})=>{let[s,c]=(0,_.useState)(!1),l=(0,_.useRef)(null),u=ra(s,i,l);(0,_.useEffect)(()=>{if(!s)return;let e=e=>{l.current?.contains(e.target)||c(!1)},t=e=>{e.key===`Escape`&&c(!1)};return document.addEventListener(`mousedown`,e),document.addEventListener(`keydown`,t),()=>{document.removeEventListener(`mousedown`,e),document.removeEventListener(`keydown`,t)}},[s]);let d=t.find(t=>t.value===e)?.label??e;return(0,L.jsxs)(na,{ref:l,children:[(0,L.jsxs)(ia,{type:`button`,$variant:r,disabled:a,title:o,"aria-haspopup":`listbox`,"aria-expanded":s,onClick:()=>c(e=>!e),children:[(0,L.jsx)(aa,{children:d}),(0,L.jsx)(z,{$open:s,children:`▾`})]}),s&&(0,L.jsx)(ea,{$up:i,role:`listbox`,style:u,children:t.map(t=>(0,L.jsx)(ta,{type:`button`,role:`option`,"aria-selected":t.value===e,$active:t.value===e,onClick:()=>{c(!1),n(t.value)},children:t.label},t.value))})]})},B={requestTimeoutMs:5e3,userAgents:[],browsers:[],language:`en`,borderlessPopup:!0,autoStripTrackingParams:!0,autoRedirectHosts:[],hideOnLaunch:!1,showUrlButton:!0,selectedUserAgentId:`default`,deviceName:``,deviceId:``,forwardingEnabled:!1,forwardPort:45454,filterAutoUpdate:!1,filterAutoUpdateMinutes:1440,devices:[]},sa=`urlcheck.settings`;function ca(e,t,n){return Math.min(Math.max(e,t),n)}function la(e){return e===-1?-1:e===void 0||!Number.isFinite(e)?B.filterAutoUpdateMinutes:ca(e,1,10080)}function ua(e){let t=Array.isArray(e.userAgents)?e.userAgents:B.userAgents;return{...e,requestTimeoutMs:ca(e.requestTimeoutMs,1e3,15e3),userAgents:t,selectedUserAgentId:t.some(t=>t.id===e.selectedUserAgentId)?e.selectedUserAgentId:t[0].id,browsers:(Array.isArray(e.browsers)?e.browsers:[]).map(e=>({...e,arguments:e.arguments??``,useCount:e.useCount??0})),language:e.language||B.language,borderlessPopup:e.borderlessPopup??B.borderlessPopup,autoStripTrackingParams:e.autoStripTrackingParams??B.autoStripTrackingParams,autoRedirectHosts:(Array.isArray(e.autoRedirectHosts)?e.autoRedirectHosts:[]).map(e=>e.trim().toLowerCase()).filter(e=>e.length>0),hideOnLaunch:e.hideOnLaunch??B.hideOnLaunch,showUrlButton:e.showUrlButton??B.showUrlButton,deviceName:e.deviceName??B.deviceName,deviceId:e.deviceId??B.deviceId,forwardingEnabled:e.forwardingEnabled??B.forwardingEnabled,forwardPort:e.forwardPort??B.forwardPort,filterAutoUpdate:e.filterAutoUpdate??B.filterAutoUpdate,filterAutoUpdateMinutes:la(e.filterAutoUpdateMinutes),devices:(Array.isArray(e.devices)?e.devices:[]).map(e=>({...e,host:e.host??``,port:e.port??B.forwardPort,publicKey:e.publicKey??``,addresses:Array.isArray(e.addresses)?e.addresses:[]}))}}function da(){try{let e=window.localStorage.getItem(sa);if(e)return ua({...B,...JSON.parse(e)})}catch(e){console.warn(`[settings] Failed to read local settings:`,e)}return{...B}}async function fa(){return R.available?await R.request(`settings.get`):{settings:da(),settingsFilePath:`(browser localStorage)`}}async function pa(e){let t=ua(e);return R.available?await R.request(`settings.save`,t):(window.localStorage.setItem(sa,JSON.stringify(t)),{settings:t,settingsFilePath:`(browser localStorage)`})}async function ma(){return R.available?await R.request(`settings.reset`):(window.localStorage.removeItem(sa),{settings:{...B},settingsFilePath:`(browser localStorage)`})}async function ha(e){R.available&&await R.request(`settings.addAutoRedirect`,{url:e})}async function ga(){return R.available?(await R.request(`browsers.detect`)).browsers??[]:[]}async function _a(e,t,n=!1){R.available?await R.request(`popup.open`,{url:e,browserId:t,private:n}):window.open(e,`_blank`,`noopener,noreferrer`)}async function va(e){R.available?await R.request(`browsers.openDefault`,{url:e}):window.open(e,`_blank`,`noopener,noreferrer`)}var ya={deviceId:``,deviceName:``,port:0,addresses:[],enabled:!1,listening:!1,publicKey:``};async function ba(){return R.available?await R.request(`forward.info`):ya}async function xa(e,t){await R.request(`forward.send`,{url:e,deviceId:t})}async function Sa(){if(!R.available)return new Set;let e=await R.request(`forward.presence`);return new Set(e.online??[])}function Ca(){R.send({type:`forward.discoverStart`})}function wa(){R.send({type:`forward.discoverStop`})}function Ta(e,t){R.send({type:`forward.pair`,payload:{host:e,port:t}})}function Ea(e,t){R.send({type:`forward.pairRespond`,payload:{requestId:e,accept:t}})}async function Da(){return R.available?await R.request(`forward.pendingPairing`)??null:null}function Oa(e){R.send({type:`forward.remove`,payload:{deviceId:e}})}async function ka(e,t){await R.request(`forward.addAddress`,{deviceId:e,address:t})}function Aa(e,t){R.send({type:`forward.removeAddress`,payload:{deviceId:e,address:t}})}var ja={lists:[],builtinRuleCount:0};async function Ma(){return R.available?await R.request(`filters.get`):ja}async function Na(e,t){return await R.request(`filters.add`,{name:e,url:t})}async function Pa(e){return await R.request(`filters.remove`,{id:e})}async function Fa(e,t){return await R.request(`filters.setEnabled`,{id:e,enabled:t})}async function Ia(e){return await R.request(`filters.update`,{id:e??``})}async function La(){return R.available?(await R.request(`filters.rules`)).rules:[]}var Ra=[{name:`AdGuard URL Tracking Protection`,url:`https://raw.githubusercontent.com/AdguardTeam/FiltersRegistry/master/filters/filter_17_TrackParam/filter.txt`,descriptionKey:`filters.catalog.adguardUrlTracking`},{name:`uBlock Origin – AdGuard URL Tracking Protection`,url:`https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy-removeparam.txt`,descriptionKey:`filters.catalog.uboUrlTracking`},{name:`ClearURLs`,url:`https://rules1.clearurls.xyz/data.minify.json`,descriptionKey:`filters.catalog.clearUrls`},{name:`Firefox – Query Parameter Stripping`,url:`https://firefox.settings.services.mozilla.com/v1/buckets/main/collections/query-stripping/records`,descriptionKey:`filters.catalog.firefox`}],za=`modulepreload`,Ba=function(e){return`/`+e},Va={},Ha=function(e){return e.pathname.endsWith(`.css`)},Ua=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},Wa=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Ba(t,n);let r=s(t),i=Ha(r);return Ua(Va,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:za,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Ga=_.lazy(()=>Wa(()=>import(`./AttributionPage-B0xpnofO.js`).then(e=>({default:e.AttributionPage})),[])),Ka=I.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
    }
`,qa=I.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`,Ja=I.span`
    font-size: 0.925rem;
    font-weight: 600;
    color: #f9fafb;
`,V=I.span`
    font-size: 0.8rem;
    color: #9ca3af;
`,Ya=I.div`
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
`,Xa=I.div`
    display: flex;
    align-items: center;
    gap: 12px;
    /* On a narrow window (or a high display scale) the buttons wrap instead of being clipped. */
    flex-wrap: wrap;
`,Za=I.button`
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
`,Qa=I(Za)`
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
    color: #ffffff;
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.35);

    &:hover:not(:disabled) {
        background: linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%);
        box-shadow: 0 0 24px rgba(99, 102, 241, 0.5);
    }
`,$a=Ln`
    background: rgba(239, 68, 68, 0.12);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.35);

    &:hover:not(:disabled) {
        background: rgba(239, 68, 68, 0.24);
        color: #fca5a5;
        border-color: rgba(239, 68, 68, 0.5);
    }
`,eo=I(Za)`
    ${$a}
`,to=I(Za)`
    ${$a}
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
`,no=I.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #34d399;
    font-size: 0.85rem;
    font-weight: 500;
`,ro=I.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 8px;
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #f87171;
    font-size: 0.85rem;
`,io=I.div`
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
`,ao=I.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
`,oo=I.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex: 1;
    min-width: 0;
    max-width: 800px;
`,so=I.nav`
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
`,co=I.button`
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
`,lo=I(Pr)`
    scroll-margin-top: 28px;
`,uo=I.span`
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
`,fo=I.div`
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
`,po=I.button`
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
`,mo=I.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`,ho=I.div`
    display: flex;
    align-items: center;
    gap: 8px;
`,go=I.input`
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
`,H=I.button`
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
`,_o=I(H)`
    border-color: rgba(239, 68, 68, 0.35);
    background: rgba(239, 68, 68, 0.12);
    color: #f87171;

    &:hover:not(:disabled) {
        background: rgba(239, 68, 68, 0.24);
        color: #fca5a5;
    }
`,vo=I.button`
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
`,yo=I.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
`,bo=I.span`
    font-size: 0.78rem;
    color: #9ca3af;
`,xo=I.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.78rem;
    line-height: 1.4;
    color: #fbbf24;
`,So=I.div`
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
`,Co=I.input.attrs({type:`checkbox`})`
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
`,wo=I.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`,To=I.div`
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
`,Eo=I.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    min-width: 0;
`,Do=I.span`
    font-size: 0.9rem;
    font-weight: 600;
    color: #f9fafb;
    word-break: break-word;
`,Oo=I.div`
    display: flex;
    align-items: center;
    gap: 8px;
`,ko=I.span`
    width: 8px;
    height: 8px;
    flex-shrink: 0;
    border-radius: 50%;
    background: ${e=>e.$online?`#22c55e`:`#374151`};
    box-shadow: ${e=>e.$online?`0 0 6px rgba(34, 197, 94, 0.7)`:`none`};
`,Ao=I.span`
    font-size: 0.75rem;
    color: #6b7280;
    font-family: var(--font-mono);
    word-break: break-all;
`,jo=I.div`
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
`,Mo=I.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 6px;
`,No=I.span`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    font-size: 0.75rem;
    color: #9ca3af;
`,Po=I.span`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    color: #f87171;
    word-break: break-word;
`,Fo=I.div`
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
`,Io=I.span`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
    font-size: 0.8rem;
    font-weight: 600;
    color: #34d399;
`,Lo=I.button`
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
`,Ro=I.div`
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
`,zo=I.div`
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
`,Bo=I.h3`
    font-size: 1.05rem;
    font-weight: 700;
    color: #f9fafb;
`,U=I.div`
    display: flex;
    gap: 6px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`,W=I.button`
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
`,Vo=I.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 320px;
    overflow-y: auto;
    padding-right: 4px;
`,Ho=I.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(15, 23, 42, 0.6);
`,Uo=I.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
`,Wo=I.span`
    font-size: 0.875rem;
    font-weight: 600;
    color: #f9fafb;
`,Go=I.span`
    font-size: 0.78rem;
    line-height: 1.5;
    color: #9ca3af;
`,Ko=I.div`
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
`,qo=I.label`
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 0.8rem;
    color: #9ca3af;
`,Jo=I(go)`
    width: 100%;
`,Yo={en:`English`,"zh-TW":`繁體中文`,"zh-CN":`简体中文`,ja:`日本語`},Xo=[`settings.network`,`settings.userAgent`,`settings.browsers`,`settings.forwarding`,`settings.forwardDevices`,`settings.systemIntegration`,`settings.autoRedirect`,`settings.filterLists`,`settings.startup`,`settings.about`],Zo=e=>e.replace(`.`,`-`),Qo=()=>{let e=Jr(),t=Yr(),[n,r]=(0,_.useState)(Xo[0]),[i,a]=(0,_.useState)(B),[o,s]=(0,_.useState)(B),[c,l]=(0,_.useState)(``),[u,d]=(0,_.useState)([]),[f,p]=(0,_.useState)(!0),[m,h]=(0,_.useState)(!1),[g,v]=(0,_.useState)(!1),[y,b]=(0,_.useState)(null),[x,S]=(0,_.useState)(!1),[C,ee]=(0,_.useState)(!1),[w,T]=(0,_.useState)(null),[E,te]=(0,_.useState)(null),[ne,re]=(0,_.useState)(`windows`),[D,ie]=(0,_.useState)(``),[ae,oe]=(0,_.useState)(``),[O,se]=(0,_.useState)(null),[k,ce]=(0,_.useState)(!1),[le,ue]=(0,_.useState)([]),[de,fe]=(0,_.useState)(0),[pe,me]=(0,_.useState)(!1),[he,ge]=(0,_.useState)(null),[_e,A]=(0,_.useState)(!1),[ve,ye]=(0,_.useState)(`catalog`),[j,M]=(0,_.useState)(``),[be,xe]=(0,_.useState)(``),[Se,Ce]=(0,_.useState)(!1),[we,N]=(0,_.useState)(!1),[Te,Ee]=(0,_.useState)(null),[De,Oe]=(0,_.useState)(!1),[ke,Ae]=(0,_.useState)(null),[je,Me]=(0,_.useState)([]),[Ne,Pe]=(0,_.useState)(()=>new Set),[Fe,Ie]=(0,_.useState)(!1),[Le,Re]=(0,_.useState)(null),[ze,Be]=(0,_.useState)(null),[Ve,He]=(0,_.useState)(``),[Ue,We]=(0,_.useState)(B.forwardPort),[Ge,Ke]=(0,_.useState)({}),[qe,Je]=(0,_.useState)(``);(0,_.useEffect)(()=>{let e=Xo.map(e=>document.getElementById(Zo(e)));if(e.some(e=>e===null))return;let t=new IntersectionObserver(e=>{let t=e.filter(e=>e.isIntersecting).sort((e,t)=>e.boundingClientRect.top-t.boundingClientRect.top)[0];t&&r(t.target.id)},{rootMargin:`-8% 0px -70% 0px`});return e.forEach(e=>t.observe(e)),()=>t.disconnect()},[]);let Ye=e=>{r(e),document.getElementById(e)?.scrollIntoView({behavior:`smooth`,block:`start`})};(0,_.useEffect)(()=>{di().then(te).catch(()=>te(null))},[]),(0,_.useEffect)(()=>{ba().then(Ae).catch(()=>Ae(null)),Da().then(Be).catch(()=>void 0),Sa().then(Pe).catch(()=>void 0)},[]),(0,_.useEffect)(()=>R.on(e=>{let t=e;if(t.type===`forward.discovered`)Me(t.data?.devices??[]);else if(t.type===`forward.pairState`){let e=t.data;e.state===`code`?Re({name:e.device?.name||e.device?.host||``,code:e.code,error:null}):e.state===`accepted`?(Re({name:e.device?.name??``,code:null,error:null}),setTimeout(()=>Re(null),1500)):Re(t=>({name:t?.name??``,code:null,error:e.error??`error.forwardFailed`}))}else t.type===`forward.pairRequest`&&Be(t.data),t.type===`forward.presence`&&Pe(new Set(t.data?.online??[]))}),[]),(0,_.useEffect)(()=>{gi().then(e=>{re(e.platform),ie(e.version),oe(e.logDirectory)}).catch(()=>void 0),yi().then(se).catch(()=>void 0)},[]),(0,_.useEffect)(()=>{fi().then(Ee).catch(()=>Ee(null))},[]),(0,_.useEffect)(()=>{Gr().then(e=>d(e.available)).catch(()=>d([]))},[]),(0,_.useEffect)(()=>{let e=!1;return Ma().then(t=>{e||Xe(t)}).catch(()=>void 0),()=>{e=!0}},[]);let Xe=e=>{ue(e.lists),fe(e.builtinRuleCount)},Ze=e=>le.some(t=>t.url.trim().toLowerCase()===e.trim().toLowerCase()),Qe=e=>{a(e.settings),s(e.settings),l(e.settingsFilePath)};(0,_.useEffect)(()=>{let e=!1;return(async()=>{try{let t=await fa();if(e)return;Qe(t),b(null)}catch(t){if(e)return;b(t instanceof Error?t.message:String(t))}finally{e||p(!1)}})(),()=>{e=!0}},[]),(0,_.useEffect)(()=>R.on(e=>{let t=e;t.type===`settings.changed`&&t.data&&Qe(t.data)}),[]);let $e=e=>{a(t=>({...t,...e}))},et=()=>{v(!0),setTimeout(()=>v(!1),2500)},tt=async()=>{h(!0),b(null);try{let e=await pa(i);Qe(e),et(),ba().then(Ae).catch(()=>Ae(null))}catch(e){b(e instanceof Error?e.message:String(e))}finally{h(!1)}},nt=()=>{a(o),b(null)},rt=async()=>{h(!0),b(null);try{let e=await ma();Qe(e),et(),ba().then(Ae).catch(()=>Ae(null))}catch(e){b(e instanceof Error?e.message:String(e))}finally{h(!1)}},P=f||m,it=(0,_.useMemo)(()=>!f&&JSON.stringify(i)!==JSON.stringify(o),[i,o,f]),at=e=>{let t=e.trim();if(!t)return``;try{return new URL(t).hostname.toLowerCase()}catch{return t.split(/[/?#]/)[0].replace(/:\d+$/,``).replace(/^\.+|\.+$/g,``).toLowerCase()}},ot=()=>{let e=at(qe);e&&(a(t=>({...t,autoRedirectHosts:t.autoRedirectHosts.includes(e)?t.autoRedirectHosts:[...t.autoRedirectHosts,e]})),Je(``))},st=e=>{a(t=>({...t,autoRedirectHosts:t.autoRedirectHosts.filter(t=>t!==e)}))},ct=(e,t)=>{a(n=>({...n,browsers:n.browsers.map(n=>n.id===e?{...n,...t}:n)}))},lt=()=>{let e=Math.random().toString(36).slice(2,10);a(t=>({...t,browsers:[...t.browsers,{id:e,name:``,executablePath:``,arguments:``,useCount:0}]}))},ut=e=>{a(t=>({...t,browsers:t.browsers.filter(t=>t.id!==e)}))},dt=(e,t)=>{a(n=>({...n,userAgents:n.userAgents.map(n=>n.id===e?{...n,...t}:n)}))},ft=()=>{let e=Math.random().toString(36).slice(2,10);a(t=>({...t,userAgents:[...t.userAgents,{id:e,name:`Custom`,value:``}]}))},pt=e=>{a(t=>({...t,userAgents:t.userAgents.filter(t=>t.id!==e)}))},mt=async()=>{S(!0),b(null);try{let e=await ga();a(t=>{let n=new Set(t.browsers.map(e=>e.executablePath.toLowerCase())),r=e.filter(e=>!n.has(e.executablePath.toLowerCase()));return{...t,browsers:[...t.browsers,...r]}}),e.length===0&&T({key:`settings.noBrowsersDetected`})}catch(e){b(e instanceof Error?e.message:String(e))}finally{S(!1)}},ht=async()=>{ee(!0),T(null);try{let e=await li();T({key:`settings.registeredHttp`,params:{path:e.executablePath}}),te(await di())}catch(e){b(e instanceof Error?e.message:String(e))}finally{ee(!1)}},gt=async()=>{ee(!0),T(null);try{await ui(),T({key:`settings.unregistered`}),te(await di())}catch(e){b(e instanceof Error?e.message:String(e))}finally{ee(!1)}},_t=async()=>{ee(!0);try{await mi(),T({key:`settings.openedDefaultApps`})}catch(e){b(e instanceof Error?e.message:String(e))}finally{ee(!1)}},vt=async()=>{try{await _i()}catch(e){b(e instanceof Error?e.message:String(e))}},yt=async()=>{ce(!0),se(null),b(null);try{se(await bi())}catch(e){b(e instanceof Error?e.message:String(e))}finally{ce(!1)}},bt=async()=>{try{await va(vi)}catch(e){b(e instanceof Error?e.message:String(e))}},xt=async e=>{let t={...i,language:e};a(t),b(null);try{let e=await pa(t);Qe(e)}catch(e){b(e instanceof Error?e.message:String(e))}},St=async(e,t)=>{t(!0),b(null);try{return Xe(await e()),!0}catch(e){return b(e instanceof Error?e.message:String(e)),!1}finally{t(!1)}},Ct=async(e,t)=>{await St(()=>Na(e,t),Ce)&&(M(``),xe(``))},wt=e=>St(()=>Pa(e),me),Tt=(e,t)=>St(()=>Fa(e,t),me),Et=()=>St(()=>Ia(),me),Dt=async e=>{Oe(!0),b(null);try{Ee(await pi(e))}catch(e){b(e instanceof Error?e.message:String(e))}finally{Oe(!1)}},Ot=ke?.enabled??!1,kt=()=>{Me([]),Ie(!0),Ca()},At=()=>{Ie(!1),wa()},jt=(e,t)=>{Re({name:e,code:null,error:null}),Ta(e,t)},Mt=()=>{Ve.trim()&&jt(Ve.trim(),Ue)},Nt=e=>{ze&&(Ea(ze.requestId,e),Be(null))},Pt=e=>async()=>{let t=(Ge[e]??``).trim();if(t)try{await ka(e,t),b(null),Ke(t=>({...t,[e]:``}))}catch(e){b(e instanceof Error?e.message:String(e))}};return(0,L.jsxs)(Mr,{$maxWidth:964,children:[(0,L.jsxs)(ao,{children:[(0,L.jsxs)(oo,{children:[(0,L.jsxs)(io,{$visible:it,children:[(0,L.jsx)(uo,{}),(0,L.jsx)(`span`,{children:e(`settings.unsaved`)})]}),y&&(0,L.jsxs)(ro,{children:[(0,L.jsx)(br,{size:16}),(0,L.jsx)(`span`,{children:e(y)})]}),(0,L.jsxs)(lo,{id:Zo(`settings.network`),children:[(0,L.jsx)(Fr,{children:e(`settings.network`)}),(0,L.jsxs)(Ka,{children:[(0,L.jsxs)(qa,{children:[(0,L.jsx)(Ja,{children:e(`settings.requestTimeout`)}),(0,L.jsx)(V,{children:e(`settings.requestTimeoutDescription`)})]}),(0,L.jsxs)(Ya,{children:[(0,L.jsx)(`input`,{type:`range`,min:`1000`,max:`15000`,step:`500`,disabled:P,value:i.requestTimeoutMs,onChange:e=>$e({requestTimeoutMs:Number(e.target.value)})}),(0,L.jsxs)(`span`,{children:[i.requestTimeoutMs/1e3,`s`]})]})]}),(0,L.jsxs)(Ka,{children:[(0,L.jsxs)(qa,{children:[(0,L.jsx)(Ja,{children:e(`settings.language`)}),(0,L.jsx)(V,{children:e(`settings.languageDescription`)})]}),(0,L.jsx)(oa,{variant:`form`,disabled:P||u.length===0,value:i.language,options:u.map(e=>({value:e,label:Yo[e]??e})),onChange:xt})]}),(0,L.jsxs)(Ka,{children:[(0,L.jsxs)(qa,{children:[(0,L.jsx)(Ja,{children:e(`settings.borderlessPopup`)}),(0,L.jsx)(V,{children:e(`settings.borderlessPopupDescription`)})]}),(0,L.jsx)(Co,{disabled:P,checked:i.borderlessPopup,onChange:e=>$e({borderlessPopup:e.target.checked})})]}),(0,L.jsxs)(Ka,{children:[(0,L.jsxs)(qa,{children:[(0,L.jsx)(Ja,{children:e(`settings.autoStripTracking`)}),(0,L.jsx)(V,{children:e(`settings.autoStripTrackingDescription`)})]}),(0,L.jsx)(Co,{disabled:P,checked:i.autoStripTrackingParams,onChange:e=>$e({autoStripTrackingParams:e.target.checked})})]}),(0,L.jsxs)(Ka,{children:[(0,L.jsxs)(qa,{children:[(0,L.jsx)(Ja,{children:e(`settings.showUrlButton`)}),(0,L.jsx)(V,{children:e(`settings.showUrlButtonDescription`)})]}),(0,L.jsx)(Co,{disabled:P,checked:i.showUrlButton,onChange:e=>$e({showUrlButton:e.target.checked})})]})]}),(0,L.jsxs)(lo,{id:Zo(`settings.userAgent`),children:[(0,L.jsx)(Fr,{children:e(`settings.userAgent`)}),(0,L.jsx)(qa,{children:(0,L.jsx)(V,{children:e(`settings.userAgentDescription`)})}),(0,L.jsxs)(Ka,{children:[(0,L.jsx)(qa,{children:(0,L.jsx)(Ja,{children:e(`settings.userAgentDefault`)})}),(0,L.jsx)(oa,{variant:`form`,disabled:P||i.userAgents.length===0,value:i.selectedUserAgentId,options:i.userAgents.map(e=>({value:e.id,label:e.name})),onChange:e=>$e({selectedUserAgentId:e})})]}),(0,L.jsx)(mo,{children:i.userAgents.map(t=>(0,L.jsxs)(ho,{children:[(0,L.jsx)(go,{className:`name`,placeholder:e(`settings.browserNamePlaceholder`),disabled:P,value:t.name,onChange:e=>dt(t.id,{name:e.target.value})}),(0,L.jsx)(go,{className:`path`,placeholder:e(`settings.userAgentValuePlaceholder`),disabled:P,value:t.value,onChange:e=>dt(t.id,{value:e.target.value})}),(0,L.jsx)(vo,{type:`button`,title:e(`settings.removeUserAgent`),onClick:()=>pt(t.id),children:(0,L.jsx)(Dr,{size:16})})]},t.id))}),(0,L.jsx)(yo,{children:(0,L.jsx)(H,{type:`button`,onClick:ft,disabled:P,children:e(`settings.addUserAgent`)})})]}),(0,L.jsxs)(lo,{id:Zo(`settings.browsers`),children:[(0,L.jsx)(Fr,{children:e(`settings.browsers`)}),(0,L.jsx)(qa,{children:(0,L.jsx)(V,{children:e(`settings.browsersDescription`)})}),(0,L.jsx)(mo,{children:i.browsers.map(t=>(0,L.jsxs)(ho,{children:[(0,L.jsx)(go,{className:`name`,placeholder:e(`settings.browserNamePlaceholder`),disabled:P,value:t.name,onChange:e=>ct(t.id,{name:e.target.value})}),(0,L.jsx)(go,{className:`path`,placeholder:e(`settings.browserPathPlaceholder`),disabled:P,value:t.executablePath,onChange:e=>ct(t.id,{executablePath:e.target.value})}),(0,L.jsx)(go,{className:`args`,placeholder:e(`settings.browserArgsPlaceholder`),title:e(`settings.browserArgsTitle`),disabled:P,value:t.arguments,onChange:e=>ct(t.id,{arguments:e.target.value})}),(0,L.jsx)(vo,{type:`button`,title:e(`settings.removeBrowser`),onClick:()=>ut(t.id),children:(0,L.jsx)(Dr,{size:16})})]},t.id))}),(0,L.jsxs)(yo,{children:[(0,L.jsx)(H,{type:`button`,onClick:lt,disabled:P,children:e(`settings.addBrowser`)}),(0,L.jsx)(H,{type:`button`,onClick:mt,disabled:P||x,children:e(x?`settings.detecting`:`settings.detectInstalled`)})]})]}),(0,L.jsxs)(lo,{id:Zo(`settings.forwarding`),children:[(0,L.jsx)(Fr,{children:e(`settings.forwarding`)}),(0,L.jsx)(qa,{children:(0,L.jsx)(V,{children:e(`settings.forwardingDescription`)})}),(0,L.jsxs)(Ka,{children:[(0,L.jsxs)(qa,{children:[(0,L.jsx)(Ja,{children:e(`settings.forwardingEnabled`)}),(0,L.jsx)(V,{children:e(`settings.forwardingEnabledDescription`)})]}),(0,L.jsx)(Co,{disabled:P,checked:i.forwardingEnabled,onChange:e=>$e({forwardingEnabled:e.target.checked})})]}),i.forwardingEnabled&&(0,L.jsxs)(L.Fragment,{children:[(0,L.jsxs)(Ka,{children:[(0,L.jsxs)(qa,{children:[(0,L.jsx)(Ja,{children:e(`settings.deviceName`)}),(0,L.jsx)(V,{children:e(`settings.deviceNameDescription`)})]}),(0,L.jsx)(go,{className:`name`,disabled:P,value:i.deviceName,onChange:e=>$e({deviceName:e.target.value})})]}),(0,L.jsxs)(Ka,{children:[(0,L.jsxs)(qa,{children:[(0,L.jsx)(Ja,{children:e(`settings.forwardPort`)}),(0,L.jsx)(V,{children:e(`settings.forwardPortDescription`)})]}),(0,L.jsx)(go,{className:`port`,type:`number`,disabled:P,value:String(i.forwardPort),onChange:e=>$e({forwardPort:Number(e.target.value)||0})})]}),ke&&ke.addresses.length>0&&(0,L.jsx)(bo,{children:e(`settings.forwardAddresses`,{port:i.forwardPort,addresses:ke.addresses.join(`, `)})}),ke&&(0,L.jsx)(bo,{children:e(`settings.forwardKey`,{key:(e=>e?`${e.slice(0,16)}…`:`—`)(ke.publicKey)})}),ke?.enabled&&!ke.listening&&(0,L.jsxs)(xo,{children:[(0,L.jsx)(br,{size:14}),(0,L.jsx)(`span`,{children:e(`settings.forwardNotListening`)})]})]}),i.forwardingEnabled!==Ot&&(0,L.jsx)(bo,{children:e(`settings.forwardSaveFirst`)})]}),(0,L.jsxs)(lo,{id:Zo(`settings.forwardDevices`),children:[(0,L.jsx)(Fr,{children:e(`settings.forwardDevices`)}),(0,L.jsxs)(qa,{children:[(0,L.jsx)(V,{children:e(`settings.forwardDevicesDescription`)}),(0,L.jsx)(V,{children:e(`settings.forwardAddressesHint`)})]}),i.devices.length===0?(0,L.jsx)(bo,{children:e(`settings.forwardDevicesEmpty`)}):(0,L.jsx)(wo,{children:i.devices.map(t=>(0,L.jsxs)(To,{children:[(0,L.jsxs)(Eo,{children:[(0,L.jsxs)(Oo,{children:[(0,L.jsx)(ko,{$online:Ne.has(t.id),title:e(Ne.has(t.id)?`settings.deviceOnline`:`settings.deviceOffline`)}),(0,L.jsx)(Do,{children:t.name||t.host})]}),(0,L.jsxs)(Ao,{children:[t.host,`:`,t.port]}),(t.addresses??[]).map(n=>(0,L.jsxs)(jo,{children:[(0,L.jsxs)(`span`,{children:[`+ `,n,`:`,t.port]}),(0,L.jsx)(vo,{type:`button`,title:e(`settings.removeAddress`),onClick:()=>Aa(t.id,n),children:(0,L.jsx)(Dr,{size:14})})]},n)),(0,L.jsxs)(Mo,{children:[(0,L.jsx)(go,{className:`path`,placeholder:e(`settings.deviceAddressPlaceholder`),disabled:!Ot,value:Ge[t.id]??``,onChange:e=>Ke(n=>({...n,[t.id]:e.target.value}))}),(0,L.jsx)(H,{type:`button`,disabled:!Ot||!(Ge[t.id]??``).trim(),onClick:Pt(t.id),children:e(`settings.addAddress`)})]})]}),(0,L.jsx)(Fo,{children:(0,L.jsx)(vo,{type:`button`,title:e(`settings.removeDevice`),onClick:()=>Oa(t.id),children:(0,L.jsx)(Dr,{size:16})})})]},t.id))}),(0,L.jsx)(yo,{children:(0,L.jsx)(H,{type:`button`,disabled:!Ot,onClick:kt,children:e(`settings.forwardSearch`)})}),(0,L.jsxs)(Ka,{children:[(0,L.jsxs)(qa,{children:[(0,L.jsx)(Ja,{children:e(`settings.forwardManual`)}),(0,L.jsx)(V,{children:e(`settings.forwardManualDescription`)})]}),(0,L.jsxs)(yo,{children:[(0,L.jsx)(go,{className:`path`,placeholder:e(`settings.deviceHostPlaceholder`),disabled:!Ot,value:Ve,onChange:e=>He(e.target.value)}),(0,L.jsx)(go,{className:`port`,type:`number`,disabled:!Ot,value:String(Ue),onChange:e=>We(Number(e.target.value)||0)}),(0,L.jsx)(H,{type:`button`,disabled:!Ot||!Ve.trim(),onClick:Mt,children:e(`settings.forwardPair`)})]})]})]}),(0,L.jsxs)(lo,{id:Zo(`settings.systemIntegration`),children:[(0,L.jsx)(Fr,{children:e(`settings.systemIntegration`)}),(0,L.jsx)(qa,{children:(0,L.jsx)(V,{children:e(ne===`windows`?`settings.systemIntegrationDescription`:`settings.systemIntegrationDescriptionLinux`)})}),(0,L.jsxs)(yo,{children:[(0,L.jsxs)(H,{type:`button`,onClick:ht,disabled:C,children:[(0,L.jsx)(pr,{size:15}),e(`settings.registerHttp`)]}),ne===`windows`&&(0,L.jsx)(H,{type:`button`,onClick:_t,disabled:C,children:e(`settings.openDefaultApps`)}),(0,L.jsxs)(_o,{type:`button`,onClick:gt,disabled:C,children:[(0,L.jsx)(Dr,{size:15}),e(`settings.unregister`)]})]}),E&&(0,L.jsx)(bo,{children:e(`settings.protocolStatus`,{isDefault:E.isDefault&&E.pathMatches?e(`settings.yes`):e(`settings.no`),scheme:E.customSchemeRegistered?e(`settings.yes`):e(`settings.no`)})}),E?.isDefault&&!E.pathMatches&&(0,L.jsxs)(xo,{children:[(0,L.jsx)(br,{size:14}),(0,L.jsx)(`span`,{children:e(`settings.pathMismatch`,{path:E.registeredPath??`?`})})]}),w&&(0,L.jsx)(bo,{children:e(w.key,w.params)})]}),(0,L.jsxs)(lo,{id:Zo(`settings.autoRedirect`),children:[(0,L.jsx)(Fr,{children:e(`settings.autoRedirect`)}),(0,L.jsx)(qa,{children:(0,L.jsx)(V,{children:e(`settings.autoRedirectDescription`)})}),i.autoRedirectHosts.length===0?(0,L.jsx)(bo,{children:e(`settings.autoRedirectEmpty`)}):(0,L.jsx)(wo,{children:i.autoRedirectHosts.map(t=>(0,L.jsxs)(To,{children:[(0,L.jsx)(Eo,{children:(0,L.jsx)(Do,{children:t})}),(0,L.jsx)(Fo,{children:(0,L.jsx)(vo,{type:`button`,disabled:P,title:e(`settings.removeAutoRedirect`),onClick:()=>st(t),children:(0,L.jsx)(Dr,{size:16})})})]},t))}),(0,L.jsxs)(yo,{children:[(0,L.jsx)(go,{className:`name`,disabled:P,placeholder:e(`settings.autoRedirectPlaceholder`),value:qe,onChange:e=>Je(e.target.value),onKeyDown:e=>{e.key===`Enter`&&(e.preventDefault(),ot())}}),(0,L.jsx)(H,{type:`button`,disabled:P||qe.trim().length===0,onClick:ot,children:e(`settings.addAutoRedirect`)})]})]}),(0,L.jsxs)(lo,{id:Zo(`settings.filterLists`),children:[(0,L.jsx)(Fr,{children:e(`settings.filterLists`)}),(0,L.jsx)(qa,{children:(0,L.jsx)(V,{children:e(`settings.filterListsDescription`,{count:de})})}),(0,L.jsxs)(Ka,{children:[(0,L.jsxs)(qa,{children:[(0,L.jsx)(Ja,{children:e(`settings.filterAutoUpdate`)}),(0,L.jsx)(V,{children:e(`settings.filterAutoUpdateDescription`)})]}),(0,L.jsx)(Co,{disabled:P,checked:i.filterAutoUpdate,onChange:e=>$e({filterAutoUpdate:e.target.checked})})]}),(0,L.jsxs)(Ka,{children:[(0,L.jsxs)(qa,{children:[(0,L.jsx)(Ja,{children:e(`settings.filterAutoUpdateInterval`)}),(0,L.jsx)(V,{children:e(`settings.filterAutoUpdateIntervalDescription`)})]}),(0,L.jsx)(go,{className:`port`,type:`number`,min:-1,max:10080,disabled:P||!i.filterAutoUpdate,value:he??String(i.filterAutoUpdateMinutes),onChange:e=>{let t=e.target.value;ge(t);let n=Number(t);t.trim().length>0&&Number.isInteger(n)&&$e({filterAutoUpdateMinutes:n})},onBlur:()=>ge(null)})]}),i.filterAutoUpdate&&i.filterAutoUpdateMinutes===-1&&(0,L.jsx)(bo,{children:e(`settings.filterAutoUpdateTimerOff`)}),le.length===0?(0,L.jsx)(bo,{children:e(`settings.filterListsEmpty`)}):(0,L.jsx)(wo,{children:le.map(n=>(0,L.jsxs)(To,{children:[(0,L.jsxs)(Eo,{children:[(0,L.jsx)(Do,{children:n.name}),(0,L.jsx)(Ao,{children:n.url}),(0,L.jsxs)(No,{children:[(0,L.jsx)(`span`,{children:e(`settings.filterRules`,{count:n.ruleCount})}),(0,L.jsx)(`span`,{children:n.lastUpdated?e(`settings.filterUpdated`,{date:new Date(n.lastUpdated).toLocaleString(t)}):e(`settings.filterNeverUpdated`)})]}),n.error&&(0,L.jsxs)(Po,{children:[(0,L.jsx)(br,{size:13}),(0,L.jsx)(`span`,{children:e(n.error)})]})]}),(0,L.jsxs)(Fo,{children:[(0,L.jsx)(Lo,{type:`button`,$on:n.enabled,disabled:pe,"aria-pressed":n.enabled,title:e(n.enabled?`settings.filterDisable`:`settings.filterEnable`),onClick:()=>Tt(n.id,!n.enabled)}),(0,L.jsx)(vo,{type:`button`,disabled:pe,title:e(`settings.removeFilterList`),onClick:()=>wt(n.id),children:(0,L.jsx)(Dr,{size:16})})]})]},n.id))}),(0,L.jsxs)(yo,{children:[(0,L.jsx)(H,{type:`button`,disabled:pe,onClick:()=>A(!0),children:e(`settings.addFilterList`)}),(0,L.jsx)(H,{type:`button`,disabled:pe||le.length===0,onClick:Et,children:e(pe?`settings.filterUpdating`:`settings.checkFilterUpdates`)})]})]}),(0,L.jsxs)(lo,{id:Zo(`settings.startup`),children:[(0,L.jsx)(Fr,{children:e(`settings.startup`)}),(0,L.jsx)(qa,{children:(0,L.jsx)(V,{children:e(`settings.startupDescription`)})}),Te?.supported&&(0,L.jsxs)(Ka,{children:[(0,L.jsxs)(qa,{children:[(0,L.jsx)(Ja,{children:e(`settings.startWithSession`)}),(0,L.jsx)(V,{children:e(`settings.startWithSessionDescription`)})]}),(0,L.jsx)(Co,{disabled:De,checked:Te.enabled,onChange:e=>Dt(e.target.checked)})]}),(0,L.jsxs)(Ka,{children:[(0,L.jsxs)(qa,{children:[(0,L.jsx)(Ja,{children:e(`settings.hideOnLaunch`)}),(0,L.jsx)(V,{children:e(`settings.hideOnLaunchDescription`)})]}),(0,L.jsx)(Co,{disabled:P,checked:i.hideOnLaunch,onChange:e=>$e({hideOnLaunch:e.target.checked})})]})]}),(0,L.jsxs)(lo,{id:Zo(`settings.about`),children:[(0,L.jsx)(Fr,{children:e(`settings.about`)}),(0,L.jsx)(qa,{children:(0,L.jsx)(V,{children:e(`settings.aboutDescription`,{version:D||`…`})})}),(0,L.jsxs)(yo,{children:[(0,L.jsx)(H,{type:`button`,disabled:k,onClick:yt,children:e(k?`settings.updateChecking`:`settings.checkUpdates`)}),O?.available&&(0,L.jsx)(H,{type:`button`,onClick:bt,children:e(`settings.openRelease`)}),(0,L.jsx)(H,{type:`button`,onClick:vt,children:e(`settings.openLogs`)})]}),O&&(O.available?(0,L.jsxs)(xo,{children:[(0,L.jsx)(br,{size:14}),(0,L.jsx)(`span`,{children:e(`settings.updateAvailable`,{version:O.latest})})]}):(0,L.jsx)(bo,{children:e(`settings.updateCurrent`,{version:O.current})})),ae&&(0,L.jsxs)(fo,{children:[(0,L.jsx)(`span`,{children:e(`settings.logsLocation`)}),(0,L.jsx)(`code`,{children:ae})]})]})]}),(0,L.jsx)(so,{children:Xo.map(t=>(0,L.jsx)(co,{$active:n===Zo(t),onClick:()=>Ye(Zo(t)),type:`button`,children:e(t)},t))})]}),(0,L.jsxs)(Xa,{children:[(0,L.jsx)(Qa,{onClick:tt,disabled:P,children:e(f?`settings.loading`:m?`settings.saving`:`settings.save`)}),(0,L.jsx)(to,{$visible:it,type:`button`,onClick:nt,disabled:P,children:e(`settings.discard`)}),(0,L.jsx)(eo,{onClick:rt,disabled:P,children:e(`settings.reset`)}),g&&(0,L.jsxs)(no,{children:[(0,L.jsx)(yr,{size:16}),(0,L.jsx)(`span`,{children:e(`settings.saved`)})]})]}),(0,L.jsxs)(fo,{children:[(0,L.jsx)(`span`,{children:e(`settings.fileInfo`)}),(0,L.jsx)(`code`,{children:c||`...`})]}),(0,L.jsx)(po,{type:`button`,onClick:()=>N(!0),children:e(`attribution.title`)}),we&&(0,L.jsx)(_.Suspense,{fallback:null,children:(0,L.jsx)(Ga,{onClose:()=>N(!1)})}),_e&&(0,L.jsx)(Ro,{onClick:()=>!Se&&A(!1),children:(0,L.jsxs)(zo,{onClick:e=>e.stopPropagation(),children:[(0,L.jsx)(Bo,{children:e(`settings.filterAddTitle`)}),(0,L.jsxs)(U,{children:[(0,L.jsx)(W,{type:`button`,$active:ve===`catalog`,onClick:()=>ye(`catalog`),children:e(`settings.filterAddFromCatalog`)}),(0,L.jsx)(W,{type:`button`,$active:ve===`custom`,onClick:()=>ye(`custom`),children:e(`settings.filterAddCustom`)})]}),ve===`catalog`?(0,L.jsx)(Vo,{children:Ra.map(t=>(0,L.jsxs)(Ho,{children:[(0,L.jsxs)(Uo,{children:[(0,L.jsx)(Wo,{children:t.name}),Ze(t.url)?(0,L.jsxs)(Io,{children:[(0,L.jsx)(yr,{size:14}),e(`settings.filterAdded`)]}):(0,L.jsx)(H,{type:`button`,disabled:Se,onClick:()=>Ct(t.name,t.url),children:e(Se?`settings.filterAdding`:`settings.filterAdd`)})]}),(0,L.jsx)(Go,{children:e(t.descriptionKey)}),(0,L.jsx)(Ao,{children:t.url})]},t.url))}):(0,L.jsxs)(L.Fragment,{children:[(0,L.jsxs)(qo,{children:[e(`settings.filterName`),(0,L.jsx)(Jo,{value:j,placeholder:e(`settings.filterNamePlaceholder`),onChange:e=>M(e.target.value)})]}),(0,L.jsxs)(qo,{children:[e(`settings.filterUrl`),(0,L.jsx)(Jo,{value:be,placeholder:e(`settings.filterUrlPlaceholder`),onChange:e=>xe(e.target.value)})]}),(0,L.jsx)(yo,{children:Ze(be)?(0,L.jsxs)(Io,{children:[(0,L.jsx)(yr,{size:14}),e(`settings.filterAdded`)]}):(0,L.jsx)(H,{type:`button`,disabled:Se||!j.trim()||!be.trim(),onClick:()=>Ct(j,be),children:e(Se?`settings.filterAdding`:`settings.filterAdd`)})})]}),(0,L.jsxs)(Ko,{children:[(0,L.jsx)(`strong`,{children:e(`settings.filterFormatTitle`)}),(0,L.jsx)(`span`,{children:e(`settings.filterFormatBody`)})]}),(0,L.jsx)(yo,{children:(0,L.jsx)(H,{type:`button`,disabled:Se,onClick:()=>A(!1),children:e(`settings.filterCancel`)})})]})}),Fe&&(0,L.jsx)(Ro,{onClick:At,children:(0,L.jsxs)(zo,{onClick:e=>e.stopPropagation(),children:[(0,L.jsx)(Bo,{children:e(`settings.forwardSearchTitle`)}),(0,L.jsx)(V,{children:e(`settings.forwardSearchDescription`)}),je.length===0?(0,L.jsx)(bo,{children:e(`settings.forwardSearching`)}):(0,L.jsx)(Vo,{children:je.map(t=>(0,L.jsxs)(Ho,{children:[(0,L.jsxs)(Uo,{children:[(0,L.jsx)(Wo,{children:t.name||t.host}),(0,L.jsx)(H,{type:`button`,onClick:()=>jt(t.host,t.port),children:e(`settings.forwardPair`)})]}),(0,L.jsxs)(Ao,{children:[t.host,`:`,t.port]})]},t.id))}),(0,L.jsx)(yo,{children:(0,L.jsx)(H,{type:`button`,onClick:At,children:e(`settings.filterCancel`)})})]})}),Le&&(0,L.jsx)(Ro,{children:(0,L.jsxs)(zo,{children:[(0,L.jsx)(Bo,{children:e(`settings.forwardPairingTitle`,{name:Le.name})}),Le.error?(0,L.jsxs)(ro,{children:[(0,L.jsx)(br,{size:16}),(0,L.jsx)(`span`,{children:e(Le.error)})]}):Le.code?(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(V,{children:e(`settings.forwardPairingCodeHint`)}),(0,L.jsx)(So,{children:Le.code}),(0,L.jsx)(bo,{children:e(`settings.forwardPairingWaiting`)})]}):(0,L.jsx)(bo,{children:e(`settings.forwardPairingDone`)}),(0,L.jsx)(yo,{children:(0,L.jsx)(H,{type:`button`,onClick:()=>Re(null),children:e(`settings.filterCancel`)})})]})}),ze&&(0,L.jsx)(Ro,{children:(0,L.jsxs)(zo,{children:[(0,L.jsx)(Bo,{children:e(`settings.forwardIncomingTitle`)}),(0,L.jsx)(V,{children:e(`settings.forwardIncomingDescription`,{name:ze.deviceName})}),(0,L.jsx)(V,{children:e(`settings.forwardPairingCodeHint`)}),(0,L.jsx)(So,{children:ze.code}),(0,L.jsxs)(yo,{children:[(0,L.jsx)(_o,{type:`button`,onClick:()=>Nt(!1),children:e(`settings.forwardReject`)}),(0,L.jsx)(Qa,{type:`button`,onClick:()=>Nt(!0),children:e(`settings.forwardAccept`)})]})]})})]})},$o=c(o(((e,t)=>{var n=function(e){var t=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,n=0,r={},i={manual:e.Prism&&e.Prism.manual,disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,util:{encode:function e(t){return t instanceof a?new a(t.type,e(t.content),t.alias):Array.isArray(t)?t.map(e):t.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/\u00a0/g,` `)},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function e(t,n){n||={};var r,a;switch(i.util.type(t)){case`Object`:if(a=i.util.objId(t),n[a])return n[a];for(var o in r={},n[a]=r,t)t.hasOwnProperty(o)&&(r[o]=e(t[o],n));return r;case`Array`:return a=i.util.objId(t),n[a]?n[a]:(r=[],n[a]=r,t.forEach(function(t,i){r[i]=e(t,n)}),r);default:return t}},getLanguage:function(e){for(;e;){var n=t.exec(e.className);if(n)return n[1].toLowerCase();e=e.parentElement}return`none`},setLanguage:function(e,n){e.className=e.className.replace(RegExp(t,`gi`),``),e.classList.add(`language-`+n)},currentScript:function(){if(typeof document>`u`)return null;if(document.currentScript&&document.currentScript.tagName===`SCRIPT`)return document.currentScript;try{throw Error()}catch(r){var e=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack)||[])[1];if(e){var t=document.getElementsByTagName(`script`);for(var n in t)if(t[n].src==e)return t[n]}return null}},isActive:function(e,t,n){for(var r=`no-`+t;e;){var i=e.classList;if(i.contains(t))return!0;if(i.contains(r))return!1;e=e.parentElement}return!!n}},languages:{plain:r,plaintext:r,text:r,txt:r,extend:function(e,t){var n=i.util.clone(i.languages[e]);for(var r in t)n[r]=t[r];return n},insertBefore:function(e,t,n,r){r||=i.languages;var a=r[e],o={};for(var s in a)if(a.hasOwnProperty(s)){if(s==t)for(var c in n)n.hasOwnProperty(c)&&(o[c]=n[c]);n.hasOwnProperty(s)||(o[s]=a[s])}var l=r[e];return r[e]=o,i.languages.DFS(i.languages,function(t,n){n===l&&t!=e&&(this[t]=o)}),o},DFS:function e(t,n,r,a){a||={};var o=i.util.objId;for(var s in t)if(t.hasOwnProperty(s)){n.call(t,s,t[s],r||s);var c=t[s],l=i.util.type(c);l===`Object`&&!a[o(c)]?(a[o(c)]=!0,e(c,n,null,a)):l===`Array`&&!a[o(c)]&&(a[o(c)]=!0,e(c,n,s,a))}}},plugins:{},highlightAll:function(e,t){i.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,n){var r={callback:n,container:e,selector:`code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code`};i.hooks.run(`before-highlightall`,r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),i.hooks.run(`before-all-elements-highlight`,r);for(var a=0,o;o=r.elements[a++];)i.highlightElement(o,t===!0,r.callback)},highlightElement:function(t,n,r){var a=i.util.getLanguage(t),o=i.languages[a];i.util.setLanguage(t,a);var s=t.parentElement;s&&s.nodeName.toLowerCase()===`pre`&&i.util.setLanguage(s,a);var c={element:t,language:a,grammar:o,code:t.textContent};function l(e){c.highlightedCode=e,i.hooks.run(`before-insert`,c),c.element.innerHTML=c.highlightedCode,i.hooks.run(`after-highlight`,c),i.hooks.run(`complete`,c),r&&r.call(c.element)}if(i.hooks.run(`before-sanity-check`,c),s=c.element.parentElement,s&&s.nodeName.toLowerCase()===`pre`&&!s.hasAttribute(`tabindex`)&&s.setAttribute(`tabindex`,`0`),!c.code)i.hooks.run(`complete`,c),r&&r.call(c.element);else if(i.hooks.run(`before-highlight`,c),!c.grammar)l(i.util.encode(c.code));else if(n&&e.Worker){var u=new Worker(i.filename);u.onmessage=function(e){l(e.data)},u.postMessage(JSON.stringify({language:c.language,code:c.code,immediateClose:!0}))}else l(i.highlight(c.code,c.grammar,c.language))},highlight:function(e,t,n){var r={code:e,grammar:t,language:n};if(i.hooks.run(`before-tokenize`,r),!r.grammar)throw Error(`The language "`+r.language+`" has no grammar.`);return r.tokens=i.tokenize(r.code,r.grammar),i.hooks.run(`after-tokenize`,r),a.stringify(i.util.encode(r.tokens),r.language)},tokenize:function(e,t){var n=t.rest;if(n){for(var r in n)t[r]=n[r];delete t.rest}var i=new c;return l(i,i.head,e),s(e,i,t,i.head,0),d(i)},hooks:{all:{},add:function(e,t){var n=i.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=i.hooks.all[e];if(n&&n.length)for(var r=0,a;a=n[r++];)a(t)}},Token:a};e.Prism=i;function a(e,t,n,r){this.type=e,this.content=t,this.alias=n,this.length=(r||``).length|0}a.stringify=function e(t,n){if(typeof t==`string`)return t;if(Array.isArray(t)){var r=``;return t.forEach(function(t){r+=e(t,n)}),r}var a={type:t.type,content:e(t.content,n),tag:`span`,classes:[`token`,t.type],attributes:{},language:n},o=t.alias;o&&(Array.isArray(o)?Array.prototype.push.apply(a.classes,o):a.classes.push(o)),i.hooks.run(`wrap`,a);var s=``;for(var c in a.attributes)s+=` `+c+`="`+(a.attributes[c]||``).replace(/"/g,`&quot;`)+`"`;return`<`+a.tag+` class="`+a.classes.join(` `)+`"`+s+`>`+a.content+`</`+a.tag+`>`};function o(e,t,n,r){e.lastIndex=t;var i=e.exec(n);if(i&&r&&i[1]){var a=i[1].length;i.index+=a,i[0]=i[0].slice(a)}return i}function s(e,t,n,r,c,d){for(var f in n)if(n.hasOwnProperty(f)&&n[f]){var p=n[f];p=Array.isArray(p)?p:[p];for(var m=0;m<p.length;++m){if(d&&d.cause==f+`,`+m)return;var h=p[m],g=h.inside,_=!!h.lookbehind,v=!!h.greedy,y=h.alias;if(v&&!h.pattern.global){var b=h.pattern.toString().match(/[imsuy]*$/)[0];h.pattern=RegExp(h.pattern.source,b+`g`)}for(var x=h.pattern||h,S=r.next,C=c;S!==t.tail&&!(d&&C>=d.reach);C+=S.value.length,S=S.next){var ee=S.value;if(t.length>e.length)return;if(!(ee instanceof a)){var w=1,T;if(v){if(T=o(x,C,e,_),!T||T.index>=e.length)break;var E=T.index,te=T.index+T[0].length,ne=C;for(ne+=S.value.length;E>=ne;)S=S.next,ne+=S.value.length;if(ne-=S.value.length,C=ne,S.value instanceof a)continue;for(var re=S;re!==t.tail&&(ne<te||typeof re.value==`string`);re=re.next)w++,ne+=re.value.length;w--,ee=e.slice(C,ne),T.index-=C}else if(T=o(x,0,ee,_),!T)continue;var E=T.index,D=T[0],ie=ee.slice(0,E),ae=ee.slice(E+D.length),oe=C+ee.length;d&&oe>d.reach&&(d.reach=oe);var O=S.prev;ie&&(O=l(t,O,ie),C+=ie.length),u(t,O,w);var se=new a(f,g?i.tokenize(D,g):D,y,D);if(S=l(t,O,se),ae&&l(t,S,ae),w>1){var k={cause:f+`,`+m,reach:oe};s(e,t,n,S.prev,C,k),d&&k.reach>d.reach&&(d.reach=k.reach)}}}}}}function c(){var e={value:null,prev:null,next:null},t={value:null,prev:e,next:null};e.next=t,this.head=e,this.tail=t,this.length=0}function l(e,t,n){var r=t.next,i={value:n,prev:t,next:r};return t.next=i,r.prev=i,e.length++,i}function u(e,t,n){for(var r=t.next,i=0;i<n&&r!==e.tail;i++)r=r.next;t.next=r,r.prev=t,e.length-=i}function d(e){for(var t=[],n=e.head.next;n!==e.tail;)t.push(n.value),n=n.next;return t}if(!e.document)return e.addEventListener&&(i.disableWorkerMessageHandler||e.addEventListener(`message`,function(t){var n=JSON.parse(t.data),r=n.language,a=n.code,o=n.immediateClose;e.postMessage(i.highlight(a,i.languages[r],r)),o&&e.close()},!1)),i;var f=i.util.currentScript();f&&(i.filename=f.src,f.hasAttribute(`data-manual`)&&(i.manual=!0));function p(){i.manual||i.highlightAll()}if(!i.manual){var m=document.readyState;m===`loading`||m===`interactive`&&f&&f.defer?document.addEventListener(`DOMContentLoaded`,p):window.requestAnimationFrame?window.requestAnimationFrame(p):window.setTimeout(p,16)}return i}(typeof window<`u`?window:typeof WorkerGlobalScope<`u`&&self instanceof WorkerGlobalScope?self:{});t!==void 0&&t.exports&&(t.exports=n),typeof global<`u`&&(global.Prism=n),n.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:`attr-equals`},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:`named-entity`},/&#x?[\da-f]{1,8};/i]},n.languages.markup.tag.inside[`attr-value`].inside.entity=n.languages.markup.entity,n.languages.markup.doctype.inside[`internal-subset`].inside=n.languages.markup,n.hooks.add(`wrap`,function(e){e.type===`entity`&&(e.attributes.title=e.content.replace(/&amp;/,`&`))}),Object.defineProperty(n.languages.markup.tag,"addInlined",{value:function(e,t){var r={};r[`language-`+t]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:n.languages[t]},r.cdata=/^<!\[CDATA\[|\]\]>$/i;var i={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:r}};i[`language-`+t]={pattern:/[\s\S]+/,inside:n.languages[t]};var a={};a[e]={pattern:RegExp(`(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[\\s\\S])*?(?=<\\/__>)`.replace(/__/g,function(){return e}),`i`),lookbehind:!0,greedy:!0,inside:i},n.languages.insertBefore(`markup`,`cdata`,a)}}),Object.defineProperty(n.languages.markup.tag,"addAttribute",{value:function(e,t){n.languages.markup.tag.inside[`special-attr`].push({pattern:RegExp(`(^|["'\\s])(?:`+e+`)\\s*=\\s*(?:"[^"]*"|'[^']*'|[^\\s'">=]+(?=[\\s>]))`,`i`),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[t,`language-`+t],inside:n.languages[t]},punctuation:[{pattern:/^=/,alias:`attr-equals`},/"|'/]}}}})}}),n.languages.html=n.languages.markup,n.languages.mathml=n.languages.markup,n.languages.svg=n.languages.markup,n.languages.xml=n.languages.extend(`markup`,{}),n.languages.ssml=n.languages.xml,n.languages.atom=n.languages.xml,n.languages.rss=n.languages.xml,(function(e){var t=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp(`@[\\w-](?:[^;{\\s"']|\\s+(?!\\s)|`+t.source+`)*?(?:;|(?=\\s*\\{))`),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:`selector`},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp(`\\burl\\((?:`+t.source+`|(?:[^\\\\\\r\\n()"']|\\\\[\\s\\S])*)\\)`,`i`),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp(`^`+t.source+`$`),alias:`url`}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+t.source+`)*(?=\\s*\\{)`),lookbehind:!0},string:{pattern:t,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css;var n=e.languages.markup;n&&(n.tag.addInlined(`style`,`css`),n.tag.addAttribute(`style`,`css`))})(n),n.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},n.languages.javascript=n.languages.extend(`clike`,{"class-name":[n.languages.clike[`class-name`],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(`(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])`),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),n.languages.javascript[`class-name`][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,n.languages.insertBefore(`javascript`,`keyword`,{regex:{pattern:RegExp(`((?:^|[^$\\w\\xA0-\\uFFFF."'\\])\\s]|\\b(?:return|yield))\\s*)\\/(?:(?:\\[(?:[^\\]\\\\\\r\\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\\r\\n])+\\/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\\r\\n]|\\\\.|\\[(?:[^[\\]\\\\\\r\\n]|\\\\.|\\[(?:[^[\\]\\\\\\r\\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\\r\\n])+\\/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|\\/\\*(?:[^*]|\\*(?!\\/))*\\*\\/)*(?:$|[\\r\\n,.;:})\\]]|\\/\\/))`),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:`language-regex`,inside:n.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:`function`},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:n.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:n.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:n.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:n.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),n.languages.insertBefore(`javascript`,`string`,{hashbang:{pattern:/^#!.*/,greedy:!0,alias:`comment`},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:`string`},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:`punctuation`},rest:n.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:`property`}}),n.languages.insertBefore(`javascript`,`operator`,{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:`property`}}),n.languages.markup&&(n.languages.markup.tag.addInlined(`script`,`javascript`),n.languages.markup.tag.addAttribute(`on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)`,`javascript`)),n.languages.js=n.languages.javascript,(function(){if(n===void 0||typeof document>`u`)return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var e=`Loading…`,t=function(e,t){return`✖ Error `+e+` while fetching file: `+t},r=`✖ Error: File does not exist or is empty`,i={js:`javascript`,py:`python`,rb:`ruby`,ps1:`powershell`,psm1:`powershell`,sh:`bash`,bat:`batch`,h:`c`,tex:`latex`},a=`data-src-status`,o=`loading`,s=`loaded`,c=`failed`,l=`pre[data-src]:not([`+a+`="`+s+`"]):not([`+a+`="`+o+`"])`;function u(e,n,i){var a=new XMLHttpRequest;a.open(`GET`,e,!0),a.onreadystatechange=function(){a.readyState==4&&(a.status<400&&a.responseText?n(a.responseText):a.status>=400?i(t(a.status,a.statusText)):i(r))},a.send(null)}function d(e){var t=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(e||``);if(t){var n=Number(t[1]),r=t[2],i=t[3];return r?i?[n,Number(i)]:[n,void 0]:[n,n]}}n.hooks.add(`before-highlightall`,function(e){e.selector+=`, `+l}),n.hooks.add(`before-sanity-check`,function(t){var r=t.element;if(r.matches(l)){t.code=``,r.setAttribute(a,o);var f=r.appendChild(document.createElement(`CODE`));f.textContent=e;var p=r.getAttribute(`data-src`),m=t.language;if(m===`none`){var h=(/\.(\w+)$/.exec(p)||[,`none`])[1];m=i[h]||h}n.util.setLanguage(f,m),n.util.setLanguage(r,m);var g=n.plugins.autoloader;g&&g.loadLanguages(m),u(p,function(e){r.setAttribute(a,s);var t=d(r.getAttribute(`data-range`));if(t){var i=e.split(/\r\n?|\n/g),o=t[0],c=t[1]==null?i.length:t[1];o<0&&(o+=i.length),o=Math.max(0,Math.min(o-1,i.length)),c<0&&(c+=i.length),c=Math.max(0,Math.min(c,i.length)),e=i.slice(o,c).join(`
`),r.hasAttribute(`data-start`)||r.setAttribute(`data-start`,String(o+1))}f.textContent=e,n.highlightElement(f)},function(e){r.setAttribute(a,c),f.textContent=e})}}),n.plugins.fileHighlight={highlight:function(e){for(var t=(e||document).querySelectorAll(l),r=0,i;i=t[r++];)n.highlightElement(i)}};var f=!1;n.fileHighlight=function(){f||=(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),!0),n.plugins.fileHighlight.highlight.apply(this,arguments)}})()}))(),1);Prism.languages.lua={comment:/^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,string:{pattern:/(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[^z]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,greedy:!0},number:/\b0x[a-f\d]+(?:\.[a-f\d]*)?(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|(?:\.\d*)?(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,keyword:/\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,function:/(?!\d)\w+(?=\s*(?:[({]))/,operator:[/[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,{pattern:/(^|[^.])\.\.(?!\.)/,lookbehind:!0}],punctuation:/[\[\](){},;]|\.+|:+/};var es=I.div`
    position: relative;
    flex: 1;
    min-height: 0;
    overflow: hidden;
`,ts=Ln`
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
`,ns=I.pre`
    ${ts};
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
`,rs=I.textarea`
    ${ts};
    resize: none;
    overflow: auto;
    background: transparent;
    color: transparent;
    caret-color: #93c5fd;
    outline: none;

    &::selection {
        background: rgba(96, 165, 250, 0.3);
    }
`,is=({value:e,onChange:t})=>{let n=(0,_.useRef)(null),r=(0,_.useMemo)(()=>`${$o.default.highlight(e,$o.default.languages.lua,`lua`)}\n`,[e]);return(0,L.jsxs)(es,{children:[(0,L.jsx)(ns,{"aria-hidden":!0,dangerouslySetInnerHTML:{__html:r},ref:n}),(0,L.jsx)(rs,{autoComplete:`off`,autoCorrect:`off`,onChange:e=>t(e.target.value),onKeyDown:n=>{if(n.key!==`Tab`)return;n.preventDefault();let r=n.currentTarget,i=r.selectionStart,a=r.selectionEnd;t(`${e.slice(0,i)}    ${e.slice(a)}`),requestAnimationFrame(()=>r.setSelectionRange(i+4,i+4))},onScroll:e=>{let t=n.current;t&&(t.scrollTop=e.currentTarget.scrollTop,t.scrollLeft=e.currentTarget.scrollLeft)},spellCheck:!1,value:e,wrap:`off`})]})};async function G(e,t){try{let n=await R.request(e,t);return n.ok?null:n.error??`error.unknown`}catch(e){return e instanceof Error?e.message:String(e)}}async function as(){return R.available?await R.request(`scripts.list`):{scripts:[],directory:``}}async function os(e){return(await R.request(`scripts.read`,{name:e})).content}async function ss(e,t){return await G(`scripts.save`,{name:e,content:t})}async function cs(e){return await G(`scripts.create`,{name:e})}async function ls(e){return await G(`scripts.delete`,{name:e})}async function us(e,t){return await G(`scripts.rename`,{name:e,newName:t})}async function ds(){return await G(`scripts.import`)}async function fs(e){return await G(`scripts.download`,{url:e})}async function ps(e){return await G(`scripts.open`,{name:e})}async function ms(e,t,n){let r=await R.request(`scripts.test`,{name:e,url:t,content:n});return{url:r.url??t,error:r.error??null}}async function hs(){return R.available?(await R.request(`scripts.logs`)).entries:[]}async function gs(){await G(`scripts.clearLogs`)}var _s=e=>{let t=e.split(/[\\/]/).pop()??e;return/\.lua$/i.test(t)?t:`${t}.lua`},vs=()=>{let e=Jr(),[t,n]=(0,_.useState)([]),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(null),[s,c]=(0,_.useState)(``),[l,u]=(0,_.useState)(``),[d,f]=(0,_.useState)(null),[p,m]=(0,_.useState)(!1),[h,g]=(0,_.useState)(`idle`),[v,y]=(0,_.useState)(``),[b,x]=(0,_.useState)(!1),[S,C]=(0,_.useState)([]),[ee,w]=(0,_.useState)(``),[T,E]=(0,_.useState)(null),[te,ne]=(0,_.useState)(!1),[re,D]=(0,_.useState)(!1),[ie,ae]=(0,_.useState)(``),oe=(0,_.useRef)(null),O=(0,_.useRef)(async()=>void 0),se=(0,_.useRef)({name:null,dirty:!1}),k=s!==l,ce=a!==null&&!t.some(e=>e.name===a);(0,_.useEffect)(()=>{se.current={name:a,dirty:k}});let le=()=>{o(null),c(``),u(``),x(!1),E(null),D(!1)},ue=async e=>{f(null),x(!1),E(null),D(!1);try{let t=await os(e);o(e),c(t),u(t)}catch(e){f(e instanceof Error?e.message:String(e))}},de=async e=>{let t=await as();n(t.scripts),i(t.directory);let r=se.current.name,a=e??r,o=t.scripts.find(e=>e.name===a)?.name;if(o){o!==r&&await ue(o);return}if(r!==null&&se.current.dirty)return;let s=t.scripts[0];s?await ue(s.name):le()};(0,_.useEffect)(()=>(de(),hs().then(C).catch(()=>C([])),R.on(e=>{if(e.type===`scripts.log`){let t=e.data;t&&C(e=>[...e.slice(-199),t])}else e.type===`scripts.changed`&&de()})),[]),(0,_.useEffect)(()=>{let e=oe.current;e&&(e.scrollTop=e.scrollHeight)},[S.length]);let fe=async()=>{if(!a)return;m(!0),f(null);let e=await ss(a,s);m(!1),e?f(e):(u(s),await de())},pe=async()=>{let e=v.trim();if(e.length===0)return;let t=_s(e);m(!0),f(null);let n=await cs(t);m(!1),n?f(n):(g(`idle`),y(``),await de(t))},me=async()=>{let e=v.trim();if(e.length===0)return;m(!0),f(null);let t=await fs(e);m(!1),t?f(t):(g(`idle`),y(``),await de())},he=async()=>{if(!a)return;if(!b){x(!0);return}m(!0);let e=await ls(a);m(!1),e?f(e):(le(),await de())},ge=async()=>{m(!0),f(null);let e=await ds();m(!1),e&&f(e),await de()},_e=()=>{a&&(D(!0),ae(a))},A=async()=>{if(!a)return;let e=ie.trim(),t=e.length===0?``:_s(e);if(t.length===0||t===a){D(!1);return}m(!0),f(null);let n=await us(a,t);m(!1),n?f(n):(D(!1),o(t),se.current={name:t,dirty:se.current.dirty},await de(t))},ve=()=>void(h===`new`?pe():me()),ye=async()=>{if(!a)return;let e=await ps(a);e&&f(e)},j=async()=>{if(!a)return;let e=ee.trim();if(e.length!==0){ne(!0),f(null);try{E(await ms(a,e,s))}catch(e){f(e instanceof Error?e.message:String(e))}finally{ne(!1)}}};return(0,_.useEffect)(()=>{O.current=fe}),(0,_.useEffect)(()=>{let e=e=>{(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()===`s`&&(e.preventDefault(),O.current())};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[]),(0,L.jsxs)(ys,{$maxWidth:1180,children:[d&&(0,L.jsxs)(Ks,{children:[(0,L.jsx)(br,{size:16}),(0,L.jsx)(`span`,{children:e(d)})]}),(0,L.jsxs)(bs,{children:[(0,L.jsxs)(xs,{children:[(0,L.jsxs)(Ss,{children:[(0,L.jsx)(`span`,{children:e(`tabs.scripts.label`)}),(0,L.jsx)(Cs,{children:t.length}),(0,L.jsx)(ws,{}),(0,L.jsx)(Ts,{title:r,children:r.split(/[\\/]/).pop()})]}),(0,L.jsxs)(Es,{children:[t.length===0&&(0,L.jsx)($s,{children:e(`scripts.empty`)}),t.map(t=>(0,L.jsxs)(Ds,{$active:t.name===a,onClick:()=>void ue(t.name),title:t.name,type:`button`,children:[(0,L.jsx)(`span`,{children:t.name}),t.error&&(0,L.jsx)(Os,{title:e(t.error),children:(0,L.jsx)(br,{size:14})})]},t.name))]}),(0,L.jsx)(ks,{children:h===`idle`?(0,L.jsxs)(As,{children:[(0,L.jsxs)(ec,{disabled:p,onClick:()=>{g(`new`),y(``),f(null)},type:`button`,children:[(0,L.jsx)(Er,{size:16}),e(`scripts.new`)]}),(0,L.jsxs)(js,{children:[(0,L.jsx)(nc,{disabled:p,onClick:()=>void ge(),type:`button`,children:e(`scripts.import`)}),(0,L.jsx)(nc,{disabled:p,onClick:()=>{g(`download`),y(``),f(null)},type:`button`,children:e(`scripts.download`)})]})]}):(0,L.jsxs)(As,{children:[(0,L.jsx)(qs,{autoFocus:!0,onChange:e=>y(e.target.value),onKeyDown:e=>{e.key===`Enter`&&ve(),e.key===`Escape`&&g(`idle`)},placeholder:e(h===`new`?`scripts.namePlaceholder`:`scripts.downloadPlaceholder`),value:v}),(0,L.jsxs)(js,{children:[(0,L.jsx)(ec,{disabled:p||v.trim().length===0,onClick:ve,type:`button`,children:e(h===`new`?`scripts.create`:`scripts.download`)}),(0,L.jsx)(tc,{onClick:()=>g(`idle`),type:`button`,children:e(`scripts.cancel`)})]})]})})]}),(0,L.jsxs)(Ms,{children:[(0,L.jsx)(Ns,{children:a?(0,L.jsxs)(L.Fragment,{children:[(0,L.jsxs)(Ps,{children:[(0,L.jsx)(vr,{size:16}),re?(0,L.jsx)(Is,{autoFocus:!0,onBlur:()=>D(!1),onChange:e=>ae(e.target.value),onKeyDown:e=>{e.key===`Enter`&&A(),e.key===`Escape`&&D(!1)},spellCheck:!1,value:ie}):(0,L.jsx)(Fs,{children:a}),ce&&(0,L.jsx)(Ls,{title:e(`scripts.fileGone`),children:(0,L.jsx)(br,{size:14})}),k&&(0,L.jsx)(Rs,{title:e(`settings.unsaved`)}),(0,L.jsx)(tc,{disabled:p,onClick:_e,title:e(`scripts.rename`),type:`button`,children:(0,L.jsx)(jr,{size:15})}),(0,L.jsx)(tc,{disabled:p,onClick:()=>void ye(),title:e(`scripts.openExternal`),type:`button`,children:(0,L.jsx)(Ar,{size:15})}),(0,L.jsx)(tc,{disabled:!k||p,onClick:()=>void fe(),title:`Ctrl+S`,type:`button`,children:e(k?`scripts.save`:`scripts.saved`)}),(0,L.jsx)(rc,{$armed:b,disabled:p,onClick:()=>void he(),type:`button`,children:b?e(`scripts.deleteConfirm`):(0,L.jsx)(Dr,{size:15})})]}),(0,L.jsxs)(zs,{children:[(0,L.jsx)(Bs,{onChange:e=>w(e.target.value),onKeyDown:e=>{e.key===`Enter`&&j()},placeholder:e(`scripts.testPlaceholder`),spellCheck:!1,value:ee}),(0,L.jsxs)(ec,{disabled:te||p||ee.trim().length===0,onClick:()=>void j(),type:`button`,children:[(0,L.jsx)(Or,{size:14}),e(`scripts.test`)]})]}),T&&(0,L.jsx)(Vs,{$error:T.error!==null,children:T.error===null?(0,L.jsxs)(Hs,{children:[(0,L.jsx)(Us,{children:e(`scripts.testFinalUrl`)}),(0,L.jsx)(Ws,{children:T.url})]}):(0,L.jsx)(Ws,{$error:!0,children:T.error})}),(0,L.jsx)(is,{onChange:c,value:s})]}):(0,L.jsxs)(Gs,{children:[(0,L.jsx)(vr,{size:30}),(0,L.jsx)(`span`,{children:e(`scripts.noScript`)})]})}),(0,L.jsxs)(Js,{children:[(0,L.jsxs)(Ys,{children:[(0,L.jsx)(`span`,{children:e(`scripts.logs`)}),(0,L.jsx)(tc,{onClick:()=>void gs().then(()=>C([])),type:`button`,children:e(`scripts.clearLogs`)})]}),(0,L.jsxs)(Xs,{ref:oe,children:[S.length===0&&(0,L.jsx)($s,{children:e(`scripts.logsEmpty`)}),S.map((e,t)=>(0,L.jsxs)(Qs,{$error:e.level===`error`,children:[(0,L.jsx)(`time`,{children:e.time}),(0,L.jsx)(Zs,{children:e.script}),(0,L.jsx)(`span`,{children:e.message})]},`${e.time}-${t}`))]})]})]})]})]})},ys=I(Mr)`
    height: 100%;
    min-height: 420px;
    gap: 16px;
`,bs=I.div`
    display: flex;
    flex: 1;
    gap: 16px;
    min-height: 0;
`,xs=I.section`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 280px;
    flex-shrink: 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.75);
    overflow: hidden;
`,Ss=I.div`
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
`,Cs=I.span`
    padding: 1px 7px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    font-size: 0.7rem;
    color: #9ca3af;
`,ws=I.div`
    flex: 1;
`,Ts=I.span`
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
`,Es=I.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    min-height: 0;
    padding: 10px 10px 118px;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.28) transparent;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.28);
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.45);
    }
`,Ds=I.button`
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
`,Os=I.span`
    display: grid;
    place-items: center;
    color: #fbbf24;
    flex-shrink: 0;
`,ks=I.div`
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
`,As=I.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`,js=I.div`
    display: flex;
    gap: 8px;
`,Ms=I.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 12px;
    min-width: 0;
    min-height: 0;
`,Ns=I.section`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.75);
    overflow: hidden;
`,Ps=I.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    color: #9ca3af;
    flex-shrink: 0;
`,Fs=I.strong`
    flex: 1;
    font-size: 0.85rem;
    color: #f9fafb;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`,Is=I.input`
    flex: 1;
    min-width: 0;
    padding: 4px 8px;
    border-radius: 6px;
    border: 1px solid rgba(99, 102, 241, 0.6);
    background: rgba(15, 23, 42, 0.9);
    color: #f9fafb;
    font-family: var(--font-mono);
    font-size: 0.82rem;

    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
`,Ls=I.span`
    display: grid;
    place-items: center;
    color: #fbbf24;
    flex-shrink: 0;
`,Rs=I.span`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #fbbf24;
    flex-shrink: 0;
`,zs=I.div`
    display: flex;
    gap: 8px;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    flex-shrink: 0;
`,Bs=I.input`
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
`,Vs=I.div`
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
`,Hs=I.div`
    display: flex;
    gap: 8px;
    align-items: baseline;
`,Us=I.span`
    color: #6b7280;
    flex-shrink: 0;
`,Ws=I.span`
    color: ${e=>e.$error?`#f87171`:`#93c5fd`};
    overflow-wrap: anywhere;
`,Gs=I.div`
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
`,Ks=I.div`
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
`,qs=I.input`
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
`,Js=I.section`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.75);
    overflow: hidden;
`,Ys=I.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 0.8rem;
    font-weight: 600;
    color: #f9fafb;
`,Xs=I.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 8px 0;
    height: 132px;
    overflow-y: auto;
    font-family: var(--font-mono);
    font-size: 0.76rem;
`,Zs=I.span``,Qs=I.div`
    display: flex;
    gap: 10px;
    padding: 2px 14px;
    color: ${e=>e.$error?`#f87171`:`#9ca3af`};

    time {
        color: #6b7280;
        flex-shrink: 0;
    }

    ${Zs} {
        color: #93c5fd;
        flex-shrink: 0;
    }

    span {
        overflow-wrap: anywhere;
    }
`,$s=I.p`
    padding: 16px;
    color: #6b7280;
    font-size: 0.82rem;
`,ec=I.button`
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
`,tc=I.button`
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
`,nc=I(tc)`
    flex: 1;
`,rc=I(tc)`
    display: grid;
    place-items: center;
    min-width: 34px;
    color: ${e=>e.$armed?`#fecaca`:`#9ca3af`};
    border-color: ${e=>e.$armed?`rgba(239, 68, 68, 0.6)`:`rgba(255, 255, 255, 0.12)`};
    background: ${e=>e.$armed?`rgba(239, 68, 68, 0.18)`:`transparent`};
`,ic=[{id:`home`,labelKey:`tabs.home.label`,titleKey:`tabs.home.title`,subtitleKey:`tabs.home.subtitle`,icon:hr,page:Zi},{id:`history`,labelKey:`tabs.history.label`,titleKey:`tabs.history.title`,subtitleKey:`tabs.history.subtitle`,icon:gr,page:Mi},{id:`scripts`,labelKey:`tabs.scripts.label`,titleKey:`tabs.scripts.title`,subtitleKey:`tabs.scripts.subtitle`,icon:vr,page:vs},{id:`settings`,labelKey:`tabs.settings.label`,titleKey:`tabs.settings.title`,subtitleKey:`tabs.settings.subtitle`,icon:_r,page:Qo}],ac=ic[0].id;function oc(e){return ic.find(t=>t.id===e)??ic[0]}var sc=I.aside`
    width: 260px;
    background: rgba(17, 24, 39, 0.85);
    backdrop-filter: blur(16px);
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-shrink: 0;
    user-select: none;
`,cc=I.nav`
    padding: 18px 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
`,lc=I.button`
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
`,uc=I.div`
    padding: 16px 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    align-items: center;
    gap: 8px;
`,dc=I.span`
    font-size: 0.75rem;
    color: #6b7280;
    font-family: var(--font-mono);
`,fc=Hn`
    0%, 100% {
        box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.5);
    }
    50% {
        box-shadow: 0 0 0 4px rgba(251, 191, 36, 0);
    }
`,pc=I.button`
    width: 8px;
    height: 8px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: #fbbf24;
    cursor: pointer;
    animation: ${fc} 2s ease-in-out infinite;
    transition: background 0.15s ease;

    &:hover {
        background: #fcd34d;
    }
`,mc=({currentTab:e,onSelectTab:t})=>{let n=Jr(),[r,i]=(0,_.useState)(null),[a,o]=(0,_.useState)(null);return(0,_.useEffect)(()=>{gi().then(e=>i(e.version)).catch(()=>i(null))},[]),(0,_.useEffect)(()=>(yi().then(o).catch(()=>o(null)),R.on(e=>{let t=e;t.type===`app.update`&&t.data&&o(t.data)})),[]),(0,L.jsxs)(sc,{children:[(0,L.jsx)(cc,{children:ic.map(r=>{let i=r.icon;return(0,L.jsxs)(lc,{$active:e===r.id,onClick:()=>t(r.id),children:[(0,L.jsx)(i,{size:18}),(0,L.jsx)(`span`,{children:n(r.labelKey)})]},r.id)})}),(0,L.jsxs)(uc,{children:[(0,L.jsx)(dc,{children:r?`v${r}`:`…`}),a?.available&&(0,L.jsx)(pc,{type:`button`,title:n(`app.updateAvailable`,{version:a.latest}),onClick:()=>void va(`https://github.com/T2PeNBiX99wcoxKv3A4g/URLCheck/releases/latest`).catch(()=>void 0)})]})]})},hc=I.header`
    height: 64px;
    background: rgba(17, 24, 39, 0.75);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    flex-shrink: 0;
`,gc=I.div`
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
`,_c=I.h1`
    font-size: 1.25rem;
    font-weight: 700;
    color: #f9fafb;
    letter-spacing: -0.01em;
`,vc=I.span`
    font-size: 0.8rem;
    color: #9ca3af;
`,yc=({currentTab:e})=>{let t=Jr(),n=oc(e);return(0,L.jsx)(hc,{children:(0,L.jsxs)(gc,{children:[(0,L.jsx)(_c,{children:t(n.titleKey)}),(0,L.jsx)(vc,{children:t(n.subtitleKey)})]},e)})},bc=()=>{let e=Jr(),t=Qr(),n=$r();return(0,L.jsxs)(xc,{children:[(0,L.jsxs)(Sc,{...n,children:[(0,L.jsx)(Cc,{children:(0,L.jsx)(mr,{size:17})}),(0,L.jsx)(wc,{children:`URLCheck`}),(0,L.jsx)(Tc,{children:e(`app.tagline`)})]}),(0,L.jsx)(Ec,{...n}),(0,L.jsxs)(Dc,{children:[(0,L.jsx)(Oc,{onClick:t.minimize,title:e(`window.minimize`),type:`button`,children:(0,L.jsx)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:(0,L.jsx)(`path`,{d:`M2 5h6`})})}),(0,L.jsx)(Oc,{onClick:t.toggleMaximize,title:e(t.maximized?`window.restore`:`window.maximize`),type:`button`,children:t.maximized?(0,L.jsxs)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:[(0,L.jsx)(`rect`,{height:`6`,width:`6`,x:`3`,y:`1`}),(0,L.jsx)(`rect`,{height:`6`,width:`6`,x:`1`,y:`3`})]}):(0,L.jsx)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:(0,L.jsx)(`rect`,{height:`6`,width:`6`,x:`2`,y:`2`})})}),(0,L.jsx)(kc,{onClick:t.close,title:e(`window.close`),type:`button`,children:(0,L.jsx)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:(0,L.jsx)(`path`,{d:`m2 2 6 6M8 2 2 8`})})})]})]})},xc=I.header`
    display: flex;
    align-items: stretch;
    height: 40px;
    flex-shrink: 0;
    background: rgba(17, 24, 39, 0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    user-select: none;
    -webkit-user-select: none;
`,Sc=I.div`
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 0 14px 0 12px;
    flex-shrink: 0;
`,Cc=I.span`
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    border-radius: 7px;
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
    color: #ffffff;
    box-shadow: 0 0 12px rgba(99, 102, 241, 0.35);
`,wc=I.strong`
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #f9fafb;
`,Tc=I.span`
    font-size: 0.7rem;
    color: #6b7280;

    /* The first thing to go when the window gets narrow. */
    @media (max-width: 640px) {
        display: none;
    }
`,Ec=I.div`
    flex: 1;
    min-width: 24px;
`,Dc=I.div`
    display: flex;
    flex-shrink: 0;
`,Oc=I.button`
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
`,kc=I(Oc)`
    &:hover {
        background: #e81123;
        color: #ffffff;
    }
`,Ac=I.div`
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
`,jc=()=>{let e=Jr();return(0,L.jsxs)(Ac,{children:[(0,L.jsx)(br,{size:28}),(0,L.jsx)(`span`,{children:e(`error.unknown`)})]})},Mc=class extends _.Component{state={failed:!1};static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(e){console.error(`Page crashed`,e)}render(){return this.state.failed?(0,L.jsx)(jc,{}):this.props.children}},Nc=I.div`
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
`,Pc=I.div`
    display: flex;
    flex: 1;
    min-height: 0;
    overflow: hidden;
`,Fc=I.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    overflow: hidden;
`,Ic=I.main`
    flex: 1;
    padding: 28px 32px 40px;
    overflow-y: auto;
`;function Lc(){let[e,t]=(0,_.useState)(ac),n=ei();(0,_.useEffect)(()=>R.on(e=>{let n=e;n.type===`app.navigate`&&n.data?.tab&&t(n.data.tab)}),[]),(0,_.useEffect)(()=>{let e=window.setTimeout(()=>R.send({type:`app.ready`}),250);return()=>window.clearTimeout(e)},[]);let r=oc(e).page;return(0,L.jsxs)(Nc,{$rounded:n,children:[(0,L.jsx)(bc,{}),(0,L.jsxs)(Pc,{children:[(0,L.jsx)(mc,{currentTab:e,onSelectTab:t}),(0,L.jsxs)(Fc,{children:[(0,L.jsx)(yc,{currentTab:e}),(0,L.jsx)(Ic,{children:(0,L.jsx)(Ni.Provider,{value:t,children:(0,L.jsx)(Mc,{children:(0,L.jsx)(r,{})},e)})})]})]}),(0,L.jsx)(ni,{})]})}var Rc=new Set([`button`,`checkbox`,`color`,`file`,`hidden`,`image`,`radio`,`range`,`reset`,`submit`]),zc=I.div`
    position: fixed;
    z-index: 2000;
    min-width: 200px;
    padding: 4px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(15, 23, 42, 0.98);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(12px);
`,Bc=I.button`
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
`,Vc=I.div`
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
`;function Hc(e){return e?e instanceof HTMLTextAreaElement?!0:e instanceof HTMLInputElement?!Rc.has(e.type):e instanceof HTMLElement&&e.isContentEditable:!1}function Uc(e){for(let t=e;t;t=t.parentElement)if(Hc(t))return t;return null}function Wc(e,t){let n=e instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(n,`value`)?.set?.call(e,t)}function Gc(e,t){if(e.focus(),e.isContentEditable){document.execCommand(`insertText`,!1,t);return}let n=e,r=n.selectionStart??n.value.length,i=n.selectionEnd??r;Wc(n,n.value.slice(0,r)+t+n.value.slice(i)),n.dispatchEvent(new Event(`input`,{bubbles:!0})),n.setSelectionRange(r+t.length,r+t.length)}var Kc=()=>{let e=Jr(),[t,n]=(0,_.useState)(null),[r,i]=(0,_.useState)(null),a=(0,_.useRef)(void 0),o=e=>{i(e),window.clearTimeout(a.current),a.current=window.setTimeout(()=>i(null),1800)};(0,_.useEffect)(()=>{let e=e=>{let t=e.target instanceof Element?e.target:null,r=window.getSelection()?.toString().trim()??``,i=t?.closest(`[data-history-url]`)?.dataset.historyUrl??null,a=Uc(t)??Uc(document.activeElement instanceof Element?document.activeElement:null);!r&&!i&&!a?n(null):(e.preventDefault(),n({x:Math.max(8,Math.min(e.clientX,window.innerWidth-220)),y:Math.max(8,Math.min(e.clientY,window.innerHeight-240)),selection:r,url:i,editable:a}))};return document.addEventListener(`contextmenu`,e),()=>document.removeEventListener(`contextmenu`,e)},[]),(0,_.useEffect)(()=>{if(!t)return;let e=()=>n(null),r=e=>{e.key===`Escape`&&n(null)};return window.addEventListener(`click`,e),window.addEventListener(`scroll`,e,!0),window.addEventListener(`resize`,e),window.addEventListener(`keydown`,r),()=>{window.removeEventListener(`click`,e),window.removeEventListener(`scroll`,e,!0),window.removeEventListener(`resize`,e),window.removeEventListener(`keydown`,r)}},[t]),(0,_.useEffect)(()=>()=>window.clearTimeout(a.current),[]);let s=async t=>{n(null);try{await navigator.clipboard.writeText(t),o(e(`popup.copied`))}catch{}},c=async e=>{n(null);try{let t=await oi();t&&Gc(e,t)}catch{}},l=async t=>{n(null);try{await ha(t),o(e(`history.autoRedirectAdded`))}catch{}};return(0,L.jsxs)(L.Fragment,{children:[t&&(0,L.jsxs)(zc,{style:{left:t.x,top:t.y},children:[t.selection&&(0,L.jsx)(Bc,{type:`button`,onClick:()=>s(t.selection),children:e(`popup.copy`)}),t.url&&(0,L.jsx)(Bc,{type:`button`,onClick:()=>s(t.url),children:e(`context.copyUrl`)}),t.editable&&(0,L.jsx)(Bc,{type:`button`,onClick:()=>c(t.editable),children:e(`context.paste`)}),t.url&&(0,L.jsx)(Bc,{type:`button`,onClick:()=>l(t.url),children:e(`history.addAutoRedirect`)})]}),r&&(0,L.jsx)(Vc,{children:r})]})};async function qc(e,t){return await R.request(`inspect.status`,{url:e,userAgentId:t})}function Jc(e){return e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}function Yc(e){let t=Jc(e.toLowerCase()).replace(/\\\*/g,`.*`);return RegExp(`(^|\\.)${t}$`)}function Xc(e){let t={globalLiterals:new Set,globalRegex:[],scopes:[]};for(let n of e)if(!n.urlPattern&&!n.include?.length&&!n.exclude?.length&&!n.urlExceptions?.length)n.regex?t.globalRegex.push(new RegExp(n.pattern,`i`)):t.globalLiterals.add(n.pattern.toLowerCase());else for(let e of n.include?.length?n.include:[null])t.scopes.push({host:e?Yc(e):null,url:n.urlPattern?new RegExp(n.urlPattern,`i`):null,exclude:n.exclude?.map(Yc)??null,urlExceptions:n.urlExceptions?.map(e=>new RegExp(e,`i`))??null,literals:n.regex?new Set:new Set([n.pattern.toLowerCase()]),regex:n.regex?[new RegExp(n.pattern,`i`)]:[]});return t}function Zc(e,t,n,r){let i=e.toLowerCase();if(t.globalLiterals.has(i)||t.globalRegex.some(t=>t.test(e)))return!0;for(let a of t.scopes)if((!a.host||a.host.test(n))&&(!a.url||a.url.test(r))&&!a.exclude?.some(e=>e.test(n))&&!a.urlExceptions?.some(e=>e.test(r))&&(a.literals.has(i)||a.regex.some(t=>t.test(e))))return!0;return!1}function Qc(e){try{return new URL(e)}catch{return null}}function $c(e,t){let n=Qc(e);return n?[...n.searchParams.keys()].filter(r=>Zc(r,t,n.hostname,e)):[]}function el(e,t){let n=Qc(e);if(!n)return e;for(let r of[...n.searchParams.keys()])Zc(r,t,n.hostname,e)&&n.searchParams.delete(r);return n.toString()}function tl(e,t){if(e.entries[e.index]===t)return{...e,editing:!1};let n=[...e.entries.slice(0,e.index+1),t];return{entries:n,index:n.length-1,editing:!1}}function nl(e,t){switch(t.type){case`edit`:if(e.editing){let n=[...e.entries];return n[e.index]=t.value,{...e,entries:n}}return{...tl(e,t.value),editing:!0};case`commit`:return tl(e,t.value);case`jump`:return{...e,index:Math.max(0,Math.min(t.index,e.entries.length-1)),editing:!1}}}function rl(){let e=window.location.hash,t=e.indexOf(`?`);return t<0?``:new URLSearchParams(e.slice(t+1)).get(`url`)??``}function il(e){let t=window.location.hash,n=t.indexOf(`?`);return n<0||new URLSearchParams(t.slice(n+1)).get(e)!==`0`}function al(e){try{return decodeURIComponent(e)}catch{return e}}function ol(e){let t=window.location.hash,n=t.indexOf(`?`);if(n<0)return null;let r=new URLSearchParams(t.slice(n+1)).get(e);return r?al(r):null}function sl(e){return e?al(e.pathname).replace(/^\//,``):``}var cl=Hn`
    from {
        opacity: 0;
        transform: translateY(-4px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`,ll=I.div`
    min-height: 100vh;
    background-color: #0b0f19;
    background-image: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.12), transparent 70%);
    color: #f9fafb;
    border-radius: ${e=>e.$borderless?`8px`:`0`};
    box-shadow: ${e=>e.$borderless?`inset 0 0 0 1px rgba(255, 255, 255, 0.12)`:`none`};
    overflow: hidden;
    animation: ${cl} 0.24s cubic-bezier(0.22, 1, 0.36, 1);
`,ul=I.div`
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 2px 0 6px;
`,dl=I.button`
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
`,fl=I.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 12px 12px;
`,pl=I.input`
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
`,ml=I.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: -4px;
    color: #fbbf24;
    font-size: 0.74rem;
    animation: ${cl} 0.15s ease;
`,hl=I.div`
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
    animation: ${cl} 0.15s ease;

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
`,gl=I.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`,_l=I.button`
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
`,vl=I.button`
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
`,yl=I.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 6px;
`,bl=I.button`
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
`,xl=I.div`
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    overflow: hidden;
    background: rgba(15, 23, 42, 0.5);
`,Sl=I.div`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 6px 4px 10px;
`,Cl=I.button`
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
`,wl=I.button`
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
`,Tl=I(wl)`
    &:hover:not(:disabled) {
        color: #f87171;
        background: rgba(239, 68, 68, 0.12);
    }
`,El=I.span`
    display: inline-block;
    transition: transform 0.15s ease;
    transform: rotate(${e=>e.$open?`90deg`:`0deg`});
    font-size: 0.65rem;
`,Dl=I.span`
    background: rgba(255, 255, 255, 0.08);
    color: #cbd5e1;
    border-radius: 9999px;
    padding: 0 7px;
    font-size: 0.68rem;
    font-weight: 600;
    flex-shrink: 0;
`,Ol=I.span`
    padding: 6px 2px;
    color: #6b7280;
    font-size: 0.76rem;
`,kl=I.div`
    display: flex;
    flex-direction: column;
    padding: 0 10px 7px;
    animation: ${cl} 0.15s ease;
`,Al=I.div`
    display: flex;
    gap: 10px;
    padding: 4px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    font-family: var(--font-mono);
    font-size: 0.75rem;
`,jl=I.span`
    color: #60a5fa;
    flex-shrink: 0;
    min-width: 78px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`,Ml=I.span`
    color: #cbd5e1;
    flex: 1;
    word-break: break-all;
`,Nl=I.button`
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
`,Pl=I.input`
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
`,Fl=I.button`
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
`,Il=I.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    margin-top: 2px;
`,Ll=I.div`
    position: relative;
    display: flex;
`,Rl=I.div`
    position: relative;
    display: flex;
`,zl=I.button`
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
`,Bl=I.button`
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
`,Vl=I(bl)`
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
`,Hl=I.div`
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 7px 10px;
    border-radius: 7px;
    font-size: 0.76rem;
    background: ${e=>e.$tone===`error`?`rgba(239, 68, 68, 0.12)`:`rgba(16, 185, 129, 0.12)`};
    border: 1px solid ${e=>e.$tone===`error`?`rgba(239, 68, 68, 0.3)`:`rgba(16, 185, 129, 0.3)`};
    color: ${e=>e.$tone===`error`?`#f87171`:`#34d399`};
`,Ul=()=>{let e=Jr(),t=(0,_.useMemo)(rl,[]),[n,r]=(0,_.useReducer)(nl,{entries:[t],index:0,editing:!1}),i=n.entries[n.index],[a,o]=(0,_.useState)([]),[s,c]=(0,_.useState)([]),[l,u]=(0,_.useState)([]),[d,f]=(0,_.useState)(()=>new Set),[p,m]=(0,_.useState)(``),[h,g]=(0,_.useState)(null),[v,y]=(0,_.useState)(!1),[b,x]=(0,_.useState)(!1),[S,C]=(0,_.useState)(!1),[ee,w]=(0,_.useState)(!1),[T,E]=(0,_.useState)(null),[te,ne]=(0,_.useState)(!1),[re,D]=(0,_.useState)(!1),[ie]=(0,_.useState)(()=>il(`borderless`)),[ae]=(0,_.useState)(()=>il(`strip`)),[oe,O]=(0,_.useState)(()=>ol(`scriptError`)),[se,k]=(0,_.useState)(null),ce=e=>ae&&se&&$c(e,se).length>0?el(e,se):e,[le,ue]=(0,_.useState)(null),[de,fe]=(0,_.useState)({domain:!1,parameters:!1,fragment:!1}),pe=(0,_.useRef)(null),me=(0,_.useRef)(0),he=(0,_.useRef)(void 0),ge=(0,_.useRef)(null),_e=(0,_.useRef)(null),A=(0,_.useRef)(null),ve=ra(S,!1,ge),ye=ra(b,!0,_e),j=ra(ee,!0,A),M=(0,_.useMemo)(()=>{try{return new URL(i)}catch{return null}},[i]),[be,xe]=(0,_.useState)(()=>sl(M));(0,_.useEffect)(()=>{xe(sl(M))},[M]);let Se=(0,_.useMemo)(()=>M?[...M.searchParams.entries()].map(([e,t])=>({key:e,value:t})):[],[M]),Ce=al(M?.hash.replace(/^#/,``)??``),we=M?.protocol===`http:`,N=a[0],Te=!!M&&a.length>0,Ee=se?$c(i,se).length:0;(0,_.useEffect)(()=>{let e=!1;return(async()=>{try{let t=await fa();if(e)return;o(t.settings.browsers),c(t.settings.userAgents),m(t.settings.selectedUserAgentId),u(t.settings.devices??[])}catch{}})(),()=>{e=!0}},[]),(0,_.useEffect)(()=>{let e=!1;return La().then(t=>{e||k(Xc(t))}).catch(()=>void 0),()=>{e=!0}},[]),(0,_.useEffect)(()=>(document.documentElement.classList.toggle(`popup-transparent`,ie),()=>document.documentElement.classList.remove(`popup-transparent`)),[ie]),(0,_.useEffect)(()=>R.on(e=>{let t=e;t.type===`popup.navigate`&&t.data?.url&&(r({type:`commit`,value:t.data.url}),g(null),ue(null),O(t.data.scriptError??null))}),[]),(0,_.useEffect)(()=>{R.send({type:`popup.ready`})},[]),(0,_.useEffect)(()=>R.on(e=>{let t=e;t.type===`settings.changed`&&t.data?.settings&&u(t.data.settings.devices??[])}),[]),(0,_.useEffect)(()=>{let e=!1;Sa().then(t=>{e||f(t)}).catch(()=>void 0);let t=R.on(e=>{let t=e;t.type===`forward.presence`&&f(new Set(t.data?.online??[]))});return()=>{e=!0,t()}},[]);let De=l.filter(e=>d.has(e.id));(0,_.useEffect)(()=>{De.length===0&&w(!1)},[De.length]),(0,_.useEffect)(()=>{let e=ce(t);e!==t&&r({type:`commit`,value:e})},[t,ae,se]),(0,_.useEffect)(()=>{let e=pe.current;if(!e)return;let t=()=>{window.clearTimeout(he.current),he.current=window.setTimeout(()=>{let t=Math.ceil(e.offsetHeight)+24;Math.abs(t-me.current)<2||(me.current=t,hi(t))},60)},n=new ResizeObserver(t);return n.observe(e),window.addEventListener(`resize`,t),()=>{window.clearTimeout(he.current),n.disconnect(),window.removeEventListener(`resize`,t)}},[]);let Oe=e=>{r({type:`commit`,value:e}),g(null)},ke=e=>{r({type:`edit`,value:e}),g(null)},Ae=e=>{e.key===`Enter`&&e.currentTarget.blur()},je=()=>{if(!M)return;let e=new URL(i);e.pathname=`/${be}`;let t=e.toString();Oe(t),xe(sl(new URL(t)))},Me=(e,t)=>{if(!M)return;let n=[...M.searchParams.entries()].map(([n,r],i)=>i===e?{key:t.key??n,value:t.value??r}:{key:n,value:r}),r=new URL(i);r.search=``;for(let e of n)r.searchParams.append(e.key,e.value);ke(r.toString())},Ne=e=>{if(!M)return;let t=new URL(i);t.hash=e,ke(t.toString())},Pe=()=>{if(!M)return;let e=new URL(i);e.searchParams.append(``,``),Oe(e.toString())},Fe=()=>{if(!M)return;let e=new URL(i);e.hash=``,Oe(e.toString())},Ie=()=>{M&&Oe(`${M.origin}/`)},Le=async()=>{y(!0),ue(null);try{let e=await qc(i,p);if(e.location){r({type:`commit`,value:e.location});let t=ce(e.location);t!==e.location&&r({type:`commit`,value:t})}g(e)}catch(e){ue(e instanceof Error?e.message:String(e))}finally{y(!1)}},Re=async e=>{x(!1),ue(null);try{await _a(i,e,te),si()}catch(e){ue(e instanceof Error?e.message:String(e))}},ze=async()=>{ue(null);try{await navigator.clipboard.writeText(i),D(!0),setTimeout(()=>D(!1),1500)}catch(e){ue(e instanceof Error?e.message:String(e))}},Be=async e=>{w(!1),ue(null);try{await xa(i,e),E(e),setTimeout(()=>E(null),1500)}catch(e){ue(e instanceof Error?e.message:String(e))}},Ve=(e,t)=>{if(!M)return;let n=new URL(i),r=[...n.searchParams.entries()];n.search=``;for(let[i,a]of r)(i!==e||a!==t)&&n.searchParams.append(i,a);Oe(n.toString())},He=()=>{if(!M)return;let e=new URL(i);e.search=``,Oe(e.toString())},Ue=()=>{if(!M)return;let e=new URL(i);e.protocol=`https:`,Oe(e.toString())},We=e=>fe(t=>({...t,[e]:!t[e]})),Ge=h?h.ok?`ok`:h.statusCode>=300&&h.statusCode<400?`info`:`error`:`idle`,Ke=h?.location?e(`popup.redirected`):h?.statusText===`error.timeout`?e(`error.timeout`):h?.statusText,qe=v?e(`popup.checking`):h?`${h.statusCode||`!`} ${Ke??``}`.trim():e(`popup.checkStatus`),Je=Ge===`ok`?yr:Ge===`error`?xr:br;return(0,L.jsxs)(ll,{$borderless:ie,children:[(0,L.jsx)(ul,{children:(0,L.jsx)(dl,{onClick:si,title:e(`popup.close`),children:`✕`})}),oe&&(0,L.jsxs)(hl,{children:[(0,L.jsx)(br,{size:13}),(0,L.jsx)(`span`,{children:e(`popup.scriptError`,{error:oe})}),(0,L.jsx)(`button`,{onClick:()=>O(null),title:e(`popup.close`),type:`button`,children:`×`})]}),(0,L.jsxs)(fl,{ref:pe,children:[(0,L.jsx)(pl,{type:`text`,value:i,spellCheck:!1,$warn:we,onChange:e=>ke(e.target.value),onBlur:()=>r({type:`commit`,value:i}),placeholder:`https://example.com/path?key=value`}),we&&(0,L.jsxs)(ml,{children:[(0,L.jsx)(br,{size:13}),(0,L.jsx)(`span`,{children:e(`popup.httpWarning`)})]}),n.entries.length>1&&(0,L.jsxs)(gl,{ref:ge,children:[(0,L.jsx)(_l,{onClick:()=>r({type:`jump`,index:0}),disabled:n.index===0,title:e(`popup.first`),children:`|◀`}),(0,L.jsx)(_l,{onClick:()=>r({type:`jump`,index:n.index-1}),disabled:n.index===0,title:e(`popup.back`),children:`◀`}),(0,L.jsx)(_l,{onClick:()=>C(e=>!e),title:e(`popup.history`),children:`▾`}),(0,L.jsx)(_l,{onClick:()=>r({type:`jump`,index:n.index+1}),disabled:n.index>=n.entries.length-1,title:e(`popup.forward`),children:`▶`}),(0,L.jsx)(_l,{onClick:()=>r({type:`jump`,index:n.entries.length-1}),disabled:n.index>=n.entries.length-1,title:e(`popup.last`),children:`▶|`}),S&&(0,L.jsx)(ea,{$stretch:!0,style:ve,children:n.entries.map((e,t)=>(0,L.jsx)(ta,{$mono:!0,$active:t===n.index,onClick:()=>{r({type:`jump`,index:t}),C(!1)},children:e},`${t}-${e}`))})]}),(0,L.jsxs)(yl,{children:[s.length>0&&(0,L.jsx)(oa,{value:p,disabled:v,options:s.map(e=>({value:e.id,label:e.name})),onChange:m,title:e(`popup.userAgentTooltip`)}),(0,L.jsxs)(vl,{$tone:Ge,onClick:Le,disabled:v,title:e(`popup.checkStatus`),children:[(0,L.jsx)(Je,{size:13}),(0,L.jsx)(`span`,{children:qe})]}),(0,L.jsxs)(bl,{onClick:()=>se&&Oe(el(i,se)),disabled:!M||!se,title:e(`popup.removeTrackingTooltip`),children:[(0,L.jsx)(Dr,{size:13}),e(`popup.tracking`),Ee>0?` (${Ee})`:``]}),we&&(0,L.jsx)(bl,{$accent:!0,onClick:Ue,children:e(`popup.useHttps`)})]}),(0,L.jsxs)(xl,{children:[(0,L.jsx)(Sl,{children:(0,L.jsxs)(Cl,{onClick:()=>We(`domain`),children:[(0,L.jsx)(El,{$open:de.domain,children:`▶`}),(0,L.jsx)(`span`,{children:e(`popup.domain`)})]})}),de.domain&&(0,L.jsxs)(kl,{children:[(0,L.jsxs)(Al,{children:[(0,L.jsx)(jl,{children:e(`popup.scheme`)}),(0,L.jsx)(Ml,{children:M?.protocol.replace(/:$/,``)??`(none)`})]}),(0,L.jsxs)(Al,{children:[(0,L.jsx)(jl,{children:e(`popup.host`)}),(0,L.jsx)(Ml,{children:M?(0,L.jsx)(Nl,{onClick:Ie,title:e(`popup.hostTooltip`),children:al(M.host)}):`(none)`})]}),(0,L.jsxs)(Al,{children:[(0,L.jsx)(jl,{children:e(`popup.path`)}),(0,L.jsx)(Pl,{className:`value`,spellCheck:!1,placeholder:e(`popup.empty`),value:be,disabled:!M,onChange:e=>xe(e.target.value),onBlur:je,onKeyDown:Ae})]})]})]}),(0,L.jsxs)(xl,{children:[(0,L.jsxs)(Sl,{children:[(0,L.jsxs)(Cl,{onClick:()=>We(`parameters`),children:[(0,L.jsx)(El,{$open:de.parameters,children:`▶`}),(0,L.jsx)(`span`,{children:e(`popup.parameters`)})]}),(0,L.jsx)(Dl,{children:Se.length}),(0,L.jsx)(wl,{title:e(`popup.addParameter`),onClick:Pe,disabled:!M,children:(0,L.jsx)(Er,{size:14})}),(0,L.jsx)(Tl,{title:e(`popup.removeAllParameters`),onClick:He,disabled:!M||Se.length===0,children:(0,L.jsx)(Dr,{size:13})})]}),de.parameters&&(0,L.jsxs)(kl,{children:[Se.length===0&&(0,L.jsx)(Ol,{children:e(`popup.noParameters`)}),Se.map((t,n)=>(0,L.jsxs)(Al,{children:[(0,L.jsx)(Pl,{className:`key`,title:e(`popup.parameterName`),value:t.key,onChange:e=>Me(n,{key:e.target.value})}),(0,L.jsx)(Pl,{className:`value`,title:e(`popup.parameterValue`),placeholder:e(`popup.empty`),value:t.value,onChange:e=>Me(n,{value:e.target.value})}),(0,L.jsx)(Fl,{title:e(`popup.removeParameter`),onClick:()=>Ve(t.key,t.value),children:(0,L.jsx)(Dr,{size:12})})]},n))]})]}),(0,L.jsxs)(xl,{children:[(0,L.jsxs)(Sl,{children:[(0,L.jsxs)(Cl,{onClick:()=>We(`fragment`),children:[(0,L.jsx)(El,{$open:de.fragment,children:`▶`}),(0,L.jsx)(`span`,{children:e(`popup.fragment`)})]}),(0,L.jsx)(Tl,{title:e(`popup.removeFragment`),onClick:Fe,disabled:!M||Ce.length===0,children:(0,L.jsx)(Dr,{size:13})})]}),de.fragment&&(0,L.jsx)(kl,{children:(0,L.jsxs)(Al,{children:[(0,L.jsx)(jl,{children:`#`}),(0,L.jsx)(Pl,{className:`value`,title:e(`popup.fragmentTooltip`),placeholder:e(`popup.empty`),value:Ce,onChange:e=>Ne(e.target.value)})]})})]}),le&&(0,L.jsxs)(Hl,{$tone:`error`,children:[(0,L.jsx)(br,{size:13}),(0,L.jsx)(`span`,{children:e(le)})]}),(0,L.jsxs)(Il,{children:[(0,L.jsxs)(Ll,{ref:_e,children:[(0,L.jsxs)(zl,{disabled:!Te,onClick:()=>Re(),children:[(0,L.jsx)(Cr,{size:14}),(0,L.jsx)(`span`,{children:e(`popup.open`,{browser:N?.name??e(`popup.openFallback`)})})]}),(0,L.jsx)(Bl,{disabled:a.length===0,onClick:()=>x(e=>!e),title:e(`popup.chooseBrowser`),children:`▾`}),b&&(0,L.jsx)(ea,{$up:!0,style:ye,children:a.map(e=>(0,L.jsx)(ta,{onClick:()=>Re(e.id),children:e.name},e.id))})]}),(0,L.jsxs)(Vl,{$active:te,onClick:()=>ne(e=>!e),title:e(`popup.privateTooltip`),children:[(0,L.jsx)(wr,{size:13}),e(`popup.private`)]}),De.length>0&&(0,L.jsxs)(Rl,{ref:A,children:[(0,L.jsxs)(Vl,{onClick:()=>w(e=>!e),disabled:!M,title:e(`popup.sendToTooltip`),children:[(0,L.jsx)(kr,{size:13}),e(`popup.sendTo`),(0,L.jsx)(z,{$open:ee,children:`▾`})]}),ee&&(0,L.jsx)(ea,{$up:!0,style:{...j,left:`auto`,right:0,maxWidth:280},children:De.map(t=>(0,L.jsx)(ta,{onClick:()=>Be(t.id),children:T===t.id?e(`popup.sent`):t.name||t.host},t.id))})]}),(0,L.jsxs)(Vl,{onClick:ze,disabled:!M,children:[(0,L.jsx)(Tr,{size:13}),e(re?`popup.copied`:`popup.copy`)]})]})]})]})},Wl=Hn`
    from {
        opacity: 0;
        transform: scale(0.85);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`,Gl=I.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: transparent;
`,Kl=I.button`
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
    animation: ${Wl} 0.16s cubic-bezier(0.22, 1, 0.36, 1);
    transition: filter 0.15s ease;

    &:hover {
        filter: brightness(1.15);
    }
`;function ql(){let e=window.location.hash.indexOf(`?`);return e<0?``:new URLSearchParams(window.location.hash.slice(e+1)).get(`url`)??``}var Jl=()=>{let e=Jr(),[t,n]=(0,_.useState)(()=>ql()||null);return(0,_.useEffect)(()=>R.on(e=>{let t=e,r=t.data?.url;t.type===`selection.show`&&r&&n(r)}),[]),(0,_.useEffect)(()=>{R.send({type:`selection.ready`})},[]),(0,_.useEffect)(()=>(document.documentElement.classList.add(`selection-transparent`),()=>document.documentElement.classList.remove(`selection-transparent`)),[]),t?(0,L.jsx)(Gl,{children:(0,L.jsx)(Kl,{type:`button`,title:e(`selection.open`),onMouseDown:()=>{ai(t),ci(),n(null)},children:(0,L.jsx)(mr,{size:26})})}):null},Yl=document.getElementById(`root`);if(Yl){let e=window.location.hash,t=e.startsWith(`#popup`)?(0,L.jsx)(Ul,{}):e.startsWith(`#selection`)?(0,L.jsx)(Jl,{}):(0,L.jsx)(Lc,{});(0,v.createRoot)(Yl).render((0,L.jsx)(_.StrictMode,{children:(0,L.jsxs)(Xr,{children:[t,(0,L.jsx)(Kc,{})]})}))}export{c as a,u as i,Wn as n,I as r,Jr as t};