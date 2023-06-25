import React, { useState } from 'react'
import {Tab, Nav, Button, Modal} from "react-bootstrap"
import { Conversations } from './Conversations'
import { Contacts } from './Contacts'
import { NewConversationModal } from './NewConversationModal'
import { NewContactModal } from './NewContactModal'

const CONVERSATION_KEY = 'conversations'
const CONTACT_KEY = 'contacts'

export const Sidebar = ({id}) => {

    const [activeKey, setActiveKey] = useState(CONVERSATION_KEY)
    const conversationOpen = activeKey === CONVERSATION_KEY
    const [openModal, setOpenModal] = useState(false)

    function closeModal(){
        setOpenModal(false)
    }
  return (
    <div style={{width:'250px'}} className='d-flex flex-column'>
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
          <Nav variant='tabs' className='justify-content-center'>
            <Nav.Item>
                <Nav.Link eventKey={CONVERSATION_KEY}>Conversations</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey={CONTACT_KEY}>Contacts</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content className='border overflow-auto flex-grow-1'>
            <Tab.Pane eventKey={CONVERSATION_KEY}>
                <Conversations/>
            </Tab.Pane>
            <Tab.Pane eventKey={CONTACT_KEY}>
                <Contacts/>
            </Tab.Pane>
          </Tab.Content>
            <div className='p-2 border small'>
                Your Id : <span className='text-muted'>{id}</span>
            </div>
            <Button onClick={() => setOpenModal(true)} className='rounded-0'>
                New {conversationOpen ? 'Conversation' : 'Contact'}
            </Button>
        </Tab.Container>

        <Modal show={openModal} onHide={closeModal}>
            {
                conversationOpen ? <NewConversationModal closeModal={closeModal}/> : 
                                   <NewContactModal closeModal={closeModal}/>
            }
        </Modal>
    
    </div>
  )
}
