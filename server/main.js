import { Meteor } from 'meteor/meteor';

//html sanatization
//for sanatizing html extra
var sanitizeHtml = require('sanitize-html');

// for escaping html tags 
function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
};  //end
/*-----------------------------------*/


Meteor.startup(() => {
  // code to run on server at startup
});



//ServerSession.set(key, value);
//collection of post
function collectionposts(post){

	var idofpost= Posts.insert({ //doubt var 
     body: post
    });

  ServerSession.set("idofpost", idofpost);// doubt session
};
//END

//collecting hash

function hash_to_collection(postid,arry_of_hash){
    //console.log("enter");
  for(j=0;j<arry_of_hash.length;j++)
  {

      		hashtags.insert({
            hashtag: arry_of_hash[j],
            postid :postid
          });


      var find_hash = hashtagcount.find({hashtag: arry_of_hash[j]}).fetch();
      //console.log("22",find_hash);
      if(find_hash[0] !== undefined){
//console.log("update hash");

           hashtagcount.update(
                {_id: find_hash[0]._id}, 
                {$inc:{count:+1} }
             );
           

      }else{
      //console.log("insert hash");
        hashtagcount.insert({
            hashtag: arry_of_hash[j],
            postid :postid
          });
        
       
      }
    } 
};
//END





//patterns to extract tags outa string
function getTag(text,flag){

	// finding pattern @
	var patt1 = /@\w+/g;		
    var result = text.match(patt1);       		
    var h = /\w+/g;  //extractin word after @ sign 	

    // variables define			
    var res=[];
    var tagpos=[];
    var tag=[];
    var a=0;
    var jx=[]; // break string into array
    var storusername=[];
    var sign=[];
    var storesign=[];

	//breaking of string 
	jx = text.split(" ");  				  
   				   

   		if(result !== null){  			
				
				//for how many @words are used in string

			for (i=0; i<result.length;i++) 
			{			  				  	

			     var result2 = result[i].match(h);	 		
		 		
		 		 storesign[i]= jx.indexOf(result[i]);	 	

					//check if @word account exist or not
		 		 var user = Meteor.users.find({username: result2[0]}).fetch(); 

   			 		 if (user[0] !== undefined)
   			 		 {
   			 		 storusername[i]=user[0].username;
   			 		 var link = "/users/" + storusername[i];
   			 		 tag[i]= "<strong><a href='" + link + "'>"+ result[i] + "</a></strong>"
   			 		 sign[i] = tag[i]
   			 		

   			 		 }
   			 		  else
   			 		 {  			 	
   			 			
   			 			sign[i] = result[i];
   			 			
   			 		}

   			 	}	// end of for loop

   			 	// replacing @words with link in array

   			 	for (i=0;i<storesign.length;i++)
   			 	{
   			 		var kk=storesign[i];
   			 	
   			 		jx[kk]= sign[i];  			 	


   			 	}

   			  	if(flag===-1){
   			  		return jx;
   			  		
   			  	}
   			 
   					//joining the words in array 
   			 	var string = jx.join(" ");
   			 	return string; 			
					
				} // if 2 check for single @ sign


				else{
					//console.log("single @");
					return text; 	
					}

};



//patterns of hashtag outta string
//doubt here
function gethashtag(text,flag){

	// finding pattern #
   var patt1 = /#\w+/g;		
   var result = text.match(patt1); 
       		
   var h = /\w+/g; 
    // variables define			
    
    var tag=[];
    var a=0;
    var jx=[]; // break string into array
    var storusername=[];
    var sign=[];
    var storesign=[];
    var extractstronghash=[];

	//breaking of string 
	jx = text.split(" ");  				  
   				   

   		if(result !== null){  			
				
				//for how many #words are used in string

			for (i=0; i<result.length;i++) 
			{			  				  	

		     var result2  = result[i].match(h);	
	         storesign[i]= jx.indexOf(result[i]);	
	      			 		 
	 		 var link = "/hashtag/" + result2[0];
	 		 tag[i]= "<strong><a href='" + link + "'>"+ result[i] + "</a></strong>"
	 		 sign[i] = tag[i]   			 		

   			 	}	// end of for loop


   			 	

   			 	// replacing @words with link in array

   				for (i=0;i<storesign.length;i++)
   			 	{
   			 		var kk=storesign[i];
   			 	
   			 		jx[kk]= sign[i];  			 	


   			 	}


      // for extarcting real hash for collection 

          var x=0;//for indexing extrastringhash
           for(j=0;j<jx.length;j++){
             if(jx[j].indexOf('<') != -1)
                  {
                   //    console.log("hash",jx[j]);
                       extractstronghash[x]= jx[j];
                       x++;

                   }             
              
           }//for loop ends

          var realhash;
          var hashsting=  extractstronghash.join(" ");            
          var hash_result = hashsting.match(patt1);
          var kk=[];

          for(i=0;i<hash_result.length;i++){
         //   console.log("hashrst",hash_result[i]);
            realhash  = hash_result[i].match(h);  
            kk[i] = realhash[0]; //use kk
          }
          ServerSession.set("realhash", kk);

          //end of logic          

            //for @ and #
   			 		if(flag===-1){
   			  		return jx;
   			  		
   			  	}
   			 
   					//joining the words in array 
   			 	var string = jx.join(" ");
   			 	return string; 			
					
				} // if 2 check for single @ sign


				else{
				//	console.log("single #");
					return text; 	
					}

};




