//
//  HomeView.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 8/19/23.
//

import SwiftUI
import FeedKit

struct HomeView: View {
    let feedURL = URL(string: "https://ionic.io/blog/feed")!
    
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
            .fullScreenCover(item: $selectedItem) { feedItem in
                SafariView(url: URL(string: feedItem.link)!)
                    .ignoresSafeArea()
            }
        }
    }
}
