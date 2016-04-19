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




