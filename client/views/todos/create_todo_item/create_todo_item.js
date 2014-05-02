/*****************************************************************************/
/* CreateTodoItem: Event Handlers and Helpers */
/*****************************************************************************/
Template.CreateTodoItem.events({
  /*
   * Example: 
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
  'submit form': function (e, tmpl) {
    e.preventDefault();

    var subject = tmpl.find('input').value;

    var given_categories = [];
    if (subject.indexOf("#H")  >= 0)
      given_categories.push('Home Modifications');

    if (subject.indexOf("#L") >= 0)
      given_categories.push('Law');

    Todos.insert({
      subject: subject,
      created_at: new Date,
      is_done: false,
      user_id: Meteor.userId(),
      categories: given_categories
    });

    var form = tmpl.find('form');
    form.reset();
  }
});

Template.CreateTodoItem.helpers({
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* CreateTodoItem: Lifecycle Hooks */
/*****************************************************************************/
Template.CreateTodoItem.created = function () {
};

Template.CreateTodoItem.rendered = function () {
};

Template.CreateTodoItem.destroyed = function () {
};
