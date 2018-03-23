


Template.comments.helpers({
	post: function(){
		var userid = Router.current().params._id;

		var jx= Posts.findOne({_id: userid});
		return jx.body;
	},

	name: function(){
		var userid = Router.current().params._id;
		Session.set("postId", userid);

		var jx= Posts.findOne({_id: userid});
		return jx.username;
	},

	comment: function(){
		var postid = Router.current().params._id;
		var text= comments.find({postid: postid}, {sort:{createdAt: 1}});
		
		return text;
		
	},
	commentcountT:function(){
		var postid = Router.current().params._id;
		return comments.find({postid: postid}).count();
		
	},
	likecountT:function(){
		var postid = Router.current().params._id;
		return Posts.find({_id: postid}).count();
		
	}

});

Template.comments.events({
	"submit .posted" : function(event){
		event.preventDefault();	
		var postid=	Session.get("postId");
	
		var text= event.target.text.value;

		Meteor.call('comment', text, postid); 
  		

  		 event.target.text.value = "";
},

"click .subevent" : function(event){
		event.preventDefault();	
		
		var postid=	Session.get("postId");

		var userid=Meteor.userId();

		Meteor.call('commentnotify',userid,postid);
}

})