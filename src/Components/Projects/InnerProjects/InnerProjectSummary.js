import React from 'react'
import { Redirect } from 'react-router-dom'


const InnerProjectSummary =({innerproject, projectId, auth, project, profile}) => {

    if (!auth.uid) return <Redirect to='/signin' />
    
   
    var background = profile.avatarURL

    if(!background) {
        background = 'https://static.thenounproject.com/png/4815-200.png'
    }

    var profileImage = {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }


return(

   
    
    <div className="card z-depth-0 project-summary">
        
        <div className="card-content grey-text text-darken-3">
        <div style={profileImage} className="profile-picture post-avatar">

        </div>
            
            <span className="card-title">{innerproject.key}</span>
            <h2>{innerproject.title}</h2>
            <div className="row">
                <div className="col-md-12">
                    <p className="post-content">{innerproject.content}</p>
                    <p className="post-by">By : {innerproject.authorFirstName} {innerproject.authorLastname}</p>
                </div>
            </div>
              
                    
            </div>
            
        </div>
        
    )
}



export default InnerProjectSummary