---
layout: post
title:  "Drawing with Wacom Tablet and Inkscape"
date:   2020-12-11 11:55:00 -0700
excerpt_separator: <!--more-->
---

I bought a Wacom tablet many years ago, and I wanted to draw with it on my modern laptop (including pressure sensitivity). My Wacom Graphire (ET-0405-U) tablet  didn't work when I plugged in the USB port of my computer (Windows 10, hp EliteBook); here are the steps I needed...

<!--more-->

# Download and Install Wacom tablet Driver
The [Wacom Graphire support page](https://www.wacom.com/en-us/support/graphire-support) wasn't working at the time I wrote this.

However, the [Wacom Drivers page](https://www.wacom.com/en-us/support/product-support/drivers) allowed me to find the "Graphire - ET-0405-U/R Support" driver 6.1.7-3 (for Windows XP, Vista, & 7); from 9/13/2011

The driver exe installed on my Windows 10 machine, even though the driver is almost one decade old. After installing the driver I restarted my computer. I  opened  `services.msc` and verified I could see the "Tablet Wacom Driver" service running. I opened Inkscape which recognized the Wacom device.

Here are some [extra Wacom resources](https://101.wacom.com/UserHelp/en/TestingPen.htm).

# Inkscape Setup

I followed steps like [these](https://alpha.inkscape.org/vectors/www.inkscapeforum.com/viewtopica765.html?t=33028) and [these](https://inkscape.org/forums/questions/pressure-sensitivity-dosent-work-have-i-missed-something/) to get my Inkscape to support my pressure-sensitive tablet (aka "pen pressure").

In summary, open Inkscape and choose `Edit` > `Input Devices`. Select the Wacom devices, confirm they *support  pressure-sensitivity*, and the `Screen` option. Click "Save" and restart Inkscape.

Use the Inkscape "Calligraphy" feature by pressing <kbd> C</kbd> or pressing <kbd>Ctrl</kbd> + <kbd> F6</kbd>. Learn more about calligraphy and pressure-sensitivity at [this Inkscape tutorial](https://inkscape.org/doc/tutorials/calligraphy/tutorial-calligraphy.html). I just wanted to doodle, but this tutorial's got me excited about Calligraphy as a worldview!:

 > Calligraphy is not only fun; it's a deeply spiritual art that may transform your outlook on everything you do and see. 