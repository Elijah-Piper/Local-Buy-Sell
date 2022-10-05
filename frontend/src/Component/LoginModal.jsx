import React, { useState, useEffect } from 'react'

import { Modal, Form, Button } from 'react-bootstrap';
import TokenService from '../Service/TokenService';

const LoginModal = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [jwt, setJwt] = useState("");

  const[validated, setValidated] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    console.log(`email: ${email}`);
    console.log(`password: ${password}`)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      TokenService.generate(email, password).then((Response) => {
        setJwt(Response.data);
        localStorage.setItem("jwt", Response.data);
        console.log("Response passed")
        console.log(`Status code: ${Response.status}`)
        console.log("Response:")
        console.log(Response)
      }).catch(e => {
        console.log("Error occurred in response");
        console.log(`status: ${e.response.status}`);
        console.log(`Password ${password}`)
      })
    }
    setValidated(true);
  }

  useEffect(() => {
    // console.log(`email: ${email}`);
    // console.log(`password: ${password}`)
  }, [jwt, validated])

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
            <Form.Group className="mb-3" controlId="formEmailOrPhone">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email adress" onChange={(e) => setEmail(e.target.value)} required />
              <Form.Text className="text-muted">
                We'll never share your information with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                Email and/or password are invalid
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">Login</Button>
          </Form>

        </Modal.Body>
      </Modal>
    </>
  )
}

export default LoginModal