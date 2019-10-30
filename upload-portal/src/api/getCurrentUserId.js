import BoxClient from './BoxClient.js';

exports.handler = async (event) => {
  console.log('getUser() Called in App.js');
  return BoxClient.users.get(BoxClient.CURRENT_USER_ID).then( user =>{
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
