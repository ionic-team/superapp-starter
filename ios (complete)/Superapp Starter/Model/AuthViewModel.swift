//
//  Auth.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 8/28/23.
//

import Foundation
import Auth0

class AuthViewModel: ObservableObject {
    
    @Published var isAuthenticated: Bool = false
    @Published var userProfile: Profile = Profile.empty
    @Published var userCreds: Creds = Creds.empty
    
    func login() {
        Auth0
            .webAuth()
            .start { result in
                switch result {
                case .success(let credentials):
                    self.isAuthenticated = true
                    self.userCreds = Creds.from(credentials)
                    self.userProfile = Profile.from(credentials.idToken)
                case .failure(let error):
                    print("Failed with: \(error)")
                }
            }
    }
    
    func logout() {
        Auth0
            .webAuth()
            .clearSession { result in
                switch result {
                case .success:
                    self.isAuthenticated = false
                    self.userCreds = Creds.empty
                    self.userProfile = Profile.empty
                case .failure(let error):
                    print("Failed with: \(error)")
                }
            }
    }
}
