<h2 align="center">
  <a href="https://github.com/justinmahar/react-use-precision-timer">React Use Precision Timer</a>
</h2>
<h3 align="center">
  A versatile precision timer hook for React. Doubles as a stopwatch.
</h3>
<p align="center">
  <a href="https://badge.fury.io/js/react-use-precision-timer">
    <img src="https://badge.fury.io/js/react-use-precision-timer.svg" alt="npm Version"/>
  </a>
  <a href="https://github.com/justinmahar/react-use-precision-timer/actions?query=workflow%3ATests">
    <img src="https://github.com/justinmahar/react-use-precision-timer/workflows/Tests/badge.svg" alt="Tests Status"/>
  </a>
  <a href="https://github.com/justinmahar/react-use-precision-timer/actions?query=workflow%3ADeploy">
    <img src="https://github.com/justinmahar/react-use-precision-timer/workflows/Deploy/badge.svg" alt="Deploy Status"/>
  </a>
  <a href="https://github1s.com/justinmahar/react-use-precision-timer">
    <img src="https://img.shields.io/badge/View%20in%20VSCode-readonly-blue" alt="View in VSCode"/>
  </a>
</p>

## Documentation

Read the **[official documentation](https://justinmahar.github.io/react-use-precision-timer/)**.

[![Demo](./src/__docz__/images/demo.gif "Demo")](https://justinmahar.github.io/react-use-precision-timer/demo)

👁️ **[Live Demo](https://justinmahar.github.io/react-use-precision-timer/demo)**

## Overview

A React timer hook that calls the provided callback at regular intervals. Can be used as a stopwatch, too.

It's accurate, precise, and includes a rich set of options, functionality, and accessors.

### Features include:

- **⏰ Timeout and timestamp based**
  - Based on `setTimeout()` and Unix times, not ticks.
- **🎯 Accurate and precise**
  - Perfect mean accuracy with no wandering, with sub 10ms callback precision.
- **💪 Doesn't choke under pressure**
  - Resilient to expensive callbacks and low timer delays.
- **🧰 Versatile**
  - Can be used as a timer, one-time delay, or stopwatch. Additional options available.
- **⏯️ Pause and resume**
  - Supports pausing, and tracks cumulative elapsed pause time between resumes.
- **🌞 Accessors for everything**
  - Includes getters for everything under the sun! Know all the things.

## Installation

```
npm i react-use-precision-timer
```

## Quick Start

### Repeating Timer

```jsx
import { useTimer } from "react-use-precision-timer";
```

In your function component:

```jsx
// The callback will be called every 1000 milliseconds.
const timer = useTimer({ delay: 1000, callback: () => console.log("Boom") });
```

In a handler or effect:

```jsx
timer.start();
```

The following functions can be used to control the [Timer](https://justinmahar.github.io/react-use-precision-timer/useTimer#timer):

- `timer.start()` - Start the timer. If already started, will restart the timer.
- `timer.stop()` - Stop the timer.
- `timer.pause()` - Pause the timer.
- `timer.resume()` - Resume the timer.

Refer to [Timer](https://justinmahar.github.io/react-use-precision-timer/useTimer#timer) for all available functions, including getters for elapsed times.

### One-Time Delay

If you'd like to run a callback after a one-time delay, use the helper hook [useDelay](https://justinmahar.github.io/react-use-precision-timer/useDelay):

```jsx
import { useDelay } from "react-use-precision-timer";
```

```jsx
// Call once after 1000ms.
useDelay(1000, () => console.log("Boom"));
```

The provided callback will be called only once after the provided delay.

### Stopwatch

The timer also functions as a stopwatch when no delay is provided. You can use the helper hook [useStopwatch](https://justinmahar.github.io/react-use-precision-timer/useStopwatch):

```jsx
import { useStopwatch } from "react-use-precision-timer";
```

```jsx
const stopwatch = useStopwatch();
```

Use `start()`, `stop()`, `pause()`, and `resume()` to control the stopwatch.

Stopwatch is a [Timer](https://justinmahar.github.io/react-use-precision-timer/useTimer#timer) object. Refer to Timer's getters to retrieve elapsed running time, paused time, and so forth.

Calling start while a stopwatch is already running will restart it.

### Other Usage

See [useTimer](https://justinmahar.github.io/react-use-precision-timer/useTimer) for all other hook options and timer functions.

## TypeScript

Type definitions have been included for [TypeScript](https://www.typescriptlang.org/) support.

## Logo Attribution

Logo graphics by [Twemoji](https://github.com/twitter/twemoji), licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/). Favicon by [favicon.io](https://favicon.io/emoji-favicons/).

## Contributing

Open source software is awesome and so are you. 😎

Feel free to submit a pull request for bugs or additions, and make sure to update tests as appropriate. If you find a mistake in the docs, send a PR! Even the smallest changes help.

For major changes, open an issue first to discuss what you'd like to change.

See [Kindling](https://tinyurl.com/kindlingscripts) for npm script documentation.

## ⭐ Found It Helpful? [Star It!](https://github.com/justinmahar/react-use-precision-timer/stargazers)

If you found this project helpful, let the community know by giving it a [star](https://github.com/justinmahar/react-use-precision-timer/stargazers): [👉⭐](https://github.com/justinmahar/react-use-precision-timer/stargazers)

## MIT License

```
Copyright © 2020 Justin Mahar https://github.com/justinmahar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
