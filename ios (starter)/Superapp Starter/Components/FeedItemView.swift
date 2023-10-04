//
//  FeedItemView.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 9/11/23.
//

import SwiftUI

struct FeedItemView: View {
    var item: FeedItem
    
    var body: some View {
        VStack(alignment: .leading) {
            Text(item.title)
                .font(.headline)
                .padding([.bottom], 2)
            Text("\(item.author) • \(item.pubDate)")
                .font(.subheadline)
        }
    }
}

struct FeedItemView_Previews: PreviewProvider {
    static let fi = FeedItem(
        title: "Introducing AI-Powered Troubleshooting for Your Builds",
        author: "Cecelia Martinez",
        pubDate: "6 days ago",
        link: "https://ionic.io/blog/introducing-ai-powered-troubleshooting-for-your-builds"
    )
    
    static var previews: some View {
        FeedItemView(item: fi)
    }
}
