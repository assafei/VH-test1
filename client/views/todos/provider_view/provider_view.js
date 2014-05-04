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

  joinWithIgnore: function() {
    //console.log('joinWithIgnore');
    //var currItem = this;
    //var isIgnore = Meteor.user().profile.ignore_list.indexOf(currItem._id) >= 0 ? 1 : 0;
    //return _.extend(currItem, {isIgnore: isIgnore});
    return this;
  },

  items: function () {
    
    if(Meteor.loggingIn()) { 
      return null; 
    }

    var ignore_list = Meteor.user().profile.ignore_list;
    
    // Select all filters (categories)
    var sel = {};
    var tag_filter = Session.get('tag_filter');
    if (tag_filter)
      sel = { categories: { $elemMatch: { $in: [tag_filter] } } };
      //sel.categories = [tag_filter];
    
    //return Todos.find(sel, {sort: {isIgnore: -1, created_at: -1}});

    
    return Todos.find(sel).fetch().sort(function(a,b) { 

      var ignore_list = Meteor.user().profile.ignore_list;
      var diff = ignore_list.indexOf(a._id) - ignore_list.indexOf(b._id);
      
      if (diff == 0) {
        return b.created_at - a.created_at;
      }
      else {
        return diff;
      }
    } );

  },

  isDoneClass: function () {
    
    var isIgnored = App.helpers.isIgnoreItem(this._id);

    return isIgnored ? 'done' : '';

    // ASSAF: update to individual hide
    //return this.is_done ? 'done' : '';
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


Template.tag_filter.helpers({

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
    tag_infos.unshift({tag: null, count: total_count});
    
    return tag_infos;
  
  },

  tag_text: function () {
    return this.tag || "All items";
  },

  tag_selected: function () {
    return Session.equals('tag_filter', this.tag) ? 'selected' : '';
  }


});

Template.tag_filter.events({
  'mousedown .tag': function () {
    console.log('hi' + this.tag);
    if (Session.equals('tag_filter', this.tag))
      Session.set('tag_filter', null);
    else
      Session.set('tag_filter', this.tag);
  }
});
