angular.module('starter')
//[]
.controller('AppCtrl', function($scope, $ionicPopup) {})


.controller('FilterCtrl', function($scope, $ionicPopup,$ionicNavBarDelegate,$http,$state) {
  console.log("in filter");
  $ionicNavBarDelegate.showBackButton(true);

  var categories = [];
  $scope.selectables = [];

$scope.data ={
  cat : "null"
}
var date;
$scope.editSelectValue = function(mySelect){

  date = mySelect;
}

  $http.get("http://localhost:8080/api/categories").then(function (res){
    console.log("user infos "+res.data.title);

    for (var i = 0; i < res.data.length; i++) {
      categories[i] = res.data[i].title;
    }
    $scope.selectables= categories;
    console.log(categories[1]);
  },function(err){
    console.error('err post' ,err);
  })


  var url = null;
  $scope.apply = function(cat) {
    var results = {
      cat:$scope.data.cat,
      date : date,
      url :''
    }
    if(results.date != null){

      console.log("date choosen is : "+results.date );
      switch(results.date) {
          case "All":
          results.url = 'http://localhost:8080/api/events/page/';
              break;
          case "A venir":
          results.url = 'http://localhost:8080/api/events/page/future/';
              break;
          case "Passé":
          results.url = 'http://localhost:8080/api/events/page/past/';
              break;
      }
    }else{
      results. url ='http://localhost:8080/api/events/page/category/';
    }




    console.log(results.date);

   $state.go('dash',{date : results.date,cat : results.cat , url : results.url});

}
})


.controller('CategorieCtrl', function($scope,$http,$state,  $ionicNavBarDelegate ,$ionicPopup) {
  $ionicNavBarDelegate.showBackButton(true);
  $scope.categories = [];

  $http.get("http://localhost:8080/api/categories").then(function (res){
    console.log("user infos "+res.data.title);
$scope.categories =  res.data;
  },function(err){
    console.error('err post' ,err);
  })

  $scope.saveCategorie = function(data){
    console.log("Categorie");
    $http.post("http://localhost:8080/api/categories",data).then(function (res){
      console.log("user infos "+res.data.title);
      $state.go($state.current, {}, {reload: true});

    },function(err){

      console.error('err post' ,err);

    })
  }

  $scope.delete = function(cat) {
console.log(cat);
    $http.delete("http://localhost:8080/api/categories/"+cat._id).then(function (res){

      $state.go($state.current, {}, {reload: true});
    },function(err){

      console.error('err post' ,err);

    })

  }

  $scope.edit = function(cat) {
    $scope.showPopup(cat);
  }


  $scope.showPopup = function(cat) {
    $scope.data = {name:cat.title};

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.name">',
      title: 'Modifier la categorie',
      scope: $scope,
      buttons: [
        { text: 'Anuller' },
        {
          text: '<b>Valider</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.name) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              return $scope.data.name;
            }
          }
        }
      ]
    });

    myPopup.then(function(res) {
      console.log('Tapped!', res);
      var data ={
        title:res
      }
      $http.put("http://localhost:8080/api/categories/"+cat._id,data).then(function (res){

        $state.go($state.current, {}, {reload: true});
      },function(err){

        console.error('err post' ,err);

      })


    });

   };

})

.controller('EvenementCtrl', function($scope,$http,$state,$stateParams,$ionicNavBarDelegate,$filter) {

  $scope.event = $stateParams.event;
  console.log(event.title);

  $ionicNavBarDelegate.showBackButton(true);
  var categories = [];
  $scope.selectables = [];

  $http.get("http://localhost:8080/api/categories").then(function (res){
    console.log("user infos "+res.data.title);

    for (var i = 0; i < res.data.length; i++) {
      categories[i] = res.data[i].title;

    }
    $scope.selectables= categories;
    console.log(categories[1]);
  },function(err){
    console.error('err post' ,err);
  })



  $scope.saveEvent = function(data){
    console.log(data.date);
  data.date =   $filter("date")(data.date, 'yyyy-MM-dd');
  console.log(data.date);

    if($stateParams.event == null){
      $http.post("http://localhost:8080/api/events",data).then(function (res){
        console.log("user infos "+res.data.title);
        $state.go('dash')
      },function(err){
        console.error('err post' ,err);
      })
    }else{
      $http.put("http://localhost:8080/api/events/"+$scope.event._id,data).then(function (res){
        console.log("user infos "+res.data.title);
        $state.go('dash')
      },function(err){
        console.error('err post' ,err);
      })
    }



  }
})

.controller('LoginCtrl',function($scope,$http,$state,$ionicPopup) {
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


.controller('DashCtrl', function($scope,$http,$state, $ionicScrollDelegate,$ionicNavBarDelegate,$ionicActionSheet,$stateParams) {
  $scope.page = 0;
  $ionicNavBarDelegate.showBackButton(false);
  $scope.username = window.localStorage['nom'] + " "+window.localStorage['prenom'];




var filter = {
  cat: $stateParams.cat,
  date :  $stateParams.date,
  url : $stateParams.url
}

if(filter.url ==null){
  url = 'http://localhost:8080/api/events/page/';
}else{
  url = filter.url;
}


  $scope.nextPage = function(page){
    console.log("filter url is : " ,url+page);
    if(filter.date != null || filter.url==null){
      $http.get(url+page).
      success(function(data, status, headers, config) {

        $scope.events = data;


        console.log("events " + data[0].particips.length);
      }).error(function(data,err) {
        console.error('err events' ,err);

      });
    }
    else if(filter.cat != null){
      var datas= {
        category : filter.cat
      }
      $http.post(url+page,datas).
      success(function(data, status, headers, config) {

        $scope.events = data;


        console.log("events " + data[0].particips.length);
      }).error(function(data,err) {
        console.error('err events' ,err);

      });
    }
  }



  $scope.nextPage($scope.page);

  $scope.nextClick = function(){
$scope.page ++;
    $scope.nextPage($scope.page);
    $ionicScrollDelegate.scrollTop();

  }
  $scope.previeusClick = function(){
    $scope.page --;
    $scope.nextPage($scope.page);
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

  $scope.filter = function(){
      $state.go('filter');
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
        { text: '<i class="icon ion-calendar"></i> Créer un évènement' },
        { text: '<i class="icon ion-folder"></i> Ajouter une catégorie' },
      ],

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

})


.controller('EventCtrl', function($scope,$http,$state, $ionicScrollDelegate,$stateParams) {


  $scope.event = $stateParams.event;
  var userId =   window.localStorage['userId'];
  console.log("user id : "+userId);
  console.log("user id : "+$scope.event.userId);
  var particips = false;
  for(var i=0;i<$scope.event.particips.length;i++){
    if($scope.event.particips[i]===userId){
      particips=true;
    }
  }

  if(particips)
  document.getElementById('button').innerHTML = "je ne participe plus";


  if($scope.event.userId != userId){
    document.getElementById('buttonDelete').style.visibility  = "hidden";
    document.getElementById('buttonEdit').style.visibility  = "hidden";
  }



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


  $scope.delete = function(id){
    console.log("delete clicked event id is :"+id);
    $http.delete("http://localhost:8080/api/events/"+id).then(function (res){
      console.log("event deleted");
      $state.go('dash');


    },function(err){
      console.error('err delete' ,err);
    })
  }

  $scope.edit = function(){
    console.log("edit clicked");
    $state.go('evenement',{event : $scope.event})
  }



});
