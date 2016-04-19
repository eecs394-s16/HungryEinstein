angular.module('main', [
  // Declare here all AngularJS dependencies that are shared by the example module.
  'supersonic', 'firebase'
]);
	
angular
.module('main')
.controller('home_controller', function($scope, supersonic, $firebaseArray) {
	var ref = new Firebase("https://hungryeinstein.firebaseio.com/");

	$scope.requests = $firebaseArray(ref);

	$scope.addRequest = function(){
		console.log('Adding Request');
		$scope.requests.$add({
			name: $scope.name,
			subject: $scope.subject,
			expiry: $scope.expiry
		}).then(function(ref){
			var id = ref.key();
			console.log("Added Request" + id);
			$scope.name =" ";
			$scope.subject =" ";
			$scope.expiry =" ";
		});
	}
});





angular
.module('main')
.controller('messages_controller', function($scope, supersonic, $firebaseArray) {
	var ref = new Firebase("https://hungryeinstein.firebaseio.com/messages");

	updateMessages();

	$scope.addMessage = function(){
		console.log('Sending Message');
		$scope.messages.$add({
			name: $scope.name,
			message: $scope.message,
		});
	};
	ref.on('child_added', function() {
		updateMessages();
	});

	function updateMessages(){
		$scope.messages = $firebaseArray(ref);
	}

});


// Ariana's Code

// main.factory('Authentication',
//     ['$rootScope', '$firebaseAuth', 'FIREBASE_URL', '$location', '$firebaseObject', 'supersonic',
//     function($rootScope, $firebaseAuth, FIREBASE_URL, $location, $firebaseObject, supersonic){

        // var ref = new Firebase(FIREBASE_URL);
        // var auth = $firebaseAuth(ref);
//         // var temp_auth;           
//        // successfully login and extract login user's infomation
//         auth.$onAuth(function(authUser){
//             if (authUser){
//                 temp_auth = authUser;
//                 var authRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
//                 var userObj = $firebaseObject(authRef);
//                 // $rootScope.messages =
                
//                 $rootScope.currentUser = userObj;


//             } else {
//                 $rootScope.currentUser = '';
//             }
//         });




