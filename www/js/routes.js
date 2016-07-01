angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('tabsController.home', {
    url: '/',
    views: {
      'tab1': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('tabsController.history', {
    url: '/history',
    views: {
      'tab2': {
        templateUrl: 'templates/history.html',
        controller: 'historyCtrl'
      }
    }
  })

  .state('tabsController.messages', {
    url: '/messages',
    views: {
      'tab3': {
        templateUrl: 'templates/messages.html',
        controller: 'messagesCtrl'
      }
    }
  })

  .state('tabsController.voicemail', {
    url: '/voicemail',
    views: {
      'tab4': {
        templateUrl: 'templates/voicemail.html',
        controller: 'voicemailCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })


  .state('tabsController.settings2', {
    url: '/settings',
    views: {
      'tab4': {
        templateUrl: 'templates/settings2.html',
        controller: 'settings2Ctrl'
      }
    }
  })




  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('onboarding', {
    url: '/onboarding',
    templateUrl: 'templates/onboarding.html',
    controller: 'onboardingCtrl'
  })

  .state('page', {
    url: '/page11',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

$urlRouterProvider.otherwise('/onboarding')



});
