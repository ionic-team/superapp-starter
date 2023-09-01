//
//  SuperappStarterApp.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 8/19/23.
//

import SwiftUI
import IonicPortals

@main
struct SuperappStarterApp: App {
    @StateObject var auth = AuthViewModel()
    
    init() {
        PortalsRegistrationManager.shared.register(key: "YOUR_KEY_HERE")
    }
    
    var body: some Scene {
        WindowGroup {
            AppView()
                .environmentObject(auth)
        }
    }
}
