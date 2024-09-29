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

Javascript also has the ["*nullish*  coalescing"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) and ["nullish coalescing assignment"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment) operators. 

Javascript calls it "nullish" because Javascript `null` is distinct from Javascript `undfined`, Javascripts "nullish coalescing" operator works in both scenarios (emphasis added):
 > ...when its left-hand side operand is **null or undefined**...

# Null-Conditional Operator `?.` (the "Elvis Operator")
A variation on the [`.` member access operator](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/member-access-operators)
It can also be used for index access operator `[...]` becomes `?[...]`

## Comparison with Javascript
The C# "null-conditional operator" is called the ["optional chaining" operator in Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining).

Both of the objects short-circuit -- if any object higher in the chain is null, it ignores all subsequent operators.
In this Javascript example, I don't use the optional chaining operator on `p2` or `p3` because using it on p1 is sufficient.

If  `p1` is not defined, this expression returns `'name'` without erroring about `p2` and `p3` nonexistence.
``` window.p1?.p2.p3 ?? 'name' ```

However, if `p1` *did* exist, but then its `p2` was not defined, the above expression would cause an `TypeError`:.

```
window.p1 = {};
window.p1?.p2.p3 ?? 'name'
 > Uncaught TypeError: Cannot read properties of undefined (reading 'p3')
```

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
 - Is this error specific to [replit; maybe the C# interpreter it is using?](https://replit.com/)?
 - TODO: Check a simpler case on replit; check the same case with different C# interpreter

I fixed the error by adding parentheses, which is why I thought associativity was part of the problem...
```
(SortedEventsByTicker // a SortedList<TKey,TValue>
            .GetValueOrDefault(EventTicker)
            ?.LastOrDefault()) // <------- parentheses
            ?.Value 
```

## Short-Circuiting
It's also interesting to learn that `?.` is ["short-circuiting"](https://stackoverflow.com/a/48831683/1175496).
 - Does short-circuiting mean I can avoid "chaining" the operator like `A?.B?.DoSomething(C)`, can I just do `A?.B.DoSomething(C)`?
   - Yes, can do that, it means if A is null it won't attempt to access `B` or `C` or anything else to the right of the operator:
   - > If `A` might be null but `B` and `C` wouldn't be null if `A` isn't null, you only need to apply the null-conditional operator to A:
   -  > `A?.B.C();`
   -  Note this part particularly: if "`B` and `C` wouldn't be null"
 -  Don't get confused, **short-circuiting** does not mean there are "implied" null conditional operators. There is no implied nullish operator after the `B`; these are *not* equivalent: `A?.B.C();` and `A?.B?.C();`
    -  In other words, if `B` or `C` were null, it would fail.
 -Also note [short-circuiting](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/member-access-operators#null-conditional-operators--and-) is interrupted with parentheses:
   - > if the chained member access is interrupted, for example by parentheses as in (A?.B).C(), short-circuiting doesn't happen.
   - So these are not equivalent either: `A?.B.C();` and  `(A?.B).C();`

Also compare C# and Javascript
C# has "null conditional" operators for both "members" and "elements": a member access (`?.`) or element access (`?[]`)
C# does *not* have a null conditional operator for *methods*, like `?.(...)` or `?(...)`

[Consider this code...](https://dotnetfiddle.net/43ZdNi)
```
StringMaker s = null;
// this fails with a syntax error and "Compilation error: 'method group' cannot be made nullable."
Console.WriteLine(s?.MakeString?.());
// this line fails with "Identifier expected" and "Compilation error: 'Program.StringMaker.MakeString()' is a method, which is not valid in the given context"
Console.WriteLine(s?.MakeString?());
```

Javascript's operator works on functions/methods, too:
```
obj.val?.prop
obj.val?.[expr]
obj.func?.(args)
```

As explained in the [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining#optional_chaining_with_function_calls):
 > You can use optional chaining when attempting to call a method which may not exist

This makes sense, I guess C# would never have null methods, right? It might have [null delegates though](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/member-access-operators#thread-safe-delegate-invocation)

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

