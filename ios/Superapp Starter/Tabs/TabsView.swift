//
//  TabView.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 8/19/23.
//

import SwiftUI

struct TabsView: View {
    var body: some View {
        TabView {
            NavigationStack {
                HomeView()
                    .navigationTitle("Home")
            }
            .tabItem {
                Label("Home", systemImage: "house")
            }
            
            HubView()
                .tabItem {
                    Label("Hub", systemImage: "square.grid.3x3")
                }
            
            SettingsView()
                .tabItem {
                    Label("Settings", systemImage: "gearshape")
                }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        TabsView()
    }
}
