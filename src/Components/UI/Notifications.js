import React, { Component} from 'react'
import {Link} from 'react-router-dom'
import FireImg from '../../assets/fire-noti.png';
import firebase from 'firebase/app'
import 'firebase/firestore';

class Notifications extends Component {
    state = {
        notifications:[],
        currentNotifications : 0
    }
   
    handleClick = (e) => {
        var currentNotificationID = e.currentTarget.id;
        const userEmail = this.props.profile.email;
        var db = firebase.firestore();
        db.collection('notifications').doc(currentNotificationID).update({

            canView : firebase.firestore.FieldValue.arrayRemove(userEmail)
            
        })
     }

     handleButton = (e) => {
         console.log('works');
         document.getElementById("noti-container").classList.remove("noti-hide");
         var noti = document.querySelectorAll(".notification-item");
         console.log(noti);
         noti.forEach(function (notification) {
            notification.classList.add("notifications-show");
          });
         
     }

     handleClose() {
        document.getElementById("noti-container").classList.add("noti-hide");
     }

    
    render() {

        var notifications = [];
        
     
        if(this.props.notifications) {
           
            this.props.notifications.forEach(item => {
                var itemCanview = item.canView;
                    if(itemCanview.includes(this.props.profile.email) ) {
                        notifications.push(item);
                    }
            })
            var amountOfNotifications = 0;
            this.props.notifications.filter(notification => notification.canView.includes(this.props.profile.email))
            .map((notification, idx) =>  amountOfNotifications = amountOfNotifications + 1 );
        }

       



       
       

        return(
        
              <>
                    
                        <div onClick={this.handleButton} className="notification-button">
                        {amountOfNotifications > 0 ? 
                            <span className="noti-number">
                                {amountOfNotifications}
                            </span>
                         : null}
                            <img src={FireImg} alt=""/>
                         </div>
                   
                    
                  
                    { notifications.length > 0 ? 
                      
                    <div className="notifications-container noti-hide" id="noti-container">
                        <div onClick={this.handleClose} className="close-notifications">
                            <i class="fa fa-times"></i>
                        </div>
                    <h1>Your Notifications</h1>
                    
                       
                             
                        { notifications && notifications.map(item => {

                          
                       
                            return(
                                <>
                                     {item.canView.includes(this.props.profile.email) ? 

                                          
                                       
                                            <Link onClick={this.handleClick.bind(this)} className="notification-item" to={item.permalink} id={item.id} key={item.id}>
                                            <span className='notifications-user'>{item.user}</span>
                                            <br/>
                                            <span className='notifications-content'>{item.content}</span>
                                            <hr/>
                                            </Link>
                                         
                                      
                                         
                                        : null
                                        }
                                     
                                     </> 
                            )
                               
                            
                               
                           
                        }) }
                       <h1>Previous Notifications</h1>
                       <p>Coming soon..</p>
                    </div>
                    : <div className="notifications-container noti-hide" id="noti-container">
                        <div onClick={this.handleClose} className="close-notifications">
                            <i class="fa fa-times"></i>
                        </div>
                        <div className="notification-item">
                            <p>No Notifications</p>
                            <h1>Previous Notifications</h1>
                            <p>Coming soon..</p>
                        </div>
                     </div>
                        }
                </>
          
                )
            }
}

export default Notifications
