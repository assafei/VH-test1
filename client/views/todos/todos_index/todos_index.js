/*****************************************************************************/
/* TodosIndex: Event Handlers and Helpers */
/*****************************************************************************/
Template.TodosIndex.events({
  /*
   * Example: 
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.TodosIndex.helpers({
  


});

Template.TodosIndex.userRoleIs = function(given_role) {

  if(!Meteor.loggingIn()) {
        my_role = Meteor.user().user_role;                
        return (my_role === given_role);
  }
  else
    return false;
};

Template.TodosIndex.goToProviderView = function() {
	Router.go('/provider_view');
}

/*****************************************************************************/
/* TodosIndex: Lifecycle Hooks */
/*****************************************************************************/
Template.TodosIndex.created = function () {
};

Template.TodosIndex.rendered = function () {
};

Template.TodosIndex.destroyed = function () {
};
