//
//  ProfileView.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 8/19/23.
//

import SwiftUI

struct ProfileView: View {
    @EnvironmentObject var auth: AuthViewModel
    
    var body: some View {
        NavigationView {
            List {
                Section() {
                    HStack {
                        AvatarView(urlString: auth.userProfile!.picture, size: 72)
                        
                        VStack(alignment: .leading, spacing: 4) {
                            Text(auth.userProfile!.name)
                                .font(.headline)
                                .fontWeight(.semibold)
                                .padding(.top, 4)
                            Text(auth.userProfile!.email)
                                .font(.subheadline)
                                .accentColor(.gray)
                        }
                    }
                }
                
                Section() {
                    Button(role: .destructive) {
                        auth.logout()
                    } label: {
                        HStack(spacing: 12) {
                            Image(systemName: "rectangle.portrait.and.arrow.right.fill")
                                .imageScale(.small)
                                .font(.title)
                            
                            Text("Log out")
                                .font(.subheadline)
                        }
                        
                    }.buttonStyle(.borderless)
                    
                }
            }
            .navigationTitle("Profile")
        }
    }
}
