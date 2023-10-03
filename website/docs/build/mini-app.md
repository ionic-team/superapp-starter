---
sidebar_label: 'Mini Apps'
---

# Mini apps

While a superapp in general (like the iOS superapp app we are building) is typically a native application that's home to core features and functions, mini apps are home to experiences that allow users to complete other specific tasks.

In our example, the mini app **Kudos** offers the option to users to recognize the work of their colleagues. It has a very finite purpose. This type of feature-set is common in mini apps. They are focus on one or a small number of features that aim to cover one of the many tasks users need to complete throughout their entire superapp user journey.

Let's take a look at home a mini app is loaded up into the superapp experience.

<!-- ## Understanding the mini app object -->

## Loading the mini app

As shown in the presentation section of the `HubView`, `MiniAppView` is passed an `app`, which is a `MiniApp` object. We previously mentioned the importance the `id` field would play and we'll see that soon. It will be imperative to the definition of the `PortalView` that's accessible by importing `IonicPortals`.

```swift title="ios/Superapp Starter/Hub/MiniApp/MiniAppView.swift"
import IonicPortals
import SwiftUI

struct MiniAppView: View {
  let selectedApp: MiniApp

  init(app: MiniApp) {
    self.selectedApp = app
  }

  var body: some View { ... }
}
```

With the passed `app` stored within the `MiniAppView` as `selectedApp`, we can use it to initialize the `PortalView` that's presented. The `PortalView` is a SwiftUI View that displays a `Portal`. It sits within a `VStack` container within the view's `body`. The `Portal` is a web application that we'll embed within thie `PortalView`.

To make the process of creating the `Portal` even simpler, we've provided the extension file `Portal+MiniApp.swift`. It includes a `create` function for defining the `Portal` with some passed properties. Also, within the same file is a custom [Capacitor](https://capacitorjs.com/) plugin definition called `Dismiss`. This plugin allows us to dismiss the presented web view on the native layer using a button defined at the web layer!

```swift title="ios/Superapp Starter/Hub/MiniApp/MiniAppView.swift"
import IonicPortals
import SwiftUI

struct MiniAppView: View {
  @Environment(\.dismiss) var dismiss

  let selectedApp: MiniApp

  init(app: MiniApp) {
    self.selectedApp = app
  }

  var body: some View {
    VStack {
      PortalView(
        portal: .create(from: selectedApp) { @MainActor in
          dismiss()
        }
      )
      .ignoresSafeArea()
    }
    .navigationBarHidden(true)
  }
}
```

By using the `create` function and passing it the `selectedApp`, we've provided the information necessary to tell the app where to look for the web application. In our case, the `id` field of the `selectedApp` is also the name of the `Portal`. Further, the location of the `Portal` is in a `/portals` directory in a path also named using the `id`.

You'll also see the closure from the `create` function where `dismiss()` is called. This is executed for the custom `Dismiss` plugin and then calls the `dismiss` environment variable that allows us to dismiss the view on the native side. Since the web application has it's own navigation bar, we've hidden the native navigation bar as well.

Of course, in order for all this to work, that web application code must actually be at the directory we're telling the `Portal`/`PortalView` to look. To do this, we must add the web code to our iOS project.

## Adding web apps to your project

To add web apps to the superapp project we can can update the `Run Script` within the `Superapp Starter Project > Targets > Superapp Starter > Build Phases`. The `Run Script` automates the process of copying these apps into your project's directories.

In our case, the embedded web apps will be added to a `/portals` directory as dictated by the `EMBEDDED_DIR` definition which also makes use of the `BUILT_PRODUCTS_DIR` and `TARGET_NAME` enviornment variables. The apps to embed exists with the `APP_LIST` in the format of `<name>|<location>`.

```shell
# Type a script or drag a script file from your workspace to insert its path.
EMBEDDED_DIR="${BUILT_PRODUCTS_DIR}/${TARGET_NAME}.app/portals"
APP_LIST=(
    "directory|/../web/directory/dist"
    "kudos|/../web/kudos/dist"
    "expenses|/../web/expenses/www"
)

echo "App ${TARGET_NAME} is being copied! ${EMBEDDED_APP}";

mkdir "${EMBEDDED_DIR}"
```

The script will then loop through each entry within the `APP_LIST` and extract it's name and source directory.

```shell
for APP_INFO in ${APP_LIST[@]}
do
  IFS="|" read -r -a arr <<< "${APP_INFO}"
  APP_NAME="${arr[0]}"
  EMBEDDED_APP="${SRCROOT}${arr[1]}"

  echo "${APP_NAME} ${EMBEDDED_APP}"

  # additional steps
done
```

Before copying the app, the loop checks if the destination directory already contains an app with the same name and removes it if it does:

```shell
if [ -d "${EMBEDDED_DIR}/${APP_NAME}" ]
then
  cd "${EMBEDDED_DIR}"
  rm -r "${APP_NAME}"
fi
```

The loop then proceeds to copy the app to the destination directory. First, the directory is safely made. Then the app's files (excluding operating system specific files) are zipped. Finally, the script moves to the destination directory and unzips the files:

```shell
mkdir "${EMBEDDED_DIR}/${APP_NAME}"

ZIP_FILE="${APP_NAME}.zip"

if [ -d "${EMBEDDED_APP}" ]
then
  cd "${EMBEDDED_APP}"
  zip -vr "${ZIP_FILE}" * -x "*.DS_Store"
  unzip "${ZIP_FILE}" -d "${EMBEDDED_DIR}/${APP_NAME}"
  rm "${ZIP_FILE}"
else
  echo "App ${APP_NAME} has not been built! ${EMBEDDED_APP}"
  exit 999
fi
```

Altogether we have a complete script to take each mini app (web application) and make them accessible within the superapp, which can be presented via a `Portal` inside of a `PortalView`.

```shell
# Type a script or drag a script file from your workspace to insert its path.
EMBEDDED_DIR="${BUILT_PRODUCTS_DIR}/${TARGET_NAME}.app/portals"
APP_LIST=(
    "directory|/../web/directory/dist"
    "kudos|/../web/kudos/dist"
    "expenses|/../web/expenses/www"
)

echo "App ${TARGET_NAME} is being copied! ${EMBEDDED_APP}";

mkdir "${EMBEDDED_DIR}"

for APP_INFO in ${APP_LIST[@]}
do
  IFS="|" read -r -a arr <<< "${APP_INFO}"
  APP_NAME="${arr[0]}"
  EMBEDDED_APP="${SRCROOT}${arr[1]}"

  echo "${APP_NAME} ${EMBEDDED_APP}"

  if [ -d "${EMBEDDED_DIR}/${APP_NAME}" ]
  then
    cd "${EMBEDDED_DIR}"
    rm -r "${APP_NAME}"
  fi

  mkdir "${EMBEDDED_DIR}/${APP_NAME}"

  ZIP_FILE="${APP_NAME}.zip"

  if [ -d "${EMBEDDED_APP}" ]
  then
    cd "${EMBEDDED_APP}"
    zip -vr "${ZIP_FILE}" * -x "*.DS_Store"
    unzip "${ZIP_FILE}" -d "${EMBEDDED_DIR}/${APP_NAME}"
    rm "${ZIP_FILE}"
  else
    echo "App ${APP_NAME} has not been built! ${EMBEDDED_APP}"
    exit 999
  fi
done
```

<!-- ## Passing data to the mini app -->
