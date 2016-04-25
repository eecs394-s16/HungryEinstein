angular
.module('main')
.controller('view_conversation_controller', function($scope, supersonic, $firebaseArray) {
	var ref = new Firebase("https://hungryeinstein.firebaseio.com/messages");
	// hardcoded for testing
	var uID = "3333";

	updateMessages();

	var passedData = {};
	supersonic.ui.views.current.params.onValue(function(data){
		passedData = data;
		$scope.otherPerson = passedData.otherPerson;
	});

	$scope.addMessage = function(){
		console.log('Sending Message');
		$scope.messages.$add({
			sendID: uID,
			rcID: passedData.otherPerson,
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

	// determine if individual messages are part of the dialogue
	$scope.dialogueFilter = function(item){
		//supersonic.ui.dialog.alert("comparing " + String(item.rcID) + " and " + String(item.sendID));
		if ((item.rcID == uID) && (item.sendID == passedData.otherPerson)){return true;}
		if ((item.rcID == passedData.otherPerson) && (item.sendID == uID)){return true;}
		return false
	}



});




