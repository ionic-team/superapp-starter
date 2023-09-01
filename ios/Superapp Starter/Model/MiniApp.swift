//
//  MiniApp.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 8/30/23.
//

import Foundation
import SwiftUI

struct MiniApp: Identifiable, Hashable, Decodable {
    var id: String
    var name: String
    var icon: String
    var description: String = ""
    var appFlowId: String = ""

    enum CodingKeys: String, CodingKey {
        case id
        case name
        case icon
        case description
        case appFlowId = "appflow_id"
    }
}
