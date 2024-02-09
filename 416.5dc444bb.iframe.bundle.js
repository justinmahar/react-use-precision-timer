/*! For license information please see 416.5dc444bb.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkreact_use_precision_timer=self.webpackChunkreact_use_precision_timer||[]).push([[416],{"./src/hooks/useDelay.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Q:()=>useDelay});var _useTimer__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/hooks/useTimer.tsx");const useDelay=(delay,callback)=>(0,_useTimer__WEBPACK_IMPORTED_MODULE_0__.u)({delay,runOnce:!0},callback);try{useDelay.displayName="useDelay",useDelay.__docgenInfo={description:"See documentation: [useDelay](https://justinmahar.github.io/react-use-precision-timer/useDelay)\n\nFires the callback after the specified delay has passed. Call start() on the returned Timer to execute.",displayName:"useDelay",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useDelay.tsx#useDelay"]={docgenInfo:useDelay.__docgenInfo,name:"useDelay",path:"src/hooks/useDelay.tsx#useDelay"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useTimer.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{u:()=>useTimer});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),react_sub_unsub__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-sub-unsub/dist/index.js");const never=Number.MAX_SAFE_INTEGER,useTimer=function(){let options=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},callback=arguments.length>1?arguments[1]:void 0;const[firstRun,setFirstRun]=react__WEBPACK_IMPORTED_MODULE_0__.useState(!0),[renderTime,setRenderTime]=react__WEBPACK_IMPORTED_MODULE_0__.useState(Date.now()),startedRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(!1),startTimeRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(never),lastFireTimeRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(never),nextFireTimeRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(never),pauseTimeRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(never),resumeTimeRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(never),periodElapsedPauseTimeRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(0),totalElapsedPauseTimeRef=react__WEBPACK_IMPORTED_MODULE_0__.useRef(0),delay=react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>{const s=options.speedMultiplier??1,d=options.delay??0;return 0===s?0:s>0&&d>0?Math.max(1,Math.round(d*(1/s))):d}),[options.delay,options.speedMultiplier]),runOnce=react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>options.runOnce),[options.runOnce]),fireOnStart=react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>options.fireOnStart),[options.fireOnStart]),startImmediately=react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>options.startImmediately),[options.startImmediately]),isStarted=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>startedRef.current),[]),isStopped=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>!isStarted()),[isStarted]),isPaused=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>isStarted()&&pauseTimeRef.current!==never),[isStarted]),isRunning=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>isStarted()&&!isPaused()),[isPaused,isStarted]),getEffectiveDelay=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>delay),[delay]),getStartTime=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>isStarted()?startTimeRef.current:-1),[isStarted]),getLastFireTime=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>lastFireTimeRef.current<never&&delay?lastFireTimeRef.current:-1),[delay]),getNextFireTime=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>isRunning()&&delay?nextFireTimeRef.current:-1),[isRunning,delay]),getPauseTime=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>isPaused()?pauseTimeRef.current:-1),[isPaused]),getResumeTime=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>isStarted()&&resumeTimeRef.current<never?resumeTimeRef.current:-1),[isStarted]),getElapsedStartedTime=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>isStarted()?Date.now()-startTimeRef.current:0),[isStarted]),getElapsedRunningTime=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>isStarted()?isPaused()?pauseTimeRef.current-startTimeRef.current-totalElapsedPauseTimeRef.current:Date.now()-startTimeRef.current-totalElapsedPauseTimeRef.current:0),[isPaused,isStarted]),getPeriodElapsedPausedTime=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>{let additionalElapsedPauseTime=0;return isPaused()&&(additionalElapsedPauseTime=Date.now()-pauseTimeRef.current),periodElapsedPauseTimeRef.current+additionalElapsedPauseTime}),[isPaused]),getTotalElapsedPausedTime=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>{let additionalElapsedPauseTime=0;return isPaused()&&(additionalElapsedPauseTime=Date.now()-pauseTimeRef.current),totalElapsedPauseTimeRef.current+additionalElapsedPauseTime}),[isPaused]),getElapsedResumedTime=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>isRunning()?Date.now()-resumeTimeRef.current:0),[isRunning]),getRemainingTime=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>{const currentTime=Date.now();if(isStarted()&&delay){if(isRunning())return Math.max(0,nextFireTimeRef.current-currentTime);if(isPaused()){const edgeTime=lastFireTimeRef.current!==never?lastFireTimeRef.current:startTimeRef.current;return Math.max(0,delay-(pauseTimeRef.current-edgeTime-periodElapsedPauseTimeRef.current))}}return 0}),[isPaused,isRunning,isStarted,delay]),start=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((function(){let startTimeMillis=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Date.now();const newNextFireTime=delay?Math.max(startTimeMillis,fireOnStart?startTimeMillis:startTimeMillis+delay):never;startTimeRef.current=startTimeMillis,lastFireTimeRef.current=never,nextFireTimeRef.current=newNextFireTime,pauseTimeRef.current=never,resumeTimeRef.current=startTimeMillis,periodElapsedPauseTimeRef.current=0,totalElapsedPauseTimeRef.current=0,startedRef.current=!0,setRenderTime(Date.now())}),[delay,fireOnStart]),stop=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>{startTimeRef.current=never,lastFireTimeRef.current=never,nextFireTimeRef.current=never,pauseTimeRef.current=never,resumeTimeRef.current=never,periodElapsedPauseTimeRef.current=0,totalElapsedPauseTimeRef.current=0,startedRef.current=!1,setRenderTime(Date.now())}),[]),pause=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>{isRunning()&&(pauseTimeRef.current=Date.now(),resumeTimeRef.current=never,setRenderTime(Date.now()))}),[isRunning]),resume=react__WEBPACK_IMPORTED_MODULE_0__.useCallback((()=>{if(isStarted()&&isPaused()){const currentTime=Date.now();nextFireTimeRef.current=currentTime+getRemainingTime(),periodElapsedPauseTimeRef.current=0,totalElapsedPauseTimeRef.current=totalElapsedPauseTimeRef.current+(currentTime-pauseTimeRef.current),pauseTimeRef.current=never,resumeTimeRef.current=currentTime,setRenderTime(Date.now())}}),[isStarted,isPaused,getRemainingTime]);return react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>{const subs=new react_sub_unsub__WEBPACK_IMPORTED_MODULE_1__.us,checkTimer=()=>{if(delay&&!isPaused()){const now=Date.now();if(now>=nextFireTimeRef.current){const overdueCalls=lastFireTimeRef.current!==never?Math.max(0,Math.floor((now-nextFireTimeRef.current)/delay)):0;lastFireTimeRef.current=now,periodElapsedPauseTimeRef.current=0;const overdueElapsedTime=overdueCalls*delay,newFireTime=Math.max(now,nextFireTimeRef.current+delay+overdueElapsedTime);if(nextFireTimeRef.current=newFireTime,"function"==typeof callback)try{callback(overdueCalls)}catch(e){console.error(e)}runOnce?stop():subs.setTimeout((()=>{checkTimer()}),Math.max(newFireTime-Date.now(),1))}else nextFireTimeRef.current<never&&subs.setTimeout((()=>{checkTimer()}),Math.max(nextFireTimeRef.current-Date.now(),1))}};return checkTimer(),subs.createCleanup()}),[callback,delay,isPaused,renderTime,runOnce,stop]),react__WEBPACK_IMPORTED_MODULE_0__.useEffect((()=>{firstRun&&(setFirstRun(!1),startImmediately&&start())}),[firstRun,startImmediately,start]),react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>({start,stop,pause,resume,isStarted,isStopped,isRunning,isPaused,getEffectiveDelay,getStartTime,getLastFireTime,getNextFireTime,getPauseTime,getResumeTime,getRemainingTime,getElapsedStartedTime,getElapsedRunningTime,getTotalElapsedPausedTime,getPeriodElapsedPausedTime,getElapsedResumedTime})),[getEffectiveDelay,getElapsedResumedTime,getElapsedRunningTime,getElapsedStartedTime,getLastFireTime,getNextFireTime,getPauseTime,getPeriodElapsedPausedTime,getRemainingTime,getResumeTime,getStartTime,getTotalElapsedPausedTime,isPaused,isRunning,isStarted,isStopped,pause,resume,start,stop])};try{useTimer.displayName="useTimer",useTimer.__docgenInfo={description:"See documentation: [useTimer](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usetimer--page)\n\nA versatile precision timer hook for React. Doubles as a stopwatch.\n\n- Based on `setTimeout()` and timestamps, not `setInterval()` or ticks.\n- Features perfect mean interval accuracy, meaning it doesn't wander.\n- Resilient to expensive callback operations and low timer delays.\n- Can be used as a timer or a stopwatch.\n- Supports starting, stopping, pausing, and resuming.\n- Includes accessors for everything under the sun.",displayName:"useTimer",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/hooks/useTimer.tsx#useTimer"]={docgenInfo:useTimer.__docgenInfo,name:"useTimer",path:"src/hooks/useTimer.tsx#useTimer"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/react-sub-unsub/dist/index.js":(__unused_webpack_module,exports)=>{exports.us=void 0;class Subscribe{static subscribe(subscribe){try{return subscribe()}catch(e){console.error(e)}return()=>{}}static subscribeEvent(eventEmitter,eventName,listener){return eventEmitter.addListener(eventName,listener),()=>{eventEmitter.removeListener(eventName,listener)}}static subscribeDOMEvent(domObj,eventName,listener,options){return domObj.addEventListener(eventName,listener,options),()=>{domObj.removeEventListener(eventName,listener,options)}}static setTimeout(handler,delay,...args){const timeout=setTimeout(handler,delay,args);return()=>clearTimeout(timeout)}static setInterval(handler,delay,...args){const interval=setInterval(handler,delay,args);return()=>clearInterval(interval)}static unsubAll(unsubs){if(Array.isArray(unsubs))unsubs.forEach((unsub=>{try{unsub()}catch(e){console.error(e)}}));else try{unsubs()}catch(e){console.error(e)}}static createCleanup(unsubs){return()=>Subscribe.unsubAll(unsubs)}}exports.us=class Subs{constructor(list=[]){this.list=list}subscribe(subscribe){const unsub=Subscribe.subscribe(subscribe);return this.push(unsub),unsub}subscribeEvent(eventEmitter,eventName,listener){const unsub=Subscribe.subscribeEvent(eventEmitter,eventName,listener);return this.push(unsub),unsub}subscribeDOMEvent(domObj,eventName,listener){const unsub=Subscribe.subscribeDOMEvent(domObj,eventName,listener);return this.push(unsub),unsub}setTimeout(handler,delay,...args){const timeout=setTimeout(handler,delay,args),unsub=()=>clearTimeout(timeout);return this.push(unsub),unsub}setInterval(handler,delay,...args){const interval=setInterval(handler,delay,args),unsub=()=>clearInterval(interval);return this.push(unsub),unsub}push(unsub){this.list.push(unsub)}unsubAll(){Subscribe.unsubAll(this.list),this.list.splice(0,this.list.length)}createCleanup(){return()=>{this.unsubAll()}}}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);