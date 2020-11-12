import React from 'react'
import ReactDOM from 'react-dom'
import UserSummary from './UserSummary'
import {BrowserRouter} from 'react-router-dom'


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BrowserRouter><UserSummary /></BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})
