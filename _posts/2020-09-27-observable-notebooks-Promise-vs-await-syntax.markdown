---
layout: post
title:  "Observable Notebooks: Promise syntax vs await syntax"
date:   2020-09-27 10:50:30 -0700
excerpt_separator: <!--more-->
---

Observable Notebooks* support Promise syntax, and the newer ECMA ___ await syntax. As shown in their [introduction to Promises](https://observablehq.com/@observablehq/introduction-to-promises). My post will explore more comparisons of their syntax, and some pros/cons of each. 

*Don't confuse [Observable Notebooks](https://observablehq.com/)  with ["Observables" (Reactive) (RxJS)](https://rxjs-dev.firebaseapp.com/); my blog is referring to Observable **Notebooks**.
<!--more-->  

# Syntax Examples 
await syntax and Promise syntax are not new to `Observable notebooks`; the pros and cons apply in modern Javascript too; check out [these other resources](https://medium.com/better-programming/should-i-use-promises-or-async-await-126ab5c98789) that compare the two in Javascript. [Mozilla's `await` documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) also gives an example of equivalent await vs Promise syntax.

However, some nuances are specific to *Observable notebooks*; [The Observable Introduction to Promises](https://observablehq.com/@observablehq/introduction-to-promises) gives an example of Promise syntax and an example of await syntax; the examples produce the same result (so they're equivalent).

Note that both examples begin with an *asyc operation* using `Promise.delay(...)`; the string `"Hello, "` is returned after 3 seconds.

## Promise syntax example
```
Promises.delay(3000, "Hello, ").then(greeting => greeting + "world!")
```

## await syntax example
```
{
  let greeting = await Promises.delay(3000, "Hello, ");
  return greeting + "world!";
}
```


# Promise syntax notes
## Implicitly await promises across cell boundaries
Because Observable *implicitly awaits promises across cell boundaries*, and the return value of the cell is a Promise (`Promises.delay(...).then(greeting => greeting + "world!")` returns a Promise); Observable gets the awaited result: `"Hello, world!"`:
> Observable implicitly awaits promises across cell boundaries, so you often don’t need to deal with a promise directly.

## Could add explicit await
Observable *implicitly awaits* promises, but we could also make it explicit by adding the `await` keyword in the cell's expression:
``` 
await Promises.delay(3000, "Hello, ");
```

## Promise.all
`Promise.all` is more flexible (allows parallelism) than the `await` equivalent. Note the [Mozilla documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) compares "CONCURRENT START with Promise.all" vs "PARALLEL with await Promise.all"


## await syntax notes
## Requires a code block
The await syntax example uses a *code block* , which is required because it defines local variables using the `let` keyword. (Observable's [Introduction to Code](https://observablehq.com/@observablehq/introduction-to-code) explains the difference between two types of cell values: *expressions* and *blocks* (aka *code blocks*))

## await makes your code "easier to follow"
TODO: Find where this argument.


# Conclusion
They're not mutually exclusive; they work well together! 