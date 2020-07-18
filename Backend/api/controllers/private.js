/**
 * PrivateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    friendlyName: 'Test Private response',
  
  
    description: '',
  
  
    inputs: {
  
    },
  
  
    exits: {
  
    },
  
    fn: async function () {
      // All done.
      return {
        'success':'true',
        'private': 'isOn'
      };
    }
  };
