BandStormApp.controller('AuthCtrl', ['$scope','$mdDialog','$http','$location','UserService', function($scope,$mdDialog,$http,$location,UserService){
  console.log('AuthCtrl init')

  $scope.UserService = UserService;
  $scope.$watchCollection('UserService', function(){
    $scope.currentUser = UserService.currentUser;
  });


  $scope.newUser = {
    name: '',
    email:'',
    password:''
  }

  $scope.user = {
    email:'',
    password:''
  }

  $scope.signUpModal = function($event) {
    $mdDialog.show({
        targetEvent: $event,
        templateUrl: 'views/signup.html',
        controller: 'AuthCtrl',
    });
  }

  $scope.logInModal = function($event) {
    $mdDialog.show({
        targetEvent: $event,
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
    });
  }

  $scope.logOut = function(){
    UserService.logout()
    $location.path('/')
  }

  $scope.logIn = function(callback){
    UserService.login($scope.user.email, $scope.user.password, function(err,data){
      if (err) {
        console.log(err);
        alert('Something terrible has happened.')
      } else if (data) {
        console.log(data)
        $scope.closeModal();
      } else {
        console.log(data);
        alert('Unable to Kenny.')
      }
    });
  }

  $scope.signUp = function(callback){
    var newUser = $scope.newUser
    $http.post('api/user/create',{
      name:newUser.name,
      email:newUser.email,
      password:newUser.password
    }).success(function(data){
      UserService.login(newUser.email, newUser.password, function(err,data){
        if (err) {
          console.log(err);
          alert('Something terrible has happened.')
        } else if (data) {
          console.log(data)
          $scope.closeModal();
        } else {
          console.log(data);
          alert('Unable to Kenny.')
        }
      });
      console.log(data);
      callback(null,data);
    }).error(console.log);
  }

  $scope.closeModal = function() {
    $mdDialog.hide();
  }


}]);