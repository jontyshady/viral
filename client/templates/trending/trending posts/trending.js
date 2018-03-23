

Template.trending.helpers({
  trend:function(){  
   return Posts.find({}, {sort:{like: -1}, limit:Session.get("postLimit")});

  
  },
  hashtrendz:function(){
    return hashtagcount.find({}, {sort:{count: -1}, limit:30});
  }

});

Template.trending.events({
	"click .promo" : function(id){
    
    //var jx = $(this).closest(".promo[id]").attr('id');
   var postid = id.currentTarget.firstChild.id;
   
   var currentUserId = Meteor.userId();
   
   Meteor.call('likes', currentUserId,postid) ; 

  }
});