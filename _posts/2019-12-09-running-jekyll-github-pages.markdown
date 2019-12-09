---
layout: post
title:  "Running Jekyll + Github Pages"
date:   2019-12-08 21:44:28 -0700
excerpt_separator: <!--more-->
---
I just setup a new site and deployed to Github Pages. I ran into a few snags.
<!--more-->
 
 - remote-theme; had to add `repository:` info to the `_config.yml` to satisfy `jekyll-github-metadata` plugin [as described here](https://stackoverflow.com/a/48832099/1175496)
 - errors when I also installed gh-pages; tried to locate a *theme* despite using a `remote_theme`
 - remote theme folder names; must be named `assets`, not `public`; so I [forked the theme (hyde) with this change](https://github.com/theredpea/hyde/commit/8793ad60c82a96be0c4755a2368156782127fb20)

Helpful links:
 - [on Google domain to point at github page](https://medium.com/employbl/launch-a-website-with-a-custom-url-using-github-pages-and-google-domains-3dd8d90cc33b)