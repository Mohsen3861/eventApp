angular.module('starter')
//[]
.controller('AppCtrl', function($scope, $ionicPopup) {})


.controller('CategorieCtrl', function($scope,$http,$state) {
    $scope.saveCategorie = function(data){
      console.log("Categorie");
      $http.post("http://localhost:8080/api/categories",data).then(function (res){
      console.log("user infos "+res.data.title);
      $state.go('dash')
        
},function(err){

    console.error('err post' ,err);

  })
}

$scope.showSelectValue = function(mySelect) {
    console.log(mySelect);
}
})

.controller('EvenementCtrl', function($scope,$http,$state) {
    $scope.saveEvent = function(data){
      console.log("BadiniEvents");
      $http.post("http://localhost:8080/api/events",data).then(function (res){
      console.log("user infos "+res.data.title);
      $state.go('dash')
        
},function(err){

    console.error('err post' ,err);

  })
}
})

.controller('LoginCtrl',function($scope,$http,$state,$ionicPopup) {
//console.log(md5.createHash( "messsage"|| ''));
$scope.login = function(data){
  //data.password =CryptoJS.MD5(data.password).toString();

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

         //data.password =CryptoJS.MD5(data.password).toString();

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

$scope.saveEvent = function(data){
  $http.post("hhttp://localhost:8080/api/events",data).then(function (res){
    $scope.events = data;

    console.log("eventsCréer " + data[0].desc);
   
        $state.go('dash')
},function(err){

    console.error('err post' ,err);
  })
}

$scope.saveCategorie = function(data){
    console.log("Badini");
    $http.post("http://localhost:8080/api/categories",data).then(function (res){
    $state.go('dash')
},function(err){
    console.error('err post' ,err);
  })
}


$scope.showActionsheet = function() {
    
    $ionicActionSheet.show({
      titleText: 'Menu',
      buttons: [
        { text: '<i class="icon ion-ios-folder"></i> Créer un évènement' },
        { text: '<i class="icon ion-ios-folder-outline"></i> Ajouter une catégorie' },
      ],
      destructiveText: 'Delete',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        if(index=='0'){
          $state.go('evenement')
        }

        if(index=='1'){
          $state.go('categorie')
        }

        console.log('BUTTON CLICKED', index);
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        return true;
      }
}


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
  };



});
