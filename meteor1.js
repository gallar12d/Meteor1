Persona = new Mongo.Collection('persona');
 
if (Meteor.isClient) {


Meteor.subscribe('allUsers');
Meteor.subscribe('allPersonas');

        function sacaremail(){
              var userId = Meteor.userId();
              var usermail = Meteor.users.findOne({_id: userId}).emails[0].address;

               return usermail;
        }


          // counter starts at 0
  Template.body.helpers({
    tasks: function () {
      return Persona.find({});
    }
  });


  Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      nombre: $(e.target).find('[name=title]').val(),
    
    };

      if (post.nombre || !courrentUser)
    post._id = Persona.insert(post);
    Router.go('postPage', post);
  }
});


}

if (Meteor.isServer) {


  Meteor.startup(function(){


                   Meteor.publish("allPersonas", function () {
                return Persona.find({});
                });

                Meteor.publish("allUsers", function () {
                  return Meteor.users.find({});
                });


                Meteor.publish(null, function (){ 
                  return Meteor.roles.find({})
                });

    
    // code to run on server at startup
  });

 Roles.addUsersToRoles('cGFKBwZNxQagYQs72', "administrador", 'default-group');



}
