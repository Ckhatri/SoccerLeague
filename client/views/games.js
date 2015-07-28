Template.games.helpers({
	games: function() {
		return Games.find();
	},

	teams: function() {
		return Teams.find();
	},

	isCreatingGames: function() {
		return Session.get('isCreatingGames');
	}
});


Template.games.events({
	"click a.create": function(event, template) {
		event.preventDefault();
		Session.set("isCreatingGames", true);
	},

	"click a.cancel": function(event, template) {
		event.preventDefault();
		Session.set("isCreatingGames", false);
	},

	"submit form.form-create": function(event, template) {
		event.preventDefault();
		
		var teamOneId = template.$("select[name=teamOne]").val();
		var teamTwoId = template.$("select[name=teamTwo]").val();

		var team2 = {
			_id: template.$("select[name=teamTwo]").val(),
		    name: template.$("select[name=teamTwo] option:selected").text(),
		    score: 0
		}

		Meteor.call("insertGames", teamOneId, teamTwoId, function(error, response) {
			if (error) {
				alert(error.reason);
				Session.set("isCreatingGames", true);
				Tracker.afterFlush(function(){
          			tpl.$("select[name=teamOne]").val(teamOneId);
          			tpl.$("select[name=teamTwo]").val(teamTwoId);
        		});
			}
		})

		Session.set('isCreatingGames', false);
	}
});