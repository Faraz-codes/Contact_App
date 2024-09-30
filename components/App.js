import React , {useState , useEffect} from "react";
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';

function App() {

  const LOCAL_STORAGE_KEY = "contacts";

  // yaha pe hum usestate(react hook use karke apni functionality generate karenge)
  const [contacts , setContacts] = useState([]);
  // this is used taaki hum immutability handle karle 
  // and current array of contact ko disturb kiye 
  //bina hi new entry ko laa sake 
  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts , {id: uuidv4() , ...contact}]);
  };

  // to remove a certain contact

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) =>{
      return contact.id !== id;
    });

    setContacts(newContactList);
  }

  // to retrieve the contacts upon reload :
  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retriveContacts) setContacts(retriveContacts); 
  } , []);

  // this react hook is used taaki hum local storage me data hold kare
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }
  } , [contacts]);

  return (
    <div className="container">
      <Header />
      <AddContact addContactHandler = {addContactHandler} />
      <ContactList  contacts = {contacts} getContactId = {removeContactHandler}/>
    </div>
  );
}

export default App;
