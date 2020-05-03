import React from 'react';
import './style.scss';

import axios from 'axios';

import { user_api } from '../../commons/api/endpoint';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      password: null,
      password_confirm: null,
      role: 'standard'
    }

    this.onChangeNamel = this.onChangeNamel.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.createNewAccount = this.createNewAccount.bind(this);
    this.updateAccount = this.updateAccount.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    const userId = this.props.match.params.id;

    const config = {
      headers: {
        Authorization: token,
      }
    }

    if (userId) {
      axios.get(`${user_api}/${userId}`, config).then((response) => {
        // window.location.reload();
        const user = response.data;
        this.setState({
          name: user.name,
          email: user.email,
          role: user.role
        })
      })
    }
  }

  onChangeNamel(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangePasswordConfirm(e) {
    this.setState({
      password_confirm: e.target.value
    })
  }

  onChangeRole(e) {
    this.setState({
      role: e.target.value
    })
  }

  createNewAccount() {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      }
    }

    axios.post(user_api, this.state, config).then(() => {
      alert('Create Account Successfully !');
    })
    this.props.history.push('/users');
  }

  updateAccount() {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      }
    }

    axios.put(`${user_api}/${this.props.match.params.id}`, {role: this.state.role}, config).then(() => {
      alert('Update Account Successfully !');
    })
    this.props.history.push('/users');
    window.location.reload();
  }

  render() {
    return (
      <div id="user-form" className="container-fluid text-center">
        <br />
        <div className="content">
          {
            !this.props.match.params.id ? <h3><strong>ADD NEW USER</strong></h3> : <h3><strong>EDIT USER</strong></h3>
          }
          <hr />
          <br />
          <form className="text-left">
            <div className="form-group">
              <label htmlFor="exampleFormControlInput0"><strong>Name</strong></label>
              <input type="text" onChange={this.onChangeNamel} className="form-control" value={this.state.name} disabled={this.props.match.params.id ? true : false} id="exampleFormControlInput0" placeholder="account name" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1"><strong>Email</strong></label>
              <input type="email" onChange={this.onChangeEmail} className="form-control" value={this.state.email} disabled={this.props.match.params.id ? true : false} id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            {
              !this.props.match.params.id ?
                <div>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput2"><strong>password</strong></label>
                    <input type="password" onChange={this.onChangePassword} className="form-control" id="exampleFormControlInput2" placeholder="password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput3"><strong>password confirmation</strong></label>
                    <input type="password" onChange={this.onChangePasswordConfirm} className="form-control" id="exampleFormControlInput3" placeholder="password confirmation" />
                  </div>
                </div>
                : null
            }

            <div className="form-group">
              <label htmlFor="exampleFormControlSelect4"><strong>Role</strong></label>
              <select className="form-control" id="exampleFormControlSelect4" onChange={this.onChangeRole} value={this.state.role}>
                <option value="standard">Select</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>
            <br />
            <br />
            <div className="text-center">
              {
                !this.props.match.params.id ? <button className="btn btn-info" onClick={this.createNewAccount}><strong>CREATE</strong></button> :

                  <button className="btn btn-warning" onClick={this.updateAccount}><strong>UPDATE</strong></button>
              }
              
              <span> </span><span> </span><button className="btn btn-secondary" onClick={() => this.props.history.push('/users')}><strong>CANCEL</strong></button>
            </div>
          </form>
        </div>

        <br />
      </div>
    );
  }
}

export default UserForm;
