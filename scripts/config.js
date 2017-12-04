(function(){

  angular
    .module("app")
    .config(function($routeProvider){
      $routeProvider
      .when("/hello", {
        template:`
          <h1>HI</h1>
        `
      })
    })
})();
