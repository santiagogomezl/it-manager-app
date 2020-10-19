import React, {Component} from 'react'
import './Dashboard.css'

class Dashboard extends Component{

  render(){
    return(
      <div className='Dashboard'>
        <div className='dashboard-header'>
            <div className='dashboard-filter'>
                <form>
                Filter Results Form
                </form>
            </div>
            <div className='dashboard-add-button'>
            Add User Button
            </div>
        </div>
        <div className='dashboard-body'>
            Database Results
        </div>
        <div>

        </div>
      </div>
    )
  } 

}

export default Dashboard