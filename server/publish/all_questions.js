/*****************************************************************************/
/* AllQuestions Publish Functions
/*****************************************************************************/

Meteor.publish('all_questions', function () {
  // Return all questions
  return Todos.find();
});
