import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import ContactHeader from "./components/ContactHeader";
import ContactList from "./components/ContactList";
import EditContact from "./components/EditContact";
import "./App.css";

const data = [
  {
    name: "karim",
    lastName: "gharbi",
    phoneNumber: 54429894,
    email: "karim@gmail.com",
    _id: 0
  },
  {
    name: "hejer",
    lastName: "laouani",
    phoneNumber: 58540540,
    email: "hejer@gmail.com",
    _id: 1
  }
];

class App extends React.Component {
  state = {
    contactList: data
  };

  getContactList = () => {
    axios
      .get("/contact_list")
      .then(res => this.setState({ contactList: res.data }))
      .catch(err => {
        alert("Error cannot fetch data from the server!");
        console.error(err);
      });
  };

  componentDidMount = () => this.getContactList();

  render() {
    return (
      <div>
        <ContactHeader getContactList={this.getContactList} />
        <Route
          exact
          path="/"
          render={() => (
            <ContactList
              getContactList={this.getContactList}
              contactList={this.state.contactList}
            />
          )}
        />

        {this.state.contactList.map(contact => (
          <Route
            key={contact._id}
            path={`/${contact._id}`}
            render={() => (
              <EditContact
                getContactList={this.getContactList}
                contact={contact}
              />
            )}
          />
        ))}
      </div>
    );
  }
}

export default App;
