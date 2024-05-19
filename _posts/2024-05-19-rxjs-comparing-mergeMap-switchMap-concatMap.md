layout: post
title:  "C# Refreshers"
date:   2024-05-19 11:45 -0600
excerpt_separator: <!--more-->
---
I was editing my Angular app after upgrading to Angular 17. I'm still using and learning about RxJS Observables<sup>1</sup>. I learned an important lesson about the difference between RxJS operators `mergeMap`, `switchMap`, and `concatMap`
<!--more-->

# Marble Diagram
This marble diagram shows the difference.
Given a starting observable that emits 1, 3, and 5...
If you pipe it into  `mergeMap` or `switchMap` or `concatMap`, which in turn yields an observable <sup>2</sup> emitting 10, 10, 10. Notice:...
 - `mergeMap` emits when any of the 1st-order input emits, or its 2nd-order input emits...
 - `switchMap` emits when any of the *most recent* 1st-order input emits, and any of its 2nd-order input emits...
   - note how the third 30 is not emitted because the more recent observable of 50's begins to emit...
 - `switchMap` emits when any of the inputs emit in order, which certain emissions will be delayed to match the order of the 1st-order observable
   - notice how the first 50 waits until the last 30 is emitted...

![marble_diagram_mergeMap_vs_switchMap_vs_concatMap](https://github.com/theredpea/theredpea.github.io/assets/1369723/97355881-2140-4c53-b558-5a6debddfb98)---

# Marble Diagrams with Swirly
Design your own marble diagram with [https://swirly.dev/](https://swirly.dev/#), or check out the [Swirly Github project here](https://github.com/timdp/swirly)

I created the marble diagram above using the input below:

    % An example application of the concatAll operator.
    % Edit this code to redraw the diagram in real time.
    [styles.a]
    fill_color = #ff6944
    
    [styles.b]
    fill_color = #3ca2cc
    
    [styles.c]
    fill_color = #ff6944
    
    [styles.f]
    fill_color = #ff6944
    
    
    [styles.i]
    fill_color = #ff6944
    
    
    [styles.m]
    fill_color = #3ca2cc
    
    [styles.k]
    fill_color = #3ca2cc
    
    
    [styles.o]
    fill_color = #ff6944
    
    
    --a------b--c---------|
    title = 1st-Order
    a := 1
    b := 3
    c := 5
    
      d-e-f-|
    title = 2nd-Order
    d := 10
    e := 10
    f := 10
    
    %https://rxjs.dev/api/index/function/mergeMap
    > mergeMap(i=> 10*i----10*i----10*i)
    
    % mergeMap(i=> `d-e-f-|`)
    %d := 10
    %e := 10
    %f := 10
    
    --g-h-i--j-klmn-o-----|
    g := 10
    h := 10
    i := 10
    j := 30
    k := 30
    m := 30
    l := 50
    n := 50
    o := 50
    
    
    
    %https://rxjs.dev/api/operators/switchMap
    > switchMap(i=> 10*i----10*i----10*i)
    
    --g-h-i--j-kl-n-o-----|
    g := 10
    h := 10
    i := 10
    j := 30
    k := 30
    l := 50
    n := 50
    o := 50
    
    
    %https://rxjs.dev/api/operators/concatMap
    > concatMap(i=> 10*i----10*i----10*i)
    
    --g-h-i--j-k-ml-n-o---|
    g := 10
    h := 10
    i := 10
    j := 30
    k := 30
    m := 30
    l := 50
    n := 50
    o := 50



<sup>1</sup>I know about the new async/state-management technique with [signals](https://angular.io/guide/signals), but I guess Observables still have a place; more on [signals vs observables](https://www.builder.io/blog/signals-vs-observables).
<sup>2</sup>An observable within an observable? That's [a "higher-order" observable!](https://rxjs.dev/guide/higher-order-observables)
