import React, { Component } from "react";
import FormAddEdit from "./FormAddEdit";
import addContact from "./add-contact.svg";

class ContactHeader extends Component {
  state = {
    isOpen: false
  };

  handelOpenAddForm = condition => {
    this.setState({ isOpen: condition });
  };
  render() {
    const {getContactList=()=>{}}=this.props
    return (
      <div className="contact-header-container">
        <div>
          <h2 className="header-title">Contact-List-App </h2>
          
          <button
            className="add-contact-button"
            onClick={() => this.handelOpenAddForm(true)}
          >
            <p className="click-here-message">Click here to add a new contact</p>
            
            <img
              className="add-contact-img"
              src={addContact}
              alt="Add contact"
            />
          </button>
        </div>
        <FormAddEdit
          handelOpenAddForm={this.handelOpenAddForm}
          isOpen={this.state.isOpen}
          getContactList={getContactList}
        />
        
      </div>
    );
  }
}
export default ContactHeader;
