//
//  HubView.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 8/29/23.
//

import SwiftUI

struct HubView: View {
    
    private let apps: [MiniApp] = [
        MiniApp(
            id: "directory",
            name: "Directory",
            icon: "person.2.circle.fill",
            description: "Search for colleagues and their contact information."
        ),
        MiniApp(
            id: "kudos",
            name: "Kudos", icon: "star.circle.fill",
            description: "Recognize your colleagues for their hard work."
        ),
        MiniApp(
            id: "expenses",
            name: "Expenses",
            icon: "dollarsign.circle.fill",
            description: "Submit expenses for business related activities."
        )
    ]
    
    @State private var isMultiColumn: Bool = false
    
    private var numberColumns: [GridItem] {
        Array(repeating: GridItem(.flexible()), count: isMultiColumn ? 2 : 1)
    }
    
    var body: some View {
        NavigationView {
            ScrollView {
                LazyVGrid(columns: numberColumns, alignment: .trailing, spacing: 16) {
                    ForEach(apps, id: \.self) { app in
                        NavigationLink(destination: MiniAppView(app: app)) {
                            AppTileView(height: isMultiColumn ? 150 : 200, icon: app.icon, appName: app.name, appDesc: app.description, showDesc: !isMultiColumn)
                        }
                        .buttonStyle(.plain)
                    }
                }
                .animation(.spring(), value: isMultiColumn)
            }
            .padding(.horizontal, 16)
            .navigationTitle("App Hub")
            .toolbar {
                Button {
                    isMultiColumn.toggle()
                } label: {
                    Image(systemName: isMultiColumn ? "rectangle.grid.1x2.fill" : "square.grid.2x2.fill")
                }
            }
        }
    }
    
}

struct HubView_Previews: PreviewProvider {
    static var previews: some View {
        HubView()
    }
}
