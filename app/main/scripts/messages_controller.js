// main.controller('login_controller',
// 	['$scope', 'Authentication', '$firebaseObject', 'FIREBASE_URL', '$firebaseArray', 'supersonic',
// 	function($scope, Authentication, $firebaseObject, FIREBASE_URL, $firebaseArray, supersonic){


main.controller('messages_controller',
	['$scope', 'Authentication', '$firebaseObject', 'FIREBASE_URL', '$firebaseArray', 'supersonic',
	function($scope, Authentication, $firebaseObject, FIREBASE_URL, $firebaseArray, supersonic) {
	var ref = new Firebase("https://hungryeinstein.firebaseio.com/messages");
	// hardcoded for testing
	var uID = "3333";
	updateMessages();

	$scope.debug = FIREBASE_URL;

	var authRef = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(authRef);

    // successfully login and extract login user's infomation
	// auth.$onAuth(function(authUser){
	// 	if (authUser){
	// 		var authRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
	// 		var userObj = $firebaseObject(authRef);

	// 		var userArray = $firebaseArray(authRef);
	// 		$rootScope.currentUser = userObj;
	// 	}
	// }

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
		$scope.messages = $firebaseArray(ref); //messArray;
		$scope.messages.$loaded(function(x){
			//supersonic.ui.dialog.alert("length is: " + $scope.messages.length);
		});
		// $scope.newmessages = makeToConvos($scope.messages);

		// function makeToConvos(fbarray){
		// 	//supersonic.ui.dialog.alert(String(fbarray.$keyAt(1)));
		// 	return fbarray;
		// }	
	}

	// when a conversation is selected,
	// show that conversation
	$scope.viewConversation = function(item){
		//steroids.logger.log("from: " + String(from) + ", to: " + String(to) + ", time: " + String(time));

		var infoForView = {otherPerson: getOtherPerson(item)};
		var view = new supersonic.ui.View("main#view_conversation");
		supersonic.ui.layers.push(view, {params: infoForView});
		// opening views with options
		// http://docs.appgyver.com/supersonic/api-reference/stable/supersonic/ui/layers/push/
		
		function getOtherPerson(item){
		if (item.rcID == uID){
			return item.sendID;
		}
		else if (item.sendID == uID){
			return item.rcID;
		}
		else return 0;
		}
	}

	// determine name of conversation
	// input -> object with .rcID and .sendID
	$scope.getTitle = function(item){
		prefix = "conversation with ";
		if (item.rcID == uID){
			suffix = item.sendID;
		}
		else if (item.sendID == uID){
			suffix = item.rcID;
		}
		return prefix + suffix;
	}

	// filter all messages for conversations
	// all messages -> relevant messages -> unique conversations
	$scope.convoFilter = function(item){
		// $scope.convos.push(item);
		//supersonic.ui.dialog.alert(convos.getIfIn(item));
		//steroids.logger.log("item");
		//convos.clear();
		//steroids.logger.log(String("ifFirst"));
		//supersonic.ui.dialog.alert(ifFirst);
		// if (ifFirst){supersonic.ui.dialog.alert("here2");convos.clear();}
		//if ($first){supersonic.ui.dialog.alert("first bitchsss");}
		//if(ifStart){supersonic.ui.dialog.alert("first bitchsss");}
		if (item.rcID == uID){return true;}
		else if (item.sendID == uID){return true;}
		return false;
	}

	// $scope.processMessages = function(messages){
	// 	var convos = {
	// 		list: [],
	// 		getIfIn: function(id){
	// 			for (i in this.list){
	// 				if (this.list[i] == id){
	// 				return true;
	// 				}
	// 			}
	// 			this.list.push(id);
	// 			//supersonic.ui.dialog.alert(this.list);
	// 			return false;
	// 		},
	// 		clear: function(){this.list = [];},
	// 	};

	// 	toReturn = {};
	// 	for (i in messages){
	// 		if (messages[i].rcID == uID){
	// 			toReturn.push(messages[i].sendID);
	// 			supersonic.ui.dialog.alert("pushed sendID");
	// 		}
	// 		else if (messages[i].sendID == uID){
	// 			toReturn.push(messages[i].rcID);
	// 			supersonic.ui.dialog.alert("pushed rcID");
	// 		}
	// 	}

	// 	return toReturn;
	// }
}]);




