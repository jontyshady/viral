var i=0;
var collectids=[];

Template.watching.helpers({
  watch:function(){
 // watching.find({userId : Meteor.userId()}, {sort:{createdAt: -1}, limit:Session.get("postLimit")});
  var count= watching.find({userId: Meteor.userId()}).count();

  var watchingid= watching.find({userId: Meteor.userId()}).fetch();
  
  console.log("watchin count",count);

  if(count!==0){

  for(i=0;i<count;i++){
    collectids[i]=watchingid[i].watchingId;
  }

   
    return Posts.find({userId: {$in: collectids}}, {sort:{createdAt: -1}, limit:Session.get("postLimit")});
   
}

else{
  return null;
}


  }

});


Template.watchingpost.helpers({
    body:function(id){
      //var getid = id.currentTarget.firstChild.id;
 // watching.find({userId : Meteor.userId()}, {sort:{createdAt: -1}, limit:Session.get("postLimit")});
  
  //console.log("getid",jx);
  



  }

});


Template.watchingpost.events({
  "click .promo" : function(id){
    
    //var jx = $(this).closest(".promo[id]").attr('id');
   var postid = id.currentTarget.firstChild.id;
    
   var currentUserId = Meteor.userId();
   
    Meteor.call('likes', currentUserId,postid) ; 

   
    
  }
});