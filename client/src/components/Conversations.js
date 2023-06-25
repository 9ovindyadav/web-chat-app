import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversation } from '../contexts/ConversationProvider'

export const Conversations = () => {

  const { conversations, selectConversationIndex } = useConversation()

  return (
    <ListGroup variant='flush'>
        {
            conversations.map( (conversation, index) => (
                <ListGroup.Item 
                       key={index}
                       action
                       onClick={() => selectConversationIndex(index)}
                       active={conversation.selected}
                       >
                    {conversation.recepients.map(r => r.name).join(', ')}
                </ListGroup.Item>
            ))
        }
    </ListGroup>
  )
}
