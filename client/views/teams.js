Template.teams.helpers({
	teams: function() {
		return Teams.find();
	},

	isCreatingTeam: function() {
		return Session.get('isCreatingTeam');
	}
});

Template.teams.events({
	'click .create': function(e, tpl){
		event.preventDefault();
		Session.set('isCreatingTeam', true);
	},

	'click .cancel': function(e, tpl){
		event.preventDefault();
		Session.set('isCreatingTeam', false);
	},

	'submit .create-team': function(event){
		event.preventDefault();
		var teamName = event.target.name.value;
		Teams.insert({name: teamName}, function(error, _id){
			if (error) {
				alert(error);
				Session.set('isCreatingTeam', true);
			}
		});
		Session.set('isCreatingTeam', false);
	}
});