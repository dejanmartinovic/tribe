import React from 'react'
import AddUser from './AddUser'
import DeleteUsers from './DeleteUser'
import UserRole from './roles'

const Users = ({organisations , profile}) => {



    return(
        <div>
          
           
            { organisations && organisations.map(organisation => {
             
                const orgUser = organisation.canView.map((item, key) =>
             
                    
                        <tr>
                            <td>{item}</td>
                            <td><UserRole userEmail={item} organisation={organisation} orgID={organisation.id}></UserRole></td>
                            <td><DeleteUsers userEmail={item} organisation={organisation} orgID={organisation.id}/></td>
                        </tr>
                   
                    
                    
                
                    
                );  
              
                return(
                    <div>
                        {(organisation.admin && organisation.admin.includes(profile.email)) || (organisation.admin && organisation.ownerEmail.includes(profile.email)) ?  
                         
                        <div>
                           
                            <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orgUser}
                            </tbody>
                                
                            </table>
                           
                               
                            <AddUser profile={profile} organisation={organisation} orgID={organisation.id}/>
                        </div>  
                   
                    : null}
        </div>       
                )
            })}
            
        </div>
    )
}

export default Users