import React from "react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../Actions";
import { connect } from "react-redux";

const Header = (props) => {
    const { isAuthenticated } = props;

    const handleLogout = () => {
        const { dispatch } = props;
        dispatch(logoutUser());
    }

    return (
        <header id="header">
            <a className="logo" href="index.html">Hi Buy...</a>
            <nav>
                <NavLink to="/" activeClassName="active" exact>Home</NavLink>
                <NavLink to="/product" activeClassName="active" exact>Product</NavLink>
                <NavLink to="/" activeClassName="active" exact>About</NavLink>
                <NavLink to="/" activeClassName="active" exact>Contact</NavLink>
                {(isAuthenticated)
                    ? <NavLink to="" onClick={handleLogout}>Logout</NavLink>
                    : <NavLink to="/login">Login</NavLink>
                }
            </nav>
        </header>
    );
};



function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
}
export default connect(mapStateToProps)(Header);