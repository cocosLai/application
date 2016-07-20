// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic','ionic.service.core', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ionicSettings', 'angularMoment'])

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
})

.constant('USER_ROLES', {
  admin: 'admin_role',
  public: 'public_role'
})

.constant('API_ENDPOINT', {
//  url: 'http://10.0.0.25:8100/api'
    url: 'https://api.secretme.net/api'
})


.constant('AUTH_ENDPOINT', {
  //url: '/oauth/token'
  url: 'https://api.secretme.net/oauth/token'
})

// .config(function ($httpProvider) {
//   $httpProvider.defaults.headers.common = {};
//   $httpProvider.defaults.headers.post = {};
//   $httpProvider.defaults.headers.put = {};
//   $httpProvider.defaults.headers.patch = {};
// })

.config(function($stateProvider, $ionicConfigProvider) {
  //$ionicConfigProvider.views.maxCache(5);

  $ionicConfigProvider.tabs.position('top').style('striped');
  // note that you can also chain configs
})

.run(function($ionicPlatform, $rootScope, $state, AuthService, AUTH_EVENTS) {
  $ionicPlatform.ready(function() {



      $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
        console.log(AuthService.isAuthenticated());
        //console.log(next.name);
        if (!AuthService.isAuthenticated()) {
          console.log(next.name);
          if (next.name !== 'login' && next.name !== 'onboarding') {
            event.preventDefault();
            $state.go('login');
          }
        }
      });

    // lockScreen
    //
    // $lockScreen.show({
    //   ACDelbuttons: true,
    //   touchId: true,
    //     backgroundColor: '#00a9ec',
    //     textColor: '#ffffff',
    //     buttonBorder: '50%',
    //     code: '1234',
    //
    //     onCorrect: function () {
    //       console.log('correct!');
    //     },
    //     onWrong: function (attemptNumber) {
    //       console.log(attemptNumber + ' wrong passcode attempt(s)');
    //     },
    //   });


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

document.addEventListener('deviceready', function ($rootScope) {
  // Enable to debug issues.
  window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

  hockeyapp.start(null, null, "061931d93db74b138c043b0b1520eca1");

  hockeyapp.checkForUpdate();

  var notificationOpenedCallback = function(jsonData) {
    console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal.init("98a36864-756e-47ea-9fac-13f0d9ff2b20",
                                 {googleProjectNumber: "830511586224"},
                                 notificationOpenedCallback);

  // Show an alert box if a notification comes in when the user is in your app.
  window.plugins.OneSignal.enableInAppAlertNotification(true);

}, false);
