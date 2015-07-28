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
		Games.remove(this._id);
	}
});