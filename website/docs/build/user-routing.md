---
sidebar_label: 'User Routing'
---

# Routing the user

Provided in the starter repo in the `main` branch is the `AppView` file. `SuperappStarterApp`, the entry point for our superapp, points to `AppView` to dictate where the user start's their journey.

Initally, `AppView` is just a redirect to the `LoginView`. This is because we had no logic in place to recognize that a user was logged in and should be redirected to the `TabsView`. Now that this is accomplished, we can update `AppView` appropriately.

## Updating the SuperappStarterApp

Before we update the `AppView` we need to update our entry point, `SuperappStarterApp`. Since `AppView` will depend on changes in authentication, we should first define a `@StateObject`.

```diff title="ios/Superapp Starter/SuperappStarterApp.swift"
  import SwiftUI
  import IonicPortals

  @main
  struct SuperappStarterApp: App {
+   @StateObject var auth = AuthViewModel()

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

As the state of `auth` changes we can then tell the `AppView` to update accordingly. This is done by injecting the view via `environmentObject`.

```diff title="ios/Superapp Starter/SuperappStarterApp.swift"
import SwiftUI
import IonicPortals

@main
struct SuperappStarterApp: App {
  @StateObject var auth = AuthViewModel()

  init() {
    PortalsRegistrationManager.shared.register(key: "YOUR_KEY_HERE")
  }

  var body: some Scene {
    WindowGroup {
      AppView()
+       .environmentObject(auth)
    }
  }
}
```

## Updating the AppView

With the necessary authentication logic in place we can update how `AppView` manages the overall navigation and user experience. Much like the update to the `LoginView` previously, we need an instance of `AuthViewModel`. By injecting `AuthViewModel` into `AppView` with `@EnvironmentObject` we gain access to the `isAuthenticated` property we previously defined.

```swift title="ios/Superapp Starter/App/AppView.swift"
import SwiftUI

struct AppView: View {
  @EnvironmentObject var auth: AuthViewModel

  var body: some View {
    LoginView()
  }
}
```

With the `auth` property added into `AppView` and listening to the `@StateObject` change passed down, we can update the `body` property of the view to include a `Group`. `Group` is a way to group view together and is often used for conditional view rendering. That's exactly what we'll use it for here.

Let's update the `body` with a `Group` where if the user is authenticated, they will be navigated to `TabsView`. Otherwise, they will be pushed to the `LoginView` to start the authentication process.

```swift title="ios/Superapp Starter/App/AppView.swift"
var body: some View {
  Group {
    if self.auth.isAuthenticated {
      TabsView()
    } else {
      LoginView()
    }
  }
}
```

You'll notice we check the `isAuthenticated` property from our injected `AuthViewModel` instance and direct the user where they should go.

## A quick look at TabsView

When an authenticated user is directed into the main app experience they'll be pushed into the traditional tab-based layout. This is defined within the `TabsView` file. `TabsView` utilizes the `TabView` container within the `body` property to set up tab-based navigation.

```swift title="ios/Superapp Starter/Tabs/TabsView.swift"
import SwiftUI

struct TabsView: View {
  var body: some View {
    TabView { ... }
  }
}
```

Inside the `TabView`, we define three tabs: **Home Tab (`HomeView`)**, **Hub Tab (`HubView`)**, and **Profile Tab (`ProfileView`)**. Each tab has a `tabItem { ... }` modifier that adds a label and an icon to the tab.

```swift title="ios/Superapp Starter/Tabs/TabsView.swift"
TabView {
  HomeView()
    .tabItem {
      Label("Home", systemImage: "house")
    }

  HubView()
    .tabItem {
      Label("Hub", systemImage: "square.grid.3x3")
    }

  ProfileView()
    .tabItem {
      Label("Profile", systemImage: "person")
    }
}
```

So, we can see that when the user gets pushed into this `TabsView`, they will see a tab bar at the bottom of the screen with these three options: Home, Hub, and Profile. Tapping on each tab will display the respective view associated with that section of your superapp.

This code creates a fundamental navigation structure for your app, making it easy for users to explore its various features or sections. It's a common pattern used in many mobile applications to provide a user-friendly and organized interface.

## What's next?

With the user successfully routing from login to the main tabs view of the application, let's begin building out the views for the tabs.
