import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem, NavbarToggler, NavbarBrand, Collapse, NavLink } from "reactstrap";

export default class Navi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar color="dark" dark expand="md" fixed="top" className="mb-5">
        <NavbarBrand tag={Link} to="/posts">FistBlog</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav style={{marginLeft:"78%"}} navbar>
            <NavItem>
              <NavLink tag={Link} to="/posts">Ana sayfa</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/posts/newpost">Yeni Yazı</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