Meteor.methods({

	// method for inserting posts
  insertNewPost: function (post) {
    
		
	var sanatizeText= escapeHtml(post);
	var clean = sanitizeHtml(sanatizeText); 		

	if(clean.indexOf('#')!=-1 || clean.indexOf('@')!=-1){

  	if(clean.indexOf('#')!=-1 && clean.indexOf('@')!=-1){


  				// execute for @ && #
  			if(clean.indexOf(' ')!=-1){

	  				var hashtagpattern = /#\w+/g;		
	    			var hashtagresult = post.match(hashtagpattern); 

	    			var tagpattern = /@\w+/g;		
	   				var tagresult = post.match(tagpattern); 
	   				var arraystring=[];
	   				 var h = /\w+/g;
	   				arraystring = clean.split(" ");
	   				//console.log("arraystring",arraystring);

	   				var tag=[];
	   				var hastag=[];

            var storesign=[];

	   		if(tagresult !== null && hashtagresult !== null){  	  		//panga		


	  				

					for (i=0; i<tagresult.length;i++) 
					{			  				  	

				  		// find tha position of @tag
			 		 storesign[i]= arraystring.indexOf(tagresult[i]); 

			 		 }	

			 		// console.log("storesign",storesign);

			 		 tag=getTag(clean,-1);   // @
	  				 hashtag=gethashtag(clean,-1);  //#
	  				// console.log("tag",tag);
	  				/// console.log("hashtag",hashtag);

	  				 for (i=0;i<storesign.length;i++)
		   			 	{
		   			 		var kk=storesign[i];
		   			 	
		   			 		hashtag[kk]= tag[kk];  			 	


		   			 	}
		   			 
		   			 	var string = hashtag.join(" ");
		   			 collectionposts(string);
             hash_to_collection(ServerSession.get("idofpost"),ServerSession.get("realhash"));
             //console.log("idofpost",Session.get("idofpost"));
			 		 	

						}
            else if(tagresult !== null)
            {	  			
	  				
	  					
              var getresult=getTag(clean,0);
             // console.log("present only tag",getresult);
	  		  collectionposts(getresult);
	  				}

            else{
              var gethash=gethashtag(clean,0);
             // console.log("presnt only hash");
              collectionposts(gethash);
              hash_to_collection(ServerSession.get("idofpost"),ServerSession.get("realhash"));
            }


//dnt below
  			}else{
  					// no space in string
  					collectionposts(clean);
  			}				



  			}

  			else if (clean.indexOf('@')!=-1){
  				// excute for @ only

  				 var getresult=getTag(clean,0);
  					collectionposts(getresult);
  			}

  			else
        {
  				// excute for # only
  			var gethash=gethashtag(clean,0);
  			
  			collectionposts(gethash);
        hash_to_collection(ServerSession.get("idofpost"),ServerSession.get("realhash"));

			}// end of if else if statment


  	} else {

  		
  			// accept the string without @#

  			collectionposts(clean);
  		}

  },

  comment:function(comment,postid){

  	var getresult=getTag(comment,0);

	comments.insert({
	 		comment: getresult,
	 		postid: postid
			 	});


  var notify = commentnotify.findOne({
      postid:postid

       
      });
    ///console.log("clean",notify);
    
    if( notify !== undefined){
          //suscribe to hash
      commentfornotify.insert({
          comment: getresult,
          postid: postid 
           });
   // console.log("insert",commentnotify.find().fetch());
    
      
    }

  },

  likes:function(currentUserId,postid){

  	var post_by_user_id= Posts.findOne({_id:postid}).userId;

	  var promote = promotion.findOne({
	  	userId : currentUserId,
	  	 promopostId: postid
	  	});

    var notify= notification.findOne({
      _id: postid
    });

    if(notify=== undefined){
      notification.insert({
        _id: postid,
        userid:post_by_user_id,
        flags:"like"
        
      });
    }

	  if( promote === undefined){
	   
	    promotion.insert({
	      promopostId: postid
	      
	    });

	    Posts.update(
	        {_id:postid}, 
	        {$inc:{like:+1} } 
	    );

       notification.update(
      {_id: postid},
      {$inc:{count:+1}}
      );  

	  
	    
	  }
	  else{
	        
	       promotion.remove({
	      _id:promote._id

	    });

	       Posts.update(
	        {_id:postid}, 
	        {$inc:{like:-1} } 
	    );


      notification.update(
      {_id: postid},
      {$inc:{count:-1}}
      );  
	    
	   

	   
	  }
  },

 watching:function(uid,watch){
 	var j=watching.findOne({userId : uid, watchingId: watch._id});

	if( j == undefined){
		
		watching.insert({
			 		watchingId: watch._id
			 });
		//console.log('watching');
	}
	else{

		watching.remove({
			_id:j._id
		});

		////console.log('not watching' );
	}

 },

 eyeontrend:function(hash,userid){      

      //check if already subscribe


    var eye = eyeontrend.findOne({
      hashtag:hash
       
      });
    
    //ServerSession.set("eyeontrend",eye._id);
      // insert eyeontrend collection 
    if( eye === undefined){
          //suscribe to hash
      eyeontrend.insert({
          hashtag:hash  });
    
    
      
    }
    else{
            //unsuscribe to hash
          eyeontrend.remove({
          _id:eye._id  }); 
  
     
    }


 },
  commentnotify:function(userid,postid){      

      //check if already subscribe
      
    var notify = commentnotify.findOne({
      postid:postid
       
      });
    ///console.log("clean",notify);
    
    if( notify === undefined){
          //suscribe to hash
      commentnotify.insert({
          postid:postid  });
   // console.log("insert",commentnotify.find().fetch());
    
      
    }
    else{
            //unsuscribe to hash
          commentnotify.remove({
          _id:notify._id  }); 
   //  console.log("remove",commentnotify.find().fetch());
     
    }


 },

 hashnotify:function(userid){

     

      var hashtagz=[];
      var hash_post_array=[]; 
      var postidarray =[];
      var postcursr;

     var hash_sub_count = eyeontrend.find({
        userId: userid}).count(); 

      //console.log("d",commentnotify.find({userId:userid}).count());

      var cmtnotify=commentnotify.find({userId:userid}).count();
   
     

      //look for changes in #tag
      if(hash_sub_count!==0){
      var hashid= eyeontrend.find({
        userId: userid}).fetch();

      
      //cheching if there is subsc.

      
        //collecting subsc hashtags
        for(i=0;i<hashid.length;i++){
          hashtagz[i]=hashid[i].hashtag;
          }
       hash_post_array = hashtagcount.find({
        hashtag: {$in: hashtagz}});   
     
      
      
     

       var handle = hash_post_array.observeChanges({
        changed: function (id, fields)
                {
    
        //  console.log(" brings the total to ");
       //   console.log(" id ",id);
       //   console.log(" fields ",fields);

          var hashupdate= hashtagcount.findOne({_id:id}).hashtag;
        //  console.log("hashupdate",hashupdate);
         
          
         // console.log("u",userid);
       //   console.log(" fields ",fields.count);

       var notify= notification.findOne({
          _id:id
        });

        if(notify=== undefined){
          notification.insert({
            _id: id,
            userid:userid,
            flags:"hash",
            hashtag:hashupdate,
            count:fields.count
            
          });
        }

        else{
          

         notification.update(
          {_id : id},
          {$set:{count : fields.count}});
        }
    
   
  }
 
});
 }   

 //look for change in notify comment  
//cheching if there is subsc.

 if(cmtnotify!==0){
  //has id of all subscr
      var notifyarray= commentnotify.find({
        userId: userid}).fetch();
      
      
        //collecting subsc hashtags
        //get sub postid
        for(i=0;i<notifyarray.length;i++){
          postidarray[i]=notifyarray[i].postid;
          }

        commentcursr = comments.find({
        postid: {$in: postidarray}});   
     
      
      
    // console.log("commentcursr",commentcursr.fetch());

       var commenthandle = commentcursr.observeChanges({
       added: function (id, user) 
                {
    
         // console.log(" brings the total to ");
        // console.log(" id ",id);
         //console.log(" id ",user.postid);
         // console.log(" user ",user);
         // console.log(" user ",user.username);

        var notify= notification.findOne({
          _id:id
        });

        if(notify=== undefined){

        
          notification.insert({
            _id:id,
            userid:userid,
            flags:"comment",
            username:user.username,
            comment:user.comment,
            postid: user.postid
            
          });
        }
 }
 
});
 }    
 }





 

});


