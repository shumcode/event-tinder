(function(){
    var questionOneComponent = {
    templateUrl:"partials/homepage.html",
    controller: "QuestionController"
  };
  angular
    .module("app")
    .component("questionOneComponent", questionOneComponent)
})();
