angular.module('starter')
//[]
.controller('AppCtrl', function() {})
.controller('LoginCtrl',function($scope,$http,$state) {
//console.log(md5.createHash( "messsage"|| ''));
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
})

}


})


.controller('CreateCtrl', function() {})
.controller('DashCtrl', function($scope,$http,$state) {

  $scope.logout = function(data){

    $http.post("http://localhost:8080/api/auth/logout").then(function (res){

      $state.go('login')

  },function(err){
    console.error('err post' ,err);
  })

  }



});
