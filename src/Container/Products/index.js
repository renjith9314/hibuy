import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import { AddProduct } from "../../Actions";

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            productName: '',
            productImage: '',
            productDesc: '',
            errorMsg: ''
        }
    }

    handleChangeProductName = (event) => {
        this.setState({
            productName: event.target.value
        });
    }

    handleChangeProductImage = (event) => {
        this.setState({
            productImage: event.target.value,
        });
    }

    handleChangeProductDesc = (event) => {
        this.setState({
            productDesc: event.target.value,
        });
    }

    handleSubmit = () => {
        if (this.state.productName === "") {
            this.setState({
                errorMsg: 'Please Enter Prodcut Name',
            });
        }
        else {
            const { dispatch } = this.props;
            const { productName, productImage, productDesc } = this.state;
            dispatch(AddProduct(productName, productImage, productDesc));
            this.setState({
                productName: '',
                productImage: '',
                productDesc: '',
                errorMsg: '',
            });
        }

    }

    modalOpen = () => {
        this.setState({
            showModal: true
        });
    };

    modalClose = () => {
        this.setState({
            showModal: false,
        });
    };

    render() {
        const { isAuthenticated, message } = this.props;

        if (isAuthenticated) {
            return (
                <div>
                    <section className="main-content">
                        <h5><span>Product List</span> <span>
                            <Button variant="primary" onClick={this.modalOpen}>
                                Add Product
                            </Button>
                        </span></h5>
                    </section>
                    <Modal show={this.state.showModal} onHide={this.modalClose} size="md">
                        <Modal.Header closeButton>
                            <Modal.Title>Add Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {message ? <Alert variant={'success'}>{message}</Alert> : null}
                            <Form>
                                <Form.Group controlId="ProductName">
                                    <Form.Label>Prodcut Name</Form.Label>
                                    <Form.Control value={this.state.productName} onChange={this.handleChangeProductName} type="text" />
                                    {this.state.errorMsg ? <Form.Label className="error-message">{this.state.errorMsg}</Form.Label> : null}
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Prodcut Image URL</Form.Label>
                                    <Form.Control value={this.state.productImage} onChange={this.handleChangeProductImage} type="text" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Prodcut Description</Form.Label>
                                    <Form.Control value={this.state.productDesc} onChange={this.handleChangeProductDesc} as="textarea" rows="3" />
                                </Form.Group>

                                <Form.Group className="text-center">
                                    <Button variant="primary" className="mr-3" type="button" onClick={this.handleSubmit}>Save</Button>
                                    <Button variant="primary" type="button" onClick={this.modalClose}>Cancel</Button>
                                </Form.Group>
                            </Form>

                        </Modal.Body>
                    </Modal>
                </div>
            );
        }
        else {
            return <Redirect to="/login" />;
        }
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        message: state.product.message,
    };
}
export default connect(mapStateToProps)(Product);