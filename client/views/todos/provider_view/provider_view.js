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
    
    var sel = {};
    var tag_filter = Session.get('tag_filter');
    if (tag_filter)
      sel = { categories: { $elemMatch: { $in: [tag_filter] } } };
      //sel.categories = [tag_filter];
    
    
    return Todos.find(
      
        sel
      ,
      {
        sort: {
          created_at: -1
        }
      }
    );
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


Template.FilterCategories.helpers({

  available_categories: function () {

    var tag_infos = [];
    var total_count = 0;
    
    Todos.find().forEach(function (todo) {
      _.each(todo.categories, function (tag) {
        var tag_info = _.find(tag_infos, function (x) { return x.tag === tag; });
        if (! tag_info)
          tag_infos.push({tag: tag, count: 1});
        else
          tag_info.count++;
      });
      total_count++;
    });

    tag_infos = _.sortBy(tag_infos, function (x) { return x.tag; });
    tag_infos.unshift({tag: "All", count: total_count});
    
    return tag_infos;
  
  }
});

Template.FilterCategories.events({
  'click .categoryList .categoryButton': function () {
    console.log('hi' + this.tag);
    if (Session.equals('tag_filter', this.tag))
      Session.set('tag_filter', null);
    else
      Session.set('tag_filter', this.tag);
  }
});
