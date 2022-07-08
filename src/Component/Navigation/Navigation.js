import React from 'react';
import power from '/Users/shyanw/mystatusapp/src/powerButton.png'
import './Navigation.css'

const Navigation = ({onRouteChange, isSignedIn}) => {
   
   if (isSignedIn) {
return (
    
    
        
        <nav className = "Out">
            <button onClick={()=> onRouteChange('Home') }  id = "logOut"> <img id = "img-power"  src={power} alt="power"/></button>
            </nav>
        
    
    
);
   }
   else{
       return null;
   }
}
    


export default Navigation; 