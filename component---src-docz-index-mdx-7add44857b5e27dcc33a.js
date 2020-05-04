(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"KZ+V":function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return p})),a.d(t,"default",(function(){return d}));a("1c7q"),a("abGl"),a("gZHo"),a("Fdmb"),a("Ir+3"),a("2mQt");var r=a("/FXl"),n=a("TjRS"),i=a("CLH9"),l=a("Vkpr"),c=a.n(l),b=a("isvF"),s=a.n(b);a("aD51");function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}var p={};void 0!==p&&p&&p===Object(p)&&Object.isExtensible(p)&&!p.hasOwnProperty("__filemeta")&&Object.defineProperty(p,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/__docz__/index.mdx"}});var u={_frontmatter:p},m=n.a;function d(e){var t=e.components,a=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,["components"]);return Object(r.b)(m,o({},u,a,{components:t,mdxType:"MDXLayout"}),Object(r.b)("div",{style:{display:"flex",alignItems:"center"}},Object(r.b)("div",null,Object(r.b)("h1",null,"React Use Precision Timer")),Object(r.b)("div",null,Object(r.b)("a",{href:"https://github.com/devboldly/react-use-precision-timer/",target:"_blank",rel:"noopener noreferrer"},Object(r.b)(i.SvgIcon,{src:c.a,size:28,style:{margin:"0 0 0 20px"},mdxType:"SvgIcon"})))),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"A versatile precision timer hook for React. Doubles as a stopwatch.")),Object(r.b)("a",{href:"https://devboldly.github.io/react-use-precision-timer/demo"},Object(r.b)("img",{src:s.a})),Object(r.b)("p",null,"👁️ ",Object(r.b)("strong",{parentName:"p"},Object(r.b)("a",o({parentName:"strong"},{href:"/react-use-precision-timer/demo"}),"Live Demo"))),Object(r.b)("h2",{id:"overview"},"Overview"),Object(r.b)("p",null,"A React timer hook that calls the provided callback at regular intervals. Can be used as a stopwatch, too."),Object(r.b)("p",null,"It's accurate, precise, and includes a rich set of options, functionality, and accessors."),Object(r.b)("h3",{id:"features-include"},"Features include:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"⏰ Timeout and timestamp based"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Based on ",Object(r.b)("inlineCode",{parentName:"li"},"setTimeout()")," and Unix times, not ticks."))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"🎯 Accurate and precise"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Perfect mean accuracy with no wandering, with sub 10ms callback precision."))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"💪 Doesn't choke under pressure"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Resilient to expensive callbacks and low timer delays."))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"🧰 Versatile"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Can be used as a timer, one-time delay, or stopwatch. Additional options available."))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"⏯️ Pause and resume"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Supports pausing, and tracks cumulative elapsed pause time between resumes."))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"🌞 Accessors for everything"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Includes getters for everything under the sun! Know all the things.")))),Object(r.b)("h2",{id:"installation"},"Installation"),Object(r.b)("pre",null,Object(r.b)("code",o({parentName:"pre"},{}),"npm i react-use-precision-timer\n")),Object(r.b)("h2",{id:"quick-start"},"Quick Start"),Object(r.b)("h3",{id:"repeating-timer"},"Repeating Timer"),Object(r.b)("pre",null,Object(r.b)("code",o({parentName:"pre"},{className:"language-jsx"}),"import { useTimer } from 'react-use-precision-timer';\n")),Object(r.b)("p",null,"In your function component: "),Object(r.b)("pre",null,Object(r.b)("code",o({parentName:"pre"},{className:"language-jsx"}),'// The callback will be called every 1000 milliseconds.\nconst timer = useTimer({ delay: 1000, callback: () => console.log("Boom") });\n')),Object(r.b)("p",null,"In a handler or effect: "),Object(r.b)("pre",null,Object(r.b)("code",o({parentName:"pre"},{className:"language-jsx"}),"timer.start();\n")),Object(r.b)("p",null,"The following functions can be used to control the ",Object(r.b)("a",o({parentName:"p"},{href:"/react-use-precision-timer/useTimer#timer"}),"Timer"),":"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"timer.start()")," - Start the timer. If already started, will restart the timer."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"timer.stop()")," - Stop the timer."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"timer.pause()")," - Pause the timer."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"timer.resume()")," - Resume the timer.")),Object(r.b)("p",null,"Refer to ",Object(r.b)("a",o({parentName:"p"},{href:"/react-use-precision-timer/useTimer#timer"}),"Timer")," for all available functions, including getters for elapsed times."),Object(r.b)("h3",{id:"one-time-delay"},"One-Time Delay"),Object(r.b)("p",null,"If you'd like to run a callback after a one-time delay, use the helper hook ",Object(r.b)("a",o({parentName:"p"},{href:"/react-use-precision-timer/useDelay"}),"useDelay"),":"),Object(r.b)("pre",null,Object(r.b)("code",o({parentName:"pre"},{className:"language-jsx"}),"import { useDelay } from 'react-use-precision-timer';\n")),Object(r.b)("pre",null,Object(r.b)("code",o({parentName:"pre"},{className:"language-jsx"}),'// Call once after 1000ms.\nuseDelay(1000, () => console.log("Boom"));\n')),Object(r.b)("p",null,"The provided callback will be called only once after the provided delay."),Object(r.b)("h3",{id:"stopwatch"},"Stopwatch"),Object(r.b)("p",null,"The timer also functions as a stopwatch when no delay is provided. You can use the helper hook ",Object(r.b)("a",o({parentName:"p"},{href:"/react-use-precision-timer/useStopwatch"}),"useStopwatch"),":"),Object(r.b)("pre",null,Object(r.b)("code",o({parentName:"pre"},{className:"language-jsx"}),"import { useStopwatch } from 'react-use-precision-timer';\n")),Object(r.b)("pre",null,Object(r.b)("code",o({parentName:"pre"},{className:"language-jsx"}),"const stopwatch = useStopwatch();\n")),Object(r.b)("p",null,"Use ",Object(r.b)("inlineCode",{parentName:"p"},"start()"),", ",Object(r.b)("inlineCode",{parentName:"p"},"stop()"),", ",Object(r.b)("inlineCode",{parentName:"p"},"pause()"),", and ",Object(r.b)("inlineCode",{parentName:"p"},"resume()")," to control the stopwatch."),Object(r.b)("p",null,"Stopwatch is a ",Object(r.b)("a",o({parentName:"p"},{href:"/react-use-precision-timer/useTimer#timer"}),"Timer")," object. Refer to Timer's getters to retrieve elapsed running time, paused time, and so forth."),Object(r.b)("p",null,"Calling start while a stopwatch is already running will restart it."),Object(r.b)("h3",{id:"other-usage"},"Other Usage"),Object(r.b)("p",null,"See ",Object(r.b)("a",o({parentName:"p"},{href:"/react-use-precision-timer/useTimer"}),"useTimer")," for all other hook options and timer functions."),Object(r.b)("h2",{id:"typescript"},"TypeScript"),Object(r.b)("p",null,"Type definitions have been included for ",Object(r.b)("a",o({parentName:"p"},{href:"https://www.typescriptlang.org/"}),"TypeScript")," support."),Object(r.b)("h2",{id:"contributing"},"Contributing"),Object(r.b)("p",null,"Open source software is awesome and so are you. 😎"),Object(r.b)("p",null,"Feel free to submit a pull request for bugs or additions, and make sure to update tests as appropriate. If you find a mistake in the docs, send a PR! Even the smallest changes help."),Object(r.b)("p",null,"For major changes, open an issue first to discuss what you'd like to change."),Object(r.b)("p",null,"See ",Object(r.b)("a",o({parentName:"p"},{href:"https://tinyurl.com/kindlingscripts"}),"Kindling")," for npm script documentation."),Object(r.b)("h2",{id:"-found-it-helpful-star-it"},"⭐ Found It Helpful? ",Object(r.b)("a",o({parentName:"h2"},{href:"https://github.com/devboldly/react-use-precision-timer/stargazers"}),"Star It!")),Object(r.b)("p",null,"If you found this project helpful, let the community know by giving it a ",Object(r.b)("a",o({parentName:"p"},{href:"https://github.com/devboldly/react-use-precision-timer/stargazers"}),"star"),": ",Object(r.b)("a",o({parentName:"p"},{href:"https://github.com/devboldly/react-use-precision-timer/stargazers"}),"👉⭐")))}d&&d===Object(d)&&Object.isExtensible(d)&&!d.hasOwnProperty("__filemeta")&&Object.defineProperty(d,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/__docz__/index.mdx"}}),d.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-docz-index-mdx-7add44857b5e27dcc33a.js.map