Template.register.events({

	"submit .form-signup" : function(event)
	{
		//event.preventDefault();

	

		var email = trimInput(event.target.email.value);
		var password = trimInput(event.target.password.value);
		var password2 = trimInput(event.target.password2.value);
		var first_name = trimInput(event.target.first_name.value);
		var last_name = trimInput(event.target.last_name.value);
		var user_name = trimInput(event.target.user_name.value);

		if(isNotEmpty(email) && isNotEmpty(password) && 
		 isNotEmpty(user_name) && isNotEmpty(first_name) && isEmail(email)&&
		 isNotEmpty(last_name) && areValidPasswords(password, password2))
		{
			

			Accounts.createUser(
			{
				email : email,
				password : password,
				username: user_name,
				profile: {
					first_name: first_name,
					last_name:last_name					
						}

			}, function(err){
				if(err){
					FlashMessages.sendError('There was an error');

						}
				else{
					FlashMessages.sendSuccess('Account Created! You are now loged in');
					Router.go('/');
					}
			});

			

	}

		return false;
	}
});

				//validation rules
	//trim function 			

var trimInput = function(val){
	
	return val.replace(/^\s*|\s*$/g, "");
};

   // Empty fields check

isNotEmpty = function(value){
	
	if(value && value !== ''){
		return true;
	}
	FlashMessages.sendError("please fill in all fields");
	return false;
};


// validate email

isEmail = function(value)
{
	
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filter.test(value)) {
		return true;
	}
	FlashMessages.sendError("please use a valid email address");
	return false;
};


// password check
isValidPassword = function(password) {
	if (password.length < 6){
		
		FlashMessages.sendError("password must be at least 6 characters");
		return false;
	} 

	return true;
};

//match password 
areValidPasswords =function(password, confirm){
	
	if(!isValidPassword(password)){
		
		return false;
			}
	if (password !== confirm){

		FlashMessages.sendError("password do not match");
		return false;
	}		

	return true;
};