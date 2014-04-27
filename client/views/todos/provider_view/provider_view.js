/*****************************************************************************/
/* ProviderView: Event Handlers and Helpers */
/*****************************************************************************/
Template.ProviderView.events({
  /*
   * Example: 
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.ProviderView.helpers({
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
/* ProviderView: Lifecycle Hooks */
/*****************************************************************************/
Template.ProviderView.created = function () {
};

Template.ProviderView.rendered = function () {
};

Template.ProviderView.destroyed = function () {
};
