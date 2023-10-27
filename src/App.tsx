import React from 'react'
import { Provider as ReduxStoreProvider } from 'react-redux'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Main from './pages/Main'
import Register from './pages/Register'
import Subtask from './pages/Subtask'
import Todo from './pages/Todo'
import Wrapper from './pages/Wrapper'
import { store } from './store'
// import './index.css'

const App: React.FC = () => {
  return (
    <ReduxStoreProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route element={<Wrapper />}>
            <Route path="/main" Component={Main} />
            <Route path="/todo/:todoId" Component={Todo} />
            <Route path="/subtask/:subTaskId" Component={Subtask} />
          </Route>
          <Route path={'*'} element={<p>Page not found</p>} />
        </Routes>
      </BrowserRouter>
    </ReduxStoreProvider>
  )
}

export default App
