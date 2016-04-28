main.controller('request_controller',
	['$scope','$rootScope', 'Authentication', '$firebaseObject', 'FIREBASE_URL', '$firebaseArray', '$firebaseAuth', 'supersonic',
	function($scope, $rootScope, Authentication, $firebaseObject, FIREBASE_URL, $firebaseArray, $firebaseAuth, supersonic){
	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);
    // successfully login and extract login user's infomation

	auth.$onAuth(function(authUser){
		if (authUser){
			var authRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
			var userObj = $firebaseObject(authRef);
			var userArray = $firebaseArray(authRef);

			// $rootScope.currentUser = userObj;  // get currentUserInfo
    		// $scope.message = "go into here";

            // request folder ----------------managing all requests 
            var refRequest = new Firebase(FIREBASE_URL + 'requests/');
            var requestsInfoAll = $firebaseArray(refRequest);

			// var modalView1 = new supersonic.ui.View("main#home");
			// var options = {
			// 	animate: true
			// 	}
			// // var view = new supersonic.ui.View("bananas#show");
			// supersonic.ui.layers.push(modalView1);	
			// var record2 = userObj;
			// $rootScope.message2 = authUser.uid;

	        $scope.addRequest = function() {
				requestsInfoAll.$add({
				
		            name: $scope.requester_name,
		            subject: $scope.request_subject,
		            dateExp:$scope.request_expiry.toString().substring(0,16),
		            food: $scope.food_provide,
		            location: $scope.location_tutor,
		            description: $scope.descriptions,
		            date: Firebase.ServerValue.TIMESTAMP,
		            accepted: false,
		            rated: false,
					userID: authUser.uid,
					tutorID: '',
					userImg: $rootScope.currentUser.img,
					tutorImg: ''

				}).then(function(){

					$scope.message = "added request successfully!";
				    $scope.requester_name= '';
					$scope.request_subject ='';
					$scope.request_expiry ='';
					$scope.food_provide='';
					$scope.location_tutor='';
					$scope.descriptions='';
					// $scope.message2 = userArray1;
					// supersonic.ui.modal.show(modalView);
					// supersonic.ui.model.hide();
					

					// var modalView = new supersonic.ui.View("main#home");
					// var options = {
					//   animate: true
					// }

					// supersonic.ui.modal.show(modalView, options);
					// reloadpage();
					supersonic.ui.dialog.alert("Submitted successfully!");

					
				});
					// $scope.message = "Add request successfully!";
				
	        }; // addRequest

	        function reloadpage(){
	        	supersonic.ui.layers.pop();
	        }

	        $scope.logout = function(){
				$scope.message = "successfully logged out!";
				supersonic.ui.initialView.show();
				return auth.$unauth();
	        };

		} // userAuthenticated
	});  // onAuth		
}]);
