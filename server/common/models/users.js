'use strict';
let AddUser=require('../../server/custom_modules/users/addUser')
let UserLogin=require('../../server/custom_modules/users/login')
let VerifyToken=require('../../server/custom_modules/users/verifyToken')


module.exports = function(Users) {
  // Users.disableRemoteMethodByName("create");
  Users.disableRemoteMethodByName("login");

  Users.userLogin = function (req, res, cred, cb) {
    UserLogin(Users, req, res, cred, cb)
  };

  Users.addUser = function (data, cb) {
      AddUser(Users, data, cb)
    };

  Users.verifyToken = function (userId,token, cb) {
    VerifyToken(Users, userId,token, cb)
  };

  Users.remoteMethod(
    'userLogin',
    {
      description: 'login',
      http: {path: '/userLogin', verb: 'post'},
      accepts: [{arg: 'req', type: 'object', 'http': {source: 'req'}},
        {arg: 'res', type: 'object', 'http': {source: 'res'}},
        {arg: 'data', type: 'object', required: true, http: {source: 'body'}}],
      returns: {root: true, type: 'object'}
    }
  );

  Users.remoteMethod(
    'addUser',
    {
      description: 'addUser',
      http: {path: '/addUser', verb: 'post'},
      accepts: [{arg: 'data', type: 'object', required: true, http: {source: 'body'}}],
      returns: {root: true, type: 'object'}
    }
  );

  Users.remoteMethod(
    'verifyToken',
    {
      description: 'verifyToken',
      http: {path: '/:userId/verifyToken/:token', verb: 'get'},
      accepts: [
        {arg: 'userId', type: 'string', required: true},
        {arg: 'token', type: 'string', required: true},
        ],
      returns: {root: true, type: 'object'}
    }
  );

};
