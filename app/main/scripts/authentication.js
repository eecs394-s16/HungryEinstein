main.factory('Authentication',
	['$rootScope', '$firebaseAuth', 'FIREBASE_URL', '$location', '$firebaseObject', 'supersonic',
	function($rootScope, $firebaseAuth, FIREBASE_URL, $location, $firebaseObject, supersonic){

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
		
		return {
			// addRequest: function(){
			// 	$scope.message = "fail";

			// 	if (temp_auth){
			// 		$scope.message = "add successfully!";

			// 	}
			// 	var requestRef = new Firebase(FIREBASE_URL + 'users/' + 
			// 		temp_auth.uid + '/foods');

			// 	var foodinfo = $firebaseArray(requestRef);

			// 		foodinfo.$add({
			// 			name: $scope.requestfood,
			// 			date: Firebase.ServerValue.TIMESTAMP
			// 		}).then(function(){
			// 			$scope.requestfood = '';
			// 			$scope.message = "add successfully!";
			// 		}); 
			// },

			logout: function(){
				$rootScope.message = "successfully logout!";
				supersonic.ui.initialView.show();
				return auth.$unauth();
				
			},

			login: function(user){
				auth.$authWithPassword({
					email: user.email,
					password: user.password
				}).
				then(function(){
					//login successfully
					// $rootScope.message = "welcome login in" + user.email;
					var animation = supersonic.ui.animate("fade");
   					supersonic.ui.initialView.dismiss(animation);
				}).catch(function(error){
					$rootScope.message = error.message;
				});
				// $rootScope.message = "welcome" + user.email;
			},  // login

			register: function(user){
				auth.$createUser({
					email: user.email,
					password: user.password // pay attention to the"," or ";"
				}).then(function(regUser){
					$rootScope.message = "welcome" + user.firstname;
					var refReg = new Firebase(FIREBASE_URL + 'users')
					.child(regUser.uid).set({
						data: Firebase.ServerValue.TIMESTAMP,
						firstname: user.firstname,
						lastname: user.lastname,
						email: user.email,
						regID: regUser.uid
					}); //user info
					// $window.location.href = 'home.html';
					supersonic.ui.initialView.show();
				}).catch(function(error){
					$rootScope.message = error.message;
				}); // createUser
			} //register
		};  //return
}]); //factory