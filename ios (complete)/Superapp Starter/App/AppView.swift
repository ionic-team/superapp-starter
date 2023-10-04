//
//  AppView.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 8/25/23.
//

import SwiftUI

struct AppView: View {
    @EnvironmentObject var auth: AuthViewModel
        
    var body: some View {
        
        Group {
            if self.auth.isAuthenticated {
                TabsView()
            } else {
                LoginView()
            }
        }
    }
}

struct AppView_Previews: PreviewProvider {
    static var previews: some View {
        AppView()
    }
}
