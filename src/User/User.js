import React, {Component} from 'react'
import './User.css'

class User extends Component{

  render(){
    return(
      <div className='User'>
          <section className='user-section'>
              <h2>User Info</h2>
          </section>
          <section className='user-section'>
              <h2>Changes</h2>
              <button>Edit User</button>
          </section>
      </div>
    )
  } 

}

export default User