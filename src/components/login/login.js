import React from 'react';
import './login.css';
import User from '../../api/authUser.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    var data = User.validateUser();
    console.log(data.username);
    console.log(this.state.username);
    if (data.username === this.state.username.toLowerCase() && data.password === this.state.password.toLowerCase()) {
      event.preventDefault();
      this.props.history.push('/home');
      console.log("login success");
    }
    else {
      event.preventDefault();
      console.log("login failed");
      this.props.history.push('/error');
    }
  };



  render() {
    const { username, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="Title">Welcome to Noah app</div>
        <div className="Container">
          <div className="Separator">
          <label htmlFor="username" className="pageLabel">Username</label>
          <input
            className="textBox"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={this.handleChange}
          />
          </div>
          <label htmlFor="email" className="pageLabelPwd">Password</label>
          <input
            className="textBox"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={this.handleChange}
          />
          <div />
          <button type="submit" className="Login">Login</button>
        </div>
      </form>

    );
  }
}

export default App;
