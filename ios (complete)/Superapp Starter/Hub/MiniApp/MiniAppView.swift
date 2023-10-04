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

    let selectedApp: MiniApp
    
    init(app: MiniApp) {
        self.selectedApp = app
    }
    
    var body: some View {
        VStack {
            PortalView(
                portal: .create(from: selectedApp) { @MainActor in
                    dismiss()
                }
            )
            .ignoresSafeArea()
        }
        .navigationBarHidden(true)
    }
}
