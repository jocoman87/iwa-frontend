import React from 'react';
import './commons/styles/base.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import { login_url } from './commons/api/endpoint';

import Home from './pages/home/index';
import Users from './pages/users/index';
import Todos from './pages/tests/index';

import UserForm from './components/userForm/index';
import ExampleForm from './components/testForm/index';

import NotFound from './pages/pageNotFound/index';

class App extends React.Component {
  constructor(props) {
    super(props);

    const isLogin = localStorage.getItem('login');

    this.state = {
      login: isLogin,
      email: null,
      password: null
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  handleLogin() {
    // if(!this.state.email || !this.state.password) {
    //   alert(`Error: The field cannot be empty. Please enter a value !`)
    //   return
    // }

    axios.post(login_url, {
      email: this.state.email,
      password: this.state.password
    })
      .then((response) => {
        const userRole = response.data.current_user.role;
        let isTeacher = userRole === 'teacher' || userRole === 'admin' ? true : false;

        if (response.status === 200 && isTeacher) {
          localStorage.setItem('login', true);
          localStorage.setItem('token', response.data.auth_token);

          this.setState({
            login: true,
            email: null,
            password: null
          })
        } else {
          alert(`Error: Access Denied - You don't have permission to access this page !`)
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error)
        window.location.reload();
      });
  }

  handleLogout() {
    localStorage.removeItem('login');
    localStorage.removeItem('token');
    this.setState({
      login: false
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

  render() {
    const isLogin = this.state.login

    return (
      <div id="ecoWeb container-fluid">
        <div>
          {
            !isLogin ?

              <div id="login-fullscreen" className="text-center">
                <div className="login-form">
                  <br />
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <h3><strong>Administrator Login</strong></h3>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-12">
                      <input className="input-login-txt" type="text" placeholder="Email" onChange={this.onChangeEmail} />
                    </div>
                    <br />
                    <br />
                    <div className="col-md-12">
                      <input className="input-login-txt" type="password" placeholder="Password" onChange={this.onChangePassword} />
                    </div>
                    <br />
                    <div className="col-md-12">
                      <label>
                        <input type="checkbox" /> Remember
                        </label>
                    </div>
                    <br />
                    <br />
                    <div className="col-md-12">
                      <button className="btn btn-primary" onClick={this.handleLogin}>SIGN IN</button>
                    </div>
                    <br />
                    <br />
                    <br />
                  </div>
                </div>
              </div> : null
          }
        </div>
        <div id="ecoWeb-menu">
          <nav className="navbar navbar-light bg-light">
            <ul>
              <li>
                <a className="navbar-brand" href="/">
                  <img src='https://iwa.fi/wp-content/uploads/2018/06/IWA_logo_small.png' alt='logo' />
                </a>
                <a className="navbar-brand" href="/users">USERS</a>
                <a className="navbar-brand" href="/todos">TESTS</a>
              </li>
            </ul>
            <ul>
              <li>
                <button className="btn btn-light" onClick={this.handleLogout}> Logout</button>
              </li>
            </ul>
          </nav>
        </div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/users' component={Users} />
            <Route path='/new-user' component={UserForm} />
            <Route path='/edit-user/:id' component={UserForm} />
            <Route path='/todos' component={Todos} />
            <Route path='/new-test' component={ExampleForm} />
            <Route path='/edit-test/:id/items' component={ExampleForm} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
