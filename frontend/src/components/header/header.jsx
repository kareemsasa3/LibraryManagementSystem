//link to react-bootstrap documentation
//https://react-bootstrap.github.io/components/alerts/
import { React, Component } from "react";
import { Paper } from '@material-ui/core';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "John Snow",
            loggedIn: true
        }
    }

render() {
    return(
        <div>
            <Paper elevation={1}>
            <Navbar bg='light'>
                <Container>
                    <Navbar.Brand href="/">The SKKRT Library</Navbar.Brand>
                    <Nav>
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/books'>Books</Nav.Link>
                    </Nav>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        {
                            /* change this section as well when Java DB works */
                            this.state.loggedIn ?
                            <>
                                <NavDropdown title={this.state.user}>
                                    <NavDropdown.Item>Logout</NavDropdown.Item>
                                </NavDropdown>
                                <Navbar.Text>
                                    Signed in as: <a href="/logout">{this.state.user}</a>
                                </Navbar.Text>
                            </>
                            :
                            <>
                                <Nav.Link href='/signup'>Sign Up</Nav.Link>
                            </>
                        }


                    </Navbar.Collapse>
                </Container>
            </Navbar>
            </Paper>
        </div>
    )
    }
}
export default Header;