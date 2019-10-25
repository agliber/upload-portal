import React from 'react';
import './App.css';
// import BoxSDK from 'box-node-sdk';

class App extends React.Component{

  // Get your own user object from the Box API
  // All client methods return a promise that resolves to the results of the API call,
  // or rejects when an error occurs

  callApi = async () => {
    const response = await fetch('/.netlify/functions/getCurrentUserId');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render(){
    return (
      <div className="App">
        <button onClick={this.callApi}> Test Get </button>
        <p>{}</p>
      </div>
    );
  }

}

export default App;
