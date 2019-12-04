import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../Actions";
import { connect } from "react-redux";
import { getUserDetails } from "../../Actions";

const Header = (props) => {

    useEffect(() => {
        const { dispatch } = props;
        dispatch(getUserDetails());
    }, []);

    const { isAuthenticated, userData } = props;

    const handleLogout = () => {
        const { dispatch } = props;
        dispatch(logoutUser());
    }
    console.log(userData)

    return (

        <header id="header">
            <a className="logo" href="index.html">Hi Buy...</a>
            <nav>
                {(userData.FirstName)
                    ? <span className="welcome">
                        Welcome {userData.FirstName} 
                        <img className="profile-pic" src={userData.Profileimage} alt="" />
                        </span>
                    : null
                }
                < NavLink to="/" activeClassName="active" exact>Home</NavLink>
                <NavLink to="/cart" activeClassName="active" exact>Cart</NavLink>
                <NavLink to="/" activeClassName="active" exact>About</NavLink>
                <NavLink to="/" activeClassName="active" exact>Contact</NavLink>
                {(isAuthenticated)
                    ? <NavLink to="" onClick={handleLogout}>Logout</NavLink>
                    : <NavLink to="/login">Login</NavLink>
                }
            </nav>
        </header >
    );
};



function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userData: state.auth.userData
    };
}
export default connect(mapStateToProps)(Header);