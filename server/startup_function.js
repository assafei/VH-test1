Meteor.startup(function () 
  {
    // code to run on server at startup
    console.log('starting up...' + process.env.MAIL_URL);
    process.env.MAIL_URL = 'smtp://assaf.einat.vestia.health@gmail.com:brianandassaf@smtp.gmail.com:465/';
    console.log('starting up...' + process.env.MAIL_URL);
  });