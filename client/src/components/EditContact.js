import React, { Component } from "react";
import FormAddEdit from "./FormAddEdit";
import ContactCard from "./ContactCard";

class EditContact extends Component {
  render() {
    const {contact , getContactList=()=>{} }= this.props
    return (
      <div className="edit-card">
      
        <ContactCard
          contact={contact}
          getContactList={getContactList}
          isEdited={true}
        />
        <FormAddEdit
        
          contact={contact}
          isEdited={true}
          getContactList={getContactList}
        />
      </div>
    );
  }
}

export default EditContact;
