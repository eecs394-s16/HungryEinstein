main.controller('schedule_controller',
	['$scope', 'Authentication', '$firebaseObject', 'FIREBASE_URL', '$firebaseArray', 'supersonic',
	function($scope, Authentication, $firebaseObject, FIREBASE_URL, $firebaseArray, supersonic){

		$scope.currentRequest = steroids.views.params.id
		
		var ref = new Firebase("https://hungryeinstein.firebaseio.com/requests");

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


   }
		

}]);
