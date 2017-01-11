angular.module('app.factories', [])

// Factory for node-pushserver (running locally in this case), if you are using other push notifications server you need to change this
.factory('PushFactory', function ($http, API_ENDPOINT){
  // Configure push notifications server address

  return {
    // Stores the device token in a db using node-pushserver
    // type:  Platform type (ios, android etc)
    //storeDeviceToken: function(type, regId) {
    storeDeviceToken: function(type, regId) {
      var user = {
        type: type,
        deviceId: regId
      };
      console.log(type);
      console.log("Post token for registered device with data " + JSON.stringify(user));

      $http.post(API_ENDPOINT.url + '/user/device', JSON.stringify(user))
       .then(
           function(response){ // success callback
             console.log("Token stored in SecretMe platform.");
           },
           function(response){ // failure callback
             console.log("Error storing device token." + response);
           }
        );

    },
    // CURRENTLY NOT USED!
    // Removes the device token from the db via node-pushserver API unsubscribe (running locally in this case).
    // If you registered the same device with different userids, *ALL* will be removed. (It's recommended to register each
    // time the app opens which this currently does. However in many cases you will always receive the same device token as
    // previously so multiple userids will be created with the same token unless you add code to check).
    removeDeviceToken: function(token) {
      var tkn = {"token": token};
      $http.post(push_server_address+'/unsubscribe', JSON.stringify(tkn))
      .success(function (data, status) {
        console.log("Token removed, device is successfully unsubscribed and will not receive push notifications.");
      })
      .error(function (data, status) {
        console.log("Error removing device token." + data + " " + status);
      });
    }
  };
})
