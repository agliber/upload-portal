import React from 'react';
import './App.css';
import Dropzone from 'react-dropzone';

class App extends React.Component{

  // Get your own user object from the Box API
  // All client methods return a promise that resolves to the results of the API call,
  // or rejects when an error occurs
  constructor(props){
    super(props);
    this.state={
      userName:'',
      filesUploaded:[],
    };
  }

  getUser = () => {
     fetch('/.netlify/functions/getCurrentUserId').then(response =>{
       console.log(response);
       return response.text();
     }).then(body => {
       console.log(body);
       this.setState(Object.assign({},{userName:`${body}`}));
     })
  };

  upload = (file) => {
    var reader = new FileReader();
    reader.onloadend = event => {
      fetch('/.netlify/functions/uploadFile',{
        method: 'POST',
        headers: {
          'content-type' : 'application/octet-stream',
        },
        body: event.target.result,
      }).then(response =>{
        console.log(response);
        return response.text();
      }).then(body => {
        console.log(body);
        // this.setState(Object.assign({},{userName:`${body}`}));
      })
    }
    reader.readAsArrayBuffer(file);
  };





  render(){
    return (
      <div className="App">
        <button onClick={this.getUser}> Test Get </button>
        <p>{this.state.userName}</p>
        <Dropzone onDrop={acceptedFiles => {
          console.log(acceptedFiles[0]);
          this.upload(acceptedFiles[0])
        }}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    );
  }

}

export default App;
