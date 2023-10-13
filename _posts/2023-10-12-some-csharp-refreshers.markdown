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
A variation on the [`.` member access operator](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/member-access-operators)
It can also be used for index access operator `[...]` becomes `?[...]`

## Error with Chaining Null-Conditional
I thought this operator couldn't be used on every type. I got an error on this line:
```
SortedEventsByTicker // a SortedList<TKey,TValue>
            .GetValueOrDefault(EventTicker)
            ?.LastOrDefault() 
            ?.Value // <--------- error
```

The error was:
> Operator '?' cannot be applied to operand of type 'KeyValuePair<long, Solution.TradingEvent>'

When I look closer, it's not complaining about the operator `?.` being used on a `KeyValuePair`, it's complaining about operator `?` (the [conditional/ternary operator?](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/conditional-operator), maybe the [nullability operator](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-value-types)?)
 - Maybe the error is because `?.` is executed right-to-left (does that mean it's [right-associative](https://en.wikipedia.org/wiki/Operator_associativity)?)
 - Is this error specific to [replit, the C# interpreter it is using?](https://replit.com/)?

I fixed the error with parentheses, which is why I thought associativity was part of the problem...
```
(SortedEventsByTicker // a SortedList<TKey,TValue>
            .GetValueOrDefault(EventTicker)
            ?.LastOrDefault()) // <------- parentheses
            ?.Value 
```

## Short-Circuiting
It's also interesting to learn that `?.` is ["short-circuiting"](https://stackoverflow.com/a/48831683/1175496).
 - Does short-circuiting mean I can avoid "chaining" the operator like `A?.B?.DoSomething(C)`, can I just do `A?.B.DoSomething(C)`?
   - No, I don't think so.
 - Note [short-circuiting](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/member-access-operators#null-conditional-operators--and-) is explicitly broken using the parentheses as I did above
   - > if the chained member access is interrupted, for example by parentheses as in (A?.B).C(), short-circuiting doesn't happen.
     
## `LastOrDefault`

More on the [`LastOrDefault` method here](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.lastordefault?view=net-7.0)

 > The **default value for reference and nullable types is null.**
 > The LastOrDefault method does not provide a way to specify a default value. If you want to specify a default value other than default(TSource), use the `DefaultIfEmpty<TSource>(IEnumerable<TSource>, TSource)` method as described in the Example section.

# Classes (Reference Types) are Nullable
[More here](https://stackoverflow.com/a/9609925/1175496). Just a quick reminder. Other "primitive" types must be made nullable using the `?` operator like `float` -> `float?`


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

