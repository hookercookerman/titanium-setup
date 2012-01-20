var __hasProp = Object.prototype.hasOwnProperty;
HelloTi.API = (function() {
  function API(login, password) {
    this.login = login;
    this.password = password;
  }
  API.prototype.requestURI = function(path, query) {
    var key, uri, value;
    if (query == null) {
      query = {};
    }
    HelloTi.API_ENDPOINT = "http://hello_ti.com/api";
    uri = "" + HelloTi.API_ENDPOINT + path + ".json?";
    for (key in query) {
      if (!__hasProp.call(query, key)) continue;
      value = query[key];
      uri += "" + key + "=" + (escape(value)) + "&";
    }
    return uri;
  };
  API.prototype.request = function(path, options, authenticated) {
    var data, message, uri, xhr, _ref, _ref2, _ref3, _ref4;
    if (authenticated == null) {
      authenticated = true;
    }
    if ((_ref = options.method) == null) {
      options.method = 'GET';
    }
    if ((_ref2 = options.query) == null) {
      options.query = {};
    }
    if ((_ref3 = options.success) == null) {
      options.success = function() {
        return Ti.API.info;
      };
    }
    if ((_ref4 = options.error) == null) {
      options.error = function() {
        return Ti.API.error;
      };
    }
    xhr = Ti.Network.createHTTPClient();
    xhr.onreadystatechange = function(e) {
      var data;
      if (this.readyState === 4) {
        try {
          data = JSON.parse(this.responseText);
          if (data.error != null) {
            return options.error(data);
          } else {
            return options.success(data);
          }
        } catch (exception) {
          return options.error(exception);
        }
      }
    };
    uri = this.requestURI(path, options.query);
    xhr.open(options.method, uri);
    if (authenticated) {
      xhr.setRequestHeader('Authorization', 'Basic ' + Ti.Utils.base64encode(this.login + ':' + this.password));
    }
    message = "Executing ";
    message += authenticated ? "Authenticated " : "Unauthenticated ";
    message += "" + options.method + " " + uri;
    if (options.debug) {
      Ti.API.debug(message);
    }
    if (options.body != null) {
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Content-Type', 'application/json');
      data = JSON.stringify(options.body);
      if (options.debug) {
        Ti.API.debug(data);
      }
      return xhr.send(data);
    } else {
      return xhr.send();
    }
  };
  API.prototype.get = function(path, options, authenticated) {
    if (authenticated == null) {
      authenticated = true;
    }
    options.method = 'GET';
    return this.request(path, options, authenticated);
  };
  API.prototype.post = function(path, options, authenticated) {
    if (authenticated == null) {
      authenticated = true;
    }
    options.method = 'POST';
    return this.request(path, options, authenticated);
  };
  API.prototype.put = function(path, options, authenticated) {
    if (authenticated == null) {
      authenticated = true;
    }
    options.method = 'PUT';
    return this.request(path, options, authenticated);
  };
  API.prototype["delete"] = function(path, options, authenticated) {
    if (authenticated == null) {
      authenticated = true;
    }
    options.method = 'DELETE';
    return this.request(path, options, authenticated);
  };
  return API;
})();
HelloTi.App = {
  initTabGroup: function() {
    var sampleWindow, settingsWindow;
    HelloTi.App.tabGroup = Ti.UI.createTabGroup();
    sampleWindow = HelloTi.Views.Sample.createMainWindow({
      title: 'What the Egg',
      id: 'sampleWindow',
      orientationModes: HelloTi.Helpers.Application.createOrientiationModes
    });
    HelloTi.App.sampleTab = Ti.UI.createTab({
      id: 'sampleTab',
      className: 'tabElement',
      title: 'Eggs',
      window: sampleWindow
    });
    HelloTi.App.tabGroup.addTab(HelloTi.App.sampleTab);
    settingsWindow = HelloTi.Views.Settings.createMainWindow({
      title: 'Beans',
      id: 'settingsWindow',
      orientationModes: HelloTi.Helpers.Application.createOrientiationModes
    });
    HelloTi.App.settingsTab = Ti.UI.createTab({
      id: 'settingsTab',
      className: 'tabElement',
      title: 'Settings',
      window: settingsWindow
    });
    HelloTi.App.tabGroup.addTab(HelloTi.App.settingsTab);
    HelloTi.App.tabGroup.addEventListener('focus', function(e) {
      HelloTi.App.currentTab = e.tab;
      return Ti.API.info(HelloTi.App.currentTab);
    });
    return HelloTi.App.tabGroup.open();
  }
};
HelloTi.Helpers.Application = {
  createOrientiationModes: function() {
    var modes;
    modes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
    return modes;
  }
};
HelloTi.Views.Sample.createMainWindow = function(options) {
  var window;
  window = Ti.UI.createWindow(options);
  return window;
};
HelloTi.Views.Settings.createMainWindow = function(options) {
  var window;
  window = Ti.UI.createWindow(options);
  return window;
};