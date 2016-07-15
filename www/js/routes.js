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

  .state('tabsController.messagedetail', {
    url: '/message/:id',
    views: {
      'tab3': {
        templateUrl: 'templates/message.html',
        controller: 'messageCtrl'
      }
    }
  })

  .state('tabsController.voicemails', {
    url: '/voicemails',
    views: {
      'tab4': {
        templateUrl: 'templates/voicemails.html',
        controller: 'voicemailsCtrl'
      }
    }
  })

  .state('tabsController.voicemail', {
    url: '/voicemail/:id',
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

})

.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
      console.log(next.name);
      if (next.name !== 'login' && next.name !== 'onboarding') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
});
