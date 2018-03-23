Meteor.publish('post', function() {
      return Posts.find();//
   });
Meteor.publish('hash', function() {
      return hashtags.find();//
   });
Meteor.publish('hashcount', function() {
      return hashtagcount.find();//
   });
Meteor.publish('comments', function() {
      return comments.find();
   });
Meteor.publish('watching', function() {
      return watching.find();
   });
Meteor.publish('notification', function() {
      return notification.find();
   });
Meteor.publish('userid', function() {
      return Meteor.users.find();
   });
Meteor.publish('eyeontrend', function() {
      return eyeontrend.find();
   });
Meteor.publish('commentnotify', function() {
      return commentnotify.find();
   });






 

