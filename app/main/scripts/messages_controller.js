main.controller('messages_controller',
	['$scope', 'Authentication', '$firebaseObject', 'FIREBASE_URL', '$firebaseArray', 'supersonic', '$firebaseAuth',
	function($scope, Authentication, $firebaseObject, FIREBASE_URL, $firebaseArray, supersonic, $firebaseAuth) {
	var global = {uid: ""};
	// messages
	var ref = new Firebase("https://hungryeinstein.firebaseio.com/messages");
		// supersonic.ui.dialog.alert("got to ref");
		ref.on('child_added', function() {
		updateMessages();
	});

	// all users
	var usersRef = new Firebase('https://hungryeinstein.firebaseio.com/users');
		// supersonic.ui.dialog.alert("got to usersRef");
		ref.on('child_added', function() {
		updateConversations();
	});

	// current user stuff
	var authRef = new Firebase(FIREBASE_URL);
		// supersonic.ui.dialog.alert("got to authRef");
		var auth = $firebaseAuth(authRef);
	    // successfully login and extract login user's infomation
		auth.$onAuth(function(authUser){
		if (authUser){
			var authRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
			$scope.debug = authUser.uid;
			global.uid = authUser.uid;
			// authUser.uid is user's uid
		}
	});

	updateMessages();
	var messages;
	function updateMessages(){
		// supersonic.ui.dialog.alert("updating messages");
		messages = $firebaseArray(ref);
	}

	updateConversations();// call it onload
	function updateConversations(){
		// supersonic.ui.dialog.alert("got to updateConversations");
		// $scope.users = ["test", "everything", "trust", "no one"];
		$scope.users = $firebaseArray(usersRef); //messArray;
		// $scope.debug = $firebaseArray(usersRef);
		// $scope.messages.$loaded(function(x){
		// 	//supersonic.ui.dialog.alert("length is: " + $scope.messages.length);
		// });
		// $scope.debug = global.uid;
	}

	// determine name of conversation
	$scope.getTitle = function(item){
		prefix = "";
		suffix = item.firstname + " " + item.lastname;
		return prefix + suffix;
	}

	// filter all messages for conversations
	// all messages -> relevant messages -> unique conversations
	$scope.convoFilter = function(user){
		// supersonic.ui.dialog.alert("regID: " + user.regID);
		// supersonic.ui.dialog.alert("global.uid: " + global.uid);
		for (i in messages){
			item = messages[i];
			if ((item.rcID == global.uid) && (item.sendID == user.regID)){return true;}
			if ((item.rcID == user.regID) && (item.sendID == global.uid)){return true;}
		}

		return false;

			// functions ----------------------
			function myXOR(a,b) {

				return ( a || b ) && !( a && b );
			}
	}

	// when a conversation is selected,
	// show that conversation
	$scope.viewConversation = function(item){
		//steroids.logger.log("from: " + String(from) + ", to: " + String(to) + ", time: " + String(time));

		var view = new supersonic.ui.View("main#view_conversation");
		var infoForView = item;
		supersonic.ui.layers.push(view, {params: infoForView});
		// opening views with options
		// http://docs.appgyver.com/supersonic/api-reference/stable/supersonic/ui/layers/push/
	}



}]);






