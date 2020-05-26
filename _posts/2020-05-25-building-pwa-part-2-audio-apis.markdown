---
layout: post
title:  "Building a PWA for my son's Chromebook; Part 2: Audio API's"
date:   2020-05-25 05:57:30 -0700
excerpt_separator: <!--more-->
---
People always told me I had a "loud voice", and my son's loud callouts during quarantine are also trying the adults in the house. To learn more about volume and intensity, I tried to build a Progressive Web App (PWA) that monitors your volume. 
<!--more-->  
Inspired by [Nadieh Bremer's use of the Web Audio API](https://twitter.com/NadiehBremer/status/1264215390076403718) and [tutorials on the Web Audio API](https://developers.google.com/web/fundamentals/media/recording-audio)

# Files: Input Element, Capture Attribute
Can use the `<audio>` element with the  `capture` attribute. This was too simplistic for my needs.

# Stream: Access the Micropohone Interactively
Calling the `navigator.mediaDevices.getUserMedia()` function prompts the user to [use their microphone.](https://developers.google.com/web/fundamentals/media/recording-audio)

The stream can be:
 - attached to an `<audio>` element
 - attached to a `WebRTC` stream
 - attached to a Web Audio `AudioContext`
 - saved using `MediaRecorder` API

Example calls:
 - if you only know the type of media (audio/video):
   - `navigator.mediaDevices.getUserMedia({ audio: true, video: false})`
 - if you know the specific device (after enumerating devices with `navigator.mediaDevices.enumerateDevices:
   - `navigator.mediaDevices.getUserMedia({ audio: { device: devices[0].deviceId }})`

# Processing: Handle the Stream with AUdioContext 

 > The Web Audio API is a simple API that takes input sources and connects those sources to nodes which can process the audio data (adjust Gain etc.) and ultimately to a speaker so that the user can hear it.