import React, { Component} from 'react'


class ProjectStatusBar extends Component {


    state = {
        statusColour: 2,
        projectsAmount: this.props.project.projectAmount,
        commentsAmount: this.props.project.commentAmount,
        totalAmount: this.projectsAmount + this.commentsAmount
    };


    
    renderInputField() {
        const total = this.state.projectsAmount + this.state.commentsAmount
        
        if(total >= 5 && total < 10) {
          return 'current-status yellow-bg';
        }if(total >= 10){
            return 'current-status red-bg';
        }else {
          return ( 
            'current-status'
          );
        }
      }

    render(){

  
        return (
        <div className={this.renderInputField()} id="status">
                <ul>
                    <li>{this.state.projectsAmount} Projects</li>
                    <li>{this.state.commentsAmount} Comments</li>
                </ul>
            </div>
            )
    }
}

export default ProjectStatusBar