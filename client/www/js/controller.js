angular.module('starter')
//[]
.controller('AppCtrl', function() {})
.controller('LoginCtrl', function($scope,$http,$state,$ionicPopup) {
$scope.login = function(data){
  data.password =CryptoJS.MD5(data.password).toString();
  
  $http.post("http://localhost:8080/api/auth/login",data).then(function (res){


   console.log("user infos "+res.data.nom+"  "+res.data.prenom+"   "+res.data._id);

    window.localStorage['userId'] = res.data._id;
    window.localStorage['nom'] = res.data.nom;
    window.localStorage['prenom'] = res.data.prenom;


    $state.go('dash')
},function(err){

    console.error('err post' ,err);
    var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your identifiant!'
    });
  })
}
})

.controller('InscriptionCtrl', function($scope,$state,$http){
    $scope.save = function(data){
        $http.post("http://localhost:8080/api/users",data).then(function (res){

        console.log("user infos "+res.data.nom+"  "+res.data.prenom+"   "+res.data._id);

        $state.go('dash')
},function(err){

  console.error('err post' ,err);
    
})
}

})

/*.controller('DashCtrl', function($scope,$http,$state) {
    $http.post("http://localhost:8080/api/events").then(function (res){
        window.localStorage['title'] = res.data.title;
        window.localStorage['desc'] = res.data.desc;
        console.log("user infos "+res.data.title);

  },function(err){
    console.error('err events' ,err);
})
})*/

.controller('DashCtrl', function($scope,$http,$state) {
    $http.get('http://localhost:8080/api/events').
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    $scope.events = data.events;
    console.log("user infos " + data.events);
  }).
  error(function(data, status, headers, config) {
    console.error('err events' ,err);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
})



.controller('DashCtrl', function($scope,$http,$state) {
 $scope.username = window.localStorage['nom'] + " "+window.localStorage['prenom'];

  $scope.logout = function(data){
    $http.post("http://localhost:8080/api/auth/logout").then(function (res){
      $state.go('login')
  },function(err){
    console.error('err post' ,err);
  })
  }

});
