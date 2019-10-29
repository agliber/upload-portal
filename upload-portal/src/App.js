import React from 'react';
import './App.css';
import Dropzone from 'react-dropzone-uploader';
import {
  Container,
  Col,
  Row,
  Button,
  Card,
} from 'reactstrap';
import headerImage from './media/BofAHeader.png';
import subHeaderImage from './media/BofASubHeader.png';
import footerImage from './media/BofAFooter.png';

class App extends React.Component{

  // Get your own user object from the Box API
  // All client methods return a promise that resolves to the results of the API call,
  // or rejects when an error occurs
  constructor(props){
    super(props);
    this.state={
      userName:'',
      fileToUpload:null,
      numPages: null,
      pageNumber: 1,
    };
  }
  onDocumentLoadSuccess = ({ numberPages }) => {
    this.setState(Object.assign({},this.state,{numPages:numberPages }));
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

  // onDropFile = (file) =>{
  //   this.setState(Object.assign({},this.state,{fileToUpload:file}));
  // }

  // onSubmit = (files) => {
  //   var reader = new FileReader();
  //   reader.onloadend = event => {
  //     fetch('/.netlify/functions/uploadFile',{
  //       method: 'POST',
  //       headers: {
  //         'content-type' : 'application/octet-stream',
  //       },
  //       body: event.target.result,
  //     }).then(response =>{
  //       console.log(response);
  //       return response.text();
  //     }).then(body => {
  //       console.log(body);
  //       // this.setState(Object.assign({},{userName:`${body}`}));
  //     })
  //   }
  //   reader.readAsArrayBuffer(file);
  // };

  // called every time a file's `status` changes
  handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

  // receives array of files that are done uploading when submit button is clicked
  handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
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
    reader.readAsArrayBuffer(files[0].file);
  }

  render(){

    return (
      <div className="App">

        <header>
          <img src={headerImage} alt="Logo" />
        </header>
        <div className="sticky-top" style={{backgroundColor:'#f20004'}}>

            <img src={subHeaderImage} alt="Logo" />
        </div>
        <Container fluid>
          <Row>
            <Col>
              <Button onClick={this.getUser}> Test Get </Button>
              <p>{this.state.userName}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={{size:4,offset:2}}>
            <Card>
            <object data="https://www.bankofamerica.com/content/documents/mortgage/application_checklist.pdf" type="application/pdf" width="100%" height="560px">
               <embed src="https://www.bankofamerica.com/content/documents/mortgage/application_checklist.pdf" type="application/pdf"  />
            </object>
            </Card>

            </Col>
            <Col xs={{size:4}}>
              <Card>
              <object data="https://promo.bankofamerica.com/mortgage_assumptions/files/application_package.pdf" type="application/pdf" width="100%" height="560px">
                 <embed src="https://promo.bankofamerica.com/mortgage_assumptions/files/application_package.pdf" type="application/pdf"  />
              </object>
              </Card>
            </Col>

          </Row>
          <Row style={{margin:30}}>
            <Col xs={{size:8,offset:2}}>
            <Dropzone
              onChangeStatus={this.handleChangeStatus}
              onSubmit={this.handleSubmit}
              accept=".pdf"
            />
            </Col>
          </Row>
          <Row style={{backgroundColor:'#0e126b'}}>
            <Col>
              <img src={footerImage} alt="Logo" />
            </Col>
          </Row>
        </Container>


      </div>
    );
  }

}

export default App;
