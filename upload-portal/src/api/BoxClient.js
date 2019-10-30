// import BoxSDK from 'box-node-sdk';
var BoxSDK = require('box-node-sdk');
// Initialize the SDK with app credentials
var sdk = new BoxSDK({
  clientID: '9pv5fpovh4cgw4tmfxvwjh3oe4f91hie',
  clientSecret: 'YZb8Z7Xlm74BqFO92QyXHhKEbw5Un5wd'
});

// Create a basic API client, which does not automatically refresh the access token
var client = sdk.getBasicClient('5EyBWM1ZKUyWb2ikBzfYX5FWoSzNa32t');

export default client;
