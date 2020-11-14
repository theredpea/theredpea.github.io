---
layout: post
title:  "Observable Notebooks: Promise syntax vs await syntax"
date:   2020-09-27 10:50:30 -0700
excerpt_separator: <!--more-->
---

Observable Notebooks* support Promise syntax, and the newer [ECMAScript async/await syntax](https://tc39.es/ecma262/#sec-async-function-definitions). As shown in their [introduction to Promises](https://observablehq.com/@observablehq/introduction-to-promises). My post will explore more comparisons of their syntax, and some pros/cons of each. 

<!--more-->  

# Syntax Examples 
await syntax and Promise syntax are not new to `Observable notebooks`*; the pros and cons apply in modern Javascript too; check out [these other resources](https://medium.com/better-programming/should-i-use-promises-or-async-await-126ab5c98789) that compare the two in Javascript. [Mozilla's `await` documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) also gives an example of equivalent await vs Promise syntax.

TODO: Footnote
*Don't confuse [Observable Notebooks](https://observablehq.com/)  with ["Observables" (Reactive) (RxJS)](https://rxjs-dev.firebaseapp.com/); my blog is referring to Observable **Notebooks**. If you're interested in "reactive" Observable *objects* vs Promise *objects*, check out [a different article.](https://medium.com/javascript-everyday/javascript-theory-promise-vs-observable-d3087bc1239a)

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

## Implicit vs explicit await
Observable *implicitly awaits* promises, but we could also make it explicit by adding the `await` keyword in the cell's expression:
``` 
await Promises.delay(3000, "Hello, ").then(greeting => greeting + "world!")
```

## Promise.all
`Promise.all` is supports *parallelism* better than `await`.  Note the [Mozilla documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)) (emphasis added)

 > If you wish to safely perform two or more jobs in parallel, you **must await a call to `Promise.all`, or `Promise.allSettled`**.

So parallelism is best supposed by `Promise.all`, as [repeated here](https://medium.com/better-programming/should-i-use-promises-or-async-await-126ab5c98789)

 > To run promises in parallel, create an array of promises and then use Promise.all(promisesArray).

## Error Handling 
Note the [Mozilla documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) also compares `concurrentStart` ("CONCURRENT START with await")  vs `concurrentPromise` ("CONCURRENT START with Promise.all"):

 > Note that functions `concurrentStart` and `concurrentPromise` are not functionally equivalent.



# await syntax notes
## Using with a code block
The `await` syntax example uses a *code block*.  

While `await` does **not require a code block**.
This specific `await` example **does require** a *code block* because it defines *local variables using the `let` keyword*. (Observable's [Introduction to Code](https://observablehq.com/@observablehq/introduction-to-code) explains the difference between two types of cell values: *expressions* and *blocks* (aka *code blocks*))

To demonstrate that the `await` syntax does not *require a code block*; this cell uses `await`, but *doesn't* assign the result to `let greeting`; just evaluates with parentheses -- no *code block* required:
```
(await Promises.delay(3000, "Hello, ")) + "world"
```

## await makes your code "easier to follow"
TODO: Find where this argument.

## `async` keyword is implied
`await` syntax is designed to work with `async functions`, according to the [ECMAScript specification](https://tc39.es/ecma262/#sec-async-function-definitions), and [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await):
 > The `await` operator... can only be used inside an async function.

So why don't we use the word `async` , anywhere in our Observable notebook code, above? It seems like `await` is allowed at the top-level of Observable and certain Javascript code:
an Observable cell expression
an Observable cell block
Chrome console

But notice when you try to use `await` inside an explicit function *the function must be marked async, or your code will fail*

This code fails in Chrome console: 
``` new_func = function(){ await new Promise((resolve)=>setTimeout( ()=>resolve('hi'), 3000)) } ```
 > Uncaught SyntaxError: await is only valid in async function

This code fails in Observable:
```
{
  let new_func = function(){ await Promise((resolve)=>setTimeout( ()=>resolve('hi'), 3000)) }
}
```
> SyntaxError: Unexpected token (pointing after the `await`; before the `Promise`)

To fix it, add the `async` keyword before the function. (Remember, [Observable's not Javascript](https://observablehq.com/@observablehq/observables-not-javascript?collection=@observablehq/introduction))

# Conclusion
Here are some takeaways:
 - They're not mutually exclusive; they work well together! 
 - Use `Promise.all()` if you need parallelism
 - Use `await` for more "readable" code