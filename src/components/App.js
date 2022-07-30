import './App.css';
import React, {useState,useEffect} from "react";
import uuid from 'react-native-uuid';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactCard from './ContactCard';


function App() {
  const LOCAL_STORAGE_KEY ="contacts";
  const [contacts,setContacts] = useState([]);
  const addContactHandler=(contact) => {
    console.log(contact);
    
    setContacts([...contacts,{id:uuid.v4(),...contact}]);
    };
    const removeContactHandler = (id) => {
      const newContactList = contacts.filter((contact)=>{
        return contact.id!==id;
      });
      setContacts(newContactList);
    }

    useEffect(()=>{
        localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
    },[contacts]);
    useEffect(()=>{
      const retriveContacts =JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ;
     if(retriveContacts) setContacts(retriveContacts);
  },[]);
  
  return (
    <div className='ui container'>
      <Header/>
      <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} getContactId={removeContactHandler} />
    </div>
  );
}

export default App;
