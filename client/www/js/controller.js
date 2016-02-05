angular.module('starter')
//[]
.controller('AppCtrl', function($scope, $ionicPopup) {})
.controller('EvenementCtrl', function() {})
.controller('CategorieCtrl', function() {})


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

/*.controller('DashCtrl', function($scope,$http,$state) {
    $http.post("http://localhost:8080/api/events").then(function (res){
        window.localStorage['title'] = res.data.title;
        window.localStorage['desc'] = res.data.desc;
        console.log("user infos "+res.data.title);

  },function(err){
    console.error('err events' ,err);
  })
})*/



.controller('DashCtrl', function($scope,$http,$state,$ionicActionSheet) {
 $scope.username = window.localStorage['nom'] + " "+window.localStorage['prenom'];

 $http.get('http://localhost:8080/api/events').
success(function(data, status, headers, config) {

 $scope.events = data;

 console.log("events " + data[0].particips.length);
}).
error(function(data, status, headers, config) {
 console.error('err events' ,err);

});

    $scope.logout = function(data){
    $http.post("http://localhost:8080/api/auth/logout").then(function (res){
    $state.go('login')
  },function(err){
    console.error('err post' ,err);
  })
}

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
 $http.post("http://localhost:8080/api/categories",data).then(function (res){
   //console.log("user infos "+res.data.nom+"  "+res.data.prenom+"   "+res.data._id);
        //window.localStorage['userId'] = res.data._id;
        //window.localStorage['nom'] = res.data.nom;
        //window.localStorage['prenom'] = res.data.prenom;
        $scope.categories = data;
        console.log("categories " + data[0].title);

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
    });
  };



});
