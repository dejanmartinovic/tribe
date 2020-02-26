import React, { Component} from 'react'
// import {Link} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore';

class ViewedBy extends Component {    
    constructor(props) {
        super(props);
        
        
        this.state = {
            viewedArray: this.props.viewedBy,
            stateViews : []
        }
    }

    componentDidMount = () => {
        if(this.props.viewedBy) {
            var db = firebase.firestore();
            var amount = this.props.viewedBy.length;
            var i = 0;
            var views = [];
            while(i < amount){
                db.collection('users').where("email", "==", this.props.viewedBy[i])
                .get()
                .then((querySnapshot) => {
                    console.log(querySnapshot)
                    querySnapshot.forEach(doc => {
                        const user = doc.data();
                      
                       views.push({
                           email : user.email,
                           firstName : user.firstName,
                           background : 'https://firebasestorage.googleapis.com/v0/b/boomapp-8d7cc.appspot.com/o/profile%2F'+ user.email +'?alt=media&token=3c87165c-ba82-47a0-a7d9-ff685c3dfe28'
                       })
                       this.setState({
                        stateViews : views
                       })
                       console.log('state Views = ' + this.state.stateViews)

                    })
                })
                i++;
            }
           }   
           console.log('state Views = ' + this.state.views)
    }

    
    
 

    render() {

        

    

          return (
            <div>
             
                {
                 this.state.stateViews.map(function(item, i){
                    var profileImage = {
                        backgroundImage: `url(${item.background})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }
                   console.log('test');
                  return (
                      <>
                        <li className="comment-view-li">
                        <div style={profileImage} className="profile-picture nav-profile comment-view">
                         </div>
                            {item.firstName}</li>
                      </>
                  ) 
                 })
               }
              
            </div>
          )
    }
}



export default (ViewedBy)