 main.controller('request_controller',
	['$scope', '$rootScope','$firebaseAuth', 'FIREBASE_URL', '$firebaseArray', '$firebaseObject', 'supersonic', 'Authentication',
	function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL, $firebaseObject, supersonic, Authentication){
		
		var ref = new Firebase(FIREBASE_URL);
		var auth = $firebaseAuth(ref);		   
        // successfully login and extract login user's infomation
		auth.$onAuth(function(authUser){
			if (authUser){
				var authRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
				var userObj = $firebaseObject(authRef);
				// $rootScope.messages =
				
				$rootScope.currentUser = userObj;

			} else {
				$rootScope.currentUser = '';
			}
		});

		// $scope.currentUser = 'lalalla';
		// var ref = new Firebase(FIREBASE_URL);
		// var auth = $firebaseAuth(ref);
		// auth.$onAuth(function(authUser){
		// 	if (authUser){

		// 	    var authRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
		// 		var userObj = $firebaseObject(authRef);
		// // 		// $rootScope.messages =
				
		// 		$rootScope.currentUser = userObj;  // user infomation
  //    			// console.log('currentUser');

		// 		// var requestRef = new Firebase(FIREBASE_URL + 'users/' + 
		// 		// 	$rootScope.currentUser.$id + '/foods');

		// 		// var foodinfo = $firebaseArray(requestRef);

		// 		// $scope.addRequest = function(){
		// 		// 	foodinfo.$add({
		// 		// 		name: $scope.requestfood,
		// 		// 		date: Firebase.ServerValue.TIMESTAMP
		// 		// 	}).then(function(){
		// 		// 		$scope.requestfood = '';
		// 		// 	});
		// 		// }; // 
		// 	}  // authUser
		// });
	  // console.log("fail");
}]);

// main.controller('request_controller', ['$scope', function($scope){
	
// }]);