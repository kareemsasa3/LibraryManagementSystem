import React from 'react';
import { Form, Button } from "react-bootstrap";

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            password: '',
            email: ''
         }
    }

    signUp = () => {
        let newUser = [this.state.name, this.state.password, this.state.email]
        console.warn(newUser)
    }

    render() { 
        return <div>
                    <Form>
                        <Form.Group className="mb-3" controlId="signUpName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={this.state.name} onChange={(e)=>this.setState({name: e.target.value})} type="name" placeholder="Name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="signUpEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={this.state.email} onChange={(e)=>this.setState({email: e.target.value})} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="signUpPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={this.state.password} onChange={(e)=>this.setState({password: e.target.value})} type="password" placeholder="Password" />
                        </Form.Group>

                        <Button onClick={this.signUp} variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </Form>
        </div>;
    }
}
 
export default Signup;