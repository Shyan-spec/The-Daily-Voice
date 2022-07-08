import React from 'react';
import './statusList.css';
import search from '/Users/shyanw/mystatusapp/src/icons8-search.svg'
import megaPhone from '/Users/shyanw/mystatusapp/src/icons8-megaphone-64.svg'




class statusList extends  React.Component   { 
    constructor(props) {
        super(props);
        this.state = {
       textbox: '',
       username: this.props.username,
       loading: true,
       posts: this.props.posts,
       
       
       
       
        } 
    }

     
     
   

    async componentDidMount() {
        let allPosts = []
        const url = "http://localhost:3001/";
        const response = await fetch(url);
        const data = await response.json();
        //this.setState({post: data[0], loading : false}) 
        
        for(let i = data.length-1; i >= 0; i--){
            allPosts.push(data[i])
            };
            
            this.setState({posts: allPosts, loading:false})
            
           
         return this.state.posts
        
    }

    
        
    

   
    

    

    

    onTextChange = (event) => {
        this.setState({textbox:event.target.value})
        
    }

    

    onSubmitPost = () => {
        
       
        if(this.state.textbox !== ''){
        fetch('http://localhost:3001/statusList', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body:JSON.stringify({
                textbox: this.state.textbox,
                username: this.state.username
            })
        })
        .then(this.componentDidMount())
        .then(
        response => response.json(this.componentDidMount())
           
        )
        .then(this.setState({textbox: ''}))
    }
    else {
        console.log('The textbox is blank');
    }
    
}

 

    
    render() {
       
       
        const handleSubmit = (event) => {
            event.preventDefault(); // 👈️ prevent page refresh
        
            // 👇️ clear all input values in the form
            event.target.reset('');
            
          };
       
        const {onSearchChange, searchName} = this.props;
       
       
        const postList = this.state.posts

     
     let filtered = postList.filter(item => {
         if(item.username.toLowerCase().includes(searchName.toLowerCase()))
         {
             
             return item
         }
     }).map(item => {
            return(
                <> 
                <ul> 
                    <li  className="bg-white dib br3 pa3 ma2 " id="statusPost" key={item.statusId}>
                    <h4>{item.username} </h4>
                    <div id="text">{item.statusText} </div>  
                    <div>{item.createdAt} </div>

                    </li>
                </ul> 
        </>
        
            )
     })

        return (
            <>
             
            <div className= "home-page">
                <h2>THE DAILY VOICE</h2>
                <div className = "container"> 
                <div className="search">
                <div className='search-space'>
                
                <img className='bg-black search-icon' alt =" " id = "img-search" src={search}/> 
                <input  posts={this.state.posts} className = 'f5 pa2  bg-black b--none white textbox-search ' type= 'text' onChange = {onSearchChange}/>

                </div>
                
                
                <form className = "post-flex" onSubmit={handleSubmit}>
                <textarea id = "delete" onChange = {this.onTextChange} className = ' f9 pa2 b--solid bw2 b--black status-box' placeholder={`Hi ${this .state.username}, speak your mind...`}  ></textarea>
                <button onClick={this.onSubmitPost} className="post-button w-15" type="submit"> Post </button> 
                </form>
                

                </div>
                <img className='megaphone-icon ' alt=" " id = "img-megaphone" src={megaPhone}/> 
            
                </div>

                <div style={{overflowY:'scroll'}} className = "container2"> 
                {this.state.loading  || !this.state.posts ? (<div> Loading... </div> )
                : (
                    <>
                    <div>

                
                    {searchName !== '' ? filtered : postList.map(item => {
         
         return (                  
         <> 
         <ul> 
             <li  className="bg-white dib br3 pa3 ma2 " id="statusPost" key={item.statusId}>
             <h4 >{item.username} </h4>
             <div  id="text">{item.statusText} </div>  
             <div >{item.createdAt} </div>
 
             </li>
         </ul> 
         </>
         )
     }
     
     )}
                    
                    
                    
                    </div>
                    
                    </>
                )
                
                 }
                </div>


                
            </div>
            </>
        );
    }
}


export default statusList;