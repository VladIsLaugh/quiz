import React, { Component } from "react";
import classes from "./Auth.module.css";
import Button from "./../../components/UI/Button/Button";
import Input from "./../../components/UI/Input/Input";
import is from "is_js"

class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        label: "Email",
        errorMessage: "Email is not valid",
        type: "email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        label: "password",
        errorMessage: "password is not valid",
        type: "password",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };
  validateControl(value, validation) {
    if (!validation) return true;
    let isValid = true;
    if (validation.required) {
        isValid = value.trim()!=='' && isValid
    }
    if (validation.email) {
      isValid = is.email(value) && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;
    let isFormValid = true

    Object.keys(formControls).forEach((name)=>{
      isFormValid = formControls[name].valid && isFormValid

    })
    this.setState({
      formControls,
      isFormValid
    });
  };

  loginHandler = () => {
    console.log();
  };
  registrHandler() {}
  getInputs = () => {
    return Object.keys(this.state.formControls).map((item, index) => {
      const control = this.state.formControls[item];
      return (
        <Input
          key={index}
          value={control.value}
          label={control.label}
          errorMessage={control.errorMessage}
          type={control.type}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          onChange={(event) => {
            this.onChangeHandler(event, item);
          }}
        />
      );
    });
  };

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
            {this.getInputs()}

            <Button type="primary" onClick={this.loginHandler} disabled={!this.state.isFormValid}>
              Login
            </Button>
            <Button type="success" onClick={this.registrHandler} disabled={!this.state.isFormValid}>
              Registr
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
