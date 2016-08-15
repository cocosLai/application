angular.module('app.routes', ['ionicSettings'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



  // .state('tabsController.history', {
  //   url: '/history',
  //   views: {
  //     'tab2': {
  //       templateUrl: 'templates/history.html',
  //       controller: 'historyCtrl'
  //     }
  //   }
  // })


    .state('onboarding', {
      url: '/onboarding',
      templateUrl: 'templates/onboarding.html',
      controller: 'onboardingCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })


  .state('AppCtrl', {
    url: '/',
    abstract:true,
    resolve: {

                settings: function($ionicSettings, $ionicPopup) {
                  console.log("touched");
                    var settings = {
                        toggle1: {
                            type: 'toggle',
                            label: 'Toggle 1',
                            value: true
                        },
                        toggle2: {
                            type: 'toggle',
                            label: 'Toggle 2',
                            value: false
                        },
                        pin: {
                            type: 'pin',
                            label: 'PIN',
                            value: '',
                            onValid: function() {
                                $ionicPopup.alert({
                                    title: 'Success',
                                    template: 'Welcome!'
                                });
                            },
                            onInvalid: function($event, wrongPinValue) {
                                $ionicPopup.alert({
                                    title: 'Fail',
                                    template: 'Wrong pin: ' + wrongPinValue + '! Try again.'
                                });
                            }
                        }
                    };
                    return $ionicSettings.init(settings);
                }
            }
  })

  .state('tabsController', {
    url: '/tabs',
    templateUrl: 'templates/tabsController.html',
    abstract:true,

  })

  .state('tabsController.home', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl',
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






$urlRouterProvider.otherwise('/onboarding')

})
