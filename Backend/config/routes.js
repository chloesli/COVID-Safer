/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  
  //Sample endpoints
  'GET /public':                              {action: 'public'},
  'GET /private':                             {action: 'private'},

  //Authentication endpoints
  '/api/auth/logout':                         {action: 'auth/logout'},
  'POST /api/auth/register':                  {action: 'auth/register'},
  'POST /api/auth/login':                     {action: 'auth/login'},

  //Business
  'POST /api/add-place':                 {action: 'businessFlow/add-place'},

  //User
  'POST /api/check-in':                 {action: 'userFlow/check-in'},
  'POST /api/check-out':                 {action: 'userFlow/check-out'},
  'POST /api/covid':                 {action: 'userFlow/covid'},
  'GET /api/places-visited':            {action: 'userFlow/places-visited'},
  'GET /api/all-places':                 {action: 'all-places'},

  'GET /api/find-by-user':                 {action: 'businessFlow/find-by-user'},
  'GET /api/users-visited':                 {action: 'businessFlow/users-visited'},
  
  

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
