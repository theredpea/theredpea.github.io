---
layout: post
title:  "C# Refreshers"
date:   2023-10-12 11:45 -0600
excerpt_separator: <!--more-->
---
I had an interview recently that really challenged me.
The interview was a collaborative coding challenge using C#. 
I was reminded of many C# features (datatypes, operators, etc), and I was taught about principles & performance characteristics.
I outline these below because they inspired me!

<!--more-->

# Reserved Keywords
Some reserved keywords:
- `event` is a reserved keyword


# Null Coalescing Operator `??` and `??=`
[More here](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/null-coalescing-operator)
Some examples:

```
TODO
```

# Null-Conditional Operator `?.`
A variation on the [member access operator](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/member-access-operators)


# Classes (Reference Types) are Nullable
[More here](https://stackoverflow.com/a/9609925/1175496)


# `System.Collections.Generic` Datatypes & Performance Characteristics
More on the [`System.Collections.Generic` here](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic?view=net-7.0) and [performance characteristics here](https://stackoverflow.com/a/935631/1175496)

## `List`
Inserting into a List is:

- TODO Confirm
- TODO Link the Python algorithms book
- TODO describe "amortized"
- O(1) if list need not be reallocated
- O(n) if list needs to be reallocated


## `Dictionary`
TODO

## `SortedList`
I hadn't used `SortedList` before... 
TODO

