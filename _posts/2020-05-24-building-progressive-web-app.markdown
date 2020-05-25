---
layout: post
title:  "Building a Progressive Web App (PWA) for my son's Chromebook"
date:   2020-05-24 19:57:30 -0700
excerpt_separator: <!--more-->
---
I've always been a loud person, and my son's callouts during quarantine are also loud and frequent. To learn more about volume and intensity, I tried to build a Progressive Web App (PWA)
<!--more-->

# Device: Chromebook
The app should work on a Chromebook. My son uses a Chromebook; Englewood and Denver public school systems arranged for kids to pickup Chromebooks during COVID-19 quarantine. I thought I would be building a "Chrome Extension" or an app for "ChromeOS" -- also known as a "Chrome App". 

However, [Chrome apps/extensions are deprecated](https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html) and the [migration guide suggests PWA's instead](https://developers.chrome.com/apps/migration). PWA's are trying to get the ["best of both worlds"](https://webdev.imgix.net/what-are-pwas/capabilities-reach.svg); the *capabilities* of "Native Apps" and the *reach* of "Web Apps". 

# App: Progressive Web App (PWA)
PWA's success is built on 3 pillars: Capability, Reliability, Installability:
 - Capability: The app can use all tools a computer can deliver (vs only the tools a browser makes available)
 - Reliability: The app is fast and reliable despite an unreliable network connection
 - Installability: The app is first-class; independent of a web-browser, launchable from home screen, and interoperable with other apps

# Tutorial: 
So I followed the tutorial https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0