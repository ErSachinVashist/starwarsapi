// const { Consumer } = require('sqs-consumer');
// const AWS = require('aws-sdk');
// AWS.config.update({
//   region: 'ap-south-1',
//   accessKeyId: 'AKIAUVCBKWOGDNLDAUOB',
//   secretAccessKey: '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',
//
// });
// const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
// console.log('here')
// const app = Consumer.create({
//   queueUrl: 'https://sqs.ap-south-1.amazonaws.com/320112079756/tp-w1-queue',
//   handleMessage: async (message) => {
//    console.log(message)
//   },
//   sqs: new AWS.SQS()
// });
//
// app.on('error', (err) => {
//   console.error(err.message);
// });
//
// app.on('processing_error', (err) => {
//   console.error(err.message);
// });
//
// app.on('timeout_error', (err) => {
//   console.error(err.message);
// });
//
// app.start();

const perf = require('execution-time')();

perf.start();

setTimeout(function() {
  console.log(Math.ceil(perf.stop().time))
},20)
