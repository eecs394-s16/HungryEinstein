# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css
  tabs: [
    {
      title: "Home"
      id: "home"
      location: "main#home"
    }
    {
      title: "Messages"
      id: "messages"
      location: "main#messages"
    }
    {
      title: "Schedule"
      id: "schedule"
      location: "main#schedule"
    }
    {
      title: "Profile"
      id: "profile"
      location: "main#profile"
    }
  ]

  # rootView:
  #   location: "main#getting-started"

  preloads: [
  ]

  # drawers:
  #   left:
  #     id: "leftDrawer"
  #     location: "main#drawer"
  #     showOnAppLoad: false
  #   options:
  #     animation: "swingingDoor"
  #
  initialView:
    id: "initialView"
    location: "main#home"
