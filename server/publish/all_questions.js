/*****************************************************************************/
/* AllQuestions Publish Functions
/*****************************************************************************/

Meteor.publish('all_questions', function () {
  // Return all questions
  return Todos.find();
});

Meteor.publish('all_questions_in_categories', function (req_categories) {
  
  // Return all questions
  return Todos.find({categories: {$in: req_categories}});
});
