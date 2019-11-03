'use strict';
let forEach=require('foreach');
let tokenBySearchId=require('./tokenBySearchId');

module.exports = {
    publish: function (socket, options) {
        if (options) {
            let {collectionName,method,data} = options;
            let name = '';
            let findTokens;
            switch(collectionName){
                        case 'Searched':
                            name='/' + collectionName ;
                            findTokens=tokenBySearchId(collectionName,data.id);
                            break;
            }
            findTokens.then(function (tokens) {
                if(method==='DELETE'){
                    socket.emit(name, options);
                }
                else{
                  tokens=tokens.filter((tok,index)=>tokens.indexOf(tok)===index )
                    forEach(tokens,function (tok) {
                        socket.emit(name+'/'+tok.id, options);
                    })
                }
            })
        }
        else {
            throw 'Error: Option must be an object type';
        }
    }
};

