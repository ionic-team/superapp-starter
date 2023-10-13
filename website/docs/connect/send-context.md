---
sidebar_label: 'Send Context'
---

# Send context data to mini app

One of the major benefits of superapps is that users only have to authenticate once. This is because after the user authenticates with the native shell, which we've walked through in earlier steps, that session is passed through to the mini app. To do this, we send `initialContext` when the `Portal` is created.

## Update Portal extension

Within the previous `MiniAppView` setup step, the `.create()` function was leverage for building the `Portal` for the `PortalView`. Within this same extension we can update the function to send actual data via the `initialContext` dictionary.

First, open the `ios/Superapp Starter/Extensions/Portal+MiniApp.swift`. Next, we'll declare a `JSONEncoder` instance. This will be used to encode the `Creds` we stored for the authenticated user to pass on.

Then, within the function declaration we'll add a paramater to accept the `Creds` object. The value of the parameter is then used to create encoded credentials that are assigned to the `auth0` key within the `initialContext` definition.

These updates look as follows:

```diff title="ios/Superapp Starter/Extensions/Portal+MiniApp.swift"
  extension Portal {
+     private static let encoder = JSONEncoder()


-     static func create(from selectedApp: MiniApp, dismiss: @escaping () async -> Void) -> Portal {
+     static func create(from selectedApp: MiniApp, with credentials: Creds, dismiss: @escaping () async -> Void) -> Portal {
+         let creds = (try? encoder.encodeJsObject(credentials)) ?? [:]
          var initialContext: [String: JSValue] = [
-              "auth0": [:]
+              "auth0": creds
          ]


          initialContext["resourceId"] = selectedApp.id


          return Portal(
              name: selectedApp.id,
              startDir: "portals/\(selectedApp.id)",
              initialContext: initialContext
          )
          .adding(Dismiss(dismiss: dismiss))
      }
  }
```

## Pass credentials to Portal

With the `Portal` creation function accepting credentials to be sent as part of the `initialContext`, we need to update the call in `MiniAppView`. Within the `MiniAppView`, we'll need access to an `auth` instance again through an `@EnvironmentObject`. With the `auth` instance available we can then send the `userCreds` property to the `Portal` creation function.

```diff title="ios/Superapp Starter/Hub/MiniApp/MiniAppView.swift"
  struct MiniAppView: View {
    @Environment(\.dismiss) var dismiss
+   @EnvironmentObject var auth: AuthViewModel
    @State private var hideTabBar = true


    let selectedApp: MiniApp


    init(app: MiniApp) {
      self.selectedApp = app
    }


    var body: some View {
      VStack {
        PortalView(
-         portal: .create(from: selectedApp) { @MainActor in
+         portal: .create(from: selectedApp, with: auth.userCreds!) { @MainActor in
            hideTabBar.toggle()
            dismiss()
          }
        )
        .ignoresSafeArea()
      }
      .navigationBarHidden(true)
      .toolbar(hideTabBar ? .hidden : .visible, for: .tabBar)
    }
  }
```

With these updates, the mini app will now have access to the user's credentials via the `auth0` key inside of `initialContext`, as well as the `resourceId` key which holds the mini app's `id` from the native side.

Of course, you're not limited to just these items that can be sent. However, it serves as a simple example of what types of data can be shared from the superapp's native layer down to the mini app web layer. In this case, the user will not have to authenticate again in the mini app because that information is already provided and any necessary API calls will have access to the appropriate tokens that are needed.
