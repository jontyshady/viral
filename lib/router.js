Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
	//waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route("/",{
	name:"homeIndex"
});

Router.route("/sign-in",{
	name:"formLayout",
	onBeforeAction: function(){
		if(Meteor.user() != null){
			Router.go('/');
		}
		this.next();
	}
});

Router.route("/sign-up",{
	name:"register",
	onBeforeAction: function(){
		if(Meteor.user() != null){
			Router.go('/');
		}
		this.next();
	}
});

Router.route("/profile",{
	name:"profile",
	
});

Router.route("/users/:username",{
	name:"userProfile",
	data: function(){
		return 	{
			user: Meteor.users.findOne({username: this.params.username})
				};
	}
});

Router.route("/comments/:_id",{
	name:"comments",
	data:function(){
		return{
			id: Posts.findOne({userid: this.params.userid})
		}
	}
	
});

Router.route("/watching",{
	name:"watching"
	
});

Router.route("/trending",{
	name:"trending"
	
});

Router.route("/hashtag/:tag",{
	name:"hashtag",
	data:function(){
		return{
			tag: hashtags.findOne({hashtag: this.params.hashtag})
		};
	}
});