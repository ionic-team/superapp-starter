---
sidebar_label: 'Hub View'
---

# Hub View

For superapps, it's common to have a view that users can see each of the mini apps that they have accessible to them. Some mini apps may be visible to all users, while other mini apps may only be visible to users with specific types of roles or permissions.

In some cases, there may be mini apps loaded into the superapp by default and the ability to load in more through search functionality. At Ionic, we don't think the concept of an "internal app store" is necessary for an app to be deemed a superapp, but it is a possibility.

## Loading the mini apps

In order to display the mini apps a user has access too, we need to fetch this information. Typically this would come from some type of API call. Given this is just an example walk through, we'll shortcut this process and begin the journey by defining an array of available `MiniApp`s to the authenticated users.

```swift title="ios/Superapp Starter/Hub/HubView.swift"
import SwiftUI

struct HubView: View {

  private let apps: [MiniApp] = [
      MiniApp(
        id: "directory",
        name: "Directory",
        icon: "person.2.circle.fill",
        description: "Search for colleagues and their contact information."
      ),
      MiniApp(
        id: "kudos",
        name: "Kudos", icon: "star.circle.fill",
        description: "Recognize your colleagues for their hard work."
      ),
      MiniApp(
        id: "expenses",
        name: "Expenses",
        icon: "dollarsign.circle.fill",
        description: "Submit expenses for business related activities."
      )
  ]

  var body: some View { ... }
}
```

You'll notice that this user has three mini apps that they can use: **Directory**, **Kudos**, and **Expenses**. As mentioned in the beginning of this walkthrough, we'll use the **Kudos** React app as our mini app of choice for future examples. However, note that the **Directory** mini app (written in Vue) and the **Expenses** mini app (written in Angular) will also be available for reference on the completed branch.

Each `MiniApp` object comes with a few simple properties: `id`, `name`, `icon`, and `description`. The `id` field will be vital shortly once we go into how we will load up a mini app upon user selection. The remaining properties are used moreso within the `HubView` to give the user information on what the mini app will be used for.

Since there may be a large number of mini apps available to the user, it makes sense that we can show multiple columns of mini apps. This will allow the user to see more apps at once and identify which one they need to click into much quicker. However, there may be times where they forget what a mini app does, or perhaps a new mini app becomes accessible to them. In this case, a single column view where the short description is visible will be helpful.

Let's go ahead and add a few properties to enable these differing states. While we're declaring properties, we'll also add one to hold the mini app the user has chosen to view.

```swift title="ios/Superapp Starter/Hub/HubView.swift"
import SwiftUI

struct HubView: View {

  private let apps: [MiniApp] = [ ... ]

  @State private var isMultiColumn: Bool = false

  private var numberColumns: [GridItem] {
    Array(repeating: GridItem(.flexible()), count: isMultiColumn ? 2 : 1)
  }

  var body: some View { ... }
}
```

We now have a `Bool` value called `isMultiColumn` which tells us if we're currently viewing multiple columns at once. Also, depending on the value of `isMultiColumn`, we declare the `numberColumns` array of `GridItems` with the number we'd like. For this, it's simple. If we want to show multiple columns, the value is `2`. Otherwise, the value is `1`. Because `isMultiColumn` defaults to `false`, the user is presented with a single column view when the `HubView` is presented.

## Building the mini app grid

Now that we've defined our views properties, we can start to build the grid to display the available mini apps. Similar the the `ProfileView`, we'll add a `NavigationView` as the first container within the `body`. Inside of the `NavigationView` will be a `ScrollView` to ensure we can display all mini apps that may not fit entirely on the screen. This ensure the user can scroll to see more. A `LazyVGrid` is then within the `ScrollView`. This container view arranges the child views in a manner that grows vertically. It accepts a few properties, include the number of columns that should be shown.

```swift title="ios/Superapp Starter/Hub/HubView.swift"
var body: some View {
  NavigationView {
    ScrollView {
      LazyVGrid(columns: numberColumns, alignment: .trailing, spacing: 16) {
        ...
      }
      .animation(.spring(), value: isMultiColumn)
    }
    .padding(.horizontal, 16)
    .navigationTitle("App Hub")
  }
}
```

