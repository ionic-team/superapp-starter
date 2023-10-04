//
//  Portal+MiniApp.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 9/29/23.
//

import Capacitor
import IonicPortals

extension Portal {
    
    static func create(
        from selectedApp: MiniApp,
        dismiss: @escaping () async -> Void
    ) -> Portal {
        var initialContext: [String: JSValue] = [
            "auth0": [:]
        ]

        if let resourceId = Int(selectedApp.id) {
            initialContext["resourceId"] = resourceId as NSNumber
        }

        return Portal(
            name: selectedApp.id,
            startDir: "portals/\(selectedApp.id)",
            initialContext: initialContext
        )
        .adding(Dismiss(dismiss: dismiss))
    }

}

private class Dismiss: CAPInstancePlugin, CAPBridgedPlugin {
    let jsName = "Dismiss"
    let identifier = "Dismiss"
    let pluginMethods: [CAPPluginMethod] = [
        .init(name: "dismiss", returnType: CAPPluginReturnPromise)
    ]

    private let _dismiss: () async -> Void

    init(dismiss: @escaping () async -> Void) {
        _dismiss = dismiss
        super.init()
    }

    @objc func dismiss(_ call: CAPPluginCall) {
        Task.detached { [weak self] in
            await self?._dismiss()
            call.resolve()
        }
    }
}

