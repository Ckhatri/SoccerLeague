Template.team.events({
  "click a.edit": function(event, template){
    event.preventDefault();
    Session.set('editedTeamId', this._id);
  },
 
  "submit form.form-edit": function(event, template){
    event.preventDefault();
 
    var teamName = template.$('input[name="name"]').val();
    if(teamName.length){
      Teams.update(this._id, {$set: {name: teamName}});
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