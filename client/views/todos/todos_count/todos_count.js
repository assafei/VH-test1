/*****************************************************************************/
/* TodosCount: Event Handlers and Helpers */
/*****************************************************************************/
Template.TodosCount.events({
  /*
   * Example: 
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.TodosCount.helpers({
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
  availableCount: function () {

    if(Meteor.loggingIn()) { 
      return Todos.find({}).count(); 
    }

    var ignore_list = Meteor.user().profile.ignore_list;
    if (!ignore_list) 
      return Todos.find({}).count();

    return Todos.find({ _id: { $nin: ignore_list } }).count();


    //return Todos.find({is_done: true}).count(); 
  },

  totalCount: function () {
    return Todos.find({}).count();
  }
});

/*****************************************************************************/
/* TodosCount: Lifecycle Hooks */
/*****************************************************************************/
Template.TodosCount.created = function () {
};

Template.TodosCount.rendered = function () {
};

Template.TodosCount.destroyed = function () {
};
