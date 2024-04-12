import React from 'react'
import {Route , Routes , BrowserRouter as Router} from 'react-router-dom'
import WelcomePage from './pages/welcomePage'
import LoginPage from './pages/loginPage'
import NewContactPage from './pages/newContactPage'
import AllContactPage from './pages/allContactPage'

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path ="/" element = {<WelcomePage/>} />
        <Route path ="/login" element = {<LoginPage/>} />
        <Route path ="/contacts" element = {<AllContactPage/>} />
        <Route path ="contacts/new" element = {<NewContactPage/>} />
      </Routes>
    </Router>
  )
}

export default App
