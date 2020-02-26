
import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link';
import renderHTML from 'react-render-html'
import 'firebase/firestore';


class SearchMain extends Component {
    state = {
        searchValue : ''
    }

    

    onChange=(e) => {
        this.setState({
            searchValue: e.target.value
        })
        document.getElementById("search").classList.add("search-container-show");

        if(e.target.value === "") {
            document.getElementById("search").classList.remove("search-container-show");
        }
  
    }

   onBlur=(e) => {
    document.getElementById("search").classList.remove("search-container-show");
   }

   onClickProject = (e) => { 
         document.getElementById("projects").classList.add("toggle-active");
         document.getElementById("threads").classList.remove("toggle-active");
         document.getElementById("comments").classList.remove("toggle-active");
   }

   onClickThread = (e) => { 
    document.getElementById("projects").classList.remove("toggle-active");
    document.getElementById("threads").classList.add("toggle-active");
    document.getElementById("comments").classList.remove("toggle-active");
    }

    onClickComments = (e) => { 
        document.getElementById("projects").classList.remove("toggle-active");
        document.getElementById("threads").classList.remove("toggle-active");
        document.getElementById("comments").classList.add("toggle-active");
    }

    onClickReset = (e) => { 
        document.getElementById("projects").classList.add("toggle-active");
        document.getElementById("threads").classList.add("toggle-active");
        document.getElementById("comments").classList.add("toggle-active");
    }
    handleLinkClick = (e) => {
        document.getElementById("search").classList.remove("search-container-show");
    }

    componentDidMount() {
        if (!this.props.profile){
            if(document.getElementById('search')) {
                window.addEventListener('click', function(e){   
                    if (document.getElementById('search').contains(e.target)){
                        console.log('do nothing');
                    } else{
                        document.getElementById("search").classList.remove("search-container-show");
                    }
                  });
            }
        }
        
    }

    
  
    render() {
       

       
       
        
        
     
        return (
            <div className="main-search-container">
                 
               <input className="searchBox" onChange={this.onChange}  type="text" placeholder="Search Here"/>

               <div id="search" className="search-container" onBlur={this.onBlur}>
                   <div className="toggle-container">
                    <span onClick={this.onClickProject} className="toggle toggle1">Projects</span>
                    <span onClick={this.onClickThread} className="toggle toggle2">Threads</span>
                    <span onClick={this.onClickComments} className="toggle toggle3">Comments</span> 
                   </div>
                   <span onClick={this.onClickReset} className="toggle-reset">Show All</span>
                   <div id="projects"  className="projects toggle-active">
                   <ul className="search-results project-results">
                       {this.props.projects && this.props.projects.map(project => {
                           
                           return (
                               <>
                            { ((project && project.canView.includes(this.props.profile.email))
                                && project.title.toLowerCase().includes(this.state.searchValue))
                                || (project.authorEmail.includes(this.state.searchValue) && project && project.canView.includes(this.props.profile.email))
                                ?  
                                <>
                                <Link onClick={this.handleLinkClick} to={project.permalink}>
                                <li className="search-item">
                                    <h4 id="project-date">{project.createdAt.toDate().toDateString()}</h4>
                                    <h2>{project.title}</h2>
                                    <p>{project.content}</p>
                                    </li>
                                 </Link>
                                 <hr/>
                                </>
                           : null }
                           </>
                               
                           )
                            
                        })
                       }
                   </ul>
                   </div>
                   <div id="threads" className="threads toggle-active">
                   <ul className="search-results">
                   {this.props.innerprojects && this.props.innerprojects.map(innerproject => {
                           
                           return (
                               <>
                            { ((innerproject && innerproject.canView.includes(this.props.profile.email))
                                && innerproject.title.toLowerCase().includes(this.state.searchValue))
                                || (innerproject.authorEmail.includes(this.state.searchValue) && innerproject && innerproject.canView.includes(this.props.profile.email))
                                ? 
                                <>
                                <Link onClick={this.handleLinkClick}  to={innerproject.permalink}>
                                <li className="search-item">
                                    <h4 id="thread-date">{innerproject.createdAt.toDate().toDateString()}</h4>
                                    <h2>{innerproject.title}</h2>
                                    <p>{innerproject.content}</p>
                                    </li>
                                 </Link>
                                <hr/>
                                </>
                           : null }
                           </>
                               
                           )
                            
                        })
                       }
                   </ul>
                   </div>
                   <div id="comments" className="comments toggle-active">
                   <ul className="search-results">
                    {this.props.comments && this.props.comments.map(comment => {
                            
                            return (
                                <>
                                { ((comment && comment.canView.includes(this.props.profile.email))
                                && comment.model.toLowerCase().includes(this.state.searchValue))
                                || (comment.commentAuthor.includes(this.state.searchValue) && comment && comment.canView.includes(this.props.profile.email))
                                ? 
                                    <>
                                    <Link onClick={this.handleLinkClick}  to={'/thread/' + comment.projectId + '/#' + comment.id}>
                                    <li className="search-item">
                                        <h4 id="comment-date">{comment.createdAt.toDate().toDateString()}</h4>
                                        <p id="message">{renderHTML(comment.model.substring(0,100))}</p>
                                        
                                        </li>
                                    </Link>
                                    <hr/>
                                    </>
                            : null }
                            </>
                                
                            )
                                
                            })
                        }
                   </ul>
                   </div>
               </div>
                
            </div>  

        )    
    }
    
}


export default SearchMain;
