



Template.nav.onRendered(function () {
  // Use the Packery jQuery plugin
  Meteor.typeahead.inject();
  $('.typeahead').bind('typeahead:select', function(ev, suggestion) {
		  console.log('Selection: ', suggestion.value);
		  Router.go('userProfile',{username: suggestion.value});
		  
		});


Meteor.call('hashnotify',Meteor.userId());

}); //linked username and search



Template.nav.helpers({
	jx: function(){


		/* return hashtags.find().fetch().map(function(hash){
        	return hash.hashtag;
        }); */
		 return [
      {
        name: 'hashtag',
       valueKey: 'hashtag',
        local: function() {
         return hashtags.find().fetch();
        	
     },

        	
        header: '<center><h4 class="league-name">hashtags</h4></center>',
        template: 'team'
      },
      {
        name: 'username',
        valueKey: 'username',
        local: function() { 
        	
        	 return Meteor.users.find().fetch();
        	
        },
        
        header: '<center><h4 class="league-name">username</h4></center>',
        template: 'team'
      }
    ];

	},
	name:function(){
		return Meteor.user().username; // here one more
	},//render username
	notify:function(){	

	    
			/*var count = 0;
			var query = Users.find({admin: true, onlineNow: true});
			var handle = query.observeChanges({
	 	 added: function (id, user) {
	    	count++;
	    	console.log(user.name + " brings the total to " + count + " admins.");
	 			 },
	 		 removed: function () {
	   		 count--;
	    	console.log("Lost one. We're now down to " + count + " admins.");
 			 }
			});*/
		return notification.find({userid: Meteor.userId()},{sort:{createdAt:-1}});	
	}
});

Template.nav.events({
	"click .sign-out" : function(event){

		Meteor.logout(function(err){
			if(err){
				FlashMessages.sendError(err.reason);
					}
			else{
				FlashMessages.sendSuccess("You are now logout");
				Router.go('/sign-in');
				}
		});
	}, // sign out

	"click #notification_li": function(event){
		$("#notificationContainer").fadeToggle(300);
		$("#notification_count").fadeOut("slow");
		$("#myDropdown").hide();
		return false;    
	  
	},//notify popup

	"click .dropdown":function(event){

		$("#myDropdown").toggle("show");
		$("#notificationContainer").hide();
		return false; 
		
	},
	"click .path_profile" : function(event){
		Router.go('/profile');
	}



});

// for hiding popup notify when click anywhere on screen
$(window).click(function()
{
$("#notificationContainer").hide();
$("#myDropdown").hide();
});

