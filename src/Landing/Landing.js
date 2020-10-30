import React, {Component} from 'react'
import './Landing.css'

class Landing extends Component{

  render(){
    return(
      <div className='Landing'>
          <div className='landing-hero'>
            <h1>HERO</h1>
          </div>
          <section className='landing-section'>
            <h2>Manage IT Resources</h2>
            <p>
                Manage your users and your company's IT resources all in one place.
                Visualize users, workstations and software. 

            </p>
          </section>
          <section className='landing-section'>
            <h2>Stay Updated</h2>
          </section>
          <section className='landing-section'>
            <h2>Create Tasks</h2>
          </section>
      </div>
    )
  } 

}

export default Landing