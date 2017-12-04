(function(){

  angular
    .module("app")
    .config(function($routeProvider){
      $routeProvider
      .when("/", {
        template:"<questionone-component></questionone-component>"
      })
      .when("/inout",{
        template:"<questiontwo-component></questiontwo-component>"
      })
    })
})();
