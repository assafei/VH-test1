/*****************************************************************************/
/* AnswerQuestion: Event Handlers and Helpers */
/*****************************************************************************/
Template.AnswerQuestion.events({
  
  'submit form': function (e, tmpl) {
    e.preventDefault();

    var answer = tmpl.find('input').value;

    var question_id = this._id;
    alert(question_id);
    
    Todos.update(
      {_id: question_id}, 
      { $push: { answers: { answer_content: answer, created_at: new Date, user_id: Meteor.userId()} } }
    );
   
    var form = tmpl.find('form');
    form.reset();
  }

});

Template.AnswerQuestion.helpers({
  
});

Template.AnswerQuestion.userRoleIs = function(given_role) {

  if(!Meteor.loggingIn()) {
        my_role = Meteor.user().user_role;        
        return (my_role === given_role);
  }
  else
    return false;
}

Template.AnswerQuestion.allowedToAnswer = function() {

  if(!Meteor.loggingIn()) {

      var my_user_id = Meteor.userId();
      var my_role = Meteor.user().user_role;        
      var provider_role = (my_role === "provider");
      
      if (this.answers) {

        var my_previous_answers = $.grep(this.answers, function(e){ return e.user_id == my_user_id; });                  
        return (provider_role && (my_previous_answers.length == 0));
      }
      else
        return (provider_role);

  }
  else
    return false;
}

Template.AnswerQuestion.myPreviousAnswer = function() {
  
  if(this.answers && !Meteor.loggingIn()) {

    var my_user_id = Meteor.userId();  
    var my_previous_answers = $.grep(this.answers, function(e){ return e.user_id == my_user_id; });
    
    if (my_previous_answers.length > 0)
      return (my_previous_answers[0].answer_content);
  }
  
  return "";  
}

/*****************************************************************************/
/* AnswerQuestion: Lifecycle Hooks */
/*****************************************************************************/
Template.AnswerQuestion.created = function () {
};

Template.AnswerQuestion.rendered = function () {
};

Template.AnswerQuestion.destroyed = function () {
};
