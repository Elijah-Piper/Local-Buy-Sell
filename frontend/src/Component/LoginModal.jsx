import React, { useState, useEffect, useRef } from 'react'

import { Modal, Form, Button, Alert, FloatingLabel, Spinner } from 'react-bootstrap';
import TokenService from '../Service/TokenService';

const LoginModal = () => {

  const [attemptingLogin, setAttemptingLogin] = useState(false);

  const formRef = useRef();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validateForm = () => {

    let valid = true;
    
    if (emailError) setEmailError("");
    if (passwordError) setPasswordError("");
    if (loginError) setLoginError("");
    
    if (!email) {
      setEmailError("Email address is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email address invalid");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }

    return valid;
  }

  const handleSubmit = (event) => {

    event.preventDefault();
    event.stopPropagation();

    setAttemptingLogin(false);

    let formIsValidated = validateForm();

    if (!formIsValidated) {

      setAttemptingLogin(false);
      console.log("form not validated")


    } else if (formIsValidated) {
      console.log("form validated")
      console.log(`Value of formIsValidated: ${formIsValidated}`)

      TokenService.generate(email, password).then((Response) => {

        localStorage.setItem("jwt", Response.data);
        console.log(`JWT: ${localStorage.getItem("jwt")}`);
        setIsLoggedIn(true);
        setAttemptingLogin(false);

      }).catch(e => {

        if (e.response.status === 401) { // Authorization error
          setLoginError("Email address and/or password are incorrect")

        }

        setAttemptingLogin(false);

      });
    }
  }

  useEffect(() => {

    if (isLoggedIn) {
      formRef.current.submit();
    }

  }, [isLoggedIn, attemptingLogin, loginError, emailError, passwordError])

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

          <Form ref={ formRef } noValidate onSubmit={ handleSubmit }>
            <Form.Group className="mb-3" controlId="formEmailOrPhone">
              <FloatingLabel controlId="floatingInput" label="Email Address" className="mb-3">
                <Form.Control 
                type="email" 
                placeholder="Enter email adress" 
                onChange={(e) => setEmail(e.target.value)} 
                required
                isInvalid={ emailError || loginError ? true : false }
                />
              </FloatingLabel>
              { emailError ? (
              <Alert variant="warning">{ emailError }</Alert>
            ) : (
              <></>
            )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <FloatingLabel controlId="floatingInput" label="Password" className="mb-3">
                <Form.Control 
                type={ showPass ? "text" : "password" } 
                placeholder="Password" onChange={(e) => setPassword(e.target.value)} 
                required
                isInvalid={passwordError || loginError ? true : false}
                />
              </FloatingLabel>
              { passwordError ? (
                <Alert variant="warning">{ passwordError }</Alert>
              ) : (
                <></>
              )}
              <Form.Check  
              label="Show Password" 
              type="switch" onChange={ (e) => setShowPass(e.target.checked) } />
            </Form.Group>
            { loginError ? (
              <Alert variant="warning">{ loginError }</Alert>
            ) : (
              <></>
            )}
            <Button variant="primary" type="submit">Login { attemptingLogin ? <Spinner size="sm" animation="border" /> : <></> }</Button>
          </Form>

        </Modal.Body>
      </Modal>
    </>
  )
}

export default LoginModal