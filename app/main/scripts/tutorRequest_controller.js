 angular
.module('main')
.controller('tutorRequest_controller', function($scope, supersonic, $firebaseArray, $rootScope) {
  

  var ref = new Firebase("https://hungryeinstein.firebaseio.com/requests");

  updateRequest();

  // $scope.message = $rootScope.currentUser.firstname;

  // $scope.message = "Calling controller";

  $scope.addRequest = function(){
    console.log('Sending Message');
    $scope.requests.$add({
      name: $scope.name,
      date: $scope.date.toString(),
      subject: $scope.subject,
      location: $scope.location_tutor,
      accepted: false,
      // userID: $rootScope.currentUser.firstname,
      tutorID: 0
    });
  };

  ref.on('child_added', function() {
    updateRequest();
  });

  function updateRequest(){
    $scope.requests = $firebaseArray(ref);
  }

});





// angular
// .module('main')
// .controller('tutorRequest_controller', 
//   ['$scope','$firebaseArray','supersonic',
// 	// ['$scope', '$rootScope','$firebaseAuth', 'FIREBASE_URL', '$firebaseArray', '$firebaseObject', 'supersonic', 'Authentication',
// 	function($scope, $firebaseArray, supersonic) {
	
//   var ref = new Firebase("https://hungryeinstein.firebaseio.com/" + 'requests/');
//     $scope.message = "link ok ";

//   var requestInfo = $firebaseArray(ref);

 
//   // updateRequest();

//   $scope.addRequest = function(){
//     // console.log('Sending Message');
//     $scope.message = "go into add ";
//     requestInfo.$add({
//       // name: $scope.name,
//       // date_tutor: $scope.date.toString(),
//       // subject: $scope.subject,
//       // food: $scope.food,
//       // location: $scope.location_tutor,
//       // // accepted: false,
//       // // userID: currentUser.$id,
//       // // tutorID: null
//     }).then(function(ref){
//       var id = ref.key();
//       $scope.name =" ";
//       $scope.subject =" ";
//     });
//   };

//   // ref.on('child_added', function() {
//   //   updateRequest();
//   // });


//   // function updateRequest(){
//   //   var request = $firebaseArray(ref);
//   //   $scope.message = "go into update ";
//   // }
	
//   // var sync = $firebase(ref);
//   // $scope.projects = sync.$asArray();

//   // $scope.addMessage = function(data) {
//   //  $scope.projects.$add({data: data});
//   // }

// 	// $scope.addRequest = function () {
//  //    var name = $scope.name.trim();
//  //    var subject = $scope.subject.trim();
//  //    var expiry = $scope.expiry.trim();

//  //    $scope.projects.$add({
//  //      nm: name,
//  //      sbjt: subject,
//  //      expry: expiry
//  //    });

//  //    $scope.name = '';
//  //    $scope.subject = '';
//  //    $scope.expiry = '';
//  //  };

// });