---
layout: post
title:  "Subtitle file exercise, translating Python to Rust"
date:   2023-02-21 21:31:00 -0700
excerpt_separator: <!--more-->
---
I love the movie Crouching Tiger Hidden Dragon (CTHD), especially [the bar scene](https://www.youtube.com/watch?v=WZvzB7zG_HM&embeds_euri=https%3A%2F%2Ftwitter.com%2F&feature=emb_logo). I tried to find the screenplay for the movie in Mandarin. I found [an awesome GitHub project (subtitle-combiner)](https://github.com/gterzian/Subtitles-combiner) and started thinking...
<!--more-->

subtitle-combiner is great because its Git repository includes the subtitle files (SRT files) for CTHD in many different languages, including Simplified Mandarin, Traditional Mandarin, Pinyin and English. The subtitles are a treasure, it's hard to find the CTHD screenplay in Mandarin; maybe we can create the transcript from the subtitles! 

The subtitle-combiner Git repo includes a Python program which combines multiple subtitle files into one subtitle file. For example, it combines Simplified Mandarin subtitles and Pinyin subtitles into Mandarin+Pinyin subtitles.

subtitle-combiner uses Python so I can understand it; specifically subtitle-combiner uses Python 2 so it would be good practice to translate the project to Python 3 and a challenging exercise to translate the project to Rust.

## Converting to Rust
### Creating the `rust-srt-combiner`
Before I began I installed Rust. I've been using the [Rust Book experiment](https://rust-book.cs.brown.edu/experiment-intro.html). The Rust book and most resources teach you to [use rustup to manage your Rust installation](https://www.rust-lang.org/tools/install).

The first real step in converting to Rust is to create a Rust project. The [Hello, Cargo! chapter](https://rust-book.cs.brown.edu/ch01-03-hello-cargo.html) teaches us how to create a new project using `cargo new`. Let's name our project the `rust-srt-combiner`:

```
$ cargo new rust-srt-combiner
        Created binary (application) `rust-srt-combiner` package
```

Our new `cargo` project comes with a `Cargo.toml` file. The [`*.toml` format is easy to read](https://toml.io/en/), but we should add a [`description` property](https://doc.rust-lang.org/cargo/reference/manifest.html#the-description-field) to credit where credit's due. Notice our description property points to the original subtitles-combiner git repo:

```toml
[package]
name = "rust-srt-combiner"
version = "0.1.0"
edition = "2021"
# the description we added vvvvvvvvvvvvvvvvvvvvvvvvvvv
description = "A Rust translation of this project https://github.com/gterzian/Subtitles-combiner"

[dependencies]
```

### Translating `combine.py`
Next we could create the Rust equivalent of a "Python package" (note subtitles-combiner has a Python [__init__.py file](https://stackoverflow.com/questions/448271/what-is-init-py-for)), or we could focus on the core logic in the `combine.py` file. The `combine.py` file starts by creating an ArgumentParser so subtitles-combiner can be run from the command line. We'll ignore "packaging" and argument-parsing for now -- we can run our Rust program with `cargo run` and hard-code any arguments. Let's focus on the most important part: subtitle file parsing. 

subtitles-combiner defines these four functions

 - read_files
 - read_lines
 - combine
 - write_combined_file

We'll translate these functions in the order they are executed.

#### Translating `read_lines`
`read_lines` takes a single file, opens the file in read-mode ([`rt`](https://stackoverflow.com/a/23051095/1175496)) and yields a result for every nonempty line -- the `yield` means `read_lines` is a [generator](https://towardsdatascience.com/basics-of-python-generators-a47b3cab1a23). In fact the `subtitles-combiner` project is described as "an example of using generators for creating data processign pipelines", and links to [this presentation on Python Generator Hacking](http://www.slideshare.net/dabeaz/python-generator-hacking).

How do we translate this Python function to Rust?

```python
def read_lines(sub_file):
    with open(sub_file, 'rt') as f: 
        for line in f:
            striped = line.strip()
            if striped:
                yield striped.decode('utf-8')    
```

##### Filepaths are more than strings
I thought Python's [`open(file...)`](https://docs.python.org/3/library/functions.html#open) function accepts only a  **string** argument containing the filepath, but it accepts a **["path-like object"](https://docs.python.org/3/glossary.html#term-path-like-object)**. So does Rust's `File::open(path...)`; the argument `path` uses generic type `P`, where `<P: AsRef<Path>>` -- notice the use of the [`Path` struct](https://doc.rust-lang.org/std/path/struct.Path.html) which Rust describes as "a slice of a path (akin to `str`)". Rust accepts a simple `String` because the `String` [implements the `AsRef<Path>` trait](https://doc.rust-lang.org/std/string/struct.String.html#impl-AsRef%3CPath%3E-for-String). A file "path" is more than just a simple string in both Python and Rust because a file path *depends on the operating system*, Linux and Windows use different path separators (`/` vs `\`), so a single string can only use one path separator, only work in Linux, or only in Windows. But a "path"-like object could be cross-platform.

##### Close the file when you're done
Python's [`with` statement](https://docs.python.org/3/reference/compound_stmts.html#the-with-statement) "wraps the execution of a block with methods defined by a context manager". That means Python will always call `__exit__()` on your context. When the context is a file, Python will close the file when you're done (when the `with` block ends). That's because a Python file inherits from the [`IOBase` class](https://docs.python.org/3/library/io.html#io.IOBase), which implements the `__exit__` method. Rust closes the file [using the file's `drop` function](https://stackoverflow.com/a/28696370/1175496). In Rust the `drop` method is comparable to `__exit__()`. The `drop` function  is known as the object's [`destructor`](https://stackoverflow.com/a/28696370/1175496) and it "gives the type time to somehow finish what it was doing". Rust destructor is called automatically ["when an initialized variable or temporary goes out of scope"](https://doc.rust-lang.org/reference/destructors.html).

##### Taking it one line at a time
The Python file object inherits from `IOBase`, which means the file object is a context manager and also that the file [**can be "iterated over** yielding the lines in a stream"](https://docs.python.org/3/library/io.html#io.IOBase). The Rust book teaches us how to read the [entire file into a string](https://rust-book.cs.brown.edu/ch12-02-reading-a-file.html) using `fs::read_to_string(file_path)...`. We don't want one string -- we want to iterate over each [iterate](https://stackoverflow.com/a/2776865/1175496) each line in one subtitle file (so we can combine with lines in another subtitle file). Rust's [std::io::BufReader](https://stackoverflow.com/a/45882510/1175496) and the [`.lines()` method](https://doc.rust-lang.org/std/io/trait.BufRead.html#method.lines) give us a way to iterate lines. You could also make a custom `BufReader` which implement `Iterator` so you can *iterate the `BufReader` directly*. Not only is this closer to the Python approach (`for line in my_reader`), but it also means you don't have to "allocate a string for each line". 

##### Truthy and falsey
Python supports the idea of ["truthy" and "falsey"](https://stackoverflow.com/questions/39983695/what-is-truthy-and-falsy-how-is-it-different-from-true-and-false) which means `if line:` will not execute if `line` is an empty string. An [empty Python string is considered false](https://docs.python.org/3/library/stdtypes.html#truth-value-testing) or "falsey"-- so is *any empty Python sequence/collection*. Rust `if` statements don't work like Python's; if the condition isn't a `bool`, you'll get an error. ["Unlike languages such as Ruby and JavaScript, Rust will not automatically try to convert non-Boolean types to a Boolean."](https://doc.rust-lang.org/book/ch03-05-control-flow.html). Rust prefers explicitness, so instead of relying on a language feature to treat an empty sequence as false (aka "falsey"), we should explicitly check the length of the string to see if it's 0.

##### Decoding from Unicode
The Python `read_lines` function 
TODO Compare Python 2 and Python 3

##### Too lazy to be lazy
The file object is iterable, but the `read_lines` Python function uses the `yield` keyword. In Python the `yield` keyword creates a generator. Generators can be iterated (because generators "implement the iterator protocol"). So **`read_lines` is a "generator function"**; calling `read_lines` immediately returns a generator-iterator. The code in the generator function ["only runs when called by `next(g)` or `g.send(v)`, and execution is suspended when `yield` is encountered"](https://stackoverflow.com/a/45727729/1175496). When should you use a generator? [Use a generator when](https://stackoverflow.com/a/102632/1175496)  "you don't know if you are *going to need all results*, or where you *don't want to allocate the memory for all results* at the same time." So maybe we only want to translate the first 5 lines  of dialog in our .srt files -- no need to read the entire file for that! 

Does Rust have generators? Using the `yield` keyword technique in Rust requires [experimental/unstable features](https://stackoverflow.com/a/30279122/1175496) `#![feature(generators, generator_trait)]`. Instead of using the experimental Rust `yield` keyword, you could explicitly [implement the Iterator protocol (i.e. define the `fn next($mut self)` function)](https://stackoverflow.com/questions/16421033/lazy-sequence-generation-in-rust). Our Rust function already returns `Lines<BufRead>` which  implements the Iterator protocol, so I won't implement the `Iterator` in Rust (already implemented), and I won't try to use in Rust with the `yield` keyword (too advanced for me!)

Instead I'll consider these Python alternatives to the existing `read_lines` "generator function"

```python
# Python generator function
def read_lines(sub_file):
    with open(sub_file, 'rt') as f: 
        for line in f:
            striped = line.strip()
            if striped:
                yield striped.decode('utf-8')    
```
###### Generator expression
Here is a Python `read_lines` function that returns a "generator expression". This [SO post discusses the difference between a generator expression and a generator function](https://stackoverflow.com/questions/1995418/python-generator-expression-vs-yield#:~:text=A%20generator%20object%20is%20use,they%20return%20a%20generator%20object.) All the answers agree you should use whichever approach is clearer / more "readable". What do you think?
```python
# Python function that returns a generator expression
def read_lines(sub_file):
    return (line.decode('utf-8') for line in open(sub_file, 'rt') if line)
```

###### Filter and map functions
Here is a Python `read_lines` function that uses [`filter(...)` and `map(...)`](https://book.pythontips.com/en/latest/map_filter.html) functions. In Javascript I always go to  `.map()` and `.filter()` methods when I need to process some data. For me, seeing the words "filter" and "map" send a clear message about the purpose of the code. I especially like how Javascript syntax lets us write  `.filter()` first and *then* `.map()` so you read the methods in the order they are executed (a technique I know as "chaining", related to the idea of "piping"). Also in Javascript each method can be put on a *newline*, which enhances readability. Python doesn't let us do that; the filter appears *inside* the map and I could use newlines but it is awkward.
```python
# Python function that uses map and filter
def read_lines(sub_file):
    return map(lambda l:l.decode('utf-8'), filter(lambda l:l, open(sub_file, 'rt')))
```
Compare to a Javascript-like function below. What I love about it: 
 - the code is executed in the order it's written (i.e. file is opened, *then* filtered, *then* mapped)
 - each new step in processing is on a new line, (and the processing step `.filter`, `.map` is the first word on the line)
 - and indentation is not required (so the code doesn't get very "wide", I can read it top-to-bottom instead of left-to-right)
  
```javascript
// Javascript-like function that uses map and filter
def read_lines(sub_file):
    return file
        .open(sub_file)
        .filter(_=>_)
        .map(_=>_.decode('utf-8'));
```
So the Python tendency for code to collapse onto a single line makes our generator expression and filter/map functions **less readable** -- I think the original generator function (using the `yield` keyword) is best.  These considerations should influence our Rust translation. The [Rust book talks about the concept of readability](https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html#handling-potential-failure-with-result): 

 > However, one long line is difficult to read, so it’s best to divide it. It’s often wise to **introduce a newline and other whitespace** to help break up long lines when you call a method with the .method_name() syntax.

So let's revisit our function. With the helps of questions like ["most efficient way to filter Lines<BufReader<File>>"](https://users.rust-lang.org/t/most-efficient-way-to-filter-lines-bufreader-file-based-on-multiple-criteria/74141) and ["how to read, filter, and modify lines from a file"](https://stackoverflow.com/a/30329127/1175496), I came up with this translation:




#### Translating `read_files`
...TODO...

#### Translating `combine`
...TODO...

##### Zipping it up

#### Translating `write_combined_file`
...TODO...



## Important Differences
 - [`String` vs `str`](https://stackoverflow.com/questions/24158114/what-are-the-differences-between-rusts-string-and-str#:~:text=A%20Rust%20String%20is%20like,contents%20of%20std%3A%3Astring%20.)
   - > `String` is the dynamic heap string type, like `Vec`: use it when you need to **own or modify your string data**. `str` is an immutable sequence of UTF-8 bytes of dynamic length somewhere in memory. Since the size is unknown, one can only handle it behind a pointer. This means that `str` most commonly2 appears as `&str`
 - [`Reader` vs `BufReader`](https://doc.rust-lang.org/std/io/struct.BufReader.html)
   - >  A `BufReader<R>` performs large, infrequent reads on the underlying `Read` and maintains an in-memory buffer of the results... `BufReader<R>` can improve the speed of programs that make **small and repeated read calls** to the same file or network socket. It does not help when reading very large amounts at once, or reading just one or a few times
 - [`BufReader` vs `BufRead`](https://stackoverflow.com/questions/39464237/whats-the-idiomatic-way-to-reference-bufreader-bufwriter-when-passing-it-between)
   -  [`BufRead` is a *trait*](https://doc.rust-lang.org/std/io/trait.BufRead.html), whereas [`BufReader` is a *struct*](https://doc.rust-lang.org/std/io/struct.BufReader.html). Traits are similar to interfaces in other languages, [Rust  traits define shared behavior.](https://doc.rust-lang.org/book/ch10-02-traits.html). The `BufReader` strict [implements the `BufRead` trait](https://doc.rust-lang.org/std/io/struct.BufReader.html#impl-BufReader%3CR%3E)
  -  [`struct` vs `type`](https://users.rust-lang.org/t/difference-between-type-and-struct/29733/4)
    -  > A struct **is** a type-- "type" is the more general category; struct is one kind of type.
 - [`.unwrap()` vs `?`](https://stackoverflow.com/questions/42917566/what-is-this-question-mark-operator-about#comment113203173_63877649) Rust deals with the `Result` object
 - [a "lambda" vs a "closure" generally](https://stackoverflow.com/questions/220658/what-is-the-difference-between-a-closure-and-a-lambda)
   - Do the general ideas apply to a Python `lambda` vs Rust `closure`
 - Python `__exit__()` vs Rust `drop()`
 - ["chaining" methods vs "piping" outputs as inputs](https://medium.com/@_ericelliott/yes-chaining-and-piping-are-similar-concepts-but-chaining-relies-on-the-return-value-to-supply-an-e843a9d53f64)
  
## Other Resources
 - [Rust Cookbook](https://rust-lang-nursery.github.io/rust-cookbook/file/read-write.html)
 - [Rust Book (MIT)](https://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/book/first-edition/getting-started.html)
 - [Rust by Example](https://doc.rust-lang.org/rust-by-example/std_misc/file/read_lines.html#beginner-friendly-method)
 - [Rust Lang User forum](https://users.rust-lang.org/)
 - [Rust Book (Brandeis)](https://www.cs.brandeis.edu/~cs146a/rust/rustbyexample-02-21-2015/path.html)