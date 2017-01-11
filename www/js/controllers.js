angular.module('app.controllers', [])

.controller('startCtrl', function($scope, AuthService, $ionicSettings, $state) {
  $state.go('onboarding');
})

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
.controller("messagesCtrl", function($scope, $http, AuthService, API_ENDPOINT, MessageService, $ionicLoading){

	var getMessages = function(){
		$ionicLoading.show();

		MessageService.GetMessages().then(function(messages){
			$ionicLoading.hide();
			console.log(messages);
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
	};
	getMessages();

	$scope.deleteMessage = function(index){
		$ionicLoading.show();
		MessageService.DeleteMessage($scope.messages[index].idInt).then(function(data){
			console.log(data);
			$scope.messages.splice(index, 1);
			$ionicLoading.hide();
		}, function(error){
			console.log(error);
			$ionicLoading.hide();
		});
	};
})

//Messages Detail
.controller("messageCtrl",function($stateParams, $scope, $http, AuthService, API_ENDPOINT, MessageService){
    var messageId = $stateParams.id;
    MessageService.GetMessage(messageId).then(function(message){
        $scope.message = message;
    });
})

//Voicemail Master
.controller("voicemailsCtrl",function($scope, $http, AuthService, API_ENDPOINT, VoicemailService, $ionicLoading){
	var getVoiceMails = function(){
		$ionicLoading.show();
		VoicemailService.GetVoicemails().then(function(voicemails){
			$ionicLoading.hide();
			$scope.voicemails = voicemails;
			console.log($scope.voicemails);
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
	};
	getVoiceMails();
})

//Voicemail Detail
.controller("voicemailCtrl",function($stateParams, $scope, $http, AuthService, API_ENDPOINT, VoicemailService){
    var voicemailId = $stateParams.id;
    VoicemailService.GetVoicemail(voicemailId).then(function(voicemail){
        $scope.message = voicemail;
    });
})

.controller('voicemailCtrl', function($scope) {
  $http.get(API_ENDPOINT.url + '/voicemails').then(function(result) {
    $scope.voicemails = result.data;
  });
})

.controller('cloudTabDefaultPageCtrl', function($scope) {

})

.controller('homeCtrl', function($scope, $rootScope, $ionicPlatform, AuthService, UserService, AUTH_EVENTS, API_ENDPOINT, $http, $state, $rootScope, $ionicSettings, $timeout, $ionicLoading, DeviceService) {
	$rootScope.userinfo = {};

	var getUserInfo = function(){
		//$ionicLoading.show();
		UserService.GetUser().then(function(user){
			$ionicLoading.hide();
			$rootScope.userinfo = user;

			$rootScope.quietMode = $scope.userinfo.matmiPushState;

			UserService.GetNumber().then(function(number){
				$rootScope.userinfo.number = number.mobileNumber;

				console.log($rootScope.userinfo);
			});
		});
	}
	getUserInfo();


    $rootScope.logout = function(){
        AuthService.logout();
        $state.go('login');
        $ionicLoading.hide();
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
	// $scope.ids = {};
	// var registerTokenId = function(){
	// 	$timeout(function(){
	// 		try{
	// 			//window.plugins.OneSignal.getIds(function(ids) {
	// 			  //console.log('token: ' + ids.pushToken);
	// 			  //alert("userId = " + ids.userId + ", pushToken = " + ids.pushToken);
  //         console.log(Push.token);
  //
	// 				//$scope.ids.UserId = ids.userId;
	// 				//$scope.ids.pushToken = ids.pushToken;
  //
	// 				$ionicLoading.show();
	// 				var param = {deviceId:token.token}
	// 				DeviceService.ChangeQuietMode(param).then(function(data){
	// 					console.log(data);
	// 					$ionicLoading.hide();
	// 				});
	// 			//});
	// 		}catch(e){console.log(e);}
	// 	});
	// }
	// registerTokenId();
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

.controller('onboardingCtrl', function($scope, $state) {

  var ONBOARDING_SEEN;

  var isSeen = window.localStorage.getItem(ONBOARDING_SEEN);

  if (!isSeen) {
    isSeen = window.localStorage.setItem(ONBOARDING_SEEN, true);
  }

  if (isSeen) {
    $state.go('tabsController.home');
  }

})

.controller('settingsCtrl', function($scope) {

})



.controller('AppCtrl', function($scope, $rootScope, $state, $ionicPopup, AuthService, AUTH_EVENTS, $ionicSettings, DeviceService, $ionicLoading) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });

  $scope.initQuietMode = function(){
    $rootScope.quietMode = true;
  }

  $scope.changeQuietMode = function(){
	  //if($rootScope.userinfo.matmiDeviceId){
			//$scope.quietMode = !$scope.quietMode;
			$ionicLoading.show();
			$rootScope.quietMode = !$rootScope.quietMode;
			if($rootScope.quietMode){
				var param = {"pushState":1}
			}else{
				var param = {"pushState":0}
			}
			DeviceService.ChangeQuietMode(param).then(function(data){
				console.log(data);
				$ionicLoading.hide();
			});
	  //}
  }

  $scope.authenticated = AuthService.isAuthenticated();

});
