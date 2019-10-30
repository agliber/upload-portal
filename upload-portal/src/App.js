import React from 'react';
import './App.css';
import Dropzone from 'react-dropzone-uploader';
import {
  Container,
  Col,
  Row,
  Jumbotron,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import headerImage from './media/BofAHeader.png';
import subHeaderImage from './media/BofASubHeader.png';
import footerImage from './media/BofAFooter.png';
import heroImage from './media/readingParent.jpg';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      userName:'',
      submittedFiles:[],
    };
  }

  componentDidMount(){
    this.getUser();
  }

  // getUser() is calls api getCurrentUserId.js function handler
  // sets state userName to be user name returned by box api
  getUser = () => {
    fetch('/.netlify/functions/getCurrentUserId').then(response =>{
      console.log(response);
      return response.text();
    }).then(body => {
      console.log(body);
      this.setState(Object.assign({},{userName:`${body}`}));
    })
  };

  // called every time a file's `status` changes
  handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

  // receives array of files that are done uploading when submit button is clicked
  handleSubmit = (files, allFiles) => {
    const file = files[0].file;
    // create a file reader object to read first file in 'files' array as a buffer
    var reader = new FileReader();
    // when reader loadend event is triggered upload array buffer to
    // api uploadFile.js function handler
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
      })
    }
    reader.readAsArrayBuffer(file);
    allFiles.forEach(f => f.remove());
    this.setState(Object.assign({},{submittedFiles:[...this.state.submittedFiles,file.name]}));

  }



  render(){
    const submittedItems = this.state.submittedFiles.map((fileName,index) =>
      <ListGroupItem key={fileName+index}> {fileName} </ListGroupItem>
    );
    if(submittedItems.length > 0){
      submittedItems.unshift(<ListGroupItem className="text-success">Submitted Files</ListGroupItem>);
    }
    return (

      <div className="App">
        <header>
          <img src={headerImage} alt="Logo" />
        </header>
        <div className="sticky-top" style={{backgroundColor:'#E9090B'}}>
        </div>
        <Container fluid>
          <Row>
            <Col style={{padding:0}}>
              <Jumbotron fluid >
                <h1 class="text-light">Welcome {this.state.userName}</h1>
                <h2 class="text-light">
                It's now easier and faster to submit your loan application
                </h2>
                <h2 class="text-light">
                Just upload your application below
                </h2>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col xs={{size:4,offset:2}}>
            <Card style={{padding:5,backgroundColor:'grey'}}>
              <CardHeader>
                <CardTitle style={{color:'white'}}> Steps to completing your application </CardTitle>
              </CardHeader>
              <object
              data="https://www.bankofamerica.com/content/documents/mortgage/application_checklist.pdf"
              type="application/pdf"
              width="100%"
              height="560px"
              >
                 <embed
                 src="https://www.bankofamerica.com/content/documents/mortgage/application_checklist.pdf"
                 type="application/pdf"
                 />
              </object>
            </Card>
            </Col>
            <Col xs={{size:4}}>
              <Card style={{padding:5,backgroundColor:'grey'}}>
                <CardHeader>
                  <CardTitle style={{color:'white'}}> Uniform Residention Loan Application </CardTitle>
                </CardHeader>
                <object
                data="https://promo.bankofamerica.com/mortgage_assumptions/files/application_package.pdf"
                type="application/pdf"
                width="100%"
                height="560px"
                >
                   <embed
                   src="https://promo.bankofamerica.com/mortgage_assumptions/files/application_package.pdf"
                   type="application/pdf"
                   />
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
            <ListGroup style={{margin:20}}>
              {submittedItems}
            </ListGroup>
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
