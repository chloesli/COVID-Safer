var _ = require('lodash');
var moment = require('moment');

module.exports = {

  friendlyName: 'Add a visit to a place',

  description: 'Add a visit to a place',

  inputs: {

    // enteredDatetime: {
    //   required: true,
    //   type: 'string',
    //   description: 'ISO datetime'
    // },

    // placeId: {
    //   required: true,
    //   type: 'number',
    // },

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

    var userWithVisits = await User.findOne({id: this.req.user.id}).populate('visit');

    // console.log(userWithVisits)

   // tmp = []
    //loop thru userWithVisits.visit find the Place inside
    // 
    for(i=0; i<userWithVisits.visit.length; i++){
      userWithVisits.visit[i] = await Visit.findOne({id: userWithVisits.visit[i].id}).populate('places');
      // console.log(tmp.places[0])
    }
 

    //Create a visit w/ datetime & id 
   

    //Return relevant success message and rdbNumber
    return exits.success({
      visitsWithPlaces: userWithVisits.visit
     // message: 'new Visit created',
    //  visit: visit,
    })
  }

};
