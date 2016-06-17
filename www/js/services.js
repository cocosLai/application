angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])


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
