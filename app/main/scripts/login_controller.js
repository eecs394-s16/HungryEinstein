main.controller('login_controller',
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
