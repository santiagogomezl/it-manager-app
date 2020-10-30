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
import ITManagerContext from './ITManagerContext'
import { v4 as uuidv4 } from 'uuid';
import STORE from './store'

class App extends Component{

    state = {
      users : [],
      trades : [],
      roles : [],
      workstations : [],
      tasks: []
    }

  componentDidMount(){
    this.setState({
      users : STORE[0],
      trades: STORE[1],
      roles: STORE[2],
      workstations: STORE[3],
      tasks: STORE[4]
    })
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
    console.log(newtasks)
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
    updatedTasks.map(updatedTask => {
      const taskIndex = tasks.indexOf(tasks.find(task => task.id === updatedTask.id))
      if(updatedTask.statusCode === 3){
        const user = this.state.users.find(user => String(user.id) === String(updatedTask.userId))
        const workstationIndex = workstations.indexOf(workstations.find(workstation => workstation.id === user.workstationId))
        const date = new Date()
        const modified = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
        const id = uuidv4()
        workstations[workstationIndex].hotfixId.push(id)
        workstations[workstationIndex].hotfixInfo.push(updatedTask.taskDetails)
        workstations[workstationIndex].hotfixDate.push(modified)
        tasks.splice(taskIndex,1)

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
              <Route exact path='/' component={Landing} />

              <Route path='/dashboard' component={Dashboard} />

              <Route path='/user/:id' component={User}/>

              <Route path='/edit-user/:id' component={EditUser}/>

              <Route path='/add-user/' component={AddUser}/>

              <Route path='/create-task' component={CreateTask}/>

              {/* <Route path={'*'} component={NotFound} /> */}
            </Switch>
          </main>
          <Footer/>
        </BrowserRouter>
      </ITManagerContext.Provider>
    )
  } 

}

export default App