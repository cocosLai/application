angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    grant_type: 'password',
    username: '',
    password: ''
  };

  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $scope.user = "";
      $state.go('tabsController.home');
    }, function(error) {
      console.log(error);
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: error
      });
    });
  };
})


//Messages Master
.controller("messagesCtrl",['$scope', '$http','AuthService', 'API_ENDPOINT', 'MessageService',function($scope, $http, AuthService, API_ENDPOINT, MessageService){
    MessageService.GetMessages().then(function(messages){
        $scope.messages = messages;

        var indexedDates = [];

        $scope.messagesToFilter = function() {
            indexedDates = [];
            return $scope.messages;
        }

        $scope.filterDates = function(message) {
          var dateIsNew = indexedDates.indexOf(message.utc) == -1;

          if (dateIsNew) {
            indexedDates.push(message.utc);
          }

          return dateIsNew;
        }

        var REFERENCE = moment();
        var TODAY = REFERENCE.clone().startOf('day');
        var YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day');
        //var A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');

function isToday(momentDate) {
    return momentDate.isSame(TODAY, 'd');
}
function isYesterday(momentDate) {
    return momentDate.isSame(YESTERDAY, 'd');
}

        $scope.today = function() {
          d = new Date();
          var today = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
          return today;
        }
        $scope.yesterday = function() {
          d = new Date();
          var yesterday = Date.UTC(d.getFullYear(), d.getMonth(), (d.getDate()-1));
          return yesterday;
        }

    });
}])

//Messages Detail
.controller("messageCtrl",['$stateParams', '$scope', '$http','AuthService', 'API_ENDPOINT', 'MessageService',function($stateParams, $scope, $http, AuthService, API_ENDPOINT, MessageService){
    var messageId = $stateParams.id;
    MessageService.GetMessage(messageId).then(function(message){
        $scope.message = message;
    });
}])

//Voicemail Master
.controller("voicemailsCtrl",['$scope', '$http','AuthService', 'API_ENDPOINT', 'VoicemailService',function($scope, $http, AuthService, API_ENDPOINT, VoicemailService){
    VoicemailService.GetVoicemails().then(function(voicemails){
        $scope.voicemails = voicemails;
        var indexedDates = [];

        $scope.messagesToFilter = function() {
            indexedDates = [];
            return $scope.messages;
        }

        $scope.filterDates = function(message) {
          var dateIsNew = indexedDates.indexOf(voicemail.utc) == -1;

          if (dateIsNew) {
            indexedDates.push(voicemail.utc);
          }

          return dateIsNew;
        }
    });
}])

//Voicemail Detail
.controller("voicemailCtrl",['$stateParams', '$scope', '$http','AuthService', 'API_ENDPOINT', 'VoicemailService',function($stateParams, $scope, $http, AuthService, API_ENDPOINT, VoicemailService){
    var voicemailId = $stateParams.id;
    VoicemailService.GetVoicemail(voicemailId).then(function(voicemail){
        $scope.message = voicemail;
    });
}])



.controller('voicemailCtrl', function($scope) {
  $http.get(API_ENDPOINT.url + '/voicemails').then(function(result) {
    $scope.voicemails = result.data;
  });
})

.controller('cloudTabDefaultPageCtrl', function($scope) {

})

.controller('homeCtrl', function($scope, AuthService, UserService, AUTH_EVENTS, API_ENDPOINT, $http, $state, $rootScope, $ionicSettings) {

    UserService.GetUser().then(function(user){
        $scope.userinfo = user;
    });

    UserService.GetNumber().then(function(number){
        $scope.userinfo.number = number.mobileNumber;
    });

    $rootScope.logout = function(){
        AuthService.logout();
        $state.go('login');
    }


  // $ionicSettings.init({
  //       awesomeSelection: {
  //           type: 'selection',
  //           values: ['one', 'two', 'three'],
  //           label: 'Awesome Selection',
  //           value: 'two'
  //       },
  //       coolToggle: {
  //           type: 'toggle',
  //           label: 'Cool toggle',
  //           value: true
  //       }
  //   });



    // window.plugins.OneSignal.getIds(function(ids) {
    //   console.log('getIds: ' + JSON.stringify(ids)); // I can see PushToken and UserId in the console.
    //   //$rootScope.pushToken = ids.pushToken;
    //   //$scope.id = ids.userId;
    //   $scope.ids = {
    //     UserId: ids.userId,
    //     pushToken: ids.pushToken
    //   };
    //
    // });


    // $scope.ids = {
    //   UserId: "test",
    //   pushToken: "123"
    // };



    //console.log($rootScope.pushToken);

})

// .controller('settings2Ctrl', [$scope, SettingsFactory, function($scope, SettingsFactory) {
//
//   $scope.settings = SettingsFactory.get(); // get settings
//
//   $scope.onEmailNotificationsChange = function(state) {
//       SettingsFactory.setEmailNotifications(state);
//   }
//
// }])


.controller('historyCtrl', function($scope) {

})

.controller('passcodeCtrl', function($scope) {

})

.controller('onboardingCtrl', function($scope) {

})

.controller('pageCtrl', function($scope) {

})

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });
});