You'll notice that we added an appropriate title, "App Hub", to the navigation bar, put some padding around the `ScrollView` to ensure it's items don't bump into the edge of the screen, and added an animation to move the elements of the grid into place as the value of `isMultiColumn` changes.

The grid itself will be home to small "tile-like" views (`AppTileView`) that show the each mini app's details. To display each `MiniApp` object, we'll place a `ForEach` loop within the `LazyVGrid` to iterate through the `apps` array and create a `AppTileView` for each one.

```swift title="ios/Superapp Starter/Hub/HubView.swift"
var body: some View {
  NavigationView {
    ScrollView {
      LazyVGrid(columns: numberColumns, alignment: .trailing, spacing: 16) {
        ForEach(apps, id: \.self) { app in
          AppTileView(height: isMultiColumn ? 150 : 200, icon: app.icon, appName: app.name, appDesc: app.description, showDesc: !isMultiColumn)
        }
      }
      .animation(.spring(), value: isMultiColumn)
    }
    .padding(.horizontal, 16)
    .navigationTitle("App Hub")
  }
}
```

The custom `AppTileView` has a slightly different height, depending on the number of columns shown. Also, when multiple columns are being shown, the mini app's description is not visible. This is due to the smaller footprint of the `AppTileView`.

## Toggling the mini app grid view

Although we can now see the mini apps loaded up on the screen, there is now way to switch between the single column view and multi-column views we established earlier. For this, we'll add a `Button` to the `ScrollView` toolbar.

```swift title="ios/Superapp Starter/Hub/HubView.swift"
var body: some View {
  NavigationView {
    ScrollView {
      ...
    }
    .padding(.horizontal, 16)
    .navigationTitle("App Hub")
    .toolbar {
      Button {
        isMultiColumn.toggle()
      } label: {
        Image(systemName: isMultiColumn ? "rectangle.grid.1x2.fill" : "square.grid.2x2.fill")
      }
    }
  }
}
```

The toolbar adds actions or controls to the navigation bar. In this case, we have a button that toggles the layout between single and multi-column views based on the `isMultiColumn` property. Depending on the active state of `isMultiColumn` the `Button` has a different system image icon. When a user clicks the `Button` the value of the `isMultiColumn` boolean flips.

Once the value of `isMultiColumn` is flipped, the previous animation takes effect and moves the tiles into the appropriate place. The `AppViewTile` updates the presentation of information. And of course the toolbar icon switches.

## Presenting a selected mini app

Now that we have a grid of mini apps populated, we want to be able to present the user with the mini app experience upon user selection.

To do this, we'll use the `NavigationLink` method and wrap the `AppTileView` previously defined. This will present the mini app's experience as defined by a `desintation` parameter. We set that destination view as a `MiniAppView` and pass in the `MiniApp` from the `ForEach` loop. We also set a `.buttonStyle` on the `NavigationLink` to ensure the entire surface area of the grid tile is selectable.

```swift title="ios/Superapp Starter/Hub/HubView.swift"
var body: some View {
  NavigationView {
    ScrollView {
      LazyVGrid(columns: numberColumns, alignment: .trailing, spacing: 16) {
        ForEach(apps, id: \.self) { app in
          NavigationLink(destination: MiniAppView(app: app)) {
            AppTileView(height: isMultiColumn ? 150 : 200, icon: app.icon, appName: app.name, appDesc: app.description, showDesc: !isMultiColumn)
          }
          .buttonStyle(.plain)
        }
      }
      .animation(.spring(), value: isMultiColumn)
    }
    .padding(.horizontal, 16)
    .navigationTitle("App Hub")
    .toolbar {
      ...
    }
  }
}
```

## What's next?

With the code in place to showcase available mini apps to the authenticated user and select one for presentation, now we can move on to loading up the mini app experience. To do this, we'll setup the `MiniAppView` and connect the web apps to the iOS project.
