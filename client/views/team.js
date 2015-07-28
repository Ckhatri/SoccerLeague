Template.team.events({
  "click a.edit": function(event, template){
    event.preventDefault();
    Session.set('editedTeamId', this._id);
  },
  

  //since we're doing denormalization, if a name changes, we have to go into our Games and change that team's name
  "submit form.form-edit": function(event, template){
    event.preventDefault();
 
    var teamName = template.$('input[name="name"]').val();
    var self = this;
    if(teamName.length){
      Teams.update(this._id, {$set: {name: teamName}}, function(error) {
        if (!error) {
          var games = Games.find({_id: {$in: self.gameIds}});
          console.log(games);
          if (games.count()) {
            _(games.fetch()).each(function(game) {
              var team = _(game.teams).findWhere({_id: self._id});
              if (team != null) {
                team.name = teamName;
                Games.update({_id: game._id}, {$set: {teams: game.teams}})
              }
            });
          }
        }
      });

      Session.set('editedTeamId', null);
    }
  },
 
  "click a.cancel": function(event, template){
    event.preventDefault();
    Session.set('editedTeamId', null);
  },
 
  'click a.remove': function(event, template){
    event.preventDefault();
    Teams.remove(this._id);
  }
});

Template.team.helpers({
  isEditingTeam: function(){
    return Session.get('editedTeamId') === this._id;
  }
});