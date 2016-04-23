main.controller('schedule_controller',
	['$scope', '$firebase','$firebaseAuth', '$firebaseObject', 'FIREBASE_URL', '$firebaseArray', 'supersonic',
	function($scope, $firebase, $firebaseAuth, $firebaseObject, FIREBASE_URL, $firebaseArray, supersonic){
		
		var ref = new Firebase(FIREBASE_URL);
		var auth = $firebaseAuth(ref);
        
		auth.$onAuth(function(authUser){
		if (authUser){
			var authRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
			var userObj = $firebaseObject(authRef);
			$scope.currentUser = userObj;  // get currentUserInfo



		$scope.currentRequest = steroids.views.params.id
		
		var ref = new Firebase(FIREBASE_URL + 'requests/');

		$scope.req = $firebaseArray(ref);

		$scope.desiredRequest = req.child(currentUser.id)

		$scope.date = desiredRequest.expiry



		// var query = ref.orderByChild("timestamp")

		// $scope.filteredRequests = $firebaseArray(query)
		$scope.cancel = function () {
			req.find($scope.currentRequest).then(function(request) {

				$scope.$apply( function () {
					request.accepted = false
        			$scope.showSpinner = false;
        			request.save().then( function() {
        				supersonic.ui.layers.pop();
        			});

        		});
     	});


		};
			} // valid authUser
		});// onauth
		

}]);
