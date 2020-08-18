---
layout: post
title:  "Building a PWA for a Chromebook; Part 2: Audio API's"
date:   2020-05-25 05:57:30 -0700
excerpt_separator: <!--more-->
---
People always told me I had a "loud voice", and my foster son's loud callouts during quarantine are also trying the adults in the house. To learn more about volume and intensity, I tried to build a Progressive Web App (PWA) that monitors your volume. 
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

# Processing: Handle the Stream with AudioContext 

 > The Web Audio API is a simple API that takes input sources and connects those sources to nodes which can process the audio data (adjust Gain etc.) and ultimately to a speaker so that the user can hear it.

# Analyzing: AnalyserNode (British spelling!)
As seen [in this answer](https://stackoverflow.com/questions/21247571/how-to-get-microphone-input-volume-value-with-web-audio-api)
 > You can also use an AnalyserNode to do the level detection, and just average out the data, kind of like what the above answer does in getAverageVolume. However, the above answer is NOT a good use of ScriptProcessor - in fact, it's doing no processing of the script node at all, not even passing the data through, it's just using it like a timer callback. You would be FAR better served by using requestAnimationFrame as the visual callback;

The `ScriptProcessor`/`createScriptProcessor` is [deprecated](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createScriptProcessor),  but the [`AnalyserNode` is not](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode)! 
The `AnalyserNode` helps us:
TODO: img https://mdn.mozillademos.org/files/12970/fttaudiodata_en.svg
`AnalyserNode.fftSize`

# Deploying to Glitch
Using Git to commit; if you want to code locally and push to your Glitch git repository, [update your Glitch git config like this `git config receive.denyCurrentBranch updateInstead`](https://stackoverflow.com/questions/804545/what-is-this-git-warning-message-when-pushing-changes-to-a-remote-repository/28262104#comment110536444_28262104), [also seen here](https://support.glitch.com/t/possible-to-code-locally-and-push-to-glitch-with-git/2704/9?u=theredpea)

Let's see if we can use the `AnalyserNode`.
 
I continued using Glitch (where I developed the PWA) [to get  the `getAverageVolume` code running](https://glitch.com/edit/#!/citrine-pewter-anteater)...


I removed `createScriptProcessor` and the resulting `javascriptNode`. I connected the `AnalyserNode` directly to the `audioContext.destination`; 
```
analyser.connect(audioContext.destionation)
// javascriptNode.connect(audioContext.destination);
```

TODO: How to throttle requestAnimationFrame / animating

# Visualizing loudness and pitch
 - A [great article](https://link.springer.com/article/10.3758/s13423-015-0934-0) on visualizing loudness and pitch
 - Introduction to the concept of the "audio graph" (input nodes, modification nodes, and output nodes) and [WebAudio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API)
 - How to understand `getTimeDomain` vs `getFrequency` based on this [Stack Overflow question](https://stackoverflow.com/a/63461964/1175496)
<!-- https://stackoverflow.com/a/19772220/1175496 

            // https://stackoverflow.com/questions/15871942/how-do-browsers-pause-change-javascript-when-tab-or-window-is-not-active
            // https://stackoverflow.com/q/15871942/1175496
            https://stackoverflow.com/questions/15871942/how-do-browsers-pause-change-javascript-when-tab-or-window-is-not-active#comment79562085_16033979



            https://stackoverflow.com/questions/4288253/html5-canvas-100-width-height-of-viewport#comment10499300_4288338


            -->
