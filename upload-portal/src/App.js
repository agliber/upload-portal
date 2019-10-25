import React from 'react';
import './App.css';
// import BoxSDK from 'box-node-sdk';

class App extends React.Component{

  // Get your own user object from the Box API
  // All client methods return a promise that resolves to the results of the API call,
  // or rejects when an error occurs

  constructor(props){
    super(props);
    this.state={
      userName:'',
    };
  }

  callApi = async () => {
     const response = await fetch('/.netlify/functions/getCurrentUserId');
     console.log(response);
     let body = await response.text();
     console.log(body);

     this.setState(Object.assign({},{userName:`${body}`}));
  };

  render(){
    return (
      <div className="App">
        <button onClick={this.callApi}> Test Get </button>
        <p>{this.state.userName}</p>
      </div>
    );
  }

}

export default App;
