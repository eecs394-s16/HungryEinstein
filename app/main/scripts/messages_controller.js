angular
.module('main')
.controller('messages_controller', function($scope, supersonic, $firebaseArray) {
	var ref = new Firebase("https://hungryeinstein.firebaseio.com/messages");

	updateMessages();

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

	// when a conversation is selected,
	// show that conversation
	$scope.viewConversation = function(from, to, time){
		steroids.logger.log("from: " + String(from) + ", to: " + String(to) + ", time: " + String(time));

		var infoForView = {sender: from, receiver: to};
		var view = new supersonic.ui.View("main#view_conversation");
		supersonic.ui.layers.push(view, {params: infoForView});
		// opening views with options
		// http://docs.appgyver.com/supersonic/api-reference/stable/supersonic/ui/layers/push/
	}

});




