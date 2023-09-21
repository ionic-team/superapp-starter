//
//  MiniAppView.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 8/30/23.
//

import Capacitor
import IonicPortals
import ComposableArchitecture
import SwiftUI
import Auth0

struct MiniAppView: View {
    @EnvironmentObject var auth: AuthViewModel
    let appId: String
    var initialContext: [String: JSValue] = [:]
    
    init(id: String) {
        self.appId = id
        
//        let encoder = JSONEncoder()
//        let creds = (try? encoder.encode(auth.userCreds))
//        print(creds)
//        self.initialContext = [
//            "auth0": creds
//        ]
    }
    
    var body: some View {
        VStack {
            PortalView(
                portal: .init(
                    name: self.appId,
                    startDir: "portals/\(self.appId)",
                    initialContext: initialContext
                )
            )
            //
        }
    }
}
