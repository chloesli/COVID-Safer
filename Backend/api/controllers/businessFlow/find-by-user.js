module.exports = {

    friendlyName: 'Find Places by user id',
  
    description: 'Find Places by user id',
  
    inputs: {
        
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
      //Get place from user id (if a business owner)
      var place = await User.findOne({id: this.req.user.id}).populate('ownedPlace')
      place = place.ownedPlace;
      if(!place){
        return exits.invalid({message: 'No place'})
      }
      return exits.success({
        message: "success",
        place
      })
    }
  
  };
  