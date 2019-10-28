import BoxClient from './BoxClient.js';
import fs from 'fs';
import stream from 'stream';
// import formidable from 'formidable';
// Upload a new file to folder 123

exports.handler = async (event) =>{
  // const fileBinaryString = event.body;

  const folderId = '0';
  const fileName = 'agliberSample3.pdf';

  return BoxClient.files.uploadFile(folderId,fileName,event.body)
  	.then(fileObject => {
      return {
        statusCode: 201,
        body: JSON.stringify(fileObject),
      }
    })
  	.catch(err => {
      console.log('Got an error!', err)
      return {statusCode:400,body:String(err)};
    });
}
