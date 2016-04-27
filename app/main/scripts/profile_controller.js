main.controller('profile_controller',
	['$scope','$rootScope', 'Authentication', '$firebaseObject', 'FIREBASE_URL', '$firebaseArray', '$firebaseAuth','supersonic',
	function($scope,$rootScope, Authentication, $firebaseObject, FIREBASE_URL, $firebaseArray, $firebaseAuth,supersonic){
	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);
    // successfully login and extract login user's infomation

  var global = {};
  // onload, get passed in values
  supersonic.ui.views.current.params.onValue(function(data){
    global = data;
    supersonic.ui.dialog.alert(data);
  });


	auth.$onAuth(function(authUser){
		if (authUser){
			var authRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
			var userObj = $firebaseObject(authRef);

      var userArray = $firebaseArray(authRef);
			$rootScope.currentUser = userObj;  // get currentUserInfo

  //           // request folder ----------------managing all requests 
  //           var refRequest = new Firebase(FIREBASE_URL + 'requests/');
  //           var allRequests = $firebaseArray(refRequest);
  //           // var requestsNum = 0;
		// var requestUnaccepted = [];
  //           var requestUnacceptedKey = [];
  //           // $scope.message  = "nope!";
	      
  //           // allRequests = [{name: 'Jimi', gender: "18"},{name: 'Peter', gender: '20'},{name: 'Bob', gender: '30'}];
  //           allRequests.$loaded().then(function(){
  //           	angular.forEach(allRequests, function(value, key){
  //           		// travese all requests
  //           			if(value.accepted == false){
  //           				requestUnaccepted.push(value);
  //           				// $scope.acceptRec = value;
  //           				// requestsNum = requestNum + 1;
  //           				requestUnacceptedKey.push(value.$id);
  //           			}
  //           		// angular.forEach(value, function(value, key){

  //           		// });
  //           	});
  //           });

  //           userArray.$loaded().then(function(data){
  //                 // angular.forEach(allRequests, function(value, key){
  //                 //       // travese all requests
  //                 //             if(value.accepted == false){
  //                 //                   requestUnaccepted.push(value);
  //                 //                   // $scope.acceptRec = value;
  //                 //                   // requestsNum = requestNum + 1;
  //                 //                   requestUnacceptedKey.push(value.$id);
  //                 //             }
  //                 //       // angular.forEach(value, function(value, key){

  //                 //       // });
  //                 // });
  //           });
		// 	// }

  //           // $scope.requestUnaccepted = requestUnaccepted;
  //   //      // $scope.requestNumber = requestNumber;
  //           $scope.allRequests = allRequests;
  //   //         // // $scope.requestsAll = allRequests;
  //           $scope.accept = function(index){

  //           	var firebID = requestUnacceptedKey[index];

  //           	var record = allRequests.$getRecord(firebID);
  //           	record.accepted = true;
  //                 record.tutorID = $rootScope.currentUser.$id;
  //                 // $scope.message = $rootScope.currentUser.$id;
  //                 supersonic.ui.dialog.alert(record.dateExp);

  //           	allRequests.$save(record).then(function(){
  //                       $scope.message = "go accepted";
  //           		requestUnacceptedKey.splice(index, 1);
  //           	});

		// 		// ref.on('child_changed', function() {
		// 			// $scope.requestUnaccepted.$loaded(function(data){
		// 		// $scope.message = "go in here";
		// 			// });
		// 		// });
				
  //           	// allRequests.$watch(function(data){
  //           	// 	// function PersonListCtrl($scope, $http) {
  //           	// 	$scope.requestUnaccepted.$loaded(function(){

  //           	// 	});
  //           	// });
              $scope.getImgFromLib = function(){
                var options = {
                      quality: 50,
                      allowEdit: true,
                      targetWidth: 150,
                      targetHeight: 150,
                      encodingType: "png",
                      destinationType: "dataURL"
                  };
                  supersonic.media.camera.getFromPhotoLibrary(options).then( function(result){
                  // Do something with the image URI
                        var record = userArray.$getRecord("img");
                         // $scope.message = record.$value;
                         // record.$value = "pppp";
                         // $scope.message = record.$value;

                        // $scope.message = "go into this ";
                        // var record = userArray.$getRecord(firebID);
                        record.$value = result;
                        
                        userArray.$save(record).then(function(){
                              $scope.message = record.$value;
                        // requestUnacceptedKey.splice(index, 1);
                        });
                  });
              };
              // $scope.message1 = record.$img;
              $scope.takephoto = function(){
                  // $scope.message ="go into this ";
                  var options = {
                    quality: 50,
                    allowEdit: true,
                    targetWidth: 150,
                    targetHeight: 150,
                    encodingType: "png",
                    saveToPhotoAlbum: true,
                    destinationType: "dataURL"
                  };

                  supersonic.media.camera.takePicture(options).then(function(result){
                        var record = userArray.$getRecord("img");
                         // $scope.message = record.$value;
                         // record.$value = "pppp";
                         // $scope.message = record.$value;

                        // $scope.message = "go into this ";
                        // var record = userArray.$getRecord(firebID);
                        record.$value = result;
                        
                        userArray.$save(record).then(function(){
                              $scope.message = record.$value;
                        // requestUnacceptedKey.splice(index, 1);
                        });
                  });
              };

		} // userAuthenticated
	});  //onAuth
}]);
