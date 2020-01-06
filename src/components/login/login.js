import React from 'react';
import './login.css';
import User from '../../api/authUser.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      accountid: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("test");
     User.validateUser
     (this.state.username, 
     this.state.accountid, this.state.password).then(response => {
       if(response.status == "200"){
        this.props.history.push('/home');
        
       }
       else{
         this.props.history.push('/error')
       }
     })
  };

  render() {
    const { username, password, accountid } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="Title">Welcome to Noah. Please provide your credentials to login.</div>
        <div className="Container">
          <div className="Separator">
            <label htmlFor="accountid" className="pageLabelAccID">Account ID</label>
            <input
              className="textBox"
              name="accountid"
              type="text"
              placeholder="Enter your Account ID"
              value={accountid}
              onChange={this.handleChange}
            />
          </div>
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
