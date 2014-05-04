/*
 * Add query methods like this:
 *  Todos.findPublic = function () {
 *    return Todos.find({is_public: true});
 *  }
 */

Todos.allow({
  insert: function (userId, doc) {
    return userId;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return true;
    //doc.user_id === userId;
  },

  remove: function (userId, doc) {
    return doc.user_id === userId;
  }
});

Todos.deny({
  insert: function (userId, doc) {
    return false;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return false;
  },

  remove: function (userId, doc) {
    return false;
  }
});

Todos.after.update(function (userId, doc, fieldNames, modifier, options) {
  
  var replierName = Meteor.users.findOne(userId).emails[0].address;;
  console.log('replier name: ' + replierName);

  var askerName = Meteor.users.findOne(doc.user_id).emails[0].address;
  console.log('asker name: ' + askerName);

  var subj = doc.subject;

  // Let other method calls from the same client start running,
  // without waiting for the email sending to complete.
  //this.unblock();

  Email.send
  ({
    to: "assaf.einat@gmail.com",
    from: 'assaf.einat.vestia.health@gmail.com',
    subject: "Your question was replied on VH!",
    text: "Hey there " + askerName + "!\nWe have an answer to your question:\n" + subj + "\n\nCheck it out on the website!\n\nBest,\nVH team"
  });

  console.log("Email sent :)");
});