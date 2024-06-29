import React from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import {BrowserRouter as Router, Routes, Route, redirect} from 'react-router-dom' 

// initialising the routes

const routes = (
  <Router>
    <Routes>
      <Route exact path="/" render={() => <redirect to="/login" />} />
      <Route path='/dashboard' exact element={<Home />}/>
      <Route path='/login' exact element={<Login />}/>
      <Route path='/signup' exact element={<SignUp />}/>
    </Routes>
  </Router>
);

const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App;