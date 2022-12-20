<h2 align="center">
  ⏱️ React Use Precision Timer
</h2>
<h3 align="center">
  A versatile precision timer hook for React. Doubles as a stopwatch.
</h3>
<p align="center">
  <a href="https://badge.fury.io/js/react-use-precision-timer" target="_blank" rel="noopener noreferrer">
    <img src="https://badge.fury.io/js/react-use-precision-timer.svg" alt="npm Version" />
  </a>
  <a href="https://github.com/justinmahar/react-use-precision-timer/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/GitHub-Source-success" alt="View project on GitHub" />
  </a>
  <a href="https://github.com/justinmahar/react-use-precision-timer/actions?query=workflow%3ADeploy" target="_blank" rel="noopener noreferrer">
    <img src="https://github.com/justinmahar/react-use-precision-timer/workflows/Deploy/badge.svg" alt="Deploy Status" />
  </a>
</p>

## Documentation

Read the **[official documentation](https://justinmahar.github.io/react-use-precision-timer/)**.

[![Demo](https://justinmahar.github.io/react-use-precision-timer/images/timer-demo.gif "Demo")](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-demo--page)

👁️ **[Live Demo](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-demo--page)**

## Donate 

This project is the result of countless hours of work and I really hope it saves you hours of your own precious time.

If you would like to join others in showing support for the development of this project, then please feel free to buy me a coffee.

<a href="https://paypal.me/thejustinmahar/5">
  <img src="https://justinmahar.github.io/react-use-precision-timer/support/coffee-1.png" alt="Buy me a coffee" height="35" />
</a> <a href="https://paypal.me/thejustinmahar/15">
  <img src="https://justinmahar.github.io/react-use-precision-timer/support/coffee-3.png" alt="Buy me 3 coffees" height="35" />
</a> <a href="https://paypal.me/thejustinmahar/25">
  <img src="https://justinmahar.github.io/react-use-precision-timer/support/coffee-5.png" alt="Buy me 5 coffees" height="35" />
</a>

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

## 🆕 New In Version 3

Version 3 of this package features a complete redesign to reduce unnecessary renders. Timer state is now tracked via React refs.

All timer options given to the hook should be memoized. Refer to the [Quick Start](#quick-start) section below.

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
const timerOptions = React.useMemo(() => {
  return {
    // The callback will be called every 1000 milliseconds.
    delay: 1000,
    callback: () => console.log('Boom'),
  };
}, []);
const timer = useTimer(timerOptions);
```

In a handler or effect:

```jsx
timer.start();
```

The following functions can be used to control the [Timer](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usetimer--page#timer):

- `timer.start()` - Start the timer. If already started, will restart the timer. You can optionally pass a start time in Unix epoch milliseconds.
- `timer.stop()` - Stop the timer.
- `timer.pause()` - Pause the timer.
- `timer.resume()` - Resume the timer.

Refer to [Timer](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usetimer--page#timer) for all available functions, including getters for elapsed times.

### One-Time Delay

If you'd like to run a callback after a one-time delay, use the helper hook [useDelay](https://justinmahar.github.io/react-use-precision-timer/useDelay):

```jsx
import { useDelay } from "react-use-precision-timer";
```

```jsx
const callback = React.useCallback(() => console.log("Boom"), []);
// Call once after 1000ms.
useDelay(1000, callback);
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

Stopwatch is a [Timer](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usetimer--page#timer) object. Refer to Timer's getters to retrieve elapsed running time, paused time, and so forth.

Calling start while a stopwatch is already running will restart it.

### Other Usage

See [useTimer](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usetimer--page) for all other hook options and timer functions.

## TypeScript

Type definitions have been included for [TypeScript](https://www.typescriptlang.org/) support.

## Icon Attribution

Favicon by [Twemoji](https://github.com/twitter/twemoji).

## Contributing

Open source software is awesome and so are you. 😎

Feel free to submit a pull request for bugs or additions, and make sure to update tests as appropriate. If you find a mistake in the docs, send a PR! Even the smallest changes help.

For major changes, open an issue first to discuss what you'd like to change.

## ⭐ Found It Helpful? [Star It!](https://github.com/justinmahar/react-use-precision-timer/stargazers)

If you found this project helpful, let the community know by giving it a [star](https://github.com/justinmahar/react-use-precision-timer/stargazers): [👉⭐](https://github.com/justinmahar/react-use-precision-timer/stargazers)

## License

See [LICENSE.md](https://justinmahar.github.io/react-use-precision-timer/?path=/story/license--page).