import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/App.jsx'

const root = createRoot(document.getElementById('root'))

root.render(
  <App />
)
