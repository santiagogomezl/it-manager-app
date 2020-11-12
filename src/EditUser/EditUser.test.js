import React from 'react'
import ReactDOM from 'react-dom'
import Edituser from './Edituser'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Edituser />, div)
  ReactDOM.unmountComponentAtNode(div)
})
