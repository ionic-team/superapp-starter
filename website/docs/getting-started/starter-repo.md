---
sidebar_label: 'Starter Repo'
---

# Start building your superapp

To get you started, we’ve prepared an [example repository](https://github.com/ionic-team/superapp-starter). This monorepo is home to two apps: an iOS app (the superapp core app) and a React app (a superapp mini app).

In the sections to follow, we’ll step through building out some of the core features in our superapp’s core app, as well as integrate our first mini app inside of it. Our goal is to highlight how simple it can be to build the beginning of your very first superapp and set you up for success as you look to expand it’s capabilities in the future.

## Clone the repository

Let’s start by cloning the superapp repository:

```shell
git clone https://github.com/ionic-team/superapp-starter.git
```

The `main` branch of the repository contains files for the superapp in it’s very initial state, as well as it's completed state. Within the `ios (starter)` directory, you’ll find some of the fundamental groundwork is laid that we’ll build upon as we go. The `ios (complete)` directory is a representation of the superapp in it’s final state.

We encourage you to walk through each step of this cookbook to work your way from the starting state to the completed state. This will ensure you’re equipped with repeatable knowledge as you move forward with your superapp from here. However, if at any point you get stuck or just need to jump ahead, the completed directory is there for you to reference.

## Starter files

### Core app

The iOS core app provides a variety of files for you at the start. Let's take a look at brief details of each based, group by general type.

Main Views:

- **SuperappStarterApp** - The entry point to the entire app.
- **AppView** - The application’s gateway view that determines whether the user is presented with a login view or the tabs view for a logged-in user.
- **LoginView** - The view the user sees when they are required to log in to the app.
- **TabsView** - The holder view for each of the main tabs the app will present when the user is logged in.
- **HomeView** - The holder view for the first tab of the `TabsView`. It will house a simple news-like feed.
- **HubView** - The holder view for the second tab of the `TabsView`. It will display the mini app(s) that the authenticated user has access too.
- **ProfileView** - The holder view for the third tab of the `TabsView`. It presents information about the authenticated user and the ability to log out.

Component Views:

- **AppTileView** - A grid item view for each element within the `HubView` mini app collection.
- **AvatarView** - A view that loads an image asynchronously to display a user's picture from a URL string.
- **FeedItemView** - The list item view for each element within the news-like feed in `HomeView`.
- **LoginLogo** - A simple logo view used within the login view of the app.
- **SafariView** - A view built to leverage the `SFSafariViewController` and present web content from the `HomeView`.

Models:

- **FeedItem** - The list item model for each element within the news-like feed in `HomeView`.
- **MiniApp** - The mini app model for each element within the `HubView` mini app grid.

Extensions:

- **Color** - An extension to easily define an reuse RGB colors throughout the superapp.
- **Date** - An extension for handy functions to translate a `Date` to various `String` formats.
- **Encodable** - An extension with functions to tranlate `Encodable` models into different formats.
- **Portal+MiniApp** - An extension of `Portal` from `IonicPortals` that simplifies creating the view from a `MiniApp`. Within the extension also lies a custom `Dismiss` plugin to tell the native layer to dismiss the view from a button click on the web app layer.

Packages:

- **IonicPortals** - This package is pre-loaded and brings with it essential libraries that will be used throughout the walkthrough.

### Mini app

The React mini application, entitled **Kudos**, is a fully fleshed-out web application leveraging Ionic React. The intent of the app is to simulate one of the many workplace apps that an organization may embed within their superapp. Kudos allows employees to recognize their colleagues for their efforts. In a real-world application, employees could then translate their Kudos points into some type of reward. It could be a gift card, a donation to a charity, additional PTO, etc.
