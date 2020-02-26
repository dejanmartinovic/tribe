import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Footer extends Component {
    render() {
        return (
            <div>
                
                    <div className="page-footer font-small stylish-color-dark pt-4 boom-footer">

                  
                    <div className="container text-center text-md-left">

                        
                        <div className="row">

                     
                        <div className="col-md-4 mx-auto">

                            
                            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">Footer Content</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer</p>
                        </div>
                        

                        <hr className="clearfix w-100 d-md-none" />

                       
                        <div className="col-md-2 mx-auto">

                         
                            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">Links</h5>

                            <ul className="list-unstyled">
                            <li>
                                <Link to='/' className=''>Link 1</Link>
                            </li>
                            <li>
                            <Link to='/' className=''>Link 2</Link>
                            </li>
                            <li>
                            <Link to='/' className=''>Link 3</Link>
                            </li>
                            <li>
                            <Link to='/' className=''>Link 4</Link>
                            </li>
                            </ul>

                        </div>
                        

                        <hr className="clearfix w-100 d-md-none" />

                        
                        <div className="col-md-2 mx-auto">

                           
                            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">Links</h5>

                            <ul className="list-unstyled">
                            <li>
                            <Link to='/' className=''>Link 1</Link>
                            </li>
                            <li>
                            <Link to='/' className=''>Link 2</Link>
                            </li>
                            <li>
                            <Link to='/' className=''>Link 3</Link>
                            </li>
                            <li>
                            <Link to='/' className=''>Link 4</Link>
                            </li>
                            </ul>

                        </div>
                        

                        <hr className="clearfix w-100 d-md-none" />

                       
                        <div className="col-md-2 mx-auto">

                            
                            <h5 className="font-weight-bold text-uppercase mt-3 mb-4">Links</h5>

                            <ul className="list-unstyled">
                            <li>
                            <Link to='/' className=''>Link 1</Link>
                            </li>
                            <li>
                            <Link to='/' className=''>Link 2</Link>
                            </li>
                            <li>
                            <Link to='/' className=''>Link 3</Link>
                            </li>
                            <li>
                            <Link to='/' className=''>Link 4</Link>
                            </li>
                            </ul>

                        </div>
                       

                        </div>
                       

                    </div>
                   

                    <hr />

                  
                    <ul className="list-unstyled list-inline text-center py-2">
                        <li className="list-inline-item">
                        <h5 className="mb-1">Register for free</h5>
                        </li>
                        <li className="list-inline-item">
                        <Link to='/' className='btn btn-danger btn-rounded'>Sign Up!</Link>
                        </li>
                    </ul>
                  

                    <hr />

                   
                 
                   

                   
                    <div className="footer-copyright text-center py-3">© 2019 Copyright:
                        <a href="https://boomsolutions.co.uk"> BoomSolutions.co.uk</a>
                    </div>
                

                   
                </div>
                
            </div>
        )
    }
}

export default Footer
