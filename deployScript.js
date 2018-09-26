var request = require('request');
request('http://ec2-35-154-115-74.ap-south-1.compute.amazonaws.com:3020/crm', function (error, response, body) {
  console.log('error:', error);
  console.log('body:', body);
});

