Template.profile.helpers({
	username: function(){
		return Meteor.user()&& Meteor.user().username;
	},
	firstname: function(){
		return Meteor.user()&&Meteor.user().profile.first_name;
	},
	lastname: function(){
		return Meteor.user()&&Meteor.user().profile.last_name;
	},
	watching:function(){
		var uid = Meteor.userId();
		console.log('userid',uid);// userid p

		

		

		return watching.find({watchingId: uid}).count();
		
	}

});




Template.profilebody.helpers({
  posts:function(){
  //var posts =Posts.find({userId: Meteor.userId()}).fetch();

   return Posts.find({userId: Meteor.userId()}, {sort:{createdAt: -1}});
  
  }
  
});

Template.profilePost.events({
	"click .promo" : function(id){
    
    //var jx = $(this).closest(".promo[id]").attr('id');
   var postid = id.currentTarget.firstChild.id;
   
   var currentUserId = Meteor.userId();
   
   Meteor.call('likes', currentUserId,postid) ; 

  }
});


