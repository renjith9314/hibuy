import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Home from "../Container/Home";
import Cart from "../Container/Products";
import Login from "../Container/Login";
import Register from "../Container/Register"

const Main = (props) => {
    const { isAuthenticated } = props;
    console.log('Data : ', isAuthenticated);
    return (
        <div>
            {isAuthenticated
                ?
                <div className="App">
                    <Header />
                    <section className="main">
                        <Switch>
                            <Route path="/cart" component={Cart} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </section>
                    <Footer />
                </div>
                :
                <div className="col-md-12 text-center">
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            }
        </div>

    );
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps)(Main);