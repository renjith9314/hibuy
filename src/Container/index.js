import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Home from "../Container/Home";
import Products from "../Container/Products";
import Login from "../Container/Login";
import Register from "../Container/Register"

const Main = (props) => {
    return (
        <div className="App">
            <Header />
            <section className="main">
                <Switch>
                    <Route path="/product" component={Products} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/" component={Home} />
                </Switch>
            </section>
            <Footer />
        </div>
    );
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isVerifying: state.auth.isVerifying
    };
}

export default connect(mapStateToProps)(Main);