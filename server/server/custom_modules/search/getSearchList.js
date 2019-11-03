
module.exports = function (Searched, req, filter, cb) {
  filter.where={userId:req.accessToken.userId}
  Searched.find(filter).then(function(list){
    cb(null,list)
  }).catch(function(err) {
    cb({error:err.message})
  })
};
