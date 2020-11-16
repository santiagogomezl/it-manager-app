import React from 'react'

const ITManagerContext = React.createContext({
    users : [],
    trades: [],
    roles: [],
    workstations: [],
    addUser: () => {},
    editUser: () => {},
    deleteUser: () => {},
    createTask: () => {},
    updateTask: () => {}
})

export default ITManagerContext