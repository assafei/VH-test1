TodosIndexController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe('todos_index');
    Meteor.subscribe('userData');
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
