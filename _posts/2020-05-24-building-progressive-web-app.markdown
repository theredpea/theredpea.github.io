---
layout: post
title:  "Building a Progressive Web App (PWA) for my son's Chromebook"
date:   2020-05-24 19:57:30 -0700
excerpt_separator: <!--more-->
---
People always told me I had a "loud voice", and my son's loud callouts during quarantine are also trying the adults in the house. To learn more about volume and intensity, I tried to build a Progressive Web App (PWA). 
<!--more-->
# Summary
The basic steps to creating a PWA: 
 1. Create a `manifest.json` and reference it in your `index.html` so your PWA can be installed
 1. Create a service worker  so your PWA provides a basic offline experience
 

# Device: Chromebook
The app should work on a Chromebook. My son uses a Chromebook to play Roblox; Englewood and Denver public school systems arranged for kids to pickup Chromebooks during COVID-19 quarantine. I thought I would be building a "Chrome Extension" or an app for "ChromeOS" -- also known as a "Chrome App". 

However, [Chrome apps/extensions are deprecated](https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html) and the [migration guide suggests PWA's instead](https://developers.chrome.com/apps/migration). PWA's are trying to get the ["best of both worlds"](https://webdev.imgix.net/what-are-pwas/capabilities-reach.svg); the *capabilities* of "Native Apps" and the *reach* of "Web Apps". So I set out to build a PWA.

# App: Progressive Web App (PWA)
PWA's success is built on 3 pillars: Capability, Reliability, Installability:
 - Capability: The app can use all tools a computer can deliver (vs only the tools a browser makes available)
 - Reliability: The app is fast and reliable despite an unreliable network connection
 - Installability: The app is first-class; independent of a web-browser, launchable from home screen, and interoperable with other apps


# Quality:  Lighthouse Audits
 I always wondered what the "Audit" tab in Chrome Devtools does. Now I know; [Lighthouse](https://github.com/GoogleChrome/lighthouse) audit (called a "Progressive web audit") will analyze your web app:
  > Lighthouse analyzes web apps and web pages, collecting modern performance metrics and insights on developer best practices.

Lighthouse audits is effectively a way  to check whether your web site is a "Progressive Web App"! In other words, your app is progressive if  it responds with a 200 status when offline, and registers a service worker that controls page and `start_url`, and etc... 

 Check out the ["Measure" tool](https://web.dev/measure/) for more quantiative metrics on the *performance* of your web app. For troubleshooting; 
  - I ran into a [PROTOCOL_TIMEOUT](https://github.com/GoogleChrome/lighthouse/issues/6512) trying to run a Lighthouse audit -- but after trying again, I got results like the tutorials'.
 - I also got a `Something went wrong with recording the trace over your page load. Please run Lighthouse again. (NO_FCP)` error...

# Progressive: "Web App Manifest"

  > Web app manifest does not meet the installability requirements `Failures: No manifest was fetched.`
  > Browsers can proactively prompt users to add your app to their homescreen, which can lead to higher engagement. Learn more.

Useful features of the Manifest include:
 - set the [opening page with `start_url`](https://developer.mozilla.org/en-US/docs/Web/Manifest/start_url)
 - change the [with `display` (`standalone`/`minimal-ui`/`browser`/`fullscreen`)](https://developer.mozilla.org/en-US/docs/Web/Manifest/display) and [`orientation` (`portrait`/`landscape`/etc...)](https://developer.mozilla.org/en-US/docs/Web/Manifest/orientation)
 - [and more...](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members)
 

## Detour : DevTools Application Tab

We can inspect a site's manifest via the Devtools' Application tab.
INSERT PICTURE TO APPLICATION TAB

## Capabilities: Service Worker
Service workers support an offline experience and speeding up performance (network proxy) while still using web's greatest capabilities. 
 According to Lighthouse audit:
> service worker is the technology that enables your app to use many Progressive Web App features, such as offline, add to homescreen, and push notifications. 
 And [the tutorial](https://codelabs.developers.google.com/codelabs/your-first-pwapp/#4), using service workers...
> ... significantly improves performance because most of our assets (HTML, CSS and JavaScript) will be stored and served locally, eliminating the network as a potential bottleneck.

Service Workers compete with:
- [AppCache](https://www.html5rocks.com/en/tutorials/appcache/beginner/) on supporting an offline experience

Service Workers  have these limitations:
 - Cannot access the DOM
 - Cannot expect a global scope

## Service Worker Scope
 > The scope of the service worker determines which files the service worker controls, in other words, from which path the service worker will intercept requests. The default scope is the location of the service worker file, and extends to all directories below

 After creating and registering a service worker, we passed this Lighthouse test: `Registers a service worker that controls page and start_url`

# Tutorial: Google CodeLabs and Glitch
So I followed the [tutorial at Google CodeLabs](https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0) which uses  [Glitch](https://glitch.com/) as a code-editor