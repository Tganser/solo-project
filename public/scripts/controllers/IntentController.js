myApp.controller('IntentController', function(IntentionsService) {
  console.log('IntentController loaded');
  var vm = this;
  vm.intentions = ["goal1", "goal2", "goal3", "goal4"];
  var newInput = vm.newInput;
  var hours = vm.hours;

    vm.addIntention = function(newInput, hours){
      IntentionsService.addIntention(newInput);
    };

    vm.removeIntention = function(thing){
      IntentionsService.removeIntention(thing);
    };

    vm.starIntention = function(thing){
      IntentionsService.starIntention(thing);
    };
});
