import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal, { modal } from 'react-ts-modal';
import ContactCard from './contact-card/contact-card';

import { Contact } from './types';
export function App() {
  const baseUrl = 'https://61c32f169cfb8f0017a3e9f4.mockapi.io';
  const [contacts, setContacts] = useState<Array<Contact>>();
  const [selectedContact, setSelectedContact] = useState<Contact>();

  const getContacts = async () => {
    const { data } = await axios.get(`${baseUrl}/api/v1/contacts`);
    setContacts(data);
  };

  const displayContactById = (id: string) => {
    const selected = contacts?.find((contact: Contact) => contact.id === id);

    setSelectedContact(selected);
    modal.show('contact-modal');
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <h1>Equals tech test</h1>
      <div className="container">
        {contacts
          ? contacts?.map((contact) => {
              const { id, name, avatar } = contact;
              return (
                <div
                  key={id}
                  className="card"
                  data-testid={id}
                  role="listitem"
                  onClick={() => displayContactById(id)}
                >
                  <h3>{name}</h3>
                  <img src={avatar} className="avatar" alt={name} />
                </div>
              );
            })
          : null}
      </div>

      <Modal name="contact-modal">
        {selectedContact ? <ContactCard {...selectedContact} /> : null}
      </Modal>
    </>
  );
}

export default App;
