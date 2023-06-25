import React from 'react';
import './App.css';
import { Login } from './components/Login';
import  LocalStorage  from './hooks/LocalStorage';
import { Dashboard } from './components/Dashboard';
import { ContactsProvider } from './contexts/ContactsProvider';
import { ConversationProvider } from './contexts/ConversationProvider';

function App() {

  const [id, setId] = LocalStorage({key:'id',initialValue:''})

const dashboard = (
  <ContactsProvider>
    <ConversationProvider id={id}>
      <Dashboard id={id}/>
    </ConversationProvider>
  </ContactsProvider>
)
  return (
    <>
    {
       id ? dashboard : <Login setId={setId}/>
    }
    </>
  );
}

export default App;
