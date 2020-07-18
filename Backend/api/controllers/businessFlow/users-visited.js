var _ = require('lodash');
var moment = require('moment');

module.exports = {

  friendlyName: 'Users visited to this Place',

  description: 'Users visited to this Place',

  inputs: {
    placeId:  {
      required: true,
      type: 'number',
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

    var visits = await Place.findOne({id: inputs.placeId}).populate('visitor')//.populate('covidInstances');
    
    if(!visits){
      return exits.invalid({message: "Id does not match any place"});
    }

    for(i=0; i<visits.visitor.length; i++){
      visits.visitor[i].owningUser = await User.findOne({id: visits.visitor[i].owningUser});
    }
 
    //Return relevant success message
    return exits.success({
      visitorsWithUsers: visits
    })
  }

};
