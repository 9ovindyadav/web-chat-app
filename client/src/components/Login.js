import React, { useRef } from 'react'
import { Button, Container, Form } from "react-bootstrap"
import {v4 as uuidV4} from "uuid"


export const Login = ({ setId }) => {
  
    const idRef = useRef();

    function submitHandler(e) {
         e.preventDefault()
         setId(idRef.current.value)
    }

    function createNewId(){
        setId(uuidV4())
    }

    return (
     <Container className='align-items-center d-flex' style={{height:"100vh"}} >
    
        <Form onSubmit={submitHandler} className='w-100'>
            <Form.Group>
                <Form.Label>Enter your id</Form.Label>
                <Form.Control type='text' ref={idRef}></Form.Control>
            </Form.Group>
            <Button type='submit' className='m-2'>Login</Button>
            <Button onClick={createNewId} variant='secondary'>Create a new id</Button>
        </Form>
     </Container>
  )
}
