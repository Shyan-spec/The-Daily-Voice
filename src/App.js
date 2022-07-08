
import React, { Component } from 'react';
import Home from './Component/Homepage/homepage.js'
import StatusList from './Component/StatusList/statusList.js'
import './App.css';
import SignUp from "./Component/SignUp/signUp.js";
import Navigation from "./Component/Navigation/Navigation.js";


class App extends Component {
  constructor(){
    super();
    this.state = {
      isSignedIn: false,
      route: 'Home',
      user: {
        id: '',
        username: '',
        joined: ''
      },
      searchName: '',
      posts: []
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
        username: data.username,
        joined: data.joined
    }})
  }

  onSearchChange = (event) => {
    this.setState({searchName: event.target.value})
  
  }

  
  

  onRouteChange = (route) => {
    if(route === 'Home') {
      this.setState({isSignedIn: false})
    }
    else if(route === 'statusList') {
      this.setState({username: this.state.user.username})
      this.setState({isSignedIn: true})
      
      
      
    }
    this.setState ({route: route})
    
  }

  render() {
    
    
  return (
    
    <div className="App">
    
    <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
    {

    this.state.route === 'statusList'  
     ? <div> 
     <StatusList searchName={this.state.searchName} posts={this.state.posts} loadUser={this.loadUser} username = {this.state.user.username} onSearchChange={this.onSearchChange}></StatusList>
     </div>
     : ( this.state.route === 'Home'
     ? <Home loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
     : <SignUp username = {this.state.user.username} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
     )
     
    }
    
     
    </div>
    
  );
}



}

export default App;
