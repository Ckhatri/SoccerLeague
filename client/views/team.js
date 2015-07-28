Template.team.events({
  "click a.edit": function(event, template){
    event.preventDefault();
    Session.set('editedTeamId', this._id);
  },
  

  //since we're doing denormalization, if a name changes, we have to go into our Games and change that team's name
  "submit form.form-edit": function(e, tpl){
    e.preventDefault();
 
    var teamName = tpl.$("input[name=name]").val();
    var self = this;

    if(teamName.length){
      Meteor.call("teamUpdate", this._id, teamName, function(error){
        if(error){
          alert(error.reason);
          Session.set('editedTeamId', self._id);
          Tracker.afterFlush(function(){
            tpl.$("input[name=name]").val(teamName);
            tpl.$("input[name=name]").focus();
          });
        }
      });

      Session.set('isEditingTeam', null);
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