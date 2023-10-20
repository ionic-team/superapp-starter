//
//  Utilities.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 10/17/23.
//

import Foundation

func auth0Plist() -> [String: Any]? {
    guard let path = Bundle.main.path(forResource: "Auth0", ofType: "plist")
    else {
        print("Missing Auth0.plist file!")
        return nil
    }
    
    return NSDictionary(contentsOfFile: path) as? [String: Any]
}
