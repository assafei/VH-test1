/*****************************************************************************/
/* PreviousReplies: Event Handlers and Helpers */
/*****************************************************************************/
Template.PreviousReplies.events({
  /*
   * Example: 
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.PreviousReplies.helpers({
  items: function () {
    var currAnswers = this.answers;
    if(currAnswers)
      return currAnswers.sort({ 'created_at': 1});
    else
      return null;
  }
});

/*****************************************************************************/
/* PreviousReplies: Lifecycle Hooks */
/*****************************************************************************/
Template.PreviousReplies.created = function () {
};

Template.PreviousReplies.rendered = function () {
};

Template.PreviousReplies.destroyed = function () {
};
