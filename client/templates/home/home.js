



Session.set("postLimit",30);
lastScrollTop = 0;


 
// update when scroll down
 $(window).scroll(function(event){
  
  if($(window).scrollTop() +$(window).height() > $(document).height() - 100){

      var scrollTop = $(this).scrollTop();
      if (scrollTop > lastScrollTop) {
          Session.set("postLimit",Session.get("postLimit")+5);
          console.log("ssd");
        
      }
    }
  });


Template.homeIndex.helpers({
  posts:function(){

    return Posts.find({}, {sort:{createdAt: -1}, limit:Session.get("postLimit")});
  }

});



Template.post.events({
  "click .promo" : function(id){
    
    //var jx = $(this).closest(".promo[id]").attr('id');
   var postid = id.currentTarget.firstChild.id;
    
   var currentUserId = Meteor.userId();

   Meteor.call('likes', currentUserId,postid) ; 
 
    
  }
});



