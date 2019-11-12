import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Alert } from 'react-bootstrap';
import { registerUser } from "../../Actions";

class Register extends Component {
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
        dispatch(registerUser(email, password));
    }

    render() {

        const { errorMsg, signUpCompleted } = this.props;
        let error = (signUpCompleted) ? 'success' : "danger";

        return (
            <div className="login">
                <h4>REGISTER</h4>
                {errorMsg ? <Alert variant={error}>{errorMsg}</Alert> : null}
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
                        <Button variant="primary" type="button" onClick={this.handleSubmit}>Register</Button>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Already registered.Go to <a href="/login">Login</a></Form.Label>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        signUpCompleted: state.auth.isSignUpCompleted,
        errorMsg: state.auth.errorMsg
    };
}
export default connect(mapStateToProps)(Register);