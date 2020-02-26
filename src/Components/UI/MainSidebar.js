import React, { Component } from 'react'
import { ReactComponent as ProfileSeperator } from '../../assets/profile-seperator.svg';
import { ReactComponent as SettingDots } from '../../assets/setting-dots.svg';
import { ReactComponent as CampIcon } from '../../assets/camp-icon.svg';
import MorningImg from '../../assets/morning.png';
import AfternoonImg from '../../assets/afternoon.png';
import EveningImg from '../../assets/evening.png';
import {Link} from 'react-router-dom'
// import { connect } from 'react-redux'
// import { firestoreConnect, isLoaded } from 'react-redux-firebase'
// import ProjectList from '../Projects/ProjectList'
// import { compose } from 'redux'
// import CreateProject from '../Projects/CreateProject'
// import { Redirect } from 'react-router-dom'
// import NavComponent from './NavComponent'


class MainSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curTime : null,
            projects : [],
            bgError: false
        }
      }

      componentDidMount(){
        setInterval( () => {
          this.setState({
            curTime : new Date().toLocaleString()
          })
        },1000)
  
      }


   
    
    render() {
        
        const {profile} = this.props;

        var today = new Date()
        var curHr = today.getHours()
        var veriableMessage = '';
        var welcomeMessage = '';
       
      
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var dayOfTheWeek = weekday[today.getDay()];
        
        if(this.props.profile.firstName){
            if (curHr < 12) {
                    
                    veriableMessage = 'Good Morning, ';
                    welcomeMessage = '( Dont say "afternoon" on the phone! )';
                } else if (curHr < 18) {
                
                    veriableMessage = 'Good Afternoon, ';
                    welcomeMessage = '( Dont say "morning" on the phone! )';
                } else {
    
                    veriableMessage = 'Good Evening, ';
                    welcomeMessage = '( We hope you are getting paid overtime! )';
                }
        }

        var background = this.props.profile.avatarURL

        if(!background) {
            background = 'https://static.thenounproject.com/png/4815-200.png'
        }
        
        
        var profileImage = {
           backgroundImage: `url('${background}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }

        if (this.state.errored) {     
            return null;   
           } else {     
            
        }
       


        return(
            <>
                <div className="col-md-3 dash-sidebar-container">
                    <div className="dash-sidebar">
                        <div className="sidebar-header">
                            
                            {curHr < 12 ? <img className="header-image" src={MorningImg} alt=""/> :
                            curHr < 18 ? <img className="header-image" src={AfternoonImg} alt=""/> : 
                            <img className="header-image" src={EveningImg} alt=""/>
                            }
                            <h3>{veriableMessage}<span className="bold-name">{profile.firstName}</span></h3>
                            <p>{welcomeMessage}</p>
                            <span className="day-of-week">
                            {dayOfTheWeek}
                            </span>
                            <span className="date">
                                
                            </span>
                            <span className="time" id="thetime">
                                {this.state.curTime}
                            </span>
                        </div>
                        <div className="main-sidebar-container">
                            <div className="projects-container">
                                <h1><CampIcon/>Your Projects</h1>
                                <ul className="sidebar-project-list">
                                {this.props.projects && this.props.projects.map(project => {
                                    return (
                                            <>
                                                {project.canView.includes(this.props.profile.email) ?
                                                <Link to={project.permalink} className={project.title === this.props.currentProject ? 'current_project' : null}>
                                                <li>{project.title}</li>
                                                </Link>
                                                : null}
                                            </>
                                    )
                                    
                                })
                            }
                            </ul>
                            <Link to="/dashboard" className="btn btn-primary">View All Projects</Link>
                           
                            </div>
                            
                            <h1>Your Profile</h1>
                            <ProfileSeperator />
                            <div className="profile">
                                <div style={profileImage} className="profile-picture">
                    
                                </div>
                                <div className="profile-name">
                                    <span className="first-name">
                                        {this.props.profile.firstName + ' '}
                                    </span>
                                    <span className="last-name">
                                        {this.props.profile.lastName}
                                    </span>
                                    
                                </div>
                                <span className="role">
                                        Developer
                                    </span>
                                <Link to='/myaccount/mydetails' className="profile-settings">
                                        <SettingDots />
                                </Link>
                            </div>
                            <ProfileSeperator />
                        </div>
                    </div>
                    
                </div>
            </>
        )
    }
    
}



export default MainSidebar;