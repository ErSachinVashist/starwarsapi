const axios=require('axios');
const redis = require('redis');
const rClient = redis.createClient();

module.exports = function (Searched, req, data, cb) {
  if(!data.searchCat || !data.searchKey){
    return cb(null,{error:'Search Key and Category Required'})
  }
  Searched.create({
    ...data,
    addedOn:new Date(),
    userId:req.accessToken.userId
  }).then(function(data){
    hitSwapi(data.searchCat,data.searchKey,function(resp) {
      Searched.upsertWithWhere({
        id:data.id
      },{
        fetchedIn:new Date()-data.addedOn,
        fetching:false,
        searchData:resp
      },function(err,data) {
        if(err) return console.log(err)
        cb(null,resp)
      })
    })
  }).catch(function(err) {
    cb({error:err.message})
  })
};

function hitSwapi(category,key,next) {
  checkCache(key+'&'+category,function(data) {
    if(data){
      next(JSON.parse(data))
    }
    else{
      axios.get(`https://swapi.co/api/${category}/${filter}`).then(function(res) {
        let results=res.data.results?res.data.results && res.data.results.length>0?res.data.results[0]:{}:res.data
        rClient.set(key+'&'+category, JSON.stringify(results), 'EX', 3600);
        next(results)
      }).catch(function(err) {
        next({error:err.message})
      })
    }
  })
  const filter=isNaN(key)?`?search=${key}`:`${key}/`;
}

function checkCache(key,next){
  rClient.get(key,(err,data)=>{
    if(err) throw err;
    next(data)
  })
}
