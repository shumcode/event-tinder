(function(){

  angular
    .module("app")
    .config(function($routeProvider){
      $routeProvider
      .when("/", {
        template:"<questionone-component></questionone-component>"
      })
      .when("/round2",{
        template:"<questiontwo-component></questiontwo-component>"
      })
      .when("/round3",{
        template:"<questionthree-component></questionthree-component>"
      })
      .when("/round4", {
        template:"<questionfour-component></questionfour-component>"
      })
      .when("/tindertime", {
        template:"<tinder-component></tinder-component>"
      });
    })
})();
