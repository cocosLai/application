angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])


// .factory('SettingsFactory', [function() {
//
//     var _settingsKey = "appSettings",
//         defaultSettings = {
//             emailNotifications: false,
//             pushNotifications: false,
//         };
//
//     function _retrieveSettings() {
//         var settings = localStorage[_settingsKey];
//         if(settings)
//             return angular.fromJson(settings);
//         return defaultSettings;
//     }
//
//     function _saveSettings(settings) {
//         localStorage[_settingsKey] = angular.toJson(settings);
//     }
//
//     return {
//         get: _retrieveSettings,
//         set: _saveSettings,
//         getEmailNotifications: function() {
//             return _retrieveSettings().emailNotifications;
//         },
//         setEmailNotifications: function(state) {
//             var settings = _retrieveSettings();
//             settings.emailNotifications = state;
//             _saveSettings(settings);
//         }
//     }
// }]);

.service('AuthService', function($q, $http, API_ENDPOINT, AUTH_ENDPOINT) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var isAuthenticated = false;
  var authToken;

  function loadUserCredentials() {
    var token = 'bearer ' + window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;

    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = authToken;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var register = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/signup', user).then(function(result) {
        if (result.data.success) {
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };


  var login = function(user) {
    return $q(function(resolve, reject) {

      //POST Request to Authentication API
      $http({
          method: 'POST',
          url: AUTH_ENDPOINT.url,

          //End point expects x-www-form-urlencoded params
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},

          //Transform user object to URL encoded string
          transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },
          data: {grant_type: 'password', username: user.username, password: user.password}

      }).then(function(result) {
        if (result.statusText) {
          //Login success, store the bearer token.
          storeUserCredentials(result.data.access_token);
          resolve(result.statusText);
        } else {
          //Failed - bad times.
          reject(result.statusText);
        }
      });

    });
  };

  var logout = function() {
    destroyUserCredentials();
  };

  loadUserCredentials();

  return {
    login: login,
    register: register,
    logout: logout,
    isAuthenticated: function() {return isAuthenticated;},
  };
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
