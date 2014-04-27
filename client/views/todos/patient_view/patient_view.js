/*****************************************************************************/
/* PatientView: Event Handlers and Helpers */
/*****************************************************************************/
Template.PatientView.events({
  /*
   * Example: 
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.PatientView.helpers({
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
  items: function () {
    return Todos.find({}, {
      sort: {
        created_at: -1
      }
    });
  },

  isDoneClass: function () {
    return this.is_done ? 'done' : '';
  },

  userrole: function() {
    

    if(!Meteor.loggingIn()) {
        return Meteor.user().user_role
    }
    else {
      return "empty???";
    }    
  }

});

/*****************************************************************************/
/* PatientView: Lifecycle Hooks */
/*****************************************************************************/
Template.PatientView.created = function () {
};

Template.PatientView.rendered = function () {
};

Template.PatientView.destroyed = function () {
};
