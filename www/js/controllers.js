angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    grant_type: 'password',
    username: '',
    password: ''
  };

  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('tabsController.home');
    }, function(error) {
      console.log(error);
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: error.error_description
      });
    });
  };
})

//.controller('messagesCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {
  // $http.get(API_ENDPOINT.url + '/messages').then(function(result) {
  //   $scope.messages = result.data;
  // });
//})


.controller("messagesCtrl",['$scope', '$http','AuthService', 'API_ENDPOINT', 'MessageService',function($scope, $http, AuthService, API_ENDPOINT, MessageService){
    MessageService.GetMessages().then(function(messages){
        console.log(messages);
        $scope.messages = messages;
    });
}])

.controller("messageCtrl",['$stateParams', '$scope', '$http','AuthService', 'API_ENDPOINT', 'MessageService',function($stateParams, $scope, $http, AuthService, API_ENDPOINT, MessageService){
    var messageId = $stateParams.id;
    MessageService.GetMessage(messageId).then(function(message){
        console.log(message);
        $scope.message = message;
    });
}])


.controller('voicemailCtrl', function($scope) {
  $http.get(API_ENDPOINT.url + '/voicemails').then(function(result) {
    $scope.voicemails = result.data;
  });
})

.controller('cloudTabDefaultPageCtrl', function($scope) {

})

.controller('homeCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state, $rootScope, $ionicSettings) {

    $http.get(API_ENDPOINT.url + '/user').then(function(result) {
      $scope.userinfo = result.data;
    });

    $http.get(API_ENDPOINT.url + '/user/number').then(function(result) {
      console.log(result.data);
      $scope.userinfo.number = result.data.mobileNumber;
    });

    // $rootScope.logout = function(){
    //     AuthService.logout();
    //     console.log("logged out");
    //   }
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
