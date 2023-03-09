import React, { createContext } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'

import { LoadingContextProvider } from '@/context/loadingContext'
// import { Provider } from 'react-redux'
// import store from './redux/store'

import App from '@/App'
import './index.css'

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <LoadingContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </LoadingContextProvider>
  </React.StrictMode>
)
