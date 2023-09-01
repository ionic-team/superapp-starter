//
//  AppTileView.swift
//  Superapp Starter
//
//  Created by Ionic Conner on 8/29/23.
//

import SwiftUI

struct AppTileView: View {
    var height: CGFloat = 200 // default height
    let icon: String
    let appName: String
    let appDesc: String
    var cornerRadius: CGFloat = 16
    var showDesc = false
    
    var body: some View {
        ZStack(alignment: .leading) {
            RoundedRectangle(cornerRadius: cornerRadius)
                .foregroundColor(.superPrimary)
            
            VStack(alignment: .leading) {
                Image(systemName: icon)
                    .font(.largeTitle)
                    .foregroundColor(.white)
                    .padding(.bottom, 16)
                
                Text(appName)
                    .font(.title)
                    .foregroundColor(.white)
                    .fontWeight(.bold)
                
                if showDesc {
                    Text(appDesc)
                        .font(.body)
                        .foregroundColor(.white)
                }
            }
            .padding()
        }
        .frame(height: height)
    }
    
}


struct AppTileView_Previews: PreviewProvider {
    static var previews: some View {
        AppTileView(height: 200, icon: "person.circle.fill", appName: "Employee Directory", appDesc: "Find contact information for all employees", showDesc: true)
            .padding(16)
    }
}
