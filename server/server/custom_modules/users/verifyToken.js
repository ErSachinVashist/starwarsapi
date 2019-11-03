
module.exports = function (Users,userId,token,cb) {
  Users.findById(userId,{include:{relation:'accessTokens',scope:{where:{id:token}}}}).then(function(user,err){
    if(err) return console.log(err)
    user=user.toJSON()
    cb(null,{valid:user && user.accessTokens&& user.accessTokens.length>0})
  }).catch(function(err) {
    cb({error:err.message})
  })
};
