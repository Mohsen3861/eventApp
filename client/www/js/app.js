// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})

.config(function ($stateProvider, $urlRouterProvider,$httpProvider) {
$httpProvider.defaults.withCredentials = true;
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })


  .state('inscription', {
    url: '/inscription',
    templateUrl: 'templates/create.html',
    controller: 'InscriptionCtrl'
  })

  .state('categorie', {
    url: '/categorie',
    templateUrl: 'templates/categorie.html',
    controller: 'CategorieCtrl'
  })

  .state('evenement', {
    url: '/evenement',
    templateUrl: 'templates/evenement.html',
    controller: 'EvenementCtrl'
  })

  .state('dash', {
    url: '/dash',
    templateUrl: 'templates/dashboard.html',
    controller: 'DashCtrl'
  })

  .state('event', {
    url: '/event',
    templateUrl: 'templates/event.html',
    controller: 'EventCtrl',
    params: {event: null}
  })


  $urlRouterProvider.otherwise('/login');
})

.run(function(){

})
