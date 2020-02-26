import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

class AccountSidebar extends Component {
    state = {
        admin: 'false',
        loaded: 'false'
    };


    
    render() {

        const {profile, organisations} = this.props;


            // Get all buttons with class="btn" inside the container
            var btns = document.getElementsByClassName("sidebar-list-item");

            // Loop through the buttons and add the active class to the current/clicked button
            for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function() {
                var current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            });
            }
        
        // $(".nav a").on("click", function(){
        //     $(".nav").find(".active").removeClass("active");
        //     $(this).parent().addClass("active");
        //  });

        if(this.state.loaded === 'false' && organisations) {
            console.log(profile.email)
             organisations.map(organisation => {
                    
                     if(organisation.admin){
                     
                         if(organisation.admin.includes(profile.email) || organisation.ownerEmail === profile.email){
                             this.setState({
                                 admin: 'true',
                                 loaded: 'true',
                                 organisation: organisation
                             })
                             
                         }
                     }
                     var i = 1;
                     return i;
             })
            
        }
        
        return (

            <div className="col-md-3 account-sidebar">
           
                
                <ul className="sidebar-list" id="sidebar-list">
                    <Link className="sidebar-list-item active" to="/myaccount/mydetails">My Details</Link>
                    <Link className="sidebar-list-item" to="/myaccount/organisation-settings">Organisation Settings</Link>
                </ul>
                
            </div>
            
        )
    }
}


const mapStateToProps = (state) => {
    
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(AccountSidebar)
