import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Form, Alert } from 'react-bootstrap';

import { loginUser } from "../../Actions";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            hasError: true,
            errorMsg: null,
        }
    }

    handleChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    }

    handleSubmit = () => {
        const { dispatch } = this.props;
        const { email, password } = this.state;
        dispatch(loginUser(email, password));
    }

    render() {

        const { isAuthenticated, errorMsg } = this.props; 

        if (isAuthenticated) {
            return <Redirect to="/cart" />;
        }
        else {
            return (
                <div className="login">
                    <h4>LOGIN</h4>
                    {errorMsg ? <Alert variant={'danger'}>{errorMsg}</Alert> : null}
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={this.state.email} onChange={this.handleChangeEmail} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={this.state.password} onChange={this.handleChangePassword} type="password" placeholder="Password" />
                        </Form.Group>                        

                        <Form.Group>
                            <Button variant="primary" type="button" onClick={this.handleSubmit}>Login</Button>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Not Registered yet.Go to <a href="/register">registration</a></Form.Label>
                        </Form.Group>

                    </Form>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated,
        errorMsg: state.auth.errorMsg,
        cart: state.product.cart,
    };
}
export default connect(mapStateToProps)(Login);