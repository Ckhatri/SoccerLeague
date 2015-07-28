Meteor.startup(function () {

  var dummyEmail = "test@test.com";

  if (Meteor.users.find({"emails.address": dummyEmail}).count() === 0) {
      var dummyOwnerId = Accounts.createUser({
        email: dummyEmail,
        password: "aylmao"
      });
      console.log(Meteor.users.find().fetch());
    [
      {name: "Barcelona", gameIds: [], ownerId: dummyOwnerId},
      {name: "Real Madrid", gameIds: [], ownerId: dummyOwnerId},
      {name: "CK's team", gameIds: [], ownerId: dummyOwnerId}
    ].forEach(function(team){
      Teams.insert(team);
    });

    var team1 = Teams.find().fetch()[0];
    var team2 = Teams.find().fetch()[1];

    var game = {
    	completed: false,
    	createdAt: new Date(),
    	teams: [
    		{name: team1.name, _id: team1._id, score: 0},
    		{name: team2.name, _id: team2._id, score: 0},
    	]
    }

    var gameId = Games.insert(game);
    Teams.update({_id: team1._id}, {$addToSet: { gameIds: gameId}});
    Teams.update({_id: team2._id}, {$addToSet: { gameIds: gameId}});
  }
});