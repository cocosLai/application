// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', [
  'ionic',
  'ionic.cloud',
  'app.controllers',
  'app.routes',
  'app.factories',
  'app.services',
  'app.directives',
  'ionicSettings',
  'angularMoment'
])

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
})

.constant('API_ENDPOINT', {
  //url: 'http://10.0.0.5:8100/api'
  //url: '/api'
    url: 'http://92.48.119.95/api'
})


.constant('AUTH_ENDPOINT', {
  url: 'http://92.48.119.95/oauth/token'
  //url: '/oauth/token'
  //url: 'http://10.0.0.5:8100/oauth/token'
})


// .constant('$ionicLoadingConfig', {
//   template: 'Default Loading Template...',
//   noBackdrop: true
// })

// .config(function ($httpProvider) {
//   $httpProvider.defaults.headers.common = {};
//   $httpProvider.defaults.headers.post = {};
//   $httpProvider.defaults.headers.put = {};
//   $httpProvider.defaults.headers.patch = {};
// })

.config(function($ionicCloudProvider) {
  $ionicCloudProvider.init({
    "core": {
      "app_id": "b18dadec"
    },
    "push": {
      "sender_id": "200307326449",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });
})


.config(function($ionicSettingsConfigProvider) {
    //$ionicSettingsConfigProvider.setColor('assertive');
    $ionicSettingsConfigProvider.setIcon('ion-android-more-vertical');
    //$ionicSettingsConfigProvider.setIconClose('ion-close-circled');
    //$ionicSettingsConfigProvider.setIconClosePosition('left');
    $ionicSettingsConfigProvider.setModalAnimation('slide-in-up');
    $ionicSettingsConfigProvider.setTitle('Settings');
    $ionicSettingsConfigProvider.setTouchID(false);
})

.config(function($stateProvider, $ionicConfigProvider) {
  //$ionicConfigProvider.views.maxCache(5);

  $ionicConfigProvider.tabs.position('top').style('striped');
  // note that you can also chain configs
})

.run(function($ionicPlatform, $ionicPush, $rootScope, $state, PushFactory, AuthService, AUTH_EVENTS) {
  $ionicPlatform.ready(function() {

    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };


    // $ionicPush.register().then(function(t) {
    //   return $ionicPush.saveToken(t);
    // }).then(function(t) {
    //   console.log('Token saved:', t.token);
    //   PushFactory.storeDeviceToken(t.type, t.token);
    // });

    // push.register(function(token) {
    //   console.log("My Device token:",token.token);
    //   push.saveToken(token);
    //     // persist the token in the Ionic Platform
    //   PushFactory.storeDeviceToken(token.type, token.token);
    // });


    //                                {googleProjectNumber: "830511586224"}


    // Show an alert box if a notification comes in when the user is in your app.

      // Monitor state changes and check if we're authenticated. If not, and the next route isn't login or onboarding, send them to login
      $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
        if (!AuthService.isAuthenticated()) {
          if (next.name !== 'login' && next.name !== 'onboarding') {
            event.preventDefault();
            $state.go('login');
          }
        }
      });




    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

// document.addEventListener('deviceready', function ($rootScope) {
//
//   hockeyapp.start(null, null, "061931d93db74b138c043b0b1520eca1");
//
//   hockeyapp.checkForUpdate();
//
// }, false);
