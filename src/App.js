import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Dashboard from './Components/UI/Dashboard'
import Footer from './Components/UI/Footer'
import SignInPage from './Components/Auth/SignInPage'
import PasswordReset from './Components/Auth/PasswordReset'
import RegisterPage from './Components/Auth/RegisterPage'
import CreateProject from './Components/Projects/CreateProject'
import ProjectDetails from './Components/Projects/ProjectDetails'
import Landing from './Components/UI/Landing'
import MyAccount from './Components/MyAccount/MyAccountMain'
import InnerProjectDetails from './Components/Projects/InnerProjects/InnerProjectDetails'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

 

  return (
    <BrowserRouter>
    <div className="App">
  
      <Switch>
          <Route exact path='/signup' component={RegisterPage} />
          <Route exact path='/signin' component={SignInPage} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/' component={Landing} />
          <Route exact path='/create-project' component={CreateProject} />
          <Route exact path='/project/:id' component={ProjectDetails} />
          <Route exact path='/thread/:id' component={InnerProjectDetails} />
          <Route path='/myaccount' component={MyAccount} />
          <Route exact path='/reset-password' component={PasswordReset} />
    
      </Switch>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
