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
		
		var team1 = {
			_id: template.$("select[name=teamOne]").val(),
		    name: template.$("select[name=teamOne] option:selected").text(),
		    score: 0
		}

		var team2 = {
			_id: template.$("select[name=teamTwo]").val(),
		    name: template.$("select[name=teamTwo] option:selected").text(),
		    score: 0
		}

		var game = {
			createdAt: new Date(),
			teams: [team1, team2],
			completed: false
		}

		var gameId = Games.insert(game);
		// have to add the game id to both of the teams.
	    Teams.update({_id: team1._id}, {$addToSet: { gameIds: gameId}});
	    Teams.update({_id: team2._id}, {$addToSet: { gameIds: gameId}});
	    Session.set('isCreatingGame', false);
	}
});