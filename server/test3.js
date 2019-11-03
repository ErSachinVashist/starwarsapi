const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');
const removeProp = require('js-remove-property');
const config = require('../../config');
AWS.config.update(config.awsConfig);

module.exports=function(app) {
  console.log('\x1b[36m%s\x1b[0m', 'Consumer Queue Started');
  const resQueue = Consumer.create({
    queueUrl: config.w2queue,
    region:'ap-south-1',
    sqs: new AWS.SQS({apiVersion: '2012-11-05'}),
    handleMessage:(message => processMessage(message,app))
  });

  resQueue.on('error', (err) => {
    console.error(err.message);
  });

  resQueue.on('processing_error', (err) => {
    console.error(err.message);
  });

  resQueue.start();
}

function processMessage(message,app) {
  const picData = JSON.parse(message.Body),url=picData.url;
  console.log(picData)
  let SaveReq={};
  // removeProp(picData.url);
  if (picData.picType === 'original') {
    SaveReq=app.models.Pictures.upsertWithWhere({pictureId: picData.pictureId}, picData)
  } else {
    SaveReq=app.models.Editpictures.create({pictureId: picData.pictureId}, picData)
  }
  SaveReq.then(function(data,err) {
    if (err) return console.log(err);
    storeUrl((app,picData.picType?picData.picType:'org')+picData.tempName+'_url',url,function() {
      gotAllPics(app,picData);
    })
  })
}

function gotAllPics(app,picData) {
  app.models.Pictures.findById(picData.pictureId, {include: 'editpictures'}, function(err, pic) {
    if (err) return console.log(err);
    let jsonPicData=pic.toJSON()
    if (jsonPicData && jsonPicData.editpictures.length === 3 && jsonPicData.url) {
      pic.uploadStatus = 'done';
      pic.save(function(err, data) {
        if (err) return console.log(err);
        console.log('Added all pics for :', picData.tempName);
      });
    }
  });
}

function storeUrl(app,key,value,cb) {
  app.models.Picurls.set(key,value,function(err,data) {
    if(err) return console.log(err)
    cb(data)
  })
}
