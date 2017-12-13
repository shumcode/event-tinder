(function(){
  var questionSevenComponent = {
    templateUrl:"partials/round8.html",
    controller: "QuestionController"
  }

  angular
    .module("app")
    .component("questionEightComponent", questionSevenComponent)
})();