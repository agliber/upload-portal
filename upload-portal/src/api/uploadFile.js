import BoxClient from './BoxClient.js';
import fs from 'fs';
import stream from 'stream';
// import formidable from 'formidable';
// Upload a new file to folder 123

exports.handler = async (event) =>{

  const arrayBuffer = event.body;
  const folderId = '0';
  const fileName = 'LoanApplication.pdf';

  // get folder items
  // check if file already exists
  // else update file with a new version
  return BoxClient.folders.getItems(folderId)
    .then(items =>{
      // check if file already exists in the folder by that name
      const entry = items.entries.find( entry => (entry.name == fileName));
      if(!entry){
        // if entry is undefined (file doesn't exist by that name)
        console.log('uploading file');
        return BoxClient.files.uploadFile(folderId,fileName,arrayBuffer)
        	.then(fileObject => {
            return {
              statusCode: 201,
              body: JSON.stringify(fileObject),
            }
          })
        	.catch(err => {
            console.log('Error returned from Box server: ', err);
            return {statusCode:err.statusCode,body:String(err)};
          });
      }else{
        //if entry is defined, file already exists and should upload new version
        console.log('uploading new file version');
        return BoxClient.files.uploadNewFileVersion(entry.id,arrayBuffer)
          .then(fileObject => {
            return {
              statusCode: 201,
              body: JSON.stringify(fileObject),
            }
          })
          .catch(err => {
            console.log('Error returned from Box server: ', err);
            return {statusCode:err.statusCode,body:String(err)};
          });
      }
    })

}
