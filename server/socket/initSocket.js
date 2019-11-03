'use strict'
function isNullOrEmpty(str) {
  return str === null || str === undefined || str === '';
}


let pubsub=require('./pubsub');

module.exports=function(Model,collection){
  Model.observe('after save', function (ctx, next) {
    let socket = Model.app.io;
    let obj={};
    if(ctx.isNewInstance){
      obj={
        collectionName :collection,
        data: ctx.instance,
        method: 'POST'
      };
        pubsub.publish(socket,obj);
    }
    else{
      if(!isNullOrEmpty(ctx.instance)&& !isNullOrEmpty(ctx.instance.id) ){
          obj={
              collectionName : collection,
              data: ctx.instance,
              modelId: ctx.instance.id,
              method: 'PUT'
          };
          pubsub.publish(socket,obj);
      }
    }
      next();
  });

  Model.observe("before delete", function(ctx, next){
    let socket = Model.app.io;
    pubsub.publish(socket, {
      collectionName : collection,
      data: ctx.instance.id,
      modelId: ctx.instance.id,
      method: 'DELETE'
    });
      next();
  });
};
