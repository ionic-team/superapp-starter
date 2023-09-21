---
sidebar_label: 'Authentication'
---

# User authentication

In a superapp architecture, the core native application is typically in charge of the authentication flow. It handles any user registration and login/logout functionalities. The authorized user’s credentials are subsequently passed from the core app down to the mini apps to be used for further API requests, if need be.

## Authentication provider

For your superapp, you will want to leverage an SSO approach, meaning we’ll be sharing the same credentials for core app access and mini app access. This drastically reduces the burden users face today where they may have to log in to each of their apps separately to perform their respective duties.

For our superapp example, we’ll be using Auth0 as the provider. First, you’ll need to setup the project within Auth0.

### Setting up an Auth0 Project

<!-- show steps to setup project or link out -->

### Adding the Auth0 package

With the authentication provider setup, we can go ahead and import the package. Similar steps as adding `IonicPortals` – `File > Add Packages…` in the menu. Search for the following url:

```shell
https://github.com/auth0/Auth0.swift
```

You’ll see `Auth0` in the result set. Setup your dependency rule and then select `Add Package`. Now you’re ready to get authentication setup within your superapp.

All the necessary configurations are in place to begin building out the associate models and views for the authentication flow.

## Login MVVM

The `LoginView` controls what our user sees when attempting to log in to the superapp. Before diving into how that's laid out, let's first develop the associated models that power the flow of control. We'll start with `AuthViewModel`, which contains the logic for the login function.

<!-- However, when the login process is successful we’ll store the the user’s information within a Profile object and the login credentials within a Creds object. Let’s get those fleshed out. -->

### AuthViewModel

The `AuthViewModel` lays the foundation for user authentication changes that needs to be referenced throughout the app's views. Being that it's defined as an `ObservableObject`, views are able to react when properties defined within the model change.

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
  @Published var userProfile: Profile?
  @Published var userCreds: Creds?

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
        self.userProfile = Profile.from(credentials.idToken)
        self.userCreds = Creds.from(credentials)
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
        self.userProfile = Profile.empty
        self.userCreds = Creds.empty

      case .failure(let error):
        print("Failed with: \(error)")
      }
    }
}
```

In a nutshell, this `AuthViewModel` class provides a structured way to handle user authentication and manage the user's authentication state, profile data, and credentials. It's a fundamental component for building secure and user-friendly authentication flows in your superapp!

We now have a preview of how the `Profile` and `Creds` classes are leveraged, but let's turn to how they are defined.

### Profile

The Profile object is created by leveraging the `idToken` returned from successful login. The model looks as follows:

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
