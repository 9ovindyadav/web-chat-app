import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversation } from '../contexts/ConversationProvider'

export const NewConversationModal = ({closeModal}) => {

    const [selectedContactsId, setSelectedContactsId] = useState([])
    const {contacts} = useContacts()
    const {createConversation} = useConversation()
    function submitHandler(e){
        e.preventDefault()
        createConversation(selectedContactsId)
        closeModal()
    }

    function handleCheckBoxChange(contactId){

          setSelectedContactsId((prevSelCont) => {
            if(prevSelCont.includes(contactId)){
                return prevSelCont.filter((prevId) => {
                    return contactId !== prevId
                })
            }else{
                return [...prevSelCont, contactId]
            }
          })
    }

  return (
        <>
    <Modal.Header closeButton>
        Create Contact
    </Modal.Header>
    <Modal.Body>
        <Form onSubmit={submitHandler}>
           {
            contacts.map(contact => (
            <Form.Group controlId={contact.id} key={contact.id}>
            <Form.Check 
            type='checkbox'
            value={selectedContactsId.includes(contact.id)}
            label={contact.name}
            onChange={() => handleCheckBoxChange(contact.id)}
            />
           </Form.Group>
            ))
           }

           <Button type='submit' className='mt-2'>Create</Button>
        </Form>
    </Modal.Body>
    </>
  )
}
