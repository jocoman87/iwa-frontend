import React from 'react';
import './styles.scss';

import {Link} from 'react-router-dom';

import axios from 'axios';
import { user_api } from '../../commons/api/endpoint';

class Users extends React.Component {
  constructor() {
    super();

    this.state = {
      user_data: [],
      addNew: false
    }

    this.deleteUser = this.deleteUser.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: token,
      }
    }

    axios.get(user_api, config).then((response) => {
      this.setState({
        user_data: response.data
      })
    })
  }

  deleteUser(item) {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: token,
      }
    }

    if(window.confirm(`Account - ${item.name} - will be delete forever and can not recover ? !`)) {
      axios.delete(`${user_api}/${item.id}` , config).then(() => {
        window.location.reload();
      })
    }    
  }

  editUser(item) {
    this.setState({ 
      addNew: true,
      user: {
        name: item.name,
        email: item.email,
        role: item.role
      }
    })
  }

  render() {
    const { user_data } = this.state;
    if (user_data.length === 0) {
      return <div> No data !</div>;
    } else {
      return (
        <div id="user-page" className="text-center">
          <div className="container">
            <div className="btn-action text-left">
              <Link to={'/new-user'}>
                <button className="cuzbtn btn-outline-primary">Add new user</button>
              </Link>
            </div>
            <br />
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  user_data.map((item, i) => {
                    return (
                      <tr key={i.toString()}>
                        <td><strong>#{item.id}</strong></td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>
                          <Link to={'/edit-user/' + item.id}><button className="btn-edit">Edit</button></Link>
                          <button className="btn-delete" onClick={() => this.deleteUser(item)}>Delete</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}


export default Users;
