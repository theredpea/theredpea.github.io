---
layout: post
title:  "Learning Sketchup"
date:   2020-11-07 14:50:30 -0700
excerpt_separator: <!--more-->
---

Some resources for learning [Sketchup](https://www.sketchup.com/), (3D modeling software available for free online), to model my landscaping job for the house across the street.

<!--more-->  
# Links

 ## Day One
 Learning the basics

 - [SketchUp Quick Reference Card (includes keyboard shortcuts)](https://docs.google.com/viewerng/viewer?url=https://www.sketchup.com/qrc/su/2019/en/win)
 - [Self-paced tutorials in the 3D Warehouse (`*.skp` files)](https://3dwarehouse.sketchup.com/collection/36e1fa0d054a15eecc725c514c21d975/Self-paced-Tutorials)
 - [SketchUp YouTube channel](https://www.youtube.com/user/SketchUpVideo)
  - [How to move a point](https://www.youtube.com/watch?time_continue=129&v=XEHcjBRc9Oo&feature=emb_logo)

### Moving a Point vs a Line
 - [Clever approach using a vertical line](https://www.google.com/search?q=move+one+point+in+line+sketchup&oq=move+one+point+in+line+sketchup&aqs=chrome..69i57.4892j0j7&sourceid=chrome&ie=UTF-8#kpvalbx=_N125X4axOIj5tAbLoaDIBA18)
 ### Keyboard Shortcuts: Basics
  <key>Space</key> - Cursor ; for selecting
  <key>R</key> - Rectangle ; for drawing in 2D
  <key>L</key> - Line ; for drawing in 1D
  <key>M</key> - Move ; for re-arranging
  <key></key> - Scrollwheel on 3-clik Mouse (and <key>Ctrl/Alt</key>); for getting a good perspective

## Day Two
I built a rough model of the house
Mostly played around using what I learned in Day One.
I also associated my model with the physical location;
This was important so I could use shadows; so I could see how well the front porch shaded you from the sun , any day of the year, any time of day.
Shadows are a standout feature for me; they make my model look more realistic -- but more importantly, they let me design changes in the front yard to make it more livable (Colorado can be very sunny and very windy)

## Day Three
I took measurements of a few parts of the house and the front yard so I could build an accurate model

  ### Creating a Group
  - So I could shift different parts of the house without unintentionally moving "attached"/"connected" pieces; i.e. a sidewalk
  - [Create groups to prevent geometry "attaching"](https://forums.sketchup.com/t/why-are-my-objects-getting-attached-to-each-other/11661)
  - On [Groups vs Components](http://www.thesketchupessentials.com/sketchup-groups-components-basics/)

  ### Labeling 
  - So I could add dimensions in every spot I took measurements; after I added dimensions in Sketchup, I could throw away my handwritten measurement scratchpaper.
  - [](https://help.sketchup.com/en/sketchup/adding-text-labels-and-dimensions-model)
  - [Add labels and annotations](https://help.sketchup.com/en/layout/labeling-items-your-document)

  ### Importing Images
   - So I could take a screenshot of the house in Google Map Satellite view, and use the screenshot as an image/architecture reference
   - [Import an image](https://help.sketchup.com/en/sketchup/tracing-image) 

  ### Resizing with Tape Measurer
  Click once to place starting point; click a second time to place ending point, note the length of the segment you just created; then type a new length, and hit <key> Enter</key>; (you'll be prompted to resize the "active component" aka group if you're in one.)

  ### "Gluing" / Glue to Surface
   - [A component cna be glued](https://forums.sketchup.com/t/setting-a-components-glue-to-surface/52290), so you cant move it on one of 3 axes.
 ## Keyboard Shortcuts: Measurements
  <key>T</key> - Tape Measure ; for creating reference lines/points
  Custom Keyboard shortcuts
  <key>Shift</key> + <key> G</key> - [Create a Group](https://mastersketchup.com/double-speed-sketchup/)



## Interesting Links

 - [Sketchup "Pre-design"](https://forums.sketchup.com/t/design-research-get-it-right-with-predesign/142661) provides a "concise overview of the seasons, sky conditions, and predominant winds"
   - After using the shadow feature, I think Pre-design sounds great!

## Day Four

  <key>S</key> - Scale;  for creating reference lines/points (Hold <key> Ctrl</key> to scale around the center)
  <key>Q</key> - Rotate;


## Day Five

### Creating Dimension Annotations from Lines
Create a dimension annotation by grabbing an existing line, and "raising" it. This is useful becuase I find

If you create a dimension along a line (i.e. same target vertex is on same edge as start vertex), when you click the target, there will not be a perpendicular line, there will only be a point.

### Guide Points with Tape Measurer
From the [Sketchup forum](https://forums.sketchup.com/t/how-to-add-a-guide-point/20796/2)
 > You add a guide point by selecting the tape measure tool, clicking on a vertex, moving the cursor to where you want the point, and clicking again. If the new location is on the same edge as the start vertex, you will get just a guide point.


 <key>Make your own*</key> - [Paste in Place](https://forums.sketchup.com/t/what-is-the-hotkey-for-paste-in-place/18695/3) Otherwise you [must right-click](https://forums.sketchup.com/t/copy-pasting-objects-paste-in-place/28366/2)


## Day Six

### Using Section Planes
[Section planes](https://help.sketchup.com/en/sketchup/slicing-model-peer-inside) give a "cross-section" view. This wasn't necessary for my landscaping project, but would be useful for interior design. The [building section symbol](https://slideplayer.com/slide/12729525/76/images/22/BUILDING+SECTION+SYMBOL.jpg) looked familiar (i.e. I remember them from the blueprints for my second-story addition.)

### Browsing the 3D Warehouse
I wanted to add landscaping elements like trees, but I didn't want to build something so complex! I used the 3D Warehouse. I took advantage of these features:

 - Size filter
  - so my overall model did not become too large/slow
 - Category
  - so I could search "Landscaping and Architecture" to narrow 
 - Type of Results "Tab"
  - The default "tab" is "Product", but I found additional results under the "Model" tab


### Creating 2D Face-Me Components (Plants in the Yard)
I added trees, but I couldn't find feathergrass in the 3D Warehouse, so I wanted to add my own image. [This article](https://blog.sketchup.com/article/making-your-own-face-me-people) explains how to do it. The basic steps are:
 1. import a 2D image
  - I used a PNG with transparent edges I cut out [using Inkscape](https://inkscape.org/)
 2. convert it to a "Face-Me" Component
  - so that it always "turns" to face the camera, so a 2D image appears to be 3D
 3. carve its hidden geometry so it casts a shadow
  - Configure the component so the shadow is "perpendicular to the sun" 

### Extruded Text
I needed address letters on my front porch; 


### Casting Light
I added a horizontal "slats"/screen because I've seen them in my neighborhood and I liked them (especially at night). I wanted to "light" my slats in the Sketchup model, but the free Sketchup for Web doesn't have light features

### Softening Edges with the Eraser tool and <key>Ctrl</key>
Now that I moved past my "landscape" topography, I didn't need the distracting edges on the curved slope; I didn't need the reference lines I added to mark out the lengths I measured. 
 - I hid the  edges with [the Eraser tool](https://help.sketchup.com/en/sketchup/softening-smoothing-and-hiding-geometry) (<key>E</key>), and holding <key>Ctrl</key> to soften/smooth 
  