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
                  var userArray = $firebaseArray(authRef);

			$rootScope.currentUser = userObj;  // get currentUserInfo


            // request folder ----------------managing all requests 
            var refRequest = new Firebase(FIREBASE_URL + 'requests/');
            var allRequests = $firebaseArray(refRequest);
            
		var requestUnaccepted = [];
            var requestUnacceptedKey = [];
            // $scope.message  = "nope!";
            
            // $scope.$apply ->  
            //       $scope.myData = functionThatFetchesNewData()	
            // allRequests = [{name: 'Jimi', gender: "18"},{name: 'Peter', gender: '20'},{name: 'Bob', gender: '30'}];
            // allRequests.$loaded().then(function(){
            // allRequests.$loaded().then(function(data) {
            //       // loaddata(data);
            //       $rootScope.requestNumber = loaddata(allRequests);
            // }); //Make sure meeting data is loaded

            // allRequests.$watch(function(data) {
            //       // loaddata(data);
            //       $rootScope.requestNumber = loaddata(allRequests);
            // });

            // function loaddata(allRequests){
            allRequests.$loaded().then(function(data) {

                  var requestsNum = 0;
            	angular.forEach(allRequests, function(value, key){
            		// travese all requests
            			if(value.accepted == false){
            				requestUnaccepted.push(value);
            				// $scope.acceptRec = value;
            				requestsNum = requestsNum + 1;
            				requestUnacceptedKey.push(value.$id);
            			}

                              // update all imgs belong to this user account
                              if(value.userID == authUser.uid) {
                                    value.userImg = userArray.$getRecord("img").$value;

                              }
                              if(value.tutorID == authUser.uid) {
                                    value.tutorImg = userArray.$getRecord("img").$value;
                              }
                             allRequests.$save(value).then(function(ref){

                             });
            		// angular.forEach(value, function(value, key){
            		// });
            	});  // angular for each 

                  // });
                  // return requestsNum;
            // };
            });// $load

			// }
            angular.forEach(allRequests, function(value, key){
                        // travese all requests
                              // if(value.accepted == false){
                              //       requestUnaccepted.push(value);
                              //       // $scope.acceptRec = value;
                              //       // requestsNum = requestNum + 1;
                              //       requestUnacceptedKey.push(value.$id);
                              // }

                              // update all imgs belong to this user account
                              if(value.userID == authUser.uid) {
                                    value.userImg = userArray.$getRecord("img").$value;

                              }
                              if(value.tutorID == authUser.uid) {
                                    value.tutorImg = userArray.$getRecord("img").$value;
                              }
                             allRequests.$save(value).then(function(ref){

                             });
                        // angular.forEach(value, function(value, key){
                        // });
                  });
            // $scope.requestUnaccepted = requestUnaccepted;
    //      // $scope.requestNumber = requestNumber;
            $scope.allRequests = allRequests;
    //         // // $scope.requestsAll = allRequests;
            $scope.accept = function(index){

            	var firebID = requestUnacceptedKey[index];

            	var record = allRequests.$getRecord(firebID);
            	record.accepted = true;
                  record.tutorID = $rootScope.currentUser.$id;
                  record.tutorImg = $rootScope.currentUser.img;
                  // $scope.message = $rootScope.currentUser.$id;
                  // $scope.myDate = record.dateExp;
                  // $scope.message  = myDate
                  // alert(record.dateExp);



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

            };

            $scope.cancelTutor = function(card){
                  // $scope.message = card.accepted;
                  card.accepted = false;
                  $scope.message = card;
                  allRequests.$save(card).then(function(){

                  });
            }
            
            $scope.removeRequest = function(card){
                  allRequests.$remove(card).then(function(ref){

                  });
            }


	     $scope.logout = function(){
				$scope.message = "successfully logout!";
				supersonic.ui.initialView.show();
				return auth.$unauth();
	     };

            $scope.updateRating = function(){
                  supersonic.ui.dialog.alert("Rating Successfully Submitted!")

           };

            // when a conversation is selected,
            // show that conversation
            $scope.sendMessage = function(id){
                  var view = new supersonic.ui.View("main#view_conversation");
                  var infoForView = {regID: id};
                  supersonic.ui.layers.push(view, {params: infoForView});
            }

		} // userAuthenticated
	});  // onAuth
}]);
