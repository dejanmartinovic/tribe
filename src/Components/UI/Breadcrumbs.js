import React, { Component }  from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Diamond } from '../../assets/diamond-seperator.svg';


class Breadcrumbs extends Component {
constructor(props) {
    super(props);
    
    
    this.state = {
        innerCount : 0
    }
    
}

    render() {

               
                return(
                   <div className="row">
                       <div className="col-md-12 breadcrumbs-col">
                            <ul>
                                <Link to="/dashboard">
                                    <li>Projects</li>
                                </Link>
                            
                            {this.props.mainProject ?
                            <>
                                <li className="diamond"><Diamond /></li>
                                <Link to={'/project/' + this.props.currentProject.projectId}>
                                <li>{this.props.mainProject}</li>
                                </Link>
                            </>
                             : null}
                             <li className="diamond"><Diamond /></li>
                             <li>{this.props.currentProject.title}</li>
                             <li className="diamond"><Diamond /></li>
                            
                                
                           
                            </ul>
                       </div>
                   </div>
                )

                   
                    
                    
                
            }   
            
        }       
        
export default Breadcrumbs
