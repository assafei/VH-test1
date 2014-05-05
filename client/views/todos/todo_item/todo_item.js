/*****************************************************************************/
/* TodoItem: Event Handlers and Helpers */
/*****************************************************************************/


Template.TodoItem.events({
  /*
   * Example: 
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
  'click [name=is_done]': function (e, tmpl) {
    var id = this._id;
    var isDone = tmpl.find('input').checked;
    
    if (isDone)
    {
      console.log('adding ignore_id...'); 
      Meteor.users.update(
        Meteor.userId(), 
        //{ 'profile.ignore_list': {$push: { id }}}
        { $addToSet: { 'profile.ignore_list': id  } }
        //Todos.update(this._id, {$addToSet: {tags: value}});
      );
    }
    else
    {
      console.log('removing ignore_id...');
      Meteor.users.update(
        Meteor.userId(), 
        //{ 'profile.ignore_list': {$push: { id }}}
        { $pull: { 'profile.ignore_list': id  } }
        //Todos.update(this._id, {$addToSet: {tags: value}});
      );
    }


    // ASSAF: I removed this piece and made it user-based
    /*Todos.update({_id: id}, {
      $set: {
        is_done: isDone
      }
    });*/
  }
});

Template.TodoItem.helpers({
  /*
   * Example: 
   *  items: function () {
   *    return Items.find();
   *  }
   */
  prettifyDate: function(timestamp) {        
    var d = (new Date(timestamp));
    return timestamp.toDateString("yyyy-MM-dd");
  },

  isDoneChecked: function () {
    
    
    var isIgnored = App.helpers.isIgnoreItem(this._id);
    
    return isIgnored ? 'checked' : '';
  }
});

/*****************************************************************************/
/* TodoItem: Lifecycle Hooks */
/*****************************************************************************/
Template.TodoItem.created = function () {
};

Template.TodoItem.rendered = function () {
};

Template.TodoItem.destroyed = function () {
};
