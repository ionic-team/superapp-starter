//
//  Portal+MiniApp.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 9/29/23.
//

import Capacitor
import IonicPortals

extension Portal {
    private static let encoder = JSONEncoder()
    
    static func create(
        from selectedApp: MiniApp,
        with credentials: Creds,
        dismiss: @escaping () async -> Void
    ) -> Portal {
        let creds = (try? encoder.encodeJsObject(credentials)) ?? [:]
        var initialContext: [String: JSValue] = [
            "auth0": creds
        ]

        initialContext["resourceId"] = selectedApp.id

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

