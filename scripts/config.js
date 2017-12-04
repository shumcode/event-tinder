(function(){

  angular
    .module("app")
    .config(function($routeProvider){
      $routeProvider
      .when("/", {
        templateUrl:`./partials/homepage.html`
      })
    })
})();
