---
layout: post
title:  "Modeling a Water Polo pool"
date:   2020-11-29 18:46:00 -0700
excerpt_separator: <!--more-->
---

I've been playing water polo with [Denver Squid](https://www.denversquid.com/) and thinking about ways to improve my game. I think some "virtual water polo" practice might help; but what should a virtual water polo field look like?

<!--more-->

# Water Polo Field of Play Specifications
## Sources
I found three sources for the specifications (width, length, etc) of a water polo field/pool.
Listed in order of relevance:

 1. [Wikipedia](https://en.wikipedia.org/wiki/Rules_of_water_polo#Pool_dimensions) (please [donate to Wikimedia](https://donate.wikimedia.org/w/index.php?title=Special:LandingPage&utm_source=enUS2021_fr_search_generic_donate_var1_text&utm_medium=google&utm_campaign=C2021_social&appeal=Appeal-JimmyQuote&country=US&gclid=Cj0KCQiAqo3-BRDoARIsAE5vnaLUG4eG58Ek66UCmWsw-2vnkXgzjAqdG6mJe7k-smDgojjXIne7ShIaAvjHEALw_wcB) and check out [their diagram](https://en.wikipedia.org/wiki/Rules_of_water_polo#/media/File:Waterpolo-pool-diagram.svg))
 2. [Western Australia's Water Polo "sports dimension guide"](https://www.dlgsc.wa.gov.au/sport-and-recreation/sports-dimensions-guide/water-polo#:~:text=Governing%20bodies%20such%20as%20FINA%20state%20that%20the%20distance%20between%20the%20goal%20lines%20is%2020m%E2%80%91%C2%AD30m%20for%20men%20and%2015m%E2%80%91%C2%AD25m%20for%20women) from the Government of Western Australia's Department of Local Government, Sport and Cultural Industries (whew! and check out my use of "[text fragment links](https://arstechnica.com/gadgets/2020/06/google-pushes-text-fragment-links-with-new-chrome-extension/)" in the previous link; and [this diagram](https://www.dlgsc.wa.gov.au/images/default-source/sport-and-recreation-images/sport-dimensions/waterpolo/water-polo-pool.png?sfvrsn=90a6ea1_2))
 3. [Washington Post article](https://www.washingtonpost.com/wp-srv/sports/olympics/longterm/waterlo/rules.htm) (sourced from US Water Polo (USWP)) 

## Consensus
I built a table to compare their comments (using [tablesgenerator](https://www.tablesgenerator.com/markdown_tables#)).

Note:
 - Most measurements are in meters (like 20m or 0.3m); this is relevant for the Sketchup 
 - Water Polo goals can be varying sizes; i.e. allow a "range" of 20-30m 
 - Water Polo fields can change size based on the gender of players; i.e. 20-30m applies to men, and 15-25m to  women. At Denver Squid, we have some awesome ladies on our team, and we want more to join. For this tutorial, I drew a "men's" field, and chose the largest suggested dimensions.
 - The Wikipedia article made it clearer re: the area behind the goal line; aka the "re-entry" area

| source          | gender | length (distance between goal lines; in meters) | width (in meters) | depth (in meters) | goal width (in meters) | goal height (in meters) | distance behind goal (in meters) | excerpts                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|-----------------|--------|-------------------------------------------------|-------------------|-------------------|------------------------|-------------------------|----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dlgsc.wa.gov.au | male   | 20-30                                           | 10-20             | 1.8-2             | 3                      | 0.9                     | 0.3                              | "Governing bodies such as FINA state that the distance between the goal lines is 20m‑­30m for men and 15m‑­25m for women." "The minimum water depth is 1.8m but 2m is preferred." "The underside of the crossbar is 0.9 metre above the water surface when the water is 1.5m or more deep and 2.4m when less than 1.5m deep." "Limp nets are securely fastened to the goal posts and crossbar, allowing not less than 0.3m of clear space behind the goal line everywhere within the goal area." |
| wikipedia       | male   | 30                                              | 30                | 1.8               | 3                      | 0.9                     |                                  | "(FINA approved matches require a 30x20 meter pool for men, and 25x20 meter pool for women)" "Minimum water depth must be least 1.8 meters (6 feet), but this is often not the case due to nature of the pool (as many have shallow ends" "The goals are 3 meters wide and 90 centimeters high."                                                                                                                                                                                                 |
|                 |        |                                                 |                   |                   |                        |                         |                                  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                                                     |

## Authority
[FINA is the authoritative source](http://www.fina.org/) cited by the above sources; (the Fédération Internationale de Natation; French for "international swimming federation"). Here's the [official rulebook from February 2019](https://www.fina.org/sites/default/files/13-03-2019-corrections-2018_congress_amended_rules_def-1.pdf)


# Making Water Polo Visual
I want to doodle more Water Polo stuff, like [eggbeater](https://hips.hearstapps.com/esq.h-cdn.co/assets/cm/15/07/54d8f1dbe2f7f_-_esq-10-eggbeater-0812-lg.jpg). We  could even incorporate what we learn into our practices at Denver Squid. I thought [this article studying the physics of eggbeater](https://www.sciencedirect.com/science/article/pii/S2405844018314701#fig2) was interesting and had very helpful diagrams.