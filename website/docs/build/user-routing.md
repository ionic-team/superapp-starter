---
sidebar_label: 'User Routing'
---

# Routing the User

Provided in the starter repo in the `main` branch is the `AppView` file. `SuperappStarterApp`, the entry point for our superapp, points to `AppView` to dictate where the user start's their journey.

Initally, `AppView` is just a redirect to the `LoginView`. This is because we had no logic in place to recognize that a user was logged in and should be redirected to the `TabsView`. Now that this is accomplished, we can update `AppView` appropriately.

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

With the `auth` property added into `AppView` we can update the `body` property of the view to include a `Group`. `Group` is a way to group view together and is often used for conditional view rendering. That's exactly what we'll use it for here.

Let's update the `body` with a `Group` where if the user is authenticated, they will be navigated to `TabsView`. Otherwise, they will be pushed to the `LoginView` to start the authentication process.

```swift title="ios/Superapp Starter/App/AppView.swift"
...
var body: some View {

    Group {
        if self.auth.isAuthenticated {
            TabsView()
        } else {
            LoginView()
        }
    }
}
...
```

You'll notice we check the `isAuthenticated` property from our injected `AuthViewModel` instance and direct where the user goes.
