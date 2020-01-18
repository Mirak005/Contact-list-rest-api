import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

//the component wil addapt with the context if is it in the edit context or a add context
// depending of the value of isEdited passed as props in each case ture or false

class FormAddEdit extends Component {
  state = {
    name: "",
    lastName: "",
    phoneNumber: "",
    email: ""
  };

  
  //if is edited true , the component will get the contact informations to update in the form
  componentDidMount = () =>
    this.props.isEdited ? this.setState({ ...this.props.contact }) : null;


    //form validation handel the missing informations or the invalid email adress
    formValidation = () => {
      return Object.values(this.state).indexOf("") !== -1
        ? "There is a missing information(s)"
        : !this.state.email.includes("@")
        ? "Enter a valid email adress"
        : "There is a missing information(s)";
    };

  //if is edited false
  handelSubmit = e => {
    e.preventDefault();

    if (
      Object.values(this.state).indexOf("") === -1 &&
      this.state.email.includes("@")
    ) {
      axios
        .post("/add_Contact", {
          name: this.state.name,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          email: this.state.email
        })
        .then(
          this.props.getContactList(),
          this.props.handelOpenAddForm(false),
          this.setState({
            name: "",
            lastName: "",
            phoneNumber: "",
            email: ""
          })
        )
        .catch(err => alert("Cannot add a Contact"));
    } else {
      alert(this.formValidation());
    }
  };
  //if is edited true
  handelSumbmitEdit = e => {
    e.preventDefault();
    if (
      Object.values(this.state).indexOf("") === -1 &&
      this.state.email.includes("@")
    ) {
      axios
        .put(`/edit_contact/${this.props.contact._id}`, {
          name: this.state.name,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber * 1,
          email: this.state.email
        })
        .then(
          this.props.getContactList(),
          this.setState({
            name: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            isModified: true
          })
        )

        .catch(err => alert("Cannot add a Contact"));
    } else {
      alert(this.formValidation());
    }
  };

  //cancel button
  handelCancelForm = e => {
    e.preventDefault();
    this.props.handelOpenAddForm(false);
    this.setState({
      name: "",
      lastName: "",
      phoneNumber: "",
      email: ""
    });
  };
  // save the form values
  handelForm = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return this.state.isModified ? (
      <Redirect to="/" />
    ) : (
      <form
        // if isOpen is false( component in add context) or undifiend(means thaht the componet is in edit context) the className will change

        className={
          this.props.isOpen
            ? "add-contact-form"
            : this.props.isEdited
            ? "edit-contact-form"
            : "display-none"
        }
      >
        <h3 className="form-title">
          {this.props.isEdited ? "Edit Contact" : "Add Contact"}
        </h3>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          placeholder="ex:Jhon"
          onChange={this.handelForm}
        />
        <label>Last name</label>
        <input
          type="text"
          name="lastName"
          value={this.state.lastName}
          placeholder="ex:Doe"
          onChange={this.handelForm}
        />
        <label>Phone number</label>
        <input
          maxLength="13"
          name="phoneNumber"
          value={this.state.phoneNumber}
          placeholder="ex:+21699999999"
          onChange={e => {
            e.target.value = e.target.value.replace(/[^+0-9]/g, "");
            this.handelForm(e);
          }}
        />
        <label>E-mail</label>
        <input
          type="email"
          name="email"
          value={this.state.email}
          placeholder="ex:Jhon@gmail.com"
          onChange={this.handelForm}
        />
        <div className="btn-container">
          <button
            onClick={e =>
              this.props.isEdited
                ? this.handelSumbmitEdit(e)
                : this.handelSubmit(e)
            }
            className="edit-btn"
          >
            Confirm
          </button>
          {this.props.isEdited ? (
            <Link className="delete-btn" to="/">
              Cancel
            </Link>
          ) : (
            <button onClick={this.handelCancelForm} className="delete-btn">
              Cancel
            </button>
          )}
        </div>
      </form>
    );
  }
}

export default FormAddEdit;
