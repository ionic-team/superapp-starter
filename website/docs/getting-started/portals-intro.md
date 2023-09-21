---
sidebar_label: 'Portals'
---

# Introduction to Portals

One of the underlying pieces of Ionic’s Superapp SDK and what allows it to work is **Portals**.

Portals is a supercharged native WebView component for iOS and Android that lets you add web-based experiences to native mobile apps. It enables native and web teams to better collaborate and bring new and existing web experiences to mobile in a safe, controlled way.

For this lab, we’ll be taking advantage of Portals to safely embed our mini app experience into the core app.

## Install Portals

To add the Portals package to our iOS core app within Xcode, we’ll select `File > Add Packages…` in the menu. Within the dialog, click on the search bar and paste the following package url:

```shell
https://github.com/ionic-team/ionic-portals-ios
```

Within the result set you’ll see `ionic-portals-ios`. Setup your dependency rule and then select `Add Package`.

Great! You will now have `IonicPortals` and its corresponding packages added to your superapp project and available for import.

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
