//
//  Credentials.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 8/30/23.
//

import Foundation
import JWTDecode
import Auth0

struct Creds: Codable {
    let accessToken: String
    let idToken: String
    let refreshToken: String
}

extension Creds {
    
    static var empty: Self {
        return Creds(
            accessToken: "",
            idToken: "",
            refreshToken: ""
        )
    }
    
    static func from(_ credentials: Credentials) -> Self {
        return Creds(
            accessToken: credentials.accessToken,
            idToken: credentials.idToken,
            refreshToken: credentials.refreshToken ?? ""
        )
    }
    
}

