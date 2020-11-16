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
import NotFound from './NotFound/NotFound'
import './App.css'
import ITManagerContext from './ITManagerContext'
import { v4 as uuidv4 } from 'uuid'
import config from './config'

class App extends Component{

    state = {
      users : [],
      trades : [],
      roles : [],
      workstations : [],
      tasks: []
    }

  displayError(err){
    console.log(err)
  }

  //Fetch data from db to build App from: 
  componentDidMount(){
    // api/users endpoint
    const usersEndpoint = `${config.API_ENDPOINT}api/users`
    fetch(usersEndpoint, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
    .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
    })
    .then(data => {
      this.setState({
        users: data
      })
    })
    .catch(err => this.displayError(err))

    // api/trades endpoint
    const tradesEndpoint = `${config.API_ENDPOINT}api/trades`
    fetch(tradesEndpoint, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
    .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
    })
    .then(data => {
      this.setState({
        trades: data
      })
    })
    .catch(err => this.displayError(err))

    // api/roles endpoint
    const rolesEndpoint = `${config.API_ENDPOINT}api/roles`
    fetch(rolesEndpoint, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
    .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
    })
    .then(data => {
      this.setState({
        roles: data
      })
    })
    .catch(err => this.displayError(err))

    // api/workstations endpoint
    const workstationsEndpoint = `${config.API_ENDPOINT}api/workstations`
    fetch(workstationsEndpoint, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
    .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
    })
    .then(data => {
      this.setState({
        workstations: data
      })
    })
    .catch(err => this.displayError(err))

    // /api/tasks endpoint
    const tasksEndpoint = `${config.API_ENDPOINT}api/tasks`
    fetch(tasksEndpoint, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
    .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
    })
    .then(data => {
      this.setState({
        tasks: data
      })
    })
    .catch(err => this.displayError(err))

  }

  addUser = (newUser) => {
    this.setState({
      users: [ ...this.state.users, newUser ],
    })
  }

  editUser = (editedUser) => {
    let users = this.state.users
    const userIndex = users.indexOf(users.find(user => user.id === editedUser.id))
    if(~userIndex){
      users[userIndex] = editedUser
    }
    this.setState({
      users: users
    })  
  }

  deleteUser = (userId) => {
    const newtasks = this.state.tasks.filter(task => task.userId !== userId)
    const newUsers = this.state.users.filter(user => user.id !== userId)
    this.setState(
      {
        users: newUsers,
        tasks: newtasks
      }
    )
  }

  createTask = (newTask) => {
    this.setState(
      {
        tasks: [...this.state.tasks, newTask]
      }
    )
  }


  updateTask = (updatedTasks) => {
    let tasks = this.state.tasks
    let workstations = this.state.workstations
    let updatedWorkstation
    updatedTasks.forEach(updatedTask => {
      const taskIndex = tasks.indexOf(tasks.find(task => task.id === updatedTask.id))
      //If task is completed, then PATCH workstation hotfix property
      if(updatedTask.status_code === 3){
        const user = this.state.users.find(user => String(user.id) === String(updatedTask.user_id))
        const workstationIndex = workstations.indexOf(workstations.find(workstation => workstation.id === user.workstation_id))
        const workstation = workstations[workstationIndex]
        const id = uuidv4()
        const date = new Date()
        const month = ("0" + (date.getMonth() + 1)).slice(-2)
        const day = ("0" + date.getDate()).slice(-2)
        const year = date.getFullYear()
        const modified = `${year}-${month}-${day}`
        workstation.hotfix_id.push(id)
        workstation.hotfix_info.push(updatedTask.task_details)
        workstation.hotfix_date.push(modified)
        updatedWorkstation = {
          id: workstation.id,
          host_name: workstation.host_name,
          os: workstation.os,
          version: workstation.version,
          memory: workstation.memory,
          free_space: workstation.free_space,
          hotfix_id: workstation.hotfix_id,
          hotfix_info: workstation.hotfix_info,
          hotfix_date: workstation.hotfix_date
        }

        //Upon completed task, updates workstation hotfix (task history)
        const options = {
          method: 'PATCH',
          body: JSON.stringify(updatedWorkstation),
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${config.API_KEY}`
          }
        }
  
          fetch(`${config.API_ENDPOINT}api/workstations/${updatedWorkstation.id}`, options)
          .then(response => {
              if(!response.ok){
                  throw new Error('Something went wrong')
              }
          })
          .catch(err => this.displayError(err))

        tasks.splice(taskIndex,1)
        workstations[workstationIndex] = updatedWorkstation

      }else{
        tasks[taskIndex] = updatedTask
      }
    })

    this.setState({
      tasks: tasks,
      workstations: workstations
    })
  }
  
  render(){
    //Creates App context value
    const contextValue = {
      users : this.state.users,
      trades : this.state.trades,
      roles : this.state.roles,
      workstations : this.state.workstations,
      tasks: this.state.tasks,
      addUser: this.addUser,
      editUser : this.editUser,
      deleteUser: this.deleteUser,
      createTask: this.createTask,
      updateTask: this.updateTask
    }
    return(
      <ITManagerContext.Provider value={contextValue}>
        <BrowserRouter>
          <Header/>
          <main className='App'>
            <Switch>
              {/* Site routes including NotFound */}
              <Route exact path='/' component={Landing}/>

              <Route path='/dashboard' component={Dashboard} />

              <Route path='/user/:id' component={User}/>

             <Route path='/edit-user/:id' component={EditUser}/>
 
              <Route path='/add-user/' component={AddUser}/>

              <Route path='/create-task' component={CreateTask}/>

              <Route path={'*'} component={NotFound} />
            </Switch>
          </main>
          <Footer/>
        </BrowserRouter>
      </ITManagerContext.Provider>
    )
  } 

}

export default App