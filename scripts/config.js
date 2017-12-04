(function(){

  angular
    .module("app")
    .config(function($routeProvider){
      $routeProvider
      .when("/", {
        templateUrl:"partials/homepage.html",
        controller:"QuestionController"
      })
      .when("/goOut",{
        templateUrl:"partials/goOut.html",
        controller:"QuestionController"
      })
    })
})();
