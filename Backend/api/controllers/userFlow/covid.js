var _ = require('lodash');
var moment = require('moment');

module.exports = {

  friendlyName: 'I have covid :(',

  description: 'I have covid :(',

  inputs: {
    dateAcquired:  {
      required: true,
      type: 'string',
    },
  },

  exits: {

    success: {
      description: '',
    },

    invalid: {
      responseType: 'serverError',
      description: 'The provided fullName, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request '+
      'parameters should have been validated/coerced _before_ they were sent.'
    },

  },

  fn: async function (inputs, exits) {

    //Create Covid object - relate to User - relate to Places

    var covidObject = await Covid.create({
        dateAcquired: inputs.dateAcquired, 
        dateFinished: moment(inputs.dateAcquired).add("2", "weeks").toISOString(),
        owningUser: this.req.user.id
    }).fetch()

    Place.addToCollection()

    var userWithVisits = await User.findOne({id: this.req.user.id}).populate('visit', {
        where: {
            arrivalDateTime: {'<=': moment.utc().toISOString()},
            arrivalDateTime: {'>=': moment(inputs.dateAcquired).subtract("2", "weeks").toISOString()}
        },
    });

    for(i=0; i<userWithVisits.visit.length; i++){
        userWithVisits.visit[i] = await Visit.findOne({id: userWithVisits.visit[i].id}).populate('places');
        await Place.addToCollection(userWithVisits.visit[i].places[0].id, 'covidInstances', covidObject.id)
    }
    console.log(userWithVisits);

    return exits.success({
        message: "User got covid :(",
    })
  }

};
