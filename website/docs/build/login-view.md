---
sidebar_label: 'Login View'
---

# User Login

With the necessary logic in place to provide the methods necessary to authenticate our app's users and store their information, we can move on to building out the view that performs the action.

For sake of this walkthrough we'll keep things simple and also leverage an existing `LoginLogo` implementation that houses a sub-view to our login view. We'll also only work through getting a user logged in. Understand that with a more fleshed out login workflow, there may also be options for user's to register a new account or reset their password if they can't remember their credentials to gain access to the app.

## Building the Login View

The `LoginView` is the front door to our superapp. It provides the user the option to "Log in" with their credentials, as confirmed via the authentication provider outlined in previous sections.

Views in the superapp are built using `SwiftUI`, Apple's framework for building user interfaces. We'll get that library imported and conform to the `View` protocol used for rendering the user interface.

```swift title="ios/Superapp Starter/Login/LoginView.swift"
import SwiftUI

struct LoginView: View {
  ...
}
```

The layout of the login page will be simple and encapsulated within a `VStack` (vertical stack). All this means is that the child views are arranged vertically. It'll start with the `LoginLogo` provided for you, followed by a `Text` view displaying the app's name. Then we'll add a `Spacer` to take up all the available space between the app name the `Button` that the user click's to log in at the bottom of the screen.

```swift title="ios/Superapp Starter/Login/LoginView.swift"
import SwiftUI

struct LoginView: View {

  var body: some View {
    VStack {
      LoginLogo()
        .padding([.top], 48)
        .padding([.bottom], 24)

      Text("Ionic Superapp")
        .font(.title)
        .fontWeight(.bold)
        .foregroundColor(.superPrimary)

      Spacer()

      Button {
        // trigger login flow
      } label: {
        Text("Log in")
          .frame(maxWidth: .infinity)
          .font(.title3)
          .fontWeight(.bold)
          .padding([.top, .bottom], 4)
      }
      .buttonStyle(.borderedProminent)
      .clipShape(Capsule())
      .padding([.top, .bottom], 48)
    }
    .padding([.leading, .trailing], 48)
  }
}
```

You'll notice that many of the accompanying child views have additional padding added to some of it's sides. This is simply to improve the positioning of the elements visually and avoid any of the elements from touching the edges of the screen. There have also been modifications to the `Button`, such as style and shape, and it's child label, including font type and weight, in order to make the views more attractive.

## Triggering the Login Flow

In the previous section you'll notice a comment within the `Button` that identifies the need to add code to trigger the authentication flow. For this, we'll be referencing the previously built `login()` function in the `AuthViewModel`. In order to leverage an instance of the `AuthViewModel`, which we'll name `auth`, we need to inject it using a property wrapper called `@EnvironmentObject`.

```swift title="ios/Superapp Starter/Login/LoginView.swift"
import SwiftUI

struct LoginView: View {

  @EnvironmentObject var auth: AuthViewModel

  var body: some View { ... }

}
```

With `auth` declared, we can access the assosciated `login()` function that we need within the button.

```diff title="ios/Superapp Starter/Login/LoginView.swift"
import SwiftUI

struct LoginView: View {

+  @EnvironmentObject var auth: AuthViewModel


  var body: some View {
    VStack {
      ...


      Button {
+          auth.login()
      } label: {
        Text("Log in")
          ...
      }
      ...
    }
    .padding([.leading, .trailing], 48)
  }

}
```

Now, when the user clicks on the "Log in" button, the authentication flow via `Auth0` will begin. This presents a web view for the user to enter their credentials. Upon successful login, we've previously shown in `AuthViewModel` how their information is stored locally within the app. However, we'll need to navigate the user to the main app experience.

## What's next?

With logic in place to log in a user, we can update our `AppView` file to correctly direct the user to the appropriate view.
