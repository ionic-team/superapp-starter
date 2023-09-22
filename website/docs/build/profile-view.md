---
sidebar_label: 'Profile View'
---

# Profile View

Another common view within a superapp is a Profile view or sometime type of user account management view. In this walk-through, the `ProfileView` will be quite simple. First, we'll display the information of the authenticated user of the app. Then, we'll provide the user with the option to log out.

Although this particular `ProfileView` is simple, there are many more features that could be added to it. In essence this view is the door to every account-based update/change the user may need to make. It could be name changes, password resets, payment information updates, address modifications, etc.

With all that in mind, let's build out our view.

## Displaying authenticated user details

Similar to the `HomeView`, we want to have a navigation bar with title. This time, however, we'll use a `NavigationView`, which will be the first container added within the `body`. Inside of the `NavigationView` is a `List` that will be home to two sections. Of course, we'll add the title "Profile" as well.

```swift title="ios/Superapp Starter/Profile/ProfileView.swift"
import SwiftUI

struct ProfileView: View {

  var body: some View {
    NavigationView {
      List {
        Section() { ... }

        Section() { ... }
      }
      .navigationTitle("Profile")
    }
  }
}
```

The first section is home to the authenticated user details. To the left of the user's name and email we'll present their photo. For such a layout we need to take advantage of `HStack`, or horizontal stack.

The `HStack` will be home to the `AvatarView` provided with the starter repo and a `VStack`, or vertical stack. The `VStack` will first show the user's name and then their email below that.

```swift title="ios/Superapp Starter/Profile/ProfileView.swift"
import SwiftUI

struct ProfileView: View {

  @EnvironmentObject var auth: AuthViewModel

  var body: some View {
    NavigationView {
      List {
        Section() {
          HStack {
            AvatarView(urlString: auth.userProfile!.picture)

            VStack(alignment: .leading, spacing: 4) {
              Text(auth.userProfile!.name)
                .font(.headline)
                .fontWeight(.semibold)
                .padding(.top, 4)
              Text(auth.userProfile!.email)
                .font(.subheadline)
                .accentColor(.gray)
            }
          }
        }

        Section() { ... }
      }
      .navigationTitle("Profile")
    }
  }
}
```

You'll notice that in order to pull the authenticated user's details, we once again have used an instance of `AuthViewModel` named `auth`.

To adjust the styling of the user's name and email we added a few font and color adjustments. Further, some slight spacing and padding was added in to ensure all the views have appropriate breathing room.

## Adding a log out feature

With the authenticated user's details taking up the first section, we can now build out the second section of the `List` for our log out functionality. For now, the sole element within this section is a `Button` with the `.destructive` role. This type of role is typically used to depict a "negative" action. Since we'll be clearing away a logged in user when this button is tapped, it makes sense here.

```swift title="ios/Superapp Starter/Profile/ProfileView.swift"
Section() {
  Button(role: .destructive) {
    // trigger logout flow
  } label: {
    // show log out text with icon
  }
  .buttonStyle(.borderless)
}
```

The `Button` will have an action that's performed when it's tapped, as well as a label. The action to be performed is the `logout()` function we have access to via the `auth` instance. The label will be an `HStack` of an `Image` followed by `Text`. We'll insert a common system image to depict logging out and the string "Log out" as our text string. Each has some minor styling adjustments.

```swift title="ios/Superapp Starter/Profile/ProfileView.swift"
import SwiftUI

struct ProfileView: View {

  @EnvironmentObject var auth: AuthViewModel

  var body: some View {
    NavigationView {
      List {
        Section() { ... }

        Section() {
          Button(role: .destructive) {
            auth.logout()
          } label: {
            HStack(spacing: 12) {
              Image(systemName: "rectangle.portrait.and.arrow.right.fill")
                .imageScale(.small)
                .font(.title)

              Text("Log out")
                .font(.subheadline)
            }
          }
          .buttonStyle(.borderless)
        }
      }
      .navigationTitle("Profile")
    }
  }
}
```

Now, when we open the `ProfileView`, we can see the basic information for the authenticated user and an option to log out.

## What's next?

With the more basic views in place we're ready to move on to the `HubView`. The `HubView` is the entry point to the mini apps that live within our superapp!
