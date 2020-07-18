module.exports = {

    attributes: {
  
      //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
      //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
      //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
      locationName: {
        type: 'string',
        required: true,
      },

      address: {
        type: 'string',
        required: true,
      },

      suburb: {
        type: 'string',
        required: true,
      },

      postcode: {
        type: 'number',
        required: true,
      },
    

    //   covidScare: {
    //     type: 'boolean',
    //     required: true,
    //     description: 'Venue has covid',
    //   },
      //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
      //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
      //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
  
  
      //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
      //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
      //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

      // Add a reference to Visit M:M
      visitor: {
        collection: 'Visit',
        via: 'places'
      },

      // Add a reference to Visit M:M
      covidInstances: {
        collection: 'Covid',
        via: 'places'
      },

      // Add a reference to User 1:1, only for business owners
      businessUser: {
          collection: 'User',
          via: 'ownedPlace'
      }

    },
  
  };
  