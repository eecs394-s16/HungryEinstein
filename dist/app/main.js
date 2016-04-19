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

	$scope.requests = $firebaseArray(ref);

	$scope.addRequest = function(){
		console.log('Adding Request');
			$scope.requests.$add({
			name: $scope.name,
			message: $scope.message,
		});
	};
	ref.on('child_added', function(snapshot) {
		var message = snapshot.val();
		displayChatMessage(message.name, message.message);
	});

	function displayChatMessage(name, message) {
		supersonic.ui.dialog.alert(name + " >> " + message);
	 	$scope.mything = $scope.mything +
		 	"\n" + 
		 		name + " >> " + message;
	};

});




