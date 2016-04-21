var main = angular.module('main', [
  // Declare here all AngularJS dependencies that are shared by the example module.
  'supersonic', 'firebase', 'ngRoute'
]).constant('FIREBASE_URL', "https://hung0413.firebaseio.com/");

// main.config(['$routeProvider', function($routeProvider){
// 	$routeProvider.
// 	when('/login',{
// 		templateUrl: 'views/home.html',
// 		controller: 'home_controller'
// 	}).
// 	when('/register', {
// 		templateUrl: 'views/register.html',
// 		controller: 'home_controller'
// 	}).
// 	when('/success', {
// 		templateUrl: '/views/messages.html',
// 		// controller: 'SuccessController'
// 	}).
// 	otherwise({
// 		redirectTo: '/login'
// 	});
// }]);