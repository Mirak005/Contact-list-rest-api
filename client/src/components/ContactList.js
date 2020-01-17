import React from "react";
import ContactCard from "./ContactCard";

function ContactList({ contactList, getContactList = () => {} }) {
  return contactList.map(contact => (
    <ContactCard
      key={contact._id}
      getContactList={getContactList}
      contact={contact}
      isEdited={false}
    />
  ));
}

export default ContactList;
