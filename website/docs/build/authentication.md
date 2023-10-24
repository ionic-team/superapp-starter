---
sidebar_label: 'Authentication'
---

# User authentication

In a superapp architecture, the core native application is typically in charge of the authentication flow. It handles any user registration and login/logout functionalities. The authorized user’s credentials are subsequently passed from the core app down to the mini apps to be used for further API requests, if need be.

## Authentication provider

For your superapp, you will want to leverage an SSO approach, meaning we’ll be sharing the same credentials for core app access and mini app access. This drastically reduces the burden users face today where they may have to log in to each of their apps separately to perform their respective duties.

For our superapp example, we’ll be using [Auth0](https://auth0.com/) as the provider. First, you’ll need to add Auth0 to your iOS project and register the app within Auth0.

### Adding the Auth0 package

Using Swift Package Manager, much like adding `IonicPortals`, we can go ahead and import the `Auth0` package. Same steps as before. Choose `File > Add Packages…` in the menu. Search for the following url:

```shell
https://github.com/auth0/Auth0.swift
```

You’ll see `Auth0` in the result set. Setup your dependency rule and then select `Add Package`. Now you’re ready to get authentication setup within your superapp.

All the necessary configurations are in place to begin building out the associate models and views for the authentication flow.

### Register the app with Auth0

> **Prerequisite:** Auth0 account
>
> If you already have an [Auth0](https://auth0.com/) account, go ahead an log in. If not, [sign up](https://auth0.com/signup) for a free account.

Now that you’ve set up the app to work with Auth0, it’s time to set up your Auth0 tenant to work with the app. To accomplish this, you’ll do the following:

1. Add the app to your Auth0 dashboard’s list of registered applications
1. Gather two pieces of information that the app will need to delegate login/logout to Auth0:
   - Your tenant’s domain
   - The client ID that Auth0 will assign to the app
1. Provide Auth0 with the necessary callback URLs to contact the app: one to call at the end of the login process and the other to call at the end of the logout process

[Follow along Auth0's app registration steps here.](https://auth0.com/blog/get-started-ios-authentication-swift-swiftui-part-1-login-logout/#Register-the-App-with-Auth0)

### Create a Property List

To use Auth0 to authenticate users, your app needs to:

- Communicate with the appropriate Auth0 tenant, and
- Identify itself to that server.

You do this by providing the app with that tenant’s identifier, a value known as the domain, and the app’s identifier, the client ID. Auth0.swift expects to find these values in a property list (a .plist file)

[Follow along Auth0's steps to create the `.plist` file here.](https://auth0.com/blog/get-started-ios-authentication-swift-swiftui-part-1-login-logout/#Create-a-Property-List)

### Configure callback and logout URLs

With the property list created, the app knows how to communicate with Auth0. It’s time to do the inverse and tell Auth0 how to communicate with the app.

[Follow along Auth0's steps to setup the Callback URL here.](https://auth0.com/blog/get-started-ios-authentication-swift-swiftui-part-1-login-logout/#Create-the-Callback-URLs)

:::note

For additional Auth0 configuration details for a native iOS appliction check out the [Get Started with iOS Authentication using SwiftUI](https://auth0.com/blog/get-started-ios-authentication-swift-swiftui-part-1-login-logout/) tutorial or follow along the [iOS Quickstart](https://auth0.com/docs/quickstart/native/ios-swift/interactive) guide.

:::

## Login MVVM

The `LoginView` controls what our user sees when attempting to log in to the superapp. Before diving into how that's laid out, let's first develop the associated models that power the flow of control. We'll start with `AuthViewModel`, which contains the logic for the login function.

<!-- However, when the login process is successful we’ll store the the user’s information within a Profile object and the login credentials within a Creds object. Let’s get those fleshed out. -->

### AuthViewModel

The `AuthViewModel` lays the foundation for user authentication changes that needs to be referenced throughout the app's views. Being that it's defined as an `ObservableObject`, views are able to react when properties defined within the model change.

Let's create the `AuthViewModel.swift` file within the `Model` directory and establish the `class`.

```swift title="ios/Superapp Starter/Model/AuthViewModel.swift"
import Foundation
import Auth0

class AuthViewModel: ObservableObject {
  ...
}
```

Properties defined within the `AuthViewModel` that will drive changes throughout the app are as follows:

```swift title="ios/Superapp Starter/Model/AuthViewModel.swift"
@Published var isAuthenticated: Bool = false
@Published var userProfile: Profile?
@Published var userCreds: Creds?
```

The `isAuthenticated` boolean values instrinsically holds the value to let us know if a user has successfully authenticated with the authentication provider and is granted access to the app. Given that it's marked with `@Published` we know that any changes to this property will automatically propagate down to views that rely on it. Given that it starts as `false`, we know by default a user does not have access.

The `userProfile` and `userCreds` properties store information about the logged in user. They are optional because at some point they may not hold any value. For instance, when the user opens the app. We'll take a look shortly at the information these properties hold within the `Profile` and `Creds` structures. These properties are set via the `login` and `logout` functions.

```swift title="ios/Superapp Starter/Model/AuthViewModel.swift"
import Foundation
import Auth0

class AuthViewModel: ObservableObject {

  @Published var isAuthenticated: Bool = false
  @Published var userProfile: Profile.empty
  @Published var userCreds: Creds.empty

  func login() { ... }

  func logout() { ... }

}
```

The `login` function is triggered via the "Log in" button in the `LoginView`. Once called, the authentication proccess provided by Auth0's `webAuth()` starts. The closure setup handles the logic when the login result is successful or fails. On success, the aforementioned properties are populated.

```swift title="ios/Superapp Starter/Model/AuthViewModel.swift"
func login() {
  Auth0
    .webAuth()
    .start { result in
      switch result {
      case .success(let credentials):
        self.isAuthenticated = true
        self.userCreds = Creds.from(credentials)
        self.userProfile = Profile.from(credentials.idToken)
      case .failure(let error):
        print("Failed with: \(error)")
      }
    }
}
```

Conversely, the `logout` function is triggered via the "Log out" button of the superapp's `ProfileView`. Once called, the authentication process provided by Auth0's `webAuth()` acts to clear the active user session. Again, it operates as a closure to handle successful and failed results. Upon success, the properties will updated accordingly.

```swift title="ios/Superapp Starter/Model/AuthViewModel.swift"
func logout() {
  Auth0
    .webAuth()
    .clearSession { result in
      switch result {
      case .success:
        self.isAuthenticated = false
        self.userCreds = Creds.empty
        self.userProfile = Profile.empty
      case .failure(let error):
        print("Failed with: \(error)")
      }
    }
}
```

In a nutshell, this `AuthViewModel` class provides a structured way to handle user authentication and manage the user's authentication state, profile data, and credentials. It's a fundamental component for building secure and user-friendly authentication flows in your superapp!

We now have a preview of how the `Profile` and `Creds` classes are leveraged, but let's turn to how they are defined.

### Profile

The `Profile` object is created by leveraging the `idToken` returned from successful login.

Let's create the `Profile.swift` file within the `Model` directory and establish the `struct` as follows:

```swift title="ios/Superapp Starter/Model/Profile.swift"
struct Profile: Identifiable, Codable {
  let id: String
  let name: String
  let email: String
  let emailVerified: String
  let picture: String
  let updatedAt: String
}
```

You’ll see many self-explanatory properties. Being that a `Profile` is defined as `Identifiable`, we know each instance has a unique identifier called `id`. Also, adhering to the `Codable` protocol enables use to encode and decode the data within the `Profile` instance into formats like JSON. This will be helpful when we need to pass the active user's information to the mini apps.

With the basic model, we can add an extension that contain helpers to clear the `Profile` when the user logs out, as well as the critical method to transform the `idToken` into the respective properties outlined above in the model.

```swift title="ios/Superapp Starter/Model/Profile.swift"
extension Profile {

  static var empty: Self {
    return Profile(
      id: "",
      name: "",
      email: "",
      emailVerified: "",
      picture: "",
      updatedAt: ""
    )
  }

  static func from(_ idToken: String) -> Self {
    guard
      let jwt = try? decode(jwt: idToken),
      let id = jwt.subject,
      let name = jwt.claim(name: "name").string,
      let email = jwt.claim(name: "email").string,
      let emailVerified = jwt.claim(name: "email_verified").boolean,
      let picture = jwt.claim(name: "picture").string,
      let updatedAt = jwt.claim(name: "updated_at").string
    else {
      return .empty
    }

    return Profile(
      id: id,
      name: name,
      email: email,
      emailVerified: String(describing: emailVerified),
      picture: picture,
      updatedAt: updatedAt
    )
  }

}
```

As shown above, we see how the `empty` static property is defined. This was leveraged previously when we cleared the active user's session upon logout. On the flip side, we also see the static method `from(_ idToken: String)`. This helper function works to decode a JSON Web Token (JWT) passed back from successful login to the authentication provider. The `idToken` JWT contains encoded information about the user. The function then steps through the decoded JWT and takes claim of specific properties to ultimately define our `Profile` object.

### Creds

The `Creds` object, short for Credentials, is also home to essential pieces of information related to the user authentication.

Let's create the `Creds.swift` file within the `Model` directory and establish the `struct` as follows:

```swift title="ios/Superapp Starter/Model/Creds.swift"
import Foundation
import JWTDecode
import Auth0

struct Creds: Codable {
  let accessToken: String
  let idToken: String
  let refreshToken: String
}
```

The `accessToken` is a string that typically represents a token that grants temporary access to protected resources. In our case, it's access to the superapp and the mini apps that are contained within. We don't want just anyone to be able to open the app and use resources without appropriate permissions.

The `idToken` was touched on in the above `Profile` section. It's simply a string that containing information about the user's identity.

The `refreshToken` is a string that's sometimes used to obtain a new access token without requiring the user to log in again. This can be a great user experience (UX) improvement to ensure user's are not constantly logging back into their app without having gone an extended period of time without use.

Being that it also adheres to the `Codable` protocol, the information can be encoded and decoded like the `Profile`. This too will be helpful when passing information the the appropriate mini apps.

Much like the `Profile` we can also define helper functions within a `Creds` extension to clear the user's information after log out, as well as create the `Creds` object from the credentials returned back upon successful log in with the authentication provider.

```swift title="ios/Superapp Starter/Model/Creds.swift"
extension Creds {

  static var empty: Self {
    return Creds(
      accessToken: "",
      idToken: "",
      refreshToken: ""
    )
  }

  static func from(_ credentials: Credentials) -> Self {
    return Creds(
      accessToken: credentials.accessToken,
      idToken: credentials.idToken,
      refreshToken: credentials.refreshToken ?? ""
    )
  }

}
```

## What's next?

With the "behind-the-scenes" logic in place to handle logging a user in, logging a user out, as well as populating and clearing associated objects, we can turn to building out the `LoginView`.
