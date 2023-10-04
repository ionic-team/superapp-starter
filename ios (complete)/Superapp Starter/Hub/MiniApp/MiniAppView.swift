//
//  MiniAppView.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 8/30/23.
//

import IonicPortals
import SwiftUI

struct MiniAppView: View {
    @Environment(\.dismiss) var dismiss
    @State private var hideTabBar = true

    let selectedApp: MiniApp
    
    init(app: MiniApp) {
        self.selectedApp = app
    }
    
    var body: some View {
        VStack {
            PortalView(
                portal: .create(from: selectedApp) { @MainActor in
                    hideTabBar.toggle()
                    dismiss()
                }
            )
            .ignoresSafeArea()
        }
        .navigationBarHidden(true)
        .toolbar(hideTabBar ? .hidden : .visible, for: .tabBar)
    }
}
