module.exports = {

    attributes: {
  
      //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
      //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
      //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
      emailAddress: {
        type: 'string',
        required: true,
        isEmail: true,
        maxLength: 200,
        example: 'mary.sue@example.com'
      },
  
      password: {
        type: 'string',
        required: true,
        description: 'Securely hashed representation of the user\'s login password.',
        protect: true,
        example: '2$28a8eabna301089103-13948134nad'
      },
  
      firstName: {
        type: 'string',
        required: true,
        description: 'First name of the user\'s name.',
        maxLength: 120,
        example: 'Mary'
      },
  
      lastName: {
        type: 'string',
        required: true,
        description: 'Last name of the user\'s',
        maxLength: 120,
        example: 'McHenst'
      },
  
      address: {
        required: false,
        type: 'string',
        description: 'Users address'
      },
  
      ageRange: {
        type: 'string',
        required: false,
        description: 'Age range of users',
      },
  
      //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
      //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
      //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
  
  
      //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
      //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
      //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
  
    },
  
  };
  