---
sidebar_label: 'Hub View'
---

# Hub View

For superapps, it's common to have a view that user's can see each of the mini apps that they have accessible to them. Some mini apps may be visible to all users, while other mini apps may only be visible to users with specific types of roles or permissions.

In some cases there may be mini apps loaded into the superapp by default, with the ability to load in more through search functionality. At Ionic, we don't think this has to be the case, but it is a possibility.

```swift title="ios/Superapp Starter/Hub/HubView.swift"
import SwiftUI

struct HubView: View {
  @EnvironmentObject var auth: AuthViewModel

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
  @State private var selectedApp: MiniApp? = nil

  private var numberColumns: [GridItem] {
    Array(repeating: GridItem(.flexible()), count: isMultiColumn ? 2 : 1)
  }

  var body: some View {
    NavigationView {
      ScrollView {
        LazyVGrid(columns: numberColumns, alignment: .trailing, spacing: 16) {
          ForEach(apps, id: \.self) { app in
            AppTileView(height: isMultiColumn ? 150 : 200, icon: app.icon, appName: app.name, appDesc: app.description, showDesc: !isMultiColumn)
              .onTapGesture {
                selectedApp = app
              }
          }
        }.animation(.spring(), value: isMultiColumn)
      }
      .navigationTitle("App Hub")
      .toolbar {
        Button {
          isMultiColumn.toggle()
        } label: {
          Image(systemName: isMultiColumn ? "rectangle.grid.1x2.fill" : "square.grid.2x2.fill")
        }
      }
      .padding(16)
      .fullScreenCover(item: $selectedApp) { app in
        MiniAppView(id: app.id)
          .overlay(alignment: .topTrailing) {
            Button {
                selectedApp = nil
            } label: {
                Image(systemName: "xmark")
                    .padding()
            }
          }
      }
    }
  }

}
```
