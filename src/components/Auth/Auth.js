import { Formik } from "formik";
import React, { Component } from "react";
import { connect } from 'react-redux';
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { auth } from "../../redux/actionAuthCreator";
import Spinner from '../Spinner/Spinner';


const mapDispatchToProps=()=> dispatch =>{
    return{
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}

const mapStateToProps=state=>{
  return{
    authLoading: state.authLoading,
    authErrorMsg: state.authErrorMsg

  }
}

class Auth extends Component {
  state = {
    mode: "Sign Up",
  };

  handleSwitch = () => {
    this.setState({
      mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up",
    });
  };
  render() {
    let err=null;

    if(this.props.authErrorMsg!==null){
      err=<Alert color="danger">{this.props.authErrorMsg}</Alert>
    }

    let form=null;
    if(this.props.authLoading){
     form= <Spinner/>

    }else{
      form=(
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 ">
            <Formik
              initialValues={{
                email: "",
                password: "",
                passwordConfrim: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }

                if (!values.password) {
                  errors.password = "Required";
                } else if (values.password.length < 4) {
                  errors.password = "Must be 4 character password";
                }
                if(this.state.mode==="Sign Up"){
                    if (!values.passwordConfrim) {
                        errors.passwordConfrim = "Required";
                      } else if (values.passwordConfrim !== values.password) {
                        errors.passwordConfrim = "Password does not match";
                      }
                }

                

                return errors;
              }}
              
              onSubmit={(values) => {
               this.props.auth(values.email, values.password, this.state.mode);
              }}
            >
              {({ values, handleChange, handleSubmit, handleBlur, errors }) => (
                <div>
                  <h3 className="align-self-center">{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}</h3>
                  <Form
                    style={{
                      border: "1px solid grey",
                      boxShadow: "1px 1px #888888",
                      borderRadius: "5px",
                      padding: "30px",
                    }}
                    onSubmit={handleSubmit}
                  >
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        name="email"
                        placeholder="Enter the email"
                        type="text"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <span style={{ color: "red" }}>{errors.email}</span>
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <span style={{ color: "red" }}>{errors.password}</span>
                    </FormGroup>

                    {this.state.mode==="Sign Up"? <div><FormGroup>
                      <Label for="passwordConfrim">Password Confrim</Label>
                      <Input
                        id="paymentType"
                        name="passwordConfrim"
                        type="password"
                        value={values.passwordConfrim}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <span style={{ color: "red" }}>
                        {errors.passwordConfrim}
                      </span>
                    </FormGroup></div>: null}
                    <div className="d-flex justify-content-around">
                    <Button
                      className="mr-auto"
                      style={{
                        backgroundColor: "#D70F64",
                      }}
                      type="submit"
                    >
                      {this.state.mode === "Sign Up" ? "Sign Up" : "Login"}
                    </Button>

                    <Button
                      onClick={this.handleSwitch}
                    >
                      Switch to{" "}
                      {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}
                    </Button>
                    </div>

                   
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      )

    }
    return (
      <div>
        {err}
        {form}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Auth);
