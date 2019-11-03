'use strict';
let FetchSwapData=require('../../server/custom_modules/search/fetchSwapData');
let GetSearchList=require('../../server/custom_modules/search/getSearchList');
let ListenSocket=require('../../socket/initSocket');
module.exports = function(Searched) {
  ListenSocket(Searched,'Searched');
  Searched.fetchSwapData = function (req, data, cb) {
    FetchSwapData(Searched, req, data, cb)
  };
  Searched.getSearchList = function (req, filter, cb) {
    GetSearchList(Searched, req, filter, cb)
  };

  Searched.remoteMethod(
    'fetchSwapData',
    {
      description: 'fetch Swap Api Data',
      http: {path: '/fetchSwapData', verb: 'post'},
      accepts: [{arg: 'req', type: 'object', 'http': {source: 'req'}},
        {arg: 'data', type: 'object', required: true, http: {source: 'body'}}],
      returns: {root: true, type: 'object'}
    }
  );
  Searched.remoteMethod(
    'getSearchList',
    {
      description: 'get search list',
      http: {path: '/getSearchList', verb: 'get'},
      accepts: [{arg: 'req', type: 'object', 'http': {source: 'req'}},
        {arg: 'filter', type: 'object', required: true, http: {source: 'query'}}],
      returns: {root: true, type: 'object'}
    }
  );

};

