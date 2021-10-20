//link to react-bootstrap documentation
//https://react-bootstrap.github.io/components/alerts/

import { Paper } from '@material-ui/core';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Header() {
    //replace the following line with correct access to Java DB
    let user = JSON.parse(localStorage.getItem('user-info'))
    console.log(user)

    const history = useHistory();
    //this function should change as well for Java DB
    function logOut()
    {
        localStorage.clear();
    }

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
                            localStorage.getItem('user-info') ?
                            <>
                                <NavDropdown title={user && user.name}>
                                    <NavDropdown.Item>Logout</NavDropdown.Item>
                                </NavDropdown>
                                <Navbar.Text>
                                    Signed in as: <a href="/logout">Mark Otto</a>
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
export default Header;