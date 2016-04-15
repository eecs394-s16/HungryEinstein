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




