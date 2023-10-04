//
//  FeedItem.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 9/11/23.
//

import Foundation

struct FeedItem: Identifiable {
    let id = UUID()
    let title: String
    let author: String
    let pubDate: String
    let link: String
}
