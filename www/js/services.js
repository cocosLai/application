angular.module('app.services', [])

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
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    //Send device ID to SM API
    // $http({
    //   method: 'POST',
    //   url: AUTH_ENDPOINT.url,
    //   data: {  }
    // }).then(function(result) {
    //
    // });
    useCredentials(token);
  }

  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;

    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = "bearer " + authToken;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

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

      }).then(function(response) {
          //Login success, store the bearer token.
          storeUserCredentials(response.data.access_token);
          resolve(response.statusText);

      },function error(response) {
        reject(response.data.error_description);
      });

    });
  };

  var logout = function() {
    destroyUserCredentials();
  };

  loadUserCredentials();

  return {
    login: login,
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
})



.factory('UserService',['$http', 'API_ENDPOINT', function($http, API_ENDPOINT){
  var user = []; //Private Variable
  var number = []; //Private Variable
    return {
        GetUser: function(){
            return $http.get(API_ENDPOINT.url + '/user').then(function(response){
                user = response.data;
                return response.data;
            });
        },
        GetNumber: function(){
          return $http.get(API_ENDPOINT.url + '/user/number').then(function(response){
              number = response.data;
              return response.data;
          });
        }
    }
}])

.factory('DeviceService',['$http', 'API_ENDPOINT', function($http, API_ENDPOINT){
    var device = []; //Private Variable
    return {
        GetDeviceState: function(){
            return $http.get(API_ENDPOINT.url + '/user/device').then(function(response){
                device = response.data;
                return response.data;
            });
        },
		ChangeQuietMode: function(param){
            return $http.post(API_ENDPOINT.url + '/user/device', param).then(function(response){
                return response.data;
            });
        }
    }
}])

// $http.get(API_ENDPOINT.url + '/user/number').then(function(result) {
//   $scope.userinfo.number = result.data.mobileNumber;
// });

.factory('MessageService',['$http', 'API_ENDPOINT', function($http, API_ENDPOINT){
    var messages = []; //Private Variable
    return {
        GetMessages: function(){
            return $http.get(API_ENDPOINT.url + '/messages').then(function(response){
                messages = response.data;

                //Loop through all items anad replace ISO/8601 Date/time string with UTC date integer - easier to sort against.
                for (var i = 0; i < messages.length; i++) {
                  var datetimeISO = messages[i].timestamp;
                  datetime = new Date(Date.parse(datetimeISO));
                  var date = Date.UTC(datetime.getFullYear(), datetime.getMonth(), datetime.getDate());
                  messages[i].utc = date;

                  messages[i].utc = date;

            		}
                return messages;
            });
        },
        GetMessage: function(messageId){
          return $http.get(API_ENDPOINT.url + '/messages/' + messageId).then(function(response){
              messages = response.data;
              return response.data;
          });
        },
		DeleteMessage: function(messageId){
          return $http.put(API_ENDPOINT.url + '/messages/' + messageId + "/status", {Status:"Trash"}).then(function(response){
              return response.data;
          }, function(error){
				return error;
		  });
        }
    }
}])

.factory('VoicemailService',['$http', 'API_ENDPOINT', function($http, API_ENDPOINT){
    var voicemails = []; //Private Variable
    return {
        GetVoicemails: function(){
            return $http.get(API_ENDPOINT.url + '/voicemails').then(function(response){
                voicemails = response.data;
                return response.data;
            });
        },
        GetVoicemail: function(voiceId){
          return $http.get(API_ENDPOINT.url + '/voicemails/' + voiceId).then(function(response){
              voicemails = response.data;
              return response.data;
          });
        }
    }
}])

.factory('Storage', function(){
  return {
    getItem: function (key) {
      return localStorage.getItem(key);
    },

    getObject: function (key) {
      return angular.fromJson(localStorage.getItem(key));
    },

    setItem: function (key, data) {
      localStorage.setItem(key, data);
    },

    setObject: function (key, data) {
      localStorage.setItem(key, angular.toJson(data));
    },

    remove: function (key) {
      localStorage.removeItem(key);
    },

    clearAll : function () {
      localStorage.clear();
    }
  };
})
