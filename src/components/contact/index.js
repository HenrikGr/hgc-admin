/**
 * Description
 *
 * The Header component renders the application header that will contain
 * - home button that will route to either / or /dashboard
 * - menu button or login button depending on if user is authenticated or not.
 *
 * The login button will route the user to the login page.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @link:
 * @copyright:  Copyright (c) 2017 HGC AB
 *
 * @license: The MIT License (MIT)
 * @link: https://opensource.org/licenses/MIT
 */

// React & Router
import React, {Component} from 'react';

class ContactList extends Component {

  componentDidMount() {
    this.props.getContacts();
  }

  render() {

    return(
      <ul>
        {this.props.contacts ? this.props.contacts.map((contact, index) => (
          <li
            key={index}
          >
            {contact.company}
          </li>
        )) : null}
      </ul>

    );
  }
}

export default ContactList;
