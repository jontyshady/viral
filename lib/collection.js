//post collection basic only 

Posts = new Mongo.Collection("posts");

Posts.attachSchema(new SimpleSchema({
	body: {
		type:String,
		max : 1000
	},
	userId: {
		type :String,
		autoValue: function(){
			if (this.isInsert) {
			return Meteor.userId();
			}
			else if (this.isUpsert) {
          return {$setOnInsert:  Meteor.userId()};
        } else {
          this.unset();
        }
		}
	},
	username:{
		type:String,
		autoValue: function(){
			if (this.isInsert) {
			return Meteor.users.findOne({_id: this.userId}).username;
				}
			else if (this.isUpsert) {
          return {$setOnInsert:  Meteor.users.findOne({_id: this.userId}).username};
        } else {
          this.unset();
        }
		}
	},
	createdAt: {
    type: Date,
      autoValue: function() {
        if (this.isInsert) {
          return new Date;
        } else if (this.isUpsert) {
          return {$setOnInsert: new Date};
        } else {
          this.unset();
        }
      }

		
	},
	like:{
		type:Number,
		min:0,
		defaultValue: 0
	}


}));

comments= new Mongo.Collection("comments");

comments.attachSchema(new SimpleSchema({
	comment:{
		type:String,
		max:500
	},
	postid:{
		type: String
	},
	username:{
		type:String,
		autoValue: function(){return Meteor.users.findOne({_id: this.userId}).username}
	},
	createdAt:{
		type:Date,
		autoValue: function(){return new Date()}
	},
	userid:{
		type :String,
		autoValue: function(){return Meteor.userId()}
	}


}));

watching=new Mongo.Collection("watching");

watching.attachSchema(new SimpleSchema({
	userId:{
		type:String,
		autoValue: function(){return Meteor.userId()}

	},
	watchingId:{
		type:String
	}
}));

promotion=new Mongo.Collection("promotion");

promotion.attachSchema(new SimpleSchema({
	userId:{
		type:String,
		autoValue: function(){return Meteor.userId()}

	},
	promopostId:{
		type:String
	}
}));//



hashtags = new Mongo.Collection("hashtags");

hashtags.attachSchema(new SimpleSchema({

	hashtag:{
		type:String,
		max:20
	},
	userid:{
		type:String,
		autoValue: function(){
			return Meteor.userId();
		}
	},
	postid:{
		type:String
	}

}));

hashtagcount = new Mongo.Collection("hashtagcount");

hashtagcount.attachSchema(new SimpleSchema({

	hashtag:{
		type:String,
		max:20
	},
	count:{
		type:Number,
		defaultValue:0

	}

}));

notification = new Mongo.Collection("notification");
notification.attachSchema(new SimpleSchema({
	userid:{
		type:String//userid
	},


	createdAt: {
    type: Date,
      autoValue: function(){
      	return new Date;
      	      }
},

      count:{
      	type:Number,
      	defaultValue: 0,
      	optional: true

      },
      
      hashtag:{
      	type:String,
      	optional:true
      },

      flags:{
      	type:String

      },
      username:{
      	type:String,
      	optional:true
      },
      comment:{
      	type:String,
      	optional:true

      },

     postid:{
     	type:String,
     	optional:true
     }





}));


eyeontrend=new Mongo.Collection("eyeontrend");

eyeontrend.attachSchema(new SimpleSchema({
	userId:{
		type:String,
		autoValue: function(){return Meteor.userId()}

	},
	hashtag:{
		type:String
	}
}));

commentnotify=new Mongo.Collection("commentnotify");


commentnotify.attachSchema(new SimpleSchema({
	userId:{
		type:String,
		autoValue: function(){return Meteor.userId()}

	},
	postid:{
		type:String
	}
}));


commentfornotify= new Mongo.Collection("commentfornotify");

commentfornotify.attachSchema(new SimpleSchema({
	comment:{
		type:String,
		max:500
	},
	postid:{
		type: String
	},
	username:{
		type:String,
		autoValue: function(){return Meteor.users.findOne({_id: this.userId}).username}
	},
	createdAt:{
		type:Date,
		autoValue: function(){return new Date()}
	},
	userid:{
		type :String,
		autoValue: function(){return Meteor.userId()}
	}


}));