let app=require('../server/server');
let forEach=require('foreach');
const addSubtractDate = require("add-subtract-date");
let removeProp = require('js-remove-property');

function tokenValid(tok) {
    let ttlDate=new Date(tok.created)
    let expiryDate=addSubtractDate.add(ttlDate,tok.ttl,'seconds')
    return expiryDate>new Date()
}

module.exports=function(collectionName,searchId) {
  const Searched=app.models.Searched;
  return new Promise(function(resolve, reject) {
    Searched.findById(searchId,{include:[{relation:'users',scope:{include:['accessTokens']}}]}).then(function(search,err) {
      if(err) return console.log(err)
      search=search.toJSON()
      let tokens=[];
      forEach(search.users.accessTokens,function (tok) {
        if(tokenValid(tok)){
          tokens.push(tok);
        }
      });
      resolve(tokens)
    })
  })
};
