// import BoxSDK from 'box-node-sdk';
var BoxSDK = require('box-node-sdk');
// Initialize the SDK with your app credentials
var sdk = new BoxSDK({
  clientID: '9pv5fpovh4cgw4tmfxvwjh3oe4f91hie',
  clientSecret: 'YZb8Z7Xlm74BqFO92QyXHhKEbw5Un5wd'
});

// Create a basic API client, which does not automatically refresh the access token
var client = sdk.getBasicClient('b6su7o9DNVCdxCIMZcq8uUmXimdjMnK3');

exports.handler = async (event) => {
  console.log('getUser() Called in App.js');
  return client.users.get(client.CURRENT_USER_ID).then( user =>{
    console.log('got user in backend');
    console.log(user);
    return {
      statusCode:200,
      body:user.name
    };
  }).catch(err => {
    console.log('Got an error!', err)
    return {statusCode:400,body:String(err)};
  });
}
