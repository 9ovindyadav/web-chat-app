import React from 'react';
import './App.css';
import { Login } from './components/Login';
import  LocalStorage  from './hooks/LocalStorage';
import { Dashboard } from './components/Dashboard';
import { ContactsProvider } from './contexts/ContactsProvider';
import { ConversationProvider } from './contexts/ConversationProvider';
import { SocketProvider } from './contexts/SocketProvider';

function App() {

  const [id, setId] = LocalStorage({key:'id',initialValue:''})

const dashboard = (
       <SocketProvider id={id}>
          <ContactsProvider>
            <ConversationProvider id={id}>
              <Dashboard id={id}/>
            </ConversationProvider>
          </ContactsProvider>
       </SocketProvider>
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
