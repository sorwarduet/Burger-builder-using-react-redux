import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavbarBrand, NavItem } from "reactstrap";
import Logo from "../../assets/logo.png";
import "./Header.css";

const mapStateToProps = state => {
  return {
    token: state.token,
  };
};

const Header=(props)=>{
  let links = null;

  if (props.token === null) {
    links = (
      <Nav className="ml-md-5">
        <NavItem>
          <NavLink to="/login" exact className="NavLink">
            Login
          </NavLink>
        </NavItem>
      </Nav>
    );
  } else {
    links = (
      <Nav className="ml-md-5">
        <NavItem>
          <NavLink to="/" exact className="NavLink">
            Burger Builder
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/orders" exact className="NavLink">
            Orders
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/logout" exact className="NavLink">
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
  return (
    <div className="Navigation">
      <Navbar
        style={{
          backgroundColor: "#D70F64",
          height: "70px",
        }}
      >
        <NavbarBrand className="mr-auto ml-md-5 Brand">
          <img src={Logo} alt="Logo" width="80px" />
        </NavbarBrand>

        {links}
      </Navbar>
    
    </div>
  );
}

export default connect(mapStateToProps)(Header);
