let boot = require('loopback-boot');
let path = require('path');
let loopback = require('loopback');
let app = module.exports = loopback();
// const Sentry = require('@sentry/node');

// if(config.env==='production'){
//     Sentry.init({ dsn: 'https://a935c8a5bfbb4038b9971395b1dbb6b2@sentry.io/1336664' });
// }

const staticRoot = path.resolve(__dirname, '..', 'client');

app.all('/*', function(req, res, next) {
  if (req.url.startsWith('/api')) {
    return next();
  }
  let isAsset = req.url.match(/\/(.*\.(js|css|map|png|svg|jpg|xlsx))\??/);
  if (isAsset) {
    return res.sendFile(isAsset[1], {root: staticRoot });
  }
  res.sendFile('index.html', { root: staticRoot });
});

boot(app, __dirname, function(err) {
  if (err) throw err;
  if (require.main === module) {
    app.io = require('socket.io')(app.start());
    require('socketio-auth')(app.io, {
      authenticate: function (socket, value, callback) {
        app.models.AccessToken.find({
          where:{
            and: [{ userId: value.userId }, { id: value.id }]
          }
        }, function(err, tokenDetail){
          if (err) throw err;
          callback(null,{
            makingAuthConnection:true,
            userAuth:tokenDetail.length>0
          })
        });
      }
    })
    app.io.on('connection', function (socket) {
      let userIp=socket.handshake?socket.handshake.address:'Unknown'
      console.log('User connected. IP :',userIp);
      socket.on('disconnect', function () {
        console.log(userIp,'user disconnected');
      });
    });
  }

});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

