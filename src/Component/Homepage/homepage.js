import React from 'react';
import './homepage.css';


class Homepage extends  React.Component  { 
    constructor(props) {
        super(props);
        this.state = {
            signInUsername: '',
            signInPassword: ''
        }
    }


    onUsernameChange =(event) =>{
        this.setState({signInUsername:event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn= () => {
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body:JSON.stringify({
                username: this.state.signInUsername,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('statusList')
            }
        } )
    }
      render(){
        return (
            
            <div className = "title-page">
                <h1>THE DAILY VOICE</h1>
                    <div className = "login">
                    <div className="user-and-pass">
                        <div className = "user">
                        <label id="uname">Username: </label>
                        <input onChange={this.onUsernameChange} className='w-100' type="text" id=" username" ></input>
                        </div>
                        <div className = "pass">
                        <label className = 'w-100' id="pword">Password: </label>
                        <input onChange={this.onPasswordChange} type="password" id="password" ></input>
                        </div>
                        <button  onClick={this.onSubmitSignIn} className = 'w-60' id='signIn'> Sign In </button>
                        

                        

                    </div>

                    <button onClick={() => this.props.onRouteChange('signUp')} id='signUp'> Sign Up </button>
                    
                    </div>
            </div>
            
        );
    }
}


export default Homepage;