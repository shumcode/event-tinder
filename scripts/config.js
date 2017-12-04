(function(){

  angular
    .module("app")
    .config(function($routeProvider){
      $routeProvider
      .when("/", {
        templateUrl:"partials/homepage.html",
        controller:"QuestionController"
      })
      .when("/inout",{
        templateUrl:"partials/inOut.html",
        controller:"QuestionController"
      })
    })
})();
