Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});
 
Router.route('/', {
  name: 'home',
  waitOn: function(){
    return [Meteor.subscribe("games"), Meteor.subscribe("teams")];
  }
});

Router.route('/teams', {
  waitOn: function(){
    return Meteor.subscribe("teams");
  }
});

Router.route('/games', {
  waitOn: function(){
    return Meteor.subscribe("games");
  }
});

var requireLogin = function(){
  if(!Meteor.user()){
    if(Meteor.loggingIn()){
      this.render("loading");
    } else {
      this.render("accessDenied");
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin);