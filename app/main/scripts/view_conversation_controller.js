angular
.module('main')
.controller('view_conversation_controller', function($scope, supersonic, $firebaseArray) {
	var ref = new Firebase("https://hungryeinstein.firebaseio.com/messages");

	updateMessages();

	var passedData = {};
	supersonic.ui.views.current.params.onValue(function(data){
		passedData = data;
	})

	$scope.addMessage = function(){
		console.log('Sending Message');
		$scope.messages.$add({
			sendID: $scope.sendID,
			rcID: $scope.rcID,
			text: $scope.text,
			time: Firebase.ServerValue.TIMESTAMP,
		});
	};
	ref.on('child_added', function() {
		updateMessages();
	});

	function updateMessages(){
		$scope.messages = $firebaseArray(ref);
	}



});




