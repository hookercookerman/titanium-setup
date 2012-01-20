HelloTi.App =

  initTabGroup: ->
    HelloTi.App.tabGroup = Ti.UI.createTabGroup()

    # Sample Tab
    sampleWindow = HelloTi.Views.Sample.createMainWindow
      title:            'What the Egg'
      id:               'sampleWindow'
      orientationModes: HelloTi.Helpers.Application.createOrientiationModes

    HelloTi.App.sampleTab = Ti.UI.createTab
      id:               'sampleTab'
      className:        'tabElement'
      title:            'Eggs'
      window:           sampleWindow

    # Bottom Tab Loader
    HelloTi.App.tabGroup.addTab HelloTi.App.sampleTab

    # Settings Tab
    settingsWindow = HelloTi.Views.Settings.createMainWindow
      title:            'Beans'
      id:               'settingsWindow'
      orientationModes: HelloTi.Helpers.Application.createOrientiationModes

    HelloTi.App.settingsTab = Ti.UI.createTab
      id:               'settingsTab'
      className:        'tabElement'
      title:            'Settings'
      window:           settingsWindow

    # Bottom Tab Loader
    HelloTi.App.tabGroup.addTab HelloTi.App.settingsTab

    HelloTi.App.tabGroup.addEventListener 'focus', (e) ->
      HelloTi.App.currentTab = e.tab
      Ti.API.info(HelloTi.App.currentTab)

    # Open Tabs
    HelloTi.App.tabGroup.open()
