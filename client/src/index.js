import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { GlobalProvider, GlobalContext } from './context/GlobalState'
import { Provider } from 'react-redux'

// import { createStore } from 'redux'
// import auth from './context/AuthReducer'
// const store = createStore(auth)

render(
    <BrowserRouter>
        {/* <Provider store={store}> */}
        <App />
        {/* </Provider> */}
    </BrowserRouter>,
    document.querySelector('#root')
)