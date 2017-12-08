(function(){
    var questionOneComponent = {
    templateUrl:"partials/round1.html",
    controller: "QuestionController"
  };
  angular
    .module("app")
    .component("questionOneComponent", questionOneComponent)
})();
