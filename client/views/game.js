// Template.game.helper({

// });


Template.game.events({
	"click a.score": function(event, template) {
		event.preventDefault();
		var data = $(event.currentTarget).data();
		var update = {$inc: {}};
		var selector = "teams." + data.index + ".score";
		update.$inc[selector] = data.inc;
		Games.update({_id: this._id}, update);
	},

	"click a.finish-game": function(event, template) {
		event.preventDefault();
		Games.update({_id: this._id}, {$set: {completed: true}});
	},

	"click a.delete-game": function(event, template) {
		event.preventDefault();
		var gameId = this._id;
		var teamIdA = this.teams[0]._id;
		var teamIdB = this.teams[1]._id;

		//have to remove the game ids from the teams collection as well.
		Games.remove(gameId, function(error) {
			if (!error){
				Teams.update({_id: teamIdA}, {$pull: {gameIds: gameId}}));
				Teams.update({_id: teamIdB}, {$pull: {gameIds: gameId}}));
			}
		});
	}
});