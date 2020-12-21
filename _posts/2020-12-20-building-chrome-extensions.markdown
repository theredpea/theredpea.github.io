---
layout: post
title:  "Building Chrome Extensions"
date:   2020-12-20 11:22:00 -0700
excerpt_separator: <!--more-->
---

Our foster son uses Microsoft Teams on his Chromebook when his school switches to "remote learning" during the pandemic.  Here I learn the basics of building a Chrome Extension to inject CSS, inject a content script, and review some differences between Chrome Manifest Version 2 (aka MV2) and MV3.


<!--more-->
Some features in Microsoft Teams meeting are unnecessary for our school meetings, but the teacher can't turn them off, and the features distract the students. Here I learned how to build a CSS-only extension to hide the distractions.

# Basic CSS-only Extension 
TODO


# MV2 vs MV3
Check out the differences in MV2 and MV3; this migration guide is great. I noticed some differences between the current Chrome Extension tutorial, and the sample code I made from a few months back. Turned out my sample code was in MV2, but the new tutorial referenced MV3. I guess the tutorial [changed to MV3 recently](https://developer.chrome.com/docs/extensions/mv3/), around Nov, 2020:

 > With Manifest V3 launching soon, we've changed the default documentation experience to be for MV3. 

## Executing Content Scripts
[MV2 Getting Started](https://developer.chrome.com/docs/extensions/mv2/getstarted/) vs [MV3 Getting Started](https://developer.chrome.com/docs/extensions/mv3/getstarted/)

The difference in the getting started guide looks like this:

### MV2 code
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'
    });

### MV3 code
    chrome.scripting.executeScript({
        function: setTheColor
    });
    
    ...
    
    function setTheColor() {
        document.body.style.backgroundColor = "' + color + '";
    }

### MV2: chrome.tabs.executeScript
The MV2 Getting Started guide uses [the `chrome.tabs.executeScript` function](https://developer.chrome.com/docs/extensions/reference/tabs/#method-executeScript) and references a tab ID (the tab ID is optional)
The `chrome.tabs.executeScript` function uses a `code` property. The value is an arbitrary string containing Javascript that can be executed:

### MV3: chrome.scripting.executeScript
The MV3 Getting Started guide uses `chrome.scripting.executeScript` function.
The `chrome.tabs.executeScript` function uses a `function` property. The value is a Javascript function containing the logic that can be executed:

This difference in executing scripts is [described in the migration guide](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/#executing-arbitrary-strings)

 > The `code` property from executeScript’s details object is *no longer available in MV3*.

It's also discussed in the MV3 [migration checklist](https://developer.chrome.com/docs/extensions/mv3/mv3-migration-checklist/)

 > **Are you executing remote code or arbitrary strings?**
 > 
 > You can *no longer execute external logic* using `chrome.tabs.executeScript({code: '...'})`, `eval()`, and `new Function()`.

 ### MV3: I Cannot Find its API
 So I think the reorganization makes sense: from `chrome.tabs` (click here for docs) to `chrome.scripting` (I can't find the docs). Apparently the `chrome.tabs` was supposed to focus on *tabs*, not executing scripts. It makes sense to create a new 
  > Use the `chrome.tabs` API to interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser.