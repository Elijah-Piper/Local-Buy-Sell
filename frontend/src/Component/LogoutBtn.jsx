import React from 'react'
import { Button } from 'react-bootstrap'

const Logoutbtn = () => {

    const handleLogout = (event) => {
        localStorage.setItem('jwt', '');
    }

  return (
    <>
        <Button href="/" variant="primary" onClick={handleLogout}>Logout</Button>
    </>
  )
}

export default Logoutbtn;