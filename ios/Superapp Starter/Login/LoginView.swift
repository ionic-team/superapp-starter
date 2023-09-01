//
//  LoginView.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 8/24/23.
//

import SwiftUI
import Auth0

struct LoginView: View {
    @EnvironmentObject var auth: AuthViewModel
    
    var body: some View {
        VStack {
            LoginLogo()
                .padding([.top], 48)
                .padding([.bottom], 24)
            
            Text("Ionic Superapp")
                .font(.title)
                .fontWeight(.bold)
                .foregroundColor(.superPrimary)
            
            Spacer()
                    
            Button {
                auth.login()
            } label: {
                Text("Log in")
                    .frame(maxWidth: .infinity)
                    .font(.title3)
                    .fontWeight(.bold)
                    .padding([.top, .bottom], 4)
            }
            .buttonStyle(.borderedProminent)
            .clipShape(Capsule())
            .padding([.top, .bottom], 48)
        }.padding([.leading, .trailing], 48)
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
    }
}
