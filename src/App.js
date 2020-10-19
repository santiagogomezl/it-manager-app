import React, {Component} from 'react'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import Header from './Header/Header'
import Landing from './Landing/Landing'
import Dashboard from './Dashboard/Dashboard'
import User from './User/User'
import EditUser from './EditUser/EditUser'
import AddUser from './AddUser/AddUser'
import CreateTask from './CreateTask/CreateTask'
import Footer from './Footer/Footer'
import './App.css'

class App extends Component{

  render(){
    return(
      <BrowserRouter>
        <Header/>
        <main className='App'>
          <Switch>
            <Route exact path='/' component={Landing} />

            <Route path='/dashboard' component={Dashboard} />

            {/* OR ID? */}
            <Route path='/user/:id' component={User}/>

            <Route path='/edit-user/:id' component={EditUser}/>

            <Route path='/add-user/' component={AddUser}/>

            <Route path='/create-task' component={CreateTask}/>

            {/* <Route path={'*'} component={NotFound} /> */}
          </Switch>
        </main>
        <Footer/>
      </BrowserRouter>
    )
  } 

}

export default App