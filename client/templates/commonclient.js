Meteor.subscribe('post');
Meteor.subscribe('hash');
Meteor.subscribe('hashcount');
Meteor.subscribe('comments');
Meteor.subscribe('watching');
Meteor.subscribe('notification');
Meteor.subscribe('userid');
Meteor.subscribe('eyeontrend');
Meteor.subscribe('commentnotify');

Handlebars.registerHelper('commentcount', function(id){
 return comments.find({postid: id}).count();
});

Handlebars.registerHelper('promotioncount', function(id){
 return Posts.findOne({_id: id}).like;
});

/*Tracker.autorun(function() {

		var hashtagz=[];
	    var hash_post_array=[]; 
	    var hash_sub_count=eyeontrend.find({
			    	userId: Meteor.userId()
			   		 }).count();
	    Meteor.call('hashnotify')
	 var hashid= eyeontrend.find({
	    	userId: Meteor.userId()}).fetch();
	  
	    //cheching if there is subsc.
	    if(hash_sub_count!==0){
	      //collecting subsc hashtags
	      for(i=0;i<hash_sub_count;i++){
	        hashtagz[i]=hashid[i].hashtag;
	        }
	     hash_post_array = hashtagcount.find({hashtag: {$in: hashtagz}}).fetch();   
	    }
	    console.log("hashpostarray",hash_post_array);
	    var hash=[];
	    for (i=0; i<hash_post_array.length;i++){
	    	hash[i]= hash_post_array[i].count;
	    	hash[i]+=" ";
	    	hash[i]+=hash_post_array[i].hashtag;
	    }
	    console.log("hash",hash);
});*/
