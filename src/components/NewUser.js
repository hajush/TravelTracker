import React from 'react';
import { inject, observer } from 'mobx-react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import { Grid, Col, Row, Image, Well, Form, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';

class NewUser extends React.Component {

  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      email: "",
      admin: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  handleNewUser(event) {
    event.preventDefault();
    this.NewUser(this.state);
    this.setState({name: "", password: "", email: ""});
  }

  NewUser(usr) {
    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: usr.name,
        password: usr.password,
        email: usr.email,
        admin: usr.admin
      })
    })
    .then(function(){
      browserHistory.push('/Welcome');
    });
  }

  render() {
    const bg = require('../img/frontBackground-min.jpg');
    const parentStyle = {height:"100vh", width:"100vw", background: "url("+bg+") no-repeat center fixed", backgroundSize: "cover"};
    const wellStyle = {position: "absolute", top: "0", bottom: "0", left: "0", right: "0", margin: "auto", opacity: ".95", fontFamily: "Josefin Sans", backgroundBlendMode: "overlay", height: "350px", width: "500px"};
    const logoStyle = {position: "absolute", top: "0px", left: "10px", zIndex: "100"};
    const loginLinkStyle = {float: "right"};

    return (
      <div>
        <div>
        <img className="hidden-xs" style={logoStyle} src={require('../img/canureadme.png')} width="150" height="150"/>
        </div>
        <div style={parentStyle}>
          <Well style={wellStyle} bsSize="large">
            <Form>
                <legend>Sign Up For Travel Tracker</legend>

                <FormGroup controlId="formInlineName">
                  <ControlLabel>Name</ControlLabel>
                  <FormControl onChange={this.handleNameChange} type="text" placeholder="username" />
                </FormGroup>

                <FormGroup controlId="formInlinePassword">
                  <ControlLabel>Password</ControlLabel>
                  <FormControl onChange={this.handlePasswordChange} type="password" placeholder="password" />
                </FormGroup>

                <FormGroup controlId="formInlineEmail">
                  <ControlLabel>Email</ControlLabel>
                  <FormControl onChange={this.handleEmailChange} type="text" placeholder="email" />
                </FormGroup>

                <div style={loginLinkStyle}>
                  <Link to ="/Welcome" >Login</Link>
                </div>
                <Button onClick={this.handleNewUser} type="submit" className="btn btn-primary">Submit</Button>
            </Form>
          </Well>
       </div>
       <style>
       @import url('https://fonts.googleapis.com/css?family=Josefin+Sans');
       </style>
      </div>
    );
  }
}

NewUser.propTypes = {
  children: React.PropTypes.object,
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(NewUser));
