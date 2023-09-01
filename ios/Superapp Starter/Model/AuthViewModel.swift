//
//  Auth.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 8/28/23.
//

import Foundation
import Auth0

class AuthViewModel: ObservableObject {
    var credentialsManager = CredentialsManager(authentication: Auth0.authentication())
    
    @Published var isAuthenticated: Bool = false
    @Published var userProfile: Profile?
    @Published var userCreds: Creds?
    
    init() {
        self.credentialsManager.enableBiometrics(withTitle: "Touch ID / Face ID Login")
    }
    
    func login() {
        Auth0
            .webAuth()
            .start { result in
                switch result {
                case .success(let credentials):
                    self.isAuthenticated = true
                    
                    // Pass the credentials over to the Credentials Manager
                    _ = self.credentialsManager.store(credentials: credentials)
                    print(self.credentialsManager.user)
                    self.userProfile = Profile.from(credentials.idToken)
                    self.userCreds = Creds.from(credentials)
                    print("User: \(String(describing: self.userProfile))")
                    print("Creds: \(String(describing: self.userCreds))")
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
                    self.userProfile = Profile.empty
                    
                case .failure(let error):
                    print("Failed with: \(error)")
                }
            }
    }
}
