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
            Section 1
          </section>
          <section className='landing-section'>
            Section 2
          </section>
          <section className='landing-section'>
            Section 3
          </section>
      </div>
    )
  } 

}

export default Landing