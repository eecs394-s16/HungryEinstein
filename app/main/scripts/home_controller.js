angular
.module('main')

 main.controller('home_controller',
	['$scope', 'Authentication', '$firebaseObject', 'FIREBASE_URL', '$firebaseArray', 'supersonic',
	function($scope, Authentication, $firebaseObject, FIREBASE_URL, $firebaseArray, supersonic){

		var ref = new Firebase(FIREBASE_URL + 'users/');
		// var syndata = $firebaseObject(ref);
		// syndata.$bindTo($scope, "data");

		$scope.messages = $firebaseArray(ref);

		$scope.login = function() {
			Authentication.login($scope.user);
			
		};
		$scope.logout = function() {
			Authentication.logout();
		};
		
		$scope.register = function(){
			Authentication.register($scope.user);
		};

		$scope.addRequest = function(){
			Authentication.addRequest();
		};

}]);





// .controller('home_controller', function($scope, supersonic, $firebaseArray) {
// 	var ref = new Firebase("https://hungryeinstein.firebaseio.com/");

// 	$scope.requests = $firebaseArray(ref);
// 	alert("hi");
// 	$scope.myDate = new Date("Fri Apr 21 2017 00:00:00 GMT-0500 (CDT)");
// 	alert($scope.myDate.getDay());
// 	$scope.addRequest = function(){
// 		console.log('Adding Request');
// 		$scope.requests.$add({
// 			name: $scope.name,
// 			subject: $scope.subject,
// 			expiry: $scope.expiry
// 		}).then(function(ref){
// 			var id = ref.key();
// 			console.log("Added Request" + id);
// 			$scope.name =" ";
// 			$scope.subject =" ";
// 			$scope.expiry =" ";
// 		});
// 	}
// })