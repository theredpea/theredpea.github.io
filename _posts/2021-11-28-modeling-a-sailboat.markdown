---
layout: post
title:  "Modeling a sailboat"
date:   2021-11-28 10:12:00 -0700
excerpt_separator: <!--more-->
---

I'm going to sail the British Virgin Islands with some friends soon. I wanted to learn more about sailing, so I started by trying to model a sailboat...

<!--more-->

# Learning Sailboat Anatomy
Here are some helpful resources
 - [NauticEd.org](https://www.nauticed.org/) offers training and their certification; they offer a free [basic sail trim](https://www.nauticed.org/course/learn/basic-sail-trim) 
 - [SailMagazine](https://www.sailmagazine.com/), which has a ["Basic Sailing 101" article](https://www.sailmagazine.com/cruising/basic-sailing-101) with diagrams
 - [ImproveSailing](https://improvesailing.com/) has a ["Sails Guide"](https://improvesailing.com/guides/sail-types) which describes sail basics and many sail types (like "spinnaker" vs "genoa")
 
# Sailboat vs Sail
There are many type of *sailboats*. But a single type of sailboat could have many different types of *sail configuration*. We will be sailing a [Lagoon 42](https://www.cata-lagoon.com/en/42) (more photos [here](https://passagenautical.com/new-inventory/lagoon-42-catamaran/)), which is a catamaran (most boats have *one* part that sits in the water (the "hull"; a "mono-hull"); a catamaran has *two* parts that sit in the water("two hulls")). (I think two hulls makes the catamaran more spacious and saling more stable than a mono-hull.)

 - A basic yacht configuration includes *foresail* (at the "front" or "fore" of the boat) and *mainsail* (at the "back" or "aft" of the boat).
 - One important quality of a sail is its surface area. More surface area means more wind-power can push the sail and propel the boat. The Lagoon 42 can work with mainsails between 592 sqft and 635 sqft.
  - <del>I made a mistake on our t-shirt; the "head" of the mainsail.</del> It wasn't a mistake; the ["square-top"](https://www.northsails.com/sailing/en/products/square-top-racing-mainsails) is one option of mainsail (where the "head" of the sail is "chopped off"). The "square-top" apparently has a *larger* surface area, and is more *efficient*
 - The Lagoon 42 foresail is a "Code 0" type (ImproveSailing describes a "Code 0" [type of sail](https://improvesailing.com/guides/sail-types#downwind-sails)). The marketing photos show a nice turquoise "Code 0" foresail with "42" in large letters. Apparently the "Code 0" sail is optional; "Code 0" sails are good for light-wind sailing, and is *larger* than the mainsail -- the "Code 0" is 732 sqft.
# 3D Modeling a Sailboat
I use Sketchup to model in 3D. There are some great tutorials on building a boat in Sketchup
 - [The SketchupEssentials](https://www.youtube.com/watch?v=mzNPzPho79k) makes a simple boat using  the Curviloft extension
 - [Pete's 3D Design](https://www.youtube.com/watch?v=-Un7DkKyy04) improves on the boat "hull", doesn't use any extension (but plenty of triangles!)
 - [Designer Hacks](https://www.youtube.com/watch?v=GBccYg2Xf64) deconstructs the "Boat base" model from 3D warehouse using the Draw > Sandbox > From Contour tools

I [imported the Collada file (`.dae` extension) of the sailboat model to Sketchfab](https://skfb.ly/o8977). Sketchfab also supports `.obj` extension among other types of import, and Sketchfab supports [the `.glTF` format ("Graphics Language Transmission Format")](https://docs.fileformat.com/3d/gltf/) (more information on the history of formats and [the advantages of the `.glTF`format here](https://godotengine.org/article/we-should-all-use-gltf-20-export-3d-assets-game-engines), where I learned about the [Godot 2D/3D game engine](https://docs.godotengine.org/en/stable/getting_started/step_by_step/intro_to_the_editor_interface.html)!)