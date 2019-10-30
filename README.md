# Upload-Portal
## A demo React application for Bank of America Box integration
## Checkout the demo here : https://youtu.be/juEI8EW9H-U
---

## Usage
> First setup an account at netlify.com to host serverless functions

1. npm install
2. Configure developer credentials in src/api/BoxClient.js
3. npm run build
4. npm run build:lambda
5. npm start

## Features
- Mock Bank of America website
- Display Box user information
- Display and download pdf's directly from Bank of America
- Drag and drop file upload
- Click to browse file upload
- Upload new file's to Box
- Upload new file version's to Box

## Libraries
- create-react-app
- box-node-sdk
- netlify-lambda
- netlify
- reactstrap
- react-dropzone-uploader

## App Structure

```
App.js 			              # Renders UI components, makes calls to netlify api
api/                      # Server side code (functions) hosted by netlify
├── BoxClient.js 	        # Setups Box SDK client with dev credentials
├── getCurrentUserId.js 	# Handler Function for getting user name from box  
└── uploadFile.js 	      # Handler function for uploading files to box  
```

## Box Api's Used (Node SDK)
- [`users.get(userID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Users.html#get)
- [`folders.getItems(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#getItems)
- [`files.uploadFile(parentFolderID, filename, content, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#uploadFile)
- [`files.uploadNewFileVersion(fileID, content, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#uploadNewFileVersion)

## Contributors
- AG Liber
