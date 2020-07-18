/**
 * LogoutAction
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    friendlyName: 'Logout',
  
  
    description: 'Log out of this app.', 
  
    exits: {
  
      success: {
        description: 'The requesting user agent has been successfully logged out.'
      },
  
      redirect: {
        description: 'The requesting user agent looks to be a web browser.',
        extendedDescription: 'After logging out from a web browser, the user is redirected away.',
        responseType: 'redirect'
      }
  
    },
  
  
    fn: async function () {
  
      //Clear JWT cookie
      this.res.clearCookie('sailsjwt');
  
      // Then finish up, sending an appropriate response.
      if (!this.req.wantsJSON) {
        throw {redirect: '/'};
      }
  
    }
  
  };
  