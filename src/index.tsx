import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import axios from 'axios'
import '@mantine/carousel/styles.css'
import '@mantine/core/styles.css'

axios.defaults.baseURL = 'https://housesale.tldev.id.vn/v1/api'
// axios.defaults.baseURL = 'http://localhost:8080/v1/api/'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <PersistGate loading={true} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
