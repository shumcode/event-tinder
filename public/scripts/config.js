(function(){

  angular
    .module("app")
    .config(function($routeProvider){
      $routeProvider
      .when("/", {
        template:"<home-component></home-component>"
      })
      .when("/round1", {
        template:"<question-one-component></question-one-component>"
      })
      .when("/round2",{
        template:"<question-two-component></question-two-component>"
      })
      .when("/round3",{
        template:"<question-three-component></question-three-component>"
      })
      .when("/round4", {
        template:"<question-four-component></question-four-component>"
      })
      .when("/tindertime", {
        template:"<tinder-component></tinder-component>"
      })
      .when("/round5",{
        template:"<question-five-component></question-five-component>"
      })
      .when("/round6",{
        template:"<question-six-component></question-six-component>"
      })
      .when("/round7", {
        template:"<question-seven-component></question-seven-component>"
      })
      ;
    })
})();
