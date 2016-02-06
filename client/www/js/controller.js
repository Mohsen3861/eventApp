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
    var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your identifiant!'
    });
  })
}


$scope.signUp = function(){
    console.log("clicked");
  $state.go('inscription');

}

})

.controller('InscriptionCtrl', function($scope,$state,$http){
    $scope.save = function(data){
      console.log("clicked");
      data.password =CryptoJS.MD5(data.password).toString();
        $http.post("http://localhost:8080/api/users",data).then(function (res){

        console.log("user infos "+res.data.nom+"  "+res.data.prenom+"   "+res.data._id);


        $http.post("http://localhost:8080/api/auth/login",data).then(function (res){


         console.log("user infos "+res.data.nom+"  "+res.data.prenom+"   "+res.data._id);

              window.localStorage['userId'] = res.data._id;
              window.localStorage['nom'] = res.data.nom;
              window.localStorage['prenom'] = res.data.prenom;

              $state.go('dash')
        });
},function(err){

    console.error('err post' ,err);

  })
}

})


.controller('DashCtrl', function($scope,$http,$state, $ionicScrollDelegate,$ionicNavBarDelegate) {
  var page = 0;
$ionicNavBarDelegate.showBackButton(false);
 $scope.username = window.localStorage['nom'] + " "+window.localStorage['prenom'];


$scope.nextPage = function(page){
  $http.get('http://localhost:8080/api/events/page/'+page).
 success(function(data, status, headers, config) {

  $scope.events = data;

  console.log("events " + data[0].particips.length);
 }).
 error(function(data, status, headers, config) {
  console.error('err events' ,err);

 });
}

 $scope.nextPage(page);

$scope.nextClick = function(){
  page++;
  $scope.nextPage(page);
  $ionicScrollDelegate.scrollTop();

}
$scope.previeusClick = function(){
  page--;
  $scope.nextPage(page);
  $ionicScrollDelegate.scrollTop();

}
$scope.details = function(event){
$ionicNavBarDelegate.showBackButton(true);
$state.go('event',{event : event});

}

    $scope.logout = function(data){
    $http.post("http://localhost:8080/api/auth/logout").then(function (res){
    $state.go('login')
  },function(err){
    console.error('err post' ,err);
  })
}


})


.controller('EventCtrl', function($scope,$http,$state, $ionicScrollDelegate,$stateParams) {


$scope.event = $stateParams.event;
var userId =   window.localStorage['userId'];

var particips = false;
for(var i=0;i<$scope.event.particips.length;i++){
    if($scope.event.particips[i]===userId){
        particips=true;
    }
}

if(particips)
document.getElementById('button').innerHTML = "je ne participe plus";

console.log(event.title);
  $scope.participer = function(event){

if(particips==false){
    $http.put("http://localhost:8080/api/events/"+event._id+"/addParticipant").then(function (res){
      console.log(event._id );
      console.log(event.title );
      $state.go($state.current, {}, {reload: true});


    },function(err){
    console.error('err post' ,err);
  })
}else{
  $http.put("http://localhost:8080/api/events/"+event._id+"/removeParticipant").then(function (res){
    console.log(event._id );
    console.log(event.title );
    $state.go($state.current, {}, {reload: true});


  },function(err){
  console.error('err post' ,err);
})
}

  }



});
