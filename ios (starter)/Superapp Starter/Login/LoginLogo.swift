//
//  LoginLogo.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 8/25/23.
//

import SwiftUI

struct LoginLogo: View {
    var body: some View {
        Circle()
            .frame(width: 128, height: 128)
            .foregroundColor(.superPrimary)
            .opacity(0.1)
            .overlay {
                Image("ionitron-avatar")
                    .resizable()
                    .frame(width: 76.8, height: 76.8)
            }
    }
}


struct LoginLogo_Previews: PreviewProvider {
    static var previews: some View {
        LoginLogo()
    }
}
