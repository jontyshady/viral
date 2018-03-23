

Template.modelBtn.events({

	"submit .thoughts" : function(event){
		event.preventDefault();
		var text= event.target.text.value;
		
		Meteor.call('insertNewPost', text);

    event.target.text.value = ""; 
  			
}
})