main.controller('home_controller',
	['$scope','$rootScope', 'Authentication', '$firebaseObject', 'FIREBASE_URL', '$firebaseArray', '$firebaseAuth','$interval',
	function($scope,$rootScope, Authentication, $firebaseObject, FIREBASE_URL, $firebaseArray, $firebaseAuth,$interval){
	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);
    // successfully login and extract login user's infomation

	auth.$onAuth(function(authUser){
		if (authUser){
			var authRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
			var userObj = $firebaseObject(authRef);
			$rootScope.currentUser = userObj;  // get currentUserInfo

            // request folder ----------------managing all requests 
            var refRequest = new Firebase(FIREBASE_URL + 'requests/');
            var allRequests = $firebaseArray(refRequest);
            // var requestsNum = 0;
		var requestUnaccepted = [];
            var requestUnacceptedKey = [];
            // $scope.message  = "nope!";
	
            // allRequests = [{name: 'Jimi', gender: "18"},{name: 'Peter', gender: '20'},{name: 'Bob', gender: '30'}];
            allRequests.$loaded().then(function(){
            	angular.forEach(allRequests, function(value, key){
            		// travese all requests
            			if(value.accepted == false){
            				requestUnaccepted.push(value);
            				// $scope.acceptRec = value;
            				// requestsNum = requestNum + 1;
            				requestUnacceptedKey.push(value.$id);
            			}
            		// angular.forEach(value, function(value, key){

            		// });
            	});
            });
			// }

            // $scope.requestUnaccepted = requestUnaccepted;
    //      // $scope.requestNumber = requestNumber;
            $scope.allRequests = allRequests;
    //         // // $scope.requestsAll = allRequests;
            $scope.accept = function(index){

            	var firebID = requestUnacceptedKey[index];

            	var record = allRequests.$getRecord(firebID);
            	record.accepted = true;
                  record.tutorID = $rootScope.currentUser.$id;
                  // $scope.message = $rootScope.currentUser.$id;

            	allRequests.$save(record).then(function(){
                        $scope.message = "go accepted";
            		requestUnacceptedKey.splice(index, 1);
            	});

				// ref.on('child_changed', function() {
					// $scope.requestUnaccepted.$loaded(function(data){
				// $scope.message = "go in here";
					// });
				// });
				
            	// allRequests.$watch(function(data){
            	// 	// function PersonListCtrl($scope, $http) {
            	// 	$scope.requestUnaccepted.$loaded(function(){

            	// 	});
            	// });
				// function update(){
				// 	allRequests.$loaded(function(x){})
				// }

            };
      //       $scope.requetsAll = allRequests;
    		// $interval($scope.requetsAll, 100);

	        $scope.logout = function(){
				$scope.message = "successfully logout!";
				supersonic.ui.initialView.show();
				return auth.$unauth();
	        };

		} // userAuthenticated
	});  // onAuth
}]);
