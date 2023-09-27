//
//  MiniAppView.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 8/30/23.
//

import IonicPortals
import SwiftUI

struct MiniAppView: View {
    let appId: String
    
    init(id: String) {
        self.appId = id
    }
    
    var body: some View {
        Text("Mini App View")
    }
}
