---
layout: post
title:  "Running Jekyll + Github Pages"
date:   2019-12-08 21:44:28 -0700
excerpt_separator: <!--more-->
---
I just setup a new Jekyll site and hosted it using Github Pages and a Google domain. I'm happy with the results, so I wanted to explain my process and shed light on a few pitfalls.
<!--more-->

#  Language and Site Generator : Ruby and Jekyll
I seldom use Ruby, but some of the most common site generators are written in [Ruby](https://jekyllrb.com/docs/installation/), so I explored Jekyll and [Hugo](https://gohugo.io/). I chose Jekyll because I found more examples and more documentation. Jekyll installation would require RubyGems (`gem`) GCC and Make. I had a jekyll-served site locally in 3 hours, and hosted it on the internet in a few days.

# Template Language: Liquid 
 Jekyll uses the Liquid template language. Liquid supports content in [Markdown](https://daringfireball.net/projects/markdown/) and/or HTML -- I find Markdown easier to read and write. Liquid supports template-style features like [objects (`{% raw %} {{ page.title }} {% endraw %}`), tags (`{% raw %}{% if page.show_sidebar %}{% endraw %}`), and filters (`{% raw %}{{ "welcome" | uppercase }}{% endraw %}`)](https://jekyllrb.com/docs/step-by-step/02-liquid/)
 With Liquid you can easily refere a page's variables, or a site's collections.

# Content: Pages, Post and Front Matter
Pages are generic, like any webpage. Posts are more specific and support more specfic metadata like dates, categories and tags.

## Themes
I created a set of themes based on [Hyde](https://github.com/theredpea/hyde/blob/master/_layouts/default.html)

## Front Matter
I found "Front Matter" to be especially useful; Front Matter lets you attach properties to your content. 
 - Front Matter was easy compared to a Python Flask server (where I'd need a database and more server-side programming -- too much work)
 - Front Matter can be accessed in Liquid, through objects and tags (like `for`-loops)

## Collections
For defining new "classes" of content, you can create a collection. In my case I wanted to highlight many of my "featured works", so I created a collection called `featured_works`. 

## Troubleshooting
 - remote-theme; had to add `repository:` info to the `_config.yml` to satisfy `jekyll-github-metadata` plugin [as described here](https://stackoverflow.com/a/48832099/1175496)
 - errors when I also installed gh-pages; tried to locate a *theme* despite using a `remote_theme`
 - remote theme folder names; must be named `assets`, not `public`; so I [forked the theme (hyde) with this change](https://github.com/theredpea/hyde/commit/8793ad60c82a96be0c4755a2368156782127fb20)

Helpful links:
 - [on Google domain to point at github page](https://medium.com/employbl/launch-a-website-with-a-custom-url-using-github-pages-and-google-domains-3dd8d90cc33b) (Although `CNAME` file should just have one item in it?)
    > Firstly, if you used to be using `A` records then you may need to remove and re-add your custom subdomain from your repository's settings. This will generate you a certificate for your domain. To do this, firstly go to your repository settings...
    - More info [here](https://github.community/t5/GitHub-Pages/Does-GitHub-Pages-Support-HTTPS-for-www-and-subdomains/td-p/7116)
  - [correct IP address to mention in `CNAME` file](https://github.com/elm-community/builtwithelm/issues/180#issuecomment-494152040) and [here](https://medium.com/@abidul.rmdn/latest-ip-185-199-108-153-7ada0342e6ad) and [here](https://www.cameronmacleod.com/blog/github-pages-dns); and finally [here](https://help.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site#configuring-a-records-with-your-dns-provider)
