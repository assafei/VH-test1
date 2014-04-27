Accounts.onCreateUser(function(options, user) {

	var primary_email = user.emails[0].address;
 	console.log(primary_email); 

 	if (primary_email.indexOf("@users") !== -1) {

 		user.user_role = "patient";
 	}
 	else {

 		user.user_role = "provider";
 	}

 	console.log(primary_email); 
 	console.log(user.user_role); 

 	if (options.profile)
    	user.profile = options.profile;

 	return user;
 	
});