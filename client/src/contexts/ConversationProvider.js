import React, { useContext, useState } from 'react'
import LocalStorage from '../hooks/LocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationContext = React.createContext()

export function useConversation(){

  return useContext(ConversationContext)
}

export const ConversationProvider = ({id, children}) => {

  const [conversations, setConversations] = LocalStorage({key:'conversation',initialValue:[]})
  const { contacts } = useContacts()
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)

  function createConversation(recepients){
       setConversations((prevConversations) => {
          return [...prevConversations, {recepients, messages:[]}]
       })
  }

  function addMessageToConversation({recepients, text, sender}){
         setConversations((prevConversations) => {
            let madeChange = false
            const newMessage = {sender, text}

            const newConversations = prevConversations.map((conversation) => {
                if(arrayEquality(conversation.recepients, recepients)){
                    madeChange = true
                    return {...conversation, messages:[...conversation.messages, newMessage]}
                }

                return conversation
            })

            if(madeChange){
                return newConversations
            }else{
                return [...prevConversations, {recepients, messages:[newMessage]}]
            }
         })
  }

  function sendMessage(recepients, text){
    addMessageToConversation({recepients, text, sender: id})
  }

  const formatedConversation = conversations.map((conversation, index) => {
       const recepients = conversation.recepients.map((recepient) => {
             const contact = contacts.find((contact) => {
                return contact.id === recepient
             })

             const name = (contact && contact.name) || recepient
             return {id: recepient, name}
       })

       const messages = conversation.messages.map((message) => {
            const contact = contacts.find((contact) => {
                return contact.id === message
             })

             const name = (contact && contact.name) || message
             const fromMe = id === message.sender
             return {...message, senderName: name, fromMe}
       })

       const selected = index === selectedConversationIndex
       return {...conversation,messages, recepients, selected}
  })

  const value = {
    conversations : formatedConversation,
    createConversation,
    selectConversationIndex : setSelectedConversationIndex,
    selectedConversation : formatedConversation[selectedConversationIndex],
    sendMessage
  }
  return (
    <ConversationContext.Provider value={value}>
     {children}
    </ConversationContext.Provider>
  )
}


function arrayEquality(a,b){
    if(a.length !== b.length) return false

    a.sort()
    b.sort()

    return a.every((element, index) => {
        return element === b[index]
    })
}
