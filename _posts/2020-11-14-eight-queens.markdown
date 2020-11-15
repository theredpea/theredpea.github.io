---
layout: post
title:  "'Eight Queens' Problem with Observable"
date:   2020-11-14 11:50:30 -0700
excerpt_separator: <!--more-->
---

@coolbutuseless has a great [blog on solving the "Eight Queens" problem using R.](https://coolbutuseless.github.io/2020/11/02/8-queens-chess-problem/)
To challenge myself in translating "R" code, I created an Observable notebook. [See the final product here](https://observablehq.com/@theredpea/eight-queens){:target="_blank"}; read on to learn how I did it.

<!--more-->


# Setdiff is Nonsymmetrical

This step makes sense; it eliminates diagonals movements that would take a piece *outside* the boundaries of the chessboard.
But it isn't strictly necessary...

```
  diags <- diags[diags > 0 & diags < 9]
```

... it isn't necessary because we use `setdiff`
The `setdiff` function will only remove items from the *first argument* (`.x`), if they appear in the *second argument* (`.y`); (in other words, the `setdiff` function will not include any items from the *second argument*). That's because the  `setdiff` function is not the *symmetric* difference...

```
possible_placements <- setdiff(possible_placements, diags)
```

... as described [here](https://www.rdocumentation.org/packages/prob/versions/1.0-1/topics/setdiff):
 > the elements of setdiff(x,y) are **those elements in x but not in y**.

**EDIT**
I noticed the author skipped the filtering step in the "compacted" solution:
```
f=function(q){L=length(q)
if(L==8){q}else{flatten(map(setdiff(v,c(q,q+L:1,q-L:1)),~f(c(q,.))))}}
```


# Tilde plus dot

I didn't understand what this code was doing:
```
  possible_placements %>% 
    map(~place_queen(c(queens, .x))) %>%
    keep(~length(.x) > 0) %>%
    flatten()
``` 

Specifically I didn't understand what the tilde `~` and dot operator `.` were doing in this line: 
```
    map(~place_queen(c(queens, .x))) %>%
```

Turns out the tilde `~` creates a simple lambda function, whose arguments are accessed via the dot `.`, as explained [here](https://stackoverflow.com/a/53160041/1175496):
 > As MrFlick pointed out, these are two separate operators. Together, they provide a special mechanism that allows tidyverse packages to construct lambda functions on the fly. This is best described in ?purrr::as_mapper. Specifically,
 >  > If a formula, e.g. ~ .x + 2, it is converted to a function. There are three ways to refer to the arguments:
 >  > 1. For a single argument function, use `.`
 >  > 1. For a two argument function, use `.x` and `.y`
 >  > 1. For more arguments, use `..1`, `..2`, `..3` etc

In this case, could replace the first argument of a single-argument function, so would this be equivalent (replace `.x` with `.`)?
```
    map(~place_queen(c(queens, .))) %>%
```
In fact, if the inner function is `c(...)`, then isn't `c(., queens)` the equivalent of `c(queens, .)`; so we could use the "implicit" version: (do we need braces?) 
No, this is for the *piping* dot operator, vs the *tilde-lambda* dot operator...
```
    map(~place_queen(c(queens))) %>%
```


# Last statements of R functions are automatically returned

I didn't understand how the recursive `place_queen` R function would return a value; I saw a return statement once it found a solution, but I didn't see a return statement at the end of the function, to return the `possible_placements` once finished recursively searching all solutions and flattening them.

I learned that R functions [will automatically return the last statement](https://www.oreilly.com/library/view/the-art-of/9781593273842/ch07s04.html):
 > You can transmit a value back to the caller by explicitly calling return(). **Without this call, the value of the last executed statement will be returned by default.** For instance, consider the oddcount() example from Chapter 1:

# Recursive functions in Observable
Observable will complain about a "circular definition" unless we follow [this approach](https://talk.observablehq.com/t/recursive-function-as-block-value/734/2); i.e. using the `function declaration`, vs assigning a function to the block's value.

# `flatten()` in Javascript
I struggled to figure out the equivalent of the ` %>% flatten()`.

In fact, the Javascript [`Array.prototype.flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) is the equivalent of `flatten()`
When I first used `.flat()`, my result was a single array of 736 numbers (that's all 92 solutions x 8 positions per solution) - vs an array with 92 elements, each of which is an 8-element Array.

I realized my `.flat()` was "over-flattening", because my "solutions" were a normal Javascript array (i.e. my solutions were susceptible to being flattened!):

```
if (queens.length===8){
  return queens;
}
```

This would be the equivalent to the R code, in the sense that it returns an object that *can be flattened*
```
  return(queens)
```

So I changed my solutions to an object, with a `solution` property and a `length` property.

```
  if (queens.length == 8) {
    let result = { solution: queens, length: queens.length };
    return result;
  }
```

This is closer to the original R code, in the sense that it returns an object that *is not flattened*:
```
    return(list(queens))
```

Notice the use of `unlist()` later on (in the "compact" version of R code), and remember `flatten()` is different than `unlist()` as described [here](https://purrr.tidyverse.org/reference/flatten.html):
 > `flatten()` removes a level hierarchy from a list. They are similar to `unlist()`, but **they only ever remove a single layer of hierarchy and they are type-stable**, so you always know what the type of the output is.

Notice that the "compact" version of R code


# ggplot requires `show()` inside a function
I had to call `show()` or `print()` to see the `geom_tile` visualization, [as described here](https://stackoverflow.com/questions/26643852/ggplot-plots-in-scripts-do-not-display-in-rstudio), and [here](https://ggplot2.tidyverse.org/reference/print.ggplot.html).

 > You will, however, need to call `print()` explicitly if you want to draw a plot inside a function or for loop.

Notice that the plots are rotated 90 degrees, so they aren't oriented the way I expect. The `queens_df` should use `cols` as the x-axis, not the `rows`:
```
  p <- ggplot(queens_df, aes(rows, cols)) + # ...
```
... so just swap the `rows`, and `cols`, then we get the right orientation:
```
  p <- ggplot(queens_df, aes(cols, rows)) + # ...
```

# Code golf
The original blogpost compresses all the R code necessary to 1) find all solutions and 2) visualize all solutions, into < 160 characters (so it can fit in a tweet!)



# Visualizing Recursive solutions
Some links: 
 - [Recursion and Memory Visualization (from educative)](https://www.educative.io/courses/recursion-for-coding-interviews-in-python/B8wMXy0nmvk)
 - [Visualizing Recursion in Principles of Computing (coursera)](https://www.coursera.org/lecture/principles-of-computing-2/visualizing-recursion-pubjS)
 - [Visualizing a chessboard in Observable](https://observablehq.com/@harrislapiroff/chessboard)
