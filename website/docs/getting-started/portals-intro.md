---
sidebar_label: 'Portals'
---

# Introduction to Portals

One of the underlying pieces of Ionic’s Superapp SDK and what allows it to work is **Portals**.

[Portals](https://ionic.io/portals) is a supercharged native WebView component for iOS and Android that lets you add web-based experiences to native mobile apps. It enables native and web teams to better collaborate and bring new and existing web experiences to mobile in a safe, controlled way.

For this lab, we’ll be taking advantage of Portals to safely embed our mini app experience into the core app.

## Portals Package

The starter project comes pre-loaded with the `IonicPortals` package.To add the Portals package to our iOS core app within Xcode, we selected `File > Add Packages…` in the menu. Within the dialog, we clicked on the search bar and pasted the following package url:

```shell
https://github.com/ionic-team/ionic-portals-ios
```

Within the result set, `ionic-portals-ios` is shown. We setup the dependency rule we'd like and then selected `Add Package`.

`IonicPortals` and its corresponding packages were then added to the superapp project and available for import within our files!

## Register Portals

The first thing we need to do is register our app to use Portals. For this, we need a key. [Steps for getting your key are found here](https://ionic.io/docs/portals/getting-started).

Once you have your key, open the entry point file for our application: `SuperappStarterApp`. We’ll import the `IonicPortals` package and register using the key we’ve obtained:

```swift title="ios/Superapp Starter/SuperappStarterApp.swift"
import SwiftUI
import IonicPortals

@main
struct SuperappStarterApp: App {

  init() {
    PortalsRegistrationManager.shared.register(key: "YOUR_KEY_HERE")
  }

  var body: some Scene {
    WindowGroup {
      AppView()
    }
  }
}
```

With our registration key entered, Portals is now authorized to pull in our mini apps, which we will touch on soon.
