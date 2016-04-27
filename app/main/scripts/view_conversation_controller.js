main.controller('view_conversation_controller',
	['$scope', 'Authentication', '$firebaseObject', 'FIREBASE_URL', '$firebaseArray', 'supersonic', '$firebaseAuth',
	function($scope, Authentication, $firebaseObject, FIREBASE_URL, $firebaseArray, supersonic, $firebaseAuth) {
	var global = {};
	// onload, get passed in values
	supersonic.ui.views.current.params.onValue(function(data){
		tempuid = global.uid;
		global = data;
		global.uid = tempuid;
		$scope.debug = data;
	});

	// messages stuff
	var ref = new Firebase("https://hungryeinstein.firebaseio.com/messages");

	// current user stuff
	var authRef = new Firebase("https://hungryeinstein.firebaseio.com");
		// supersonic.ui.dialog.alert("got to authRef");
		//supersonic.ui.dialog.alert("url is: " + FIREBASE_URL + "users/");
		var auth = $firebaseAuth(authRef);
	    // successfully login and extract login user's infomation
		auth.$onAuth(function(authUser){
		if (authUser){
			var authRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
			// supersonic.ui.dialog.alert("getting uid");
			global.uid = authUser.uid;
			// global.uid = authUser.uid;
			// authUser.uid is user's uid

		}
	});

	updateMessages();


	$scope.addMessage = function(){
		$scope.messages.$add({
			sendID: global.uid,
			rcID: global.regID,
			text: $scope.text,
			time: Firebase.ServerValue.TIMESTAMP,
		});
	};
	ref.on('child_added', function() {
		$scope.text = "";
		updateMessages();
	});


	function updateMessages(){
		// supersonic.ui.dialog.alert("updating messages");
		$scope.messages = $firebaseArray(ref);
	}

	// determine if individual messages are part of the dialogue
	$scope.dialogueFilter = function(item){
		// supersonic.ui.dialog.alert("uid: " + global.uid);
		// supersonic.ui.dialog.alert("regID: " + global.regID);
		// supersonic.ui.dialog.alert("rcID: " + item.rcID);
		// supersonic.ui.dialog.alert("sendID: " + item.sendID);

		// supersonic.ui.dialog.alert("comparing " + item.rcID + " and " + item.sendID);
		if ((item.rcID == global.uid) && (item.sendID == global.regID)){return true;}
		if ((item.rcID == global.regID) && (item.sendID == global.uid)){return true;}
		return false;
	}

	$scope.getMessageColor = function(item){
		c = {
			right: "rgb(174, 234, 174)",
			left: "rgb(179, 230, 255)",
		};
		if (item.sendID == global.uid){
			return c.right;
		}
		return c.left;
		// return "yellow";
	}

}]);




