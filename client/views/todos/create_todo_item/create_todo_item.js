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

    if (!Session.equals('category_select_mode', true)) {
      
      var subject = tmpl.find('input').value;

      var lower_case_subject = subject.toLowerCase();
      var given_categories = Template.CreateTodoItem.mapCategories(lower_case_subject);

      Session.set('category_select_mode', true);
      Session.set('question_subject', subject);
      Session.set('question_categories', given_categories);
    }
    else {
      
      Session.set('category_select_mode', null);
      selected_categories = Session.get('question_categories') || [];
      subject = Session.get('question_subject');

      Todos.insert({
        subject: subject,
        created_at: new Date,
        is_done: false,
        user_id: Meteor.userId(),
        categories: selected_categories
      });

      var form = tmpl.find('form');
      form.reset();    
    }    
  },

  'click .remove': function (evt) {
    var tag = this.toString();
    console.log("Looking for tag=" + tag);
    //var id = this.todo_id;

    selected_categories = Session.get('question_categories') || [];
    console.log(selected_categories);

    var index = selected_categories.indexOf(tag);
    if (index > -1) {
      console.log("Inside! index="+index);
      selected_categories = selected_categories.splice(index + 1,1);
      Session.set('question_categories', selected_categories);
    }
        

    evt.target.parentNode.style.opacity = 0;

    // wait for CSS animation to finish
    Meteor.setTimeout(function () {
      Session.set('question_categories', selected_categories);
          console.log('After: ' + selected_categories);
    }, 300);
  }

});

Template.CreateTodoItem.helpers({
  
  isCategorySelectMode : function() {
    return (Session.equals('category_select_mode', true));
  },

  allCategories: function() {
      return (Session.get('question_categories') || []);
  }

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

Template.CreateTodoItem.mapCategories = function(subject) {

    var categories = [];

    if ((subject.indexOf("modifications")  >= 0) || 
        (subject.indexOf("modify")  >= 0))
      categories.push('Home Modifications');

    if ((subject.indexOf("legal")  >= 0) || 
        (subject.indexOf("law")  >= 0))
      categories.push('Legal/Law');

    if ((subject.indexOf("invest")  >= 0) || 
        (subject.indexOf("saving")  >= 0))
      categories.push('Money Management');

    if ((subject.indexOf("alf")  >= 0) || 
        (subject.indexOf("assistant living")  >= 0))
      categories.push('ALF');


    return categories;

  };