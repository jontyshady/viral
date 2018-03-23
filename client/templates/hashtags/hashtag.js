
Template.hashtag.helpers({
	tag:function(){
		var tag = Router.current().params.tag;
		return tag;
	}
});



Template.hashbody.helpers({//change
  
  hash:function(){
 	
  var hashtag = Router.current().params.tag;	
  var count= hashtags.find({hashtag: hashtag}).count();

  var hashid= hashtags.find({hashtag: hashtag}).fetch();
  
  console.log("watchin count",hashid);
  var collectids=[];

   if(count!==0){

  for(i=0;i<count;i++){
    collectids[i]=hashid[i].postid;
  }

   
    return Posts.find({_id: {$in: collectids}}, {sort:{createdAt: -1}, limit:Session.get("postLimit")});
   
}

else{
  return null;
}


  }

});

Template.hashPost.events({
  "click .promo" : function(id){
    
    //var jx = $(this).closest(".promo[id]").attr('id');
   var postid = id.currentTarget.firstChild.id;
    
   var currentUserId = Meteor.userId();
   
    Meteor.call('likes', currentUserId,postid) ; 

    
  }


});

Template.hashtag.events({
  "click .eyeontrend" : function(id){
    
    var hash=id.target.id; //hash
    var userid=Meteor.userId();
    Meteor.call('eyeontrend',hash,userid);


   

   
    
  }


});