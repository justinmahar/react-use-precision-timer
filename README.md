<h2 align="center">
  ⏱️ React Use Precision Timer
</h2>
<h3 align="center">
  A versatile precision timer hook for React. Doubles as a stopwatch.
</h3>
<p align="center">
  <a href="https://badge.fury.io/js/react-use-precision-timer" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/react-use-precision-timer.svg" alt="npm Version" /></a>&nbsp;
  <a href="https://github.com/justinmahar/react-use-precision-timer/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/GitHub-Source-success" alt="View project on GitHub" /></a>&nbsp;
  <a href="https://github.com/justinmahar/react-use-precision-timer/actions?query=workflow%3ADeploy" target="_blank" rel="noopener noreferrer"><img src="https://github.com/justinmahar/react-use-precision-timer/workflows/Deploy/badge.svg" alt="Deploy Status" /></a>
</p>
<!-- [lock:donate-badges] 🚫--------------------------------------- -->
<p align="center">
  <a href="https://ko-fi.com/justinmahar"><img src="https://img.shields.io/static/v1?label=Buy%20me%20a%20coffee&message=%E2%9D%A4&logo=KoFi&color=%23fe8e86" alt="Buy me a coffee" /></a>&nbsp;<a href="https://github.com/sponsors/justinmahar" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" alt="Sponsor"/></a>
</p>
<!-- [/lock:donate-badges] ---------------------------------------🚫 -->

## Documentation

Read the **[official documentation](https://justinmahar.github.io/react-use-precision-timer/)**.

[![Demo](https://justinmahar.github.io/react-use-precision-timer/images/timer-demo.gif "Demo")](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-demo--docs)

👁️ **[Live Demo](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-demo--docs)**

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

### 🆕 New In Version 3

Version 3 of this package features a complete redesign to reduce unnecessary renders, plus the addition of a new convenience hook.
- Internally, timer state is now tracked via React refs and timer options are memoized for you. These changes significantly improved performance.
- The useTimer hook's signature has been changed. The callback is now provided as the second argument, and should be cached using [`React.useCallback()`](https://beta.reactjs.org/apis/react/useCallback) to optimize render performance. Refer to the [Quick Start](#quick-start) section below.
- The [useMomentaryBool](#momentary-boolean) hook was added.

<!-- [lock:donate] 🚫--------------------------------------- -->

## Donate 

If this project helped you, please consider buying me a coffee or sponsoring me. Your support is much appreciated!

<a href="https://ko-fi.com/justinmahar"><img src="https://img.shields.io/static/v1?label=Buy%20me%20a%20coffee&message=%E2%9D%A4&logo=KoFi&color=%23fe8e86" alt="Buy me a coffee" /></a>&nbsp;<a href="https://github.com/sponsors/justinmahar" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" alt="Sponsor"/></a>

<!-- [/lock:donate] ---------------------------------------🚫 -->

## Table of Contents

- [Documentation](#documentation)
- [Overview](#overview)
  - [Features include:](#features-include)
  - [🆕 New In Version 3](#-new-in-version-3)
- [Donate](#donate)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Quick Start](#quick-start)
  - [Repeating Timer](#repeating-timer)
  - [One-Time Delay](#one-time-delay)
  - [Stopwatch](#stopwatch)
  - [Momentary Boolean](#momentary-boolean)
  - [Other Usage](#other-usage)
- [TypeScript](#typescript)
- [Icon Attribution](#icon-attribution)
- [Contributing](#contributing)
- [⭐ Found It Helpful? Star It!](#-found-it-helpful-star-it)
- [License](#license)

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
const callback = React.useCallback(() => console.log('Boom'), []);
// The callback will be called every 1000 milliseconds.
const timer = useTimer({ delay: 1000 }, callback);
```

In a handler or effect:

```jsx
timer.start();
```

The following functions can be used to control the [Timer](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usetimer--docs#timer):

- `timer.start()` - Start the timer. If already started, will restart the timer. You can optionally pass a start time in Unix epoch milliseconds.
- `timer.stop()` - Stop the timer.
- `timer.pause()` - Pause the timer.
- `timer.resume()` - Resume the timer.

Refer to [Timer](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usetimer--docs#timer) for all available functions, including getters for elapsed times.

### One-Time Delay

If you'd like to run a callback after a one-time delay, use the helper hook [useDelay](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usedelay--docs):

```jsx
import { useDelay } from 'react-use-precision-timer';
```

In your function component:

```jsx
const callback = React.useCallback(() => console.log('Boom'), []);
// Will call once after 1000ms.
const onceTimer = useDelay(1000, callback);
```

In a handler or effect:

```jsx
onceTimer.start();
```

This will call the callback after the provided 1000 millisecond delay only once.

### Stopwatch

The timer also functions as a stopwatch when no delay is provided. You can use the helper hook [useStopwatch](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usestopwatch--docs):

```jsx
import { useStopwatch } from "react-use-precision-timer";
```

```jsx
const stopwatch = useStopwatch();
```

Use `start()`, `stop()`, `pause()`, and `resume()` to control the stopwatch.

Stopwatch is a [Timer](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usetimer--docs#timer) object. Refer to Timer's getters to retrieve elapsed running time, paused time, and so forth.

Calling start while a stopwatch is already running will restart it.

### Momentary Boolean

For convenience, the [useMomentaryBool](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usemomentarybool--docs) hook has been included to momentarily toggle a boolean. This wraps the [useDelay](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usedelay--docs) hook.

This is very useful for momentary notifications, such as a copy button that shows a momentary checkmark to indicate the operation succeeded.

```jsx
import { useMomentaryBool } from 'react-use-precision-timer';
```

In your function component:

```jsx
// Toggle to true, then back to false after 1000ms.
const [value, toggle] = useMomentaryBool(false, 1000);
```

Calling `toggle()` will set the boolean to `true`, then back to `false` after a 1000 millisecond delay.

### Other Usage

See [useTimer](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usetimer--docs) for all other hook options and timer functions.

<!-- [lock:typescript] 🚫--------------------------------------- -->

## TypeScript

Type definitions have been included for [TypeScript](https://www.typescriptlang.org/) support.

<!-- [/lock:typescript] ---------------------------------------🚫 -->

<!-- [lock:icon] 🚫--------------------------------------- -->

## Icon Attribution

Favicon by [Twemoji](https://github.com/twitter/twemoji).

<!-- [/lock:icon] ---------------------------------------🚫 -->

<!-- [lock:contributing] 🚫--------------------------------------- -->

## Contributing

Open source software is awesome and so are you. 😎

Feel free to submit a pull request for bugs or additions, and make sure to update tests as appropriate. If you find a mistake in the docs, send a PR! Even the smallest changes help.

For major changes, open an issue first to discuss what you'd like to change.

<!-- [/lock:contributing] --------------------------------------🚫 -->

## ⭐ Found It Helpful? [Star It!](https://github.com/justinmahar/react-use-precision-timer/stargazers)

If you found this project helpful, let the community know by giving it a [star](https://github.com/justinmahar/react-use-precision-timer/stargazers): [👉⭐](https://github.com/justinmahar/react-use-precision-timer/stargazers)

## License

See [LICENSE.md](https://justinmahar.github.io/react-use-precision-timer/?path=/docs/license--docs).