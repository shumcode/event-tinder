(function () {

  angular
  .module("app")
  .config(function($routeProvider) {
      $routeProvider
      .when('/hello', {
      template:`
      <p>sup</p>
      `
    })
    .when('/', {
      template:``
    })
  })
})();
