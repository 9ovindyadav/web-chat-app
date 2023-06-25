import React, { useCallback, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useConversation } from '../contexts/ConversationProvider'

export const OpenConversation = () => {

    const [text, setText] = useState('')
    const {sendMessage, selectedConversation} = useConversation()
    
    const lastMessageRef = useCallback(node => {
        if(node){
           node.scrollIntoView({smooth: true})
        }

    },[])

    function submitHandler(e){
         e.preventDefault()

         sendMessage(selectedConversation.recepients.map(r => r.id),text)
         setText('')
    }

  return (
    <div className='d-flex flex-column flex-grow-1'>
        OpenConversation
        <div className='flex-grow-1 overflow-y-auto' >
            <div className='h-100 d-flex flex-column align-items-start jusYtify-content-end px-3'>
                {
                    selectedConversation.messages.map((message, index) => {

                        const lastMessage = selectedConversation.messages.length - 1 === index

                        return (
                            <div 
                            ref={lastMessage ? lastMessageRef : null}
                            className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end' : ''}`}
                             key={index}
                        >
                          <div className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white ' : 'border'}`}>
                            {message.text}
                          </div>
                          <div className={`text-muted small ${message.fromMe ? 'text-right' : 'text-left'}`}>
                            {message.fromMe ? 'You' : message.senderName }
                          </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
        <Form onSubmit={submitHandler}>
            <Form.Group className='m-2'>
                <InputGroup>
                   <Form.Control
                   as='textarea'
                   required
                   value={text}
                   onChange={(e) => setText(e.target.value)}
                   style={{height:'75px', resize:'none'}}
                   />
        
                    <Button type='submit'>Send</Button>
                </InputGroup>
            </Form.Group>
        </Form>
    </div>
  )
}
