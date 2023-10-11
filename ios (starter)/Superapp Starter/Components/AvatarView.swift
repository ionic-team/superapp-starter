//
//  AvatarView.swift
//  Superapp Starter
//
//  Created by Conner Simmons on 8/28/23.
//

import SwiftUI

struct AvatarView: View {
    let urlString: String
    var size: CGFloat = 72
    
    var body: some View {
        AsyncImage(url: URL(string: urlString)) { image in
            image
                .resizable()
        } placeholder: {
            Image(systemName: "person.circle.fill")
                .resizable()
                .foregroundColor(.white)
                .background(Color(.systemGray))
                .opacity(0.5)
        }
        .frame(width: self.size, height: self.size)
        .clipShape(Circle())
    }
}

struct AvatarView_Previews: PreviewProvider {
    static var previews: some View {
        AvatarView(urlString: "https://dashboard.ionicframework.com/img/ionitron-avatar.png")
    }
}
