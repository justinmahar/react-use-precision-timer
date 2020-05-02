(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{MfgB:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return d})),n.d(t,"default",(function(){return o}));n("1c7q"),n("abGl"),n("gZHo"),n("Fdmb"),n("Ir+3"),n("2mQt");var a=n("/FXl"),r=n("TjRS"),i=n("wqp8");n("aD51");function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var d={};void 0!==d&&d&&d===Object(d)&&Object.isExtensible(d)&&!d.hasOwnProperty("__filemeta")&&Object.defineProperty(d,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/__docz__/demo.mdx"}});var s={_frontmatter:d},l=r.a;function o(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["components"]);return Object(a.b)(l,m({},s,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h1",null,"Demo"),Object(a.b)("p",null,"The following is a demo of the ",Object(a.b)("a",m({parentName:"p"},{href:"/react-use-precision-timer/useTimer"}),"useTimer")," hook (which the ",Object(a.b)("a",m({parentName:"p"},{href:"/react-use-precision-timer/useDelay"}),"useDelay")," and ",Object(a.b)("a",m({parentName:"p"},{href:"/react-use-precision-timer/useStopwatch"}),"useStopwatch")," hooks wrap)."),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"You can ",Object(a.b)("a",m({parentName:"li"},{href:"/react-use-precision-timer/useTimer#mutators"}),"start, stop, pause, and resume")," the timer."),Object(a.b)("li",{parentName:"ul"},"You can also configure the delay and other ",Object(a.b)("a",m({parentName:"li"},{href:"/react-use-precision-timer/useTimer#timeroptions"}),"timer options"),"."),Object(a.b)("li",{parentName:"ul"},"All ",Object(a.b)("a",m({parentName:"li"},{href:"/react-use-precision-timer/useTimer#getters"}),"getters")," are shown so you can see what's happening under the hood. Times are in milliseconds."),Object(a.b)("li",{parentName:"ul"},'When the timer fires, the "Callback time" is updated to the current time.'),Object(a.b)("li",{parentName:"ul"},'The "Render every X ms" setting allows you to choose how often the demo renders when the timer isn\'t firing.'),Object(a.b)("li",{parentName:"ul"},"Set the delay to 0 to turn the timer into a ",Object(a.b)("a",m({parentName:"li"},{href:"/react-use-precision-timer/useStopwatch"}),"stopwatch"),"."),Object(a.b)("li",{parentName:"ul"},"Code is provided below for reference.")),Object(a.b)("div",{style:{border:"solid 2px #67788a",padding:"20px"}},Object(a.b)(i.a,{mdxType:"UseTimerExample"})),Object(a.b)("pre",null,Object(a.b)("code",m({parentName:"pre"},{className:"language-jsx"}),'import * as React from \'react\';\nimport { useTimer } from \'react-use-precision-timer\';\n\nexport function UseTimerExample() {\n  const [delay, setDelay] = React.useState(1000);\n  const [callbackTime, setCallbackTime] = React.useState(-1);\n  const [runOnce, setRunOnce] = React.useState(false);\n  const [fireImmediately, setFireImmediately] = React.useState(false);\n  const [startImmediately, setStartImmediately] = React.useState(true);\n  const [delayChanged, setDelayChanged] = React.useState(false);\n  const [renderTime, setRenderTime] = React.useState(new Date().getTime());\n  const [frameRate, setFrameRate] = React.useState(10);\n  const callback = () => {\n    setCallbackTime(new Date().getTime());\n  };\n  const timer = useTimer({\n    delay,\n    callback,\n    runOnce,\n    fireImmediately,\n    startImmediately,\n    fireOverdueCallbacks: true,\n  });\n\n  React.useEffect(() => {\n    const timeout = setTimeout(() => setRenderTime(new Date().getTime()), frameRate);\n    return () => {\n      clearTimeout(timeout);\n    };\n  });\n\n  // Automatically start or stop when the delay changes.\n  React.useEffect(() => {\n    if (delayChanged) {\n      setDelayChanged(false);\n      if (startImmediately) {\n        timer.start();\n      } else {\n        timer.stop();\n      }\n    }\n  }, [delay, delayChanged, startImmediately, timer]);\n\n  return (\n    <div style={{ display: \'flex\', flexWrap: \'wrap\', justifyContent: \'space-between\', alignItems: \'flex-start\' }}>\n      <div>\n        <div>\n          <div>\n            <div>\n              Delay:{\' \'}\n              <input\n                type="range"\n                min="0"\n                max="5000"\n                value={delay}\n                onChange={e => {\n                  const newDelay = parseInt(e.target.value);\n                  setDelay(newDelay);\n                  setDelayChanged(true);\n                  if (newDelay === 0) {\n                    setCallbackTime(-1);\n                  }\n                }}\n              />{\' \'}\n              {delay > 0 ? `${delay} ms` : \'Stopwatch\'}\n            </div>\n          </div>\n          <div>\n            <input\n              type="checkbox"\n              id="runOnce"\n              name="runOnce"\n              checked={runOnce}\n              onChange={e => setRunOnce(e.target.checked)}\n            />\n            <label htmlFor="runOnce"> runOnce</label>\n            <input\n              type="checkbox"\n              id="fireImmediately"\n              name="fireImmediately"\n              checked={fireImmediately}\n              onChange={e => setFireImmediately(e.target.checked)}\n            />\n            <label htmlFor="fireImmediately"> fireImmediately</label>\n            <input\n              type="checkbox"\n              id="startImmediately"\n              name="startImmediately"\n              checked={startImmediately}\n              onChange={e => setStartImmediately(e.target.checked)}\n            />\n            <label htmlFor="startImmediately"> startImmediately</label>\n            <br />\n          </div>\n        </div>\n        <div>\n          <button\n            onClick={() => {\n              timer.start();\n            }}\n          >\n            Start\n          </button>\n          <button\n            onClick={() => {\n              timer.stop();\n            }}\n          >\n            Stop\n          </button>\n          <button\n            onClick={() => {\n              timer.pause();\n            }}\n          >\n            Pause\n          </button>\n          <button\n            onClick={() => {\n              timer.resume();\n            }}\n          >\n            Resume\n          </button>\n        </div>\n        <div>\n          {delay > 0 && (\n            <progress value={timer.isStopped() ? 0 : delay - timer.getRemainingTime()} max={delay}>\n              {timer.getRemainingTime()}\n            </progress>\n          )}\n        </div>\n        <table>\n          <tbody>\n            <tr>\n              <td>Callback time:</td>\n              <td>{callbackTime}</td>\n            </tr>\n            <tr>\n              <td>isStarted():</td>\n              <td>{timer.isStarted() + \'\'}</td>\n            </tr>\n            <tr>\n              <td>isStopped():</td>\n              <td>{timer.isStopped() + \'\'}</td>\n            </tr>\n            <tr>\n              <td>isPaused():</td>\n              <td>{timer.isPaused() + \'\'}</td>\n            </tr>\n            <tr>\n              <td>isRunning():</td>\n              <td>{timer.isRunning() + \'\'}</td>\n            </tr>\n            <tr>\n              <td>getStartTime():</td>\n              <td>{timer.getStartTime()}</td>\n            </tr>\n            <tr>\n              <td>getLastFireTime():</td>\n              <td>{timer.getLastFireTime()}</td>\n            </tr>\n            <tr>\n              <td>getNextFireTime():</td>\n              <td>{timer.getNextFireTime()}</td>\n            </tr>\n            <tr>\n              <td>getPauseTime():</td>\n              <td>{timer.getPauseTime()}</td>\n            </tr>\n            <tr>\n              <td>getResumeTime():</td>\n              <td>{timer.getResumeTime()}</td>\n            </tr>\n            <tr>\n              <td>getRemainingTime():</td>\n              <td>{timer.getRemainingTime()}</td>\n            </tr>\n            <tr>\n              <td>getElapsedStartedTime():</td>\n              <td>{timer.getElapsedStartedTime()}</td>\n            </tr>\n            <tr>\n              <td>getElapsedRunningTime():</td>\n              <td>{timer.getElapsedRunningTime()}</td>\n            </tr>\n            <tr>\n              <td>getTotalElapsedPausedTime():</td>\n              <td>{timer.getTotalElapsedPausedTime()}</td>\n            </tr>\n            <tr>\n              <td>getPeriodElapsedPausedTime():</td>\n              <td>{timer.getPeriodElapsedPausedTime()}</td>\n            </tr>\n            <tr>\n              <td>getElapsedResumedTime():</td>\n              <td>{timer.getElapsedResumedTime()}</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n      <div style={{ textAlign: \'center\', border: \'solid 2px lightgray\', padding: \'10px\' }}>\n        <div>\n          Render every:\n          <br />\n          {frameRate} ms\n        </div>\n        <div>\n          <input\n            type="range"\n            min="1"\n            max="5000"\n            value={frameRate}\n            onChange={e => {\n              setFrameRate(parseInt(e.target.value));\n            }}\n          />\n        </div>\n      </div>\n    </div>\n  );\n}\n')))}o&&o===Object(o)&&Object.isExtensible(o)&&!o.hasOwnProperty("__filemeta")&&Object.defineProperty(o,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/__docz__/demo.mdx"}}),o.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-docz-demo-mdx-8d27a7bba063d89dd465.js.map