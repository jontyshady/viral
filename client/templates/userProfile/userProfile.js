Template.userProfile.helpers({
	user: function(){
		return Router.current().params;
	}
});

Template.userProfile.events({
	"click .subscribe" : function(e,jx){
		var watch = jx.data.user;
		var uid = Meteor.userId();
		
	
	Meteor.call('watching',uid,watch);
	
		
			 
	}
});

Template.userprofilebody.helpers({
	userposts:function(){
			var userid = Router.current().params.username;

			console.log('working',userid);
			return Posts.find({username: userid}, {sort:{createdAt: -1}});
	}

});

Template.userprofilePost.events({
	"click .promo" : function(id){
    
    //var jx = $(this).closest(".promo[id]").attr('id');
   var postid = id.currentTarget.firstChild.id;
    
   var currentUserId = Meteor.userId();
  
   Meteor.call('likes', currentUserId,postid) ; 

  }

});

Template.userProfile.helpers({
	watchfeeds:function(){
		var uid = Meteor.userId();
		

		var userid = Router.current().params.username;
		

		var watch =Meteor.users.findOne({username: userid});
		

		return watching.find({userId : uid, watchingId: watch._id}).fetch();
	},
		
	watching:function(){

		var userid = Router.current().params.username;
		

		var watch =Meteor.users.findOne({username: userid});
		return watching.find({watchingId: watch._id}).count();
	}
})