import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { TransactionProvider } from './context/TransactionContext'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
