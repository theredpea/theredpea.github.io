---
layout: post
title:  "Subtitle file exercise, translating Python to Rust"
date:   2023-02-21 21:31:00 -0700
excerpt_separator: <!--more-->
---
I love the movie Crouching Tiger Hidden Dragon (CTHD), especially [the bar scene](https://www.youtube.com/watch?v=WZvzB7zG_HM&embeds_euri=https%3A%2F%2Ftwitter.com%2F&feature=emb_logo). I tried to find the screenplay for the movie in Mandarin. I found [this awesome GitHub project](https://github.com/gterzian/Subtitles-combiner) and started thinking...
<!--more-->

subtitle-combiner is great because its Git repository includes the subtitle files (SRT files) for CTHD in many different languages, including Simplified Mandarin, Traditional Mandarin, Pinyin and English. The subtitles are a treasure, it's hard to find the CTHD screenplay in Mandarin; maybe we can create the transcript from the subtitles! 

The subtitle-combiner Git repo includes a Python program which combines multiple subtitle files into one subtitle file. For example, it combines Simplified Mandarin subtitles and Pinyin subtitles into Mandarin+Pinyin subtitles.

subtitle-combiner uses Python so I can understand it; specifically subtitle-combiner uses Python 2 so it would be good practice to translate the project to Python 3 and a challenging exercise to translate the project to Rust.

## Converting to Rust
### Creating the `rust-srt-combiner`
Before I began I installed Rust. I've been using the [Rust Book experiment](https://rust-book.cs.brown.edu/experiment-intro.html). The Rust book and most resources teach you to [use rustup to manage your Rust installation](https://www.rust-lang.org/tools/install).

The first real step in converting to Rust is to create a Rust project. The [Hello, Cargo! chapter](https://rust-book.cs.brown.edu/ch01-03-hello-cargo.html) teaches us how to create a new project using `cargo new`. Let's name our project the `rust-srt-combiner`:

    $ cargo new rust-srt-combiner
         Created binary (application) `rust-srt-combiner` package

Our new `cargo` project comes with a `Cargo.toml` file. The [`*.toml` format is easy to read](https://toml.io/en/), but we should add a [`description` property](https://doc.rust-lang.org/cargo/reference/manifest.html#the-description-field) to credit where credit's due. Notice our description property points to the original subtitles-combiner git repo:
    [package]
    name = "rust-srt-combiner"
    version = "0.1.0"
    edition = "2021"
    # Added
    description = "A Rust translation of this project https://github.com/gterzian/Subtitles-combiner"
    
    [dependencies]

### Translating `combine.py`
Next we could create the Rust equivalent of a "Python package" (note subtitles-combiner has a Python [__init__.py file](https://stackoverflow.com/questions/448271/what-is-init-py-for)), or we could focus on the core logic in the `combine.py` file. The `combine.py` file starts by creating an ArgumentParser so subtitles-combiner can be run from the command line. We'll ignore "packaging" and argument-parsing for now -- we can run our Rust program with `cargo run` and hard-code any arguments. Let's focus on the most important part: subtitle file parsing. 

subtitles-combiner defines these four functions

 - read_files
 - read_lines
 - combine
 - write_combined_file

We'll translate them starting these functions from the inside out. 

#### Translating `read_lines`
`read_lines` takes a single file, opens the file in read-mode ([`rt`](https://stackoverflow.com/a/23051095/1175496)) and yields a result for every nonempty line -- the `yield` means `read_lines` is a [generator](https://towardsdatascience.com/basics-of-python-generators-a47b3cab1a23). Indeed the `subtitles-combiner` project is described as "an example of using generators for creating data processign pipelines", and links to [this presentation on Python Generator Hacking](http://www.slideshare.net/dabeaz/python-generator-hacking).

How do we translate this Python function to Rust?

   def read_lines(sub_file):
       with open(sub_file, 'rt') as f: 
           for line in f:
               striped = line.strip()
               if striped:
                   yield striped.decode('utf-8')    

The Rust book teaches us how to [read a file](https://rust-book.cs.brown.edu/ch12-02-reading-a-file.html) using `fs::read_to_string(file_path)...`. Reading the entire file to a string is a good start, but I want to read each line in the file so I can [iterate](https://stackoverflow.com/a/2776865/1175496) each line in the subtitle file, so we can combine with each line in another subtitle file.
 Rust's [std::io::BufReader](https://stackoverflow.com/a/45882510/1175496)  and the [`.lines()` method](https://doc.rust-lang.org/std/io/trait.BufRead.html#method.lines) are a good way to do that.

#### Translating `read_files`
...TODO...

#### Translating `combine`
...TODO...

#### Translating `write_combined_file`
...TODO...
