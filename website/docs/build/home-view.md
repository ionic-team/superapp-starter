---
sidebar_label: 'Home View'
---

# Home View

Typically the "Home" view of a superapp, especially one that is built for internal workforce use cases, is where users will be presented with company news or publications. As a demonstration of a company news feed, via can pull in an RSS feed of blog posts. For this superapp walk-through we'll use Ionic's Blog. However, with either a few, or maybe even zero adjustments, this should work with any RSS feed URL that's swapped in place.

## Adding a RSS parsing kit

To parse the RSS feed at the URL that's provided we can take advantage of an already built package: [`FeedKit`](https://github.com/nmdias/FeedKit). As we've done with earlier packages, choose `File > Add Packages…` in the menu. Search for the following url:

```shell
https://github.com/nmdias/FeedKit.git
```

You’ll see `FeedKit` in the result set. Setup your dependency rule and then select `Add Package`. Now you’re ready to start parsing RSS feeds within your superapp.

`FeedKit` obfuscates the work of combing through each RSS item in the feed and pulling the data out into respective items. We can then leverage the properties of these items to define an our own `FeedItem` object we'll present in a list. Our custom `FeedItem` model provided with the starter repo looks as follows:

```swift title="ios/Superapp Starter/Model/FeedItem.swift"
import Foundation

struct FeedItem: Identifiable {
    let id = UUID()
    let title: String
    let author: String
    let pubDate: String
    let link: String
}
```

As each `FeedItem` is populated, they will be presented using the provided `FeedItemView`.

## Building the list

To start building the list, we'll place a `NavigationStack` within the view's `body`. This allows for hierarchical naviation as list items are tapped.

```swift title="ios/Superapp Starter/Home/HomeView.swift"
import SwiftUI
import FeedKit

struct HomeView: View {

  var body: some View {
    NavigationStack { ... }
  }
}
```

Next we'll add a `List` which is populated by a `feedItems` array. Each `item` in the array is displayed using the custom `FeedItemView`. We'll then set an `onTapGesture` to the custom view where we can populate the `selectedItem` variable.

```swift title="ios/Superapp Starter/Home/HomeView.swift"
import SwiftUI
import FeedKit

struct HomeView: View {

  @State var feedItems: [FeedItem] = []
  @State private var selectedItem: FeedItem?

  var body: some View {
    NavigationStack {
      List(feedItems) { item in
        FeedItemView(item: item)
          .onTapGesture {
              selectedItem = item
          }
      }
      .navigationBarTitle("Recent Blogs")
    }
  }
}
```

You'll notice that above the `body` we've added the properties to hold the mutable state within this SwiftUI view. This is indicated by adding `@State` in front of the declaration.

Further, since we've wrapped the view in `NavigationStack`, we've set the navigation bar title to "Recent Blogs" to indicate what is shown within the `List`.

## Populating the list

For the `List` we've built to show anything, we need to populate the `feedItems` array. To do so, we'll add an `.onAppear { ... }` code block. This chunk of code is executed as the `HomeView` appears on screen.

This code block starts by creating a `FeedParser` object, as provided to us from the `FeedKit` library, and passing it a `feedURL` that we'll populate with our blog's RSS feed URL.

```swift title="ios/Superapp Starter/Home/HomeView.swift"
import SwiftUI
import FeedKit

struct HomeView: View {
  let feedURL = URL(string: "https://ionic.io/blog/feed")!

  @State var feedItems: [FeedItem] = []
  @State private var selectedItem: FeedItem?

  var body: some View {
    NavigationStack {
      List(feedItems) { ... }
      .onAppear {
        let parser = FeedParser(URL: feedURL)
      }
      .navigationBarTitle("Recent Blogs")
    }
  }
}
```

With the `parser` defined, we'll asynchronously parse the RSS feed and handle the result. If parsing is successful, we can then work on populating the `feedItems` array with parsed items. Otherwise, we'll simply print out an error.

```swift title="ios/Superapp Starter/Home/HomeView.swift"
import SwiftUI
import FeedKit

struct HomeView: View {
  let feedURL = URL(string: "https://ionic.io/blog/feed")!

  @State var feedItems: [FeedItem] = []
  @State private var selectedItem: FeedItem?

  var body: some View {
    NavigationStack {
      List(feedItems) { ... }
      .onAppear {
        let parser = FeedParser(URL: feedURL)
        parser.parseAsync { result in
          switch result {
          case .success(let feed):
            // populate the feedItems array
          case .failure(let error):
            print("Error parsing RSS feed: \(error.localizedDescription)")
          }
        }
      }
      .navigationBarTitle("Recent Blogs")
    }
  }
}
```

Upon successful parse of data, we'll use the passed `Feed` object. The `Feed` object has an associated `RSSFeed` object. This `RSSFeed` object then has it that has a property `items`, which is an array of `RSSFeedItem` objects.

Using `.compactMap { ... }` to filter out any items with missing data, we'll populate the `feedItems` array by iterating through each item and creating a custom `FeedItem` object.

```swift title="ios/Superapp Starter/Home/HomeView.swift"
import SwiftUI
import FeedKit

struct HomeView: View {
  let feedURL = URL(string: "https://ionic.io/blog/feed")!

  @State var feedItems: [FeedItem] = []
  @State private var selectedItem: FeedItem?

  var body: some View {
    NavigationStack {
      List(feedItems) { ... }
      .onAppear {
        let parser = FeedParser(URL: feedURL)
        parser.parseAsync { result in
          switch result {
          case .success(let feed):
            if let items = feed.rssFeed?.items {
              feedItems = items.compactMap { item in
                FeedItem(
                  title: item.title ?? "",
                  author: item.dublinCore?.dcCreator ?? "",
                  pubDate: item.pubDate != nil ? item.pubDate!.timeAgoDisplay() : "",
                  link: item.link ?? ""
                )
              }
            }
          case .failure(let error):
            print("Error parsing RSS feed: \(error.localizedDescription)")
          }
        }
      }
      .navigationBarTitle("Recent Blogs")
    }
  }
}
```

## Presenting the selection

Now that we have a list of items pulled from the RSS feed of our choosing, we want to be able to present the details of the `selectedItem` we assigned on tap.

To do this, we'll use the `fullScreenCover` method, which presents a full-screen view when an item is selected. Of course, we'll pass in the `selectedItem` from earlier. Then, we'll tap into this selected `FeedItem` object for it's link. This link is then used to build a `URL` object that's sent to a predefined `SafariView`. The `SafariView` takes in the `URL` and presents a `SFSafariViewController` full-screen modal for the user to read the post.

```swift title="ios/Superapp Starter/Home/HomeView.swift"
import SwiftUI
import FeedKit

struct HomeView: View {
  let feedURL = URL(string: "https://ionic.io/blog/feed")!

  @State var feedItems: [FeedItem] = []
  @State private var selectedItem: FeedItem?

  var body: some View {
    NavigationStack {
      List(feedItems) { ... }
      .onAppear { ... }
      .fullScreenCover(item: $selectedItem) { feedItem in
          SafariView(url: URL(string: feedItem.link)!)
              .ignoresSafeArea()
      }
      .navigationBarTitle("Recent Blogs")
    }
  }
}
```

## What's next?

With the `HomeView` settled, let's quickly jump over to the `ProfileView`.
