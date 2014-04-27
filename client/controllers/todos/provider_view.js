ProviderViewController = RouteController.extend({
  waitOn: function () {
  	Meteor.subscribe('all_questions');
    Meteor.subscribe('userData');
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
