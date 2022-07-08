import React from 'react';

import './signUp.css';



class signUp extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            retypePassword: '',
            verified: true,
            thisName:''
        }
    }


    onUsernameChange = (event) =>{
        this.setState({username:event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onRetypePasswordChange = (event) => {
        this.setState({retypePassword: event.target.value})
    }

    passwordVerified = () => {
        if(this.state.password === this.state.retypePassword){
            this.setState({verified:true})
        }
        else{
        this.setState({verified:false})
        }
    }

    

    onSubmitSignUp = () => {
        fetch('http://localhost:3001/register', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body:JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                retypePassword: this.state.retypePassword
                
            })
        })
        .then(response => response.json())
        .then(user => {
            this.passwordVerified()
            if(user && this.state.verified === true) {
                
                this.props.loadUser(user)
                this.setState({username: this.state.username})
                this.props.onRouteChange('Home')
                
                
            }
            else{
                
                console.log("Passwords must be the same!")
            }
            
        } )
    }

    render() {
        const {onRouteChange} = this.props;
        
        return (
            <>
            <div className="container1">
                <div className= "display">
                <div id="wrap">
                    <h3>THE DAILY VOICE</h3>
                    <input onChange={this.onUsernameChange} type="text" id="typeUser" placeholder="Username"></input>
                    <input  onChange={this.onPasswordChange} type="password" id="typePass" placeholder="Password"></input>
                    <input onChange={this.onRetypePasswordChange} type="password" id="reTypePass" placeholder="Re-type Password"></input>
                    <button  username={this.state.username} onClick={this.onSubmitSignUp} type="submit" id="submitSignUp"> Sign Up!</button>
                </div>
                </div>
                <div className ="display2">
                    <p  onClick ={() => onRouteChange('Home')} > Already have an account? Log in. </p>
                </div>
            </div>
            </>
        );
    }
}

export default signUp;