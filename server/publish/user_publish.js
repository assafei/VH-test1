/*****************************************************************************/
/* UserPublish Publish Functions
/*****************************************************************************/

Meteor.publish('userData', function() {
  if(!this.userId) return null;
  return Meteor.users.find(this.userId, {fields: {
    user_role: 1,
  }});
});