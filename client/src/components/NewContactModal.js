import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import {useContacts} from "../contexts/ContactsProvider"

export const NewContactModal = ({closeModal}) => {

    const idRef = useRef()
    const nameRef = useRef()
    const {createContact} = useContacts()

    function submitHandler(e){
        e.preventDefault()
        createContact(idRef.current.value, nameRef.current.value)
        closeModal()   
    }

  return (
    <>
    <Modal.Header closeButton>
        Create Contact
    </Modal.Header>
    <Modal.Body>
        <Form onSubmit={submitHandler}>
           <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type='text' ref={idRef} required/>
           </Form.Group>

           <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' ref={nameRef} required/>
           </Form.Group>

           <Button type='submit' className='mt-2'>Create</Button>
        </Form>
    </Modal.Body>
    </>
  )
}
