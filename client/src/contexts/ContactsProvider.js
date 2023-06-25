import React, { useContext } from 'react'
import LocalStorage from '../hooks/LocalStorage'

const ContactsContext = React.createContext()

export function useContacts(){

  return useContext(ContactsContext)
}

export const ContactsProvider = ({children}) => {

  const [contacts, setContacts] = LocalStorage({key:'contacts',initialValue:[]})

  function createContact(id, name){
       setContacts((prevContacts) => {
          return [...prevContacts, {id, name}]
       })
  }

  return (
    <ContactsContext.Provider value={{contacts, createContact}}>
     {children}
    </ContactsContext.Provider>
  )
}
