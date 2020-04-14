import React, { Component } from "react";
import classes from "./Auth.module.css";
import Button from "./../../components/UI/Button/Button";
import Input from "./../../components/UI/Input/Input";

class Auth extends Component {

loginHandler(){

}
registrHandler(){

}

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h2>form</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className={classes.AuthForm}
          >
           <Input 
           label="Email"/>
           <Input 
           label="Password"/>
            <Button type="primary" onClick={this.loginHandler}>
              Login
            </Button>
            <Button type="success" onClick={this.registrHandler}>
              Registr
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
