import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import '@mantine/carousel/styles.css'
import '@mantine/core/styles.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './redux/reducers/index'
import App from './App'
import axios from 'axios'

axios.defaults.baseURL = 'https://housesale.tldev.id.vn/v1/api/user'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const store = createStore(rootReducer)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
