---
layout: post
title:  "Three different XBRL Renderers"
date:   2023-05-25 11:42:00 -0700
excerpt_separator: <!--more-->
---
I was trying to open an iXBRL file with arelle. 
I learned there are at least three different renderers/iXBRL viewers...
<!--more-->


The three types of renderers/iXBRL viewers, corresponding to three different arelle "plugins"
1. Edgar Renderer All 
   - The SEC's original renderer
   - Renders plain XBRL
   - contained [in the arelle repo](https://github.com/Arelle/Arelle/blob/master/arelle/plugin/EdgarRendererAllReports.py)
2. EdgarRenderer 
   - The SEC's **iXBRL viewer**
   - located in a [separate repo](https://github.com/Arelle/EdgarRenderer)
3. ixbrl-viewer 
   - Workiva's ixbrlviewer
   - located in a [separate repo](https://github.com/Workiva/ixbrl-viewer)


I was confused about \#2 and \#3 because I couldn't find them when running arelle from the source, only when running the pre-built arelle executable.

That's because [the Arelle github workflow](https://github.com/Arelle/Arelle/blob/master/.github/workflows/build-windows.yml#L41) for the Windows build includes extra steps to checkout Arelle/EdgarRenderer and Workiva/ixbrl-viewer .

Great to learn!