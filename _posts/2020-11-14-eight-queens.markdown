---
layout: post
title:  "Eight Queen Problems with Observable"
date:   2020-11-14 11:50:30 -0700
excerpt_separator: <!--more-->
---

@coolbutuseless has a great [blog on solving the "Eight Queens" problem using R.](https://coolbutuseless.github.io/2020/11/02/8-queens-chess-problem/)
To challenge myself in translating "R" code, I created an Observable notebook. 

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

... as described here
 > the elements of setdiff(x,y) are those elements *in x* but not in y.


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

 >  > For a single argument function, use .

 >  > For a two argument function, use .x and .y

 >  > For more arguments, use ..1, ..2, ..3 etc

